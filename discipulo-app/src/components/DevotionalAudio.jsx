import { useEffect, useState } from "react";
import { getTodayDevotional } from "../lib/devotional.js";

function pickPortugueseVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  return voices.find((voice) => voice.lang.startsWith("pt")) || voices[0];
}

export default function DevotionalAudio() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const devotional = getTodayDevotional();

  useEffect(() => {
    setSupported("speechSynthesis" in window);

    const loadVoices = () => pickPortugueseVoice();
    loadVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis?.cancel();
      window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  function buildScript() {
    return [
      devotional.title,
      devotional.verse,
      devotional.summary,
      devotional.application,
      `Oração: ${devotional.prayer}`,
      `Desafio do dia: ${devotional.challenge}`
    ].join(". ");
  }

  function toggleSpeak() {
    if (!supported) {
      alert("Seu navegador não suporta leitura em voz alta.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(buildScript());
    const voice = pickPortugueseVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "pt-BR";
    }

    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  if (!supported) {
    return null;
  }

  return (
    <button type="button" className="btn-secondary audio-btn" onClick={toggleSpeak}>
      {speaking ? "⏹ Parar áudio" : "🔊 Ouvir devocional"}
    </button>
  );
}
