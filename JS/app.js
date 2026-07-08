const titleElement = document.getElementById("devotionalTitle");
const verseElement = document.getElementById("devotionalVerse");
const summaryElement = document.getElementById("devotionalSummary");
const contextElement = document.getElementById("devotionalContext");
const textElement = document.getElementById("devotionalText");
const applicationElement = document.getElementById("devotionalApplication");
const prayerElement = document.getElementById("devotionalPrayer");
const challengeElement = document.getElementById("devotionalChallenge");

const completeButton = document.getElementById("completeButton");
const streakNumber = document.getElementById("streakNumber");
const streakText = document.getElementById("streakText");

const journalInput = document.getElementById("journalInput");
const saveJournalButton = document.getElementById("saveJournalButton");
const journalList = document.getElementById("journalList");
const historyList = document.getElementById("historyList");

const greetingElement = document.getElementById("greeting");
const todayStatus = document.getElementById("todayStatus");
const welcomeName = document.getElementById("welcomeName");
const welcomeDay = document.getElementById("welcomeDay");
const editNameButton = document.getElementById("editNameButton");

const todayReading = document.getElementById("todayReading");
const readingTime = document.getElementById("readingTime");
const todayMission = document.getElementById("todayMission");
const lastJournalPreview = document.getElementById("lastJournalPreview");
const todayPrayerTime = document.getElementById("todayPrayerTime");
const prayerGoalPreview = document.getElementById("prayerGoalPreview");
const growthPlanPercent = document.getElementById("growthPlanPercent");
const growthDevotionalCount = document.getElementById("growthDevotionalCount");
const growthJournalCount = document.getElementById("growthJournalCount");
const growthProgressFill = document.getElementById("growthProgressFill");

const prayerInput = document.getElementById("prayerInput");
const savePrayerButton = document.getElementById("savePrayerButton");
const prayerList = document.getElementById("prayerList");

const timerDisplay = document.getElementById("timerDisplay");
const timerSummary = document.getElementById("timerSummary");
const prayerGoalFill = document.getElementById("prayerGoalFill");
const startTimerButton = document.getElementById("startTimerButton");
const pauseTimerButton = document.getElementById("pauseTimerButton");
const stopTimerButton = document.getElementById("stopTimerButton");
const prayerGoalInput = document.getElementById("prayerGoalInput");
const saveGoalButton = document.getElementById("saveGoalButton");
const prayerSessionList = document.getElementById("prayerSessionList");

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

const plansList = document.getElementById("plansList");
const currentPlanText = document.getElementById("currentPlanText");
const planProgressFill = document.getElementById("planProgressFill");
const planProgressText = document.getElementById("planProgressText");

const aiQuestionInput = document.getElementById("aiQuestionInput");
const askAiButton = document.getElementById("askAiButton");
const aiAnswer = document.getElementById("aiAnswer");
const aiContext = document.getElementById("aiContext");
const aiSuggestionButtons = document.querySelectorAll(".chip");

const reflectionButtons = document.querySelectorAll(".reflection-btn");
const reflectionStatus = document.getElementById("reflectionStatus");

const momentOverlay = document.getElementById("momentOverlay");
const momentInput = document.getElementById("momentInput");
const momentHints = document.getElementById("momentHints");
const generateDevotionalButton = document.getElementById("generateDevotionalButton");
const skipMomentButton = document.getElementById("skipMomentButton");
const devotionalLabel = document.getElementById("devotionalLabel");
const devotionalMomentBadge = document.getElementById("devotionalMomentBadge");
const changeMomentButton = document.getElementById("changeMomentButton");
const openDevotionalButton = document.getElementById("openDevotionalButton");
const devotionalContent = document.getElementById("devotionalContent");
const devotionalToggleSection = document.getElementById("devotionalToggleSection");

const spiritualJourneyCard = document.getElementById("spiritualJourneyCard");
const spiritualJourneyPreview = document.getElementById("spiritualJourneyPreview");
const spiritualJourneyLevel = document.getElementById("spiritualJourneyLevel");
const spiritualLevelDescription = document.getElementById("spiritualLevelDescription");
const spiritualProgressFill = document.getElementById("spiritualProgressFill");
const spiritualProgressText = document.getElementById("spiritualProgressText");
const spiritualLevelsList = document.getElementById("spiritualLevelsList");

const bibleBookSelect = document.getElementById("bibleBookSelect");
const bibleChapterSelect = document.getElementById("bibleChapterSelect");
const loadBibleButton = document.getElementById("loadBibleButton");
const loadTodayReadingButton = document.getElementById("loadTodayReadingButton");
const biblePassageTitle = document.getElementById("biblePassageTitle");
const biblePassageText = document.getElementById("biblePassageText");
const bibleVersionLabel = document.getElementById("bibleVersionLabel");
const bibleSearchInput = document.getElementById("bibleSearchInput");
const bibleSearchButton = document.getElementById("bibleSearchButton");
const bibleSearchCancelButton = document.getElementById("bibleSearchCancelButton");
const bibleSearchAllBooks = document.getElementById("bibleSearchAllBooks");
const bibleSearchHint = document.getElementById("bibleSearchHint");
const bibleSearchResults = document.getElementById("bibleSearchResults");
const favoriteVersesList = document.getElementById("favoriteVersesList");
const devotionalBibleVersion = document.getElementById("devotionalBibleVersion");
const openBibleFromDevotional = document.getElementById("openBibleFromDevotional");
const readingCard = document.getElementById("readingCard");

const onboardingOverlay = document.getElementById("onboardingOverlay");
const onboardingSteps = document.querySelectorAll(".onboarding-step");
const onboardingDots = document.querySelectorAll(".onboarding-dot");
const onboardingNameInput = document.getElementById("onboardingNameInput");
const onboardingPrayerGoalInput = document.getElementById("onboardingPrayerGoalInput");
const onboardingGoalButtons = document.querySelectorAll(".onboarding-goal-btn");
const onboardingNext1 = document.getElementById("onboardingNext1");
const onboardingNext2 = document.getElementById("onboardingNext2");
const onboardingBack2 = document.getElementById("onboardingBack2");
const onboardingBack3 = document.getElementById("onboardingBack3");
const onboardingFinish = document.getElementById("onboardingFinish");

const today = new Date().toISOString().split("T")[0];

const prayerTimer = {
    running: false,
    startedAt: null,
    elapsedSeconds: 0,
    intervalId: null
};

const WEEKDAYS = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
];

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

function daysBetween(startDate, endDate) {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    const diff = end - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function setGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        greetingElement.textContent = "Bom dia";
    } else if (hour < 18) {
        greetingElement.textContent = "Boa tarde";
    } else {
        greetingElement.textContent = "Boa noite";
    }
}

function getUserName() {
    return localStorage.getItem("userName") || "";
}

function isOnboardingCompleted() {
    return localStorage.getItem("onboardingCompleted") === "true";
}

function migrateOnboardingForExistingUsers() {
    if (!isOnboardingCompleted() && getUserName()) {
        localStorage.setItem("onboardingCompleted", "true");
    }
}

function showOnboardingStep(stepNumber) {
    onboardingSteps.forEach((step) => {
        step.classList.toggle("hidden", Number(step.dataset.onboardingStep) !== stepNumber);
    });

    onboardingDots.forEach((dot) => {
        dot.classList.toggle("active", Number(dot.dataset.onboardingDot) === stepNumber);
    });
}

function setOnboardingPrayerGoal(goal) {
    const safeGoal = Math.min(180, Math.max(1, Number(goal) || 15));

    onboardingPrayerGoalInput.value = String(safeGoal);
    onboardingGoalButtons.forEach((button) => {
        button.classList.toggle("active", Number(button.dataset.goal) === safeGoal);
    });
}

function showOnboarding() {
    const savedGoal = getPrayerGoalMinutes();
    const savedName = getUserName();

    onboardingNameInput.value = savedName;
    setOnboardingPrayerGoal(savedGoal);
    showOnboardingStep(1);
    onboardingOverlay.classList.remove("hidden");
    onboardingNameInput.focus();
}

function hideOnboarding() {
    onboardingOverlay.classList.add("hidden");
}

function completeOnboarding() {
    const name = onboardingNameInput.value.trim() || "Discípulo";
    const goal = Math.min(180, Math.max(1, Number(onboardingPrayerGoalInput.value) || 15));

    localStorage.setItem("userName", name);
    localStorage.setItem("prayerGoalMinutes", String(goal));
    localStorage.setItem("onboardingCompleted", "true");

    hideOnboarding();
    bootApp();
}

function setupOnboarding() {
    onboardingNext1.addEventListener("click", () => {
        const name = onboardingNameInput.value.trim();

        if (name.length < 2) {
            alert("Digite seu nome para continuar (mínimo 2 caracteres).");
            onboardingNameInput.focus();
            return;
        }

        showOnboardingStep(2);
    });

    onboardingBack2.addEventListener("click", () => {
        showOnboardingStep(1);
        onboardingNameInput.focus();
    });

    onboardingNext2.addEventListener("click", () => {
        showOnboardingStep(3);
        onboardingPrayerGoalInput.focus();
    });

    onboardingBack3.addEventListener("click", () => {
        showOnboardingStep(2);
    });

    onboardingFinish.addEventListener("click", completeOnboarding);

    onboardingGoalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setOnboardingPrayerGoal(button.dataset.goal);
        });
    });

    onboardingPrayerGoalInput.addEventListener("input", () => {
        const goal = Number(onboardingPrayerGoalInput.value);

        onboardingGoalButtons.forEach((button) => {
            button.classList.toggle("active", Number(button.dataset.goal) === goal);
        });
    });

    onboardingNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            onboardingNext1.click();
        }
    });

    onboardingPrayerGoalInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            onboardingFinish.click();
        }
    });
}

function editUserName() {
    const currentName = getUserName() || "Discípulo";
    const newName = prompt("Como você quer ser chamado?", currentName)?.trim();

    if (newName) {
        localStorage.setItem("userName", newName);
        renderWelcome();
    }
}

function renderWelcome() {
    const name = getUserName() || "Discípulo";
    const weekday = WEEKDAYS[new Date().getDay()];

    welcomeName.textContent = `${greetingElement.textContent}, ${name} 👋`;
    welcomeDay.textContent = `Hoje é ${weekday}`;
}

function hashString(value) {
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = ((hash << 5) - hash) + value.charCodeAt(index);
        hash |= 0;
    }

    return Math.abs(hash);
}

function getTodayMomentSelection() {
    const saved = JSON.parse(localStorage.getItem("todayMoment"));

    if (saved?.date === today) {
        return saved;
    }

    return null;
}

function getMomentById(momentId) {
    return lifeMoments.find((moment) => moment.id === momentId);
}

function pickVariantIndex(momentId, userText) {
    const moment = getMomentById(momentId);
    const seed = `${getUserName()}-${today}-${userText}`;

    return hashString(seed) % moment.devotionals.length;
}

function detectMomentFromText(userText) {
    const lowerText = userText.toLowerCase();
    let bestMatch = getMomentById("geral");
    let bestScore = 0;

    lifeMoments.forEach((moment) => {
        if (moment.id === "geral") {
            return;
        }

        let score = 0;

        moment.keywords.forEach((keyword) => {
            if (lowerText.includes(keyword)) {
                score += 1;
            }
        });

        if (score > bestScore) {
            bestScore = score;
            bestMatch = moment;
        }
    });

    return bestMatch;
}

function buildPersonalizedDevotional(baseDevotional, userText) {
    const excerpt = truncateText(userText, 100);

    return {
        ...baseDevotional,
        summary: `Você compartilhou:\n"${excerpt}"\n\n${baseDevotional.summary}`,
        application: `Pensando no que você descreveu hoje: ${baseDevotional.application}`,
        prayer: `Senhor, tu conheces o que estou vivendo: ${excerpt}. ${baseDevotional.prayer}`,
        challenge: baseDevotional.challenge,
        userText,
        personalized: true
    };
}

function getTodayDevotional() {
    const selection = getTodayMomentSelection();

    if (selection?.userText) {
        const moment = getMomentById(selection.momentId);
        const baseDevotional = moment.devotionals[selection.variantIndex];

        return {
            ...buildPersonalizedDevotional(baseDevotional, selection.userText),
            momentId: selection.momentId
        };
    }

    const startDate = new Date("2026-07-01");
    const currentDate = new Date(`${today}T00:00:00`);
    const differenceInDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const devotionalIndex = Math.abs(differenceInDays) % devotionals.length;

    return {
        ...devotionals[devotionalIndex],
        personalized: false
    };
}

function renderMomentHints() {
    momentHints.innerHTML = "";

    momentHintExamples.forEach((hint) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "moment-hint";
        button.textContent = hint;
        button.addEventListener("click", () => {
            momentInput.value = hint;
            momentInput.focus();
        });
        momentHints.appendChild(button);
    });
}

function showMomentOverlay(prefillText = "") {
    momentOverlay.classList.remove("hidden");
    momentInput.value = prefillText;
    renderMomentHints();
    momentInput.focus();
}

function hideMomentOverlay() {
    momentOverlay.classList.add("hidden");
}

function hasTodayMomentChoice() {
    const selection = getTodayMomentSelection();
    return Boolean(selection?.userText || selection?.skipped);
}

function skipMomentOverlay() {
    localStorage.setItem("todayMoment", JSON.stringify({
        date: today,
        skipped: true
    }));

    hideMomentOverlay();
    loadDevotional();
    updateDashboard();
    updateDevotionalVisibility();
    updateChangeMomentButtonLabel();
}

function generateDevotionalFromInput() {
    const userText = momentInput.value.trim();

    if (userText.length < 8) {
        alert("Escreva um pouco mais sobre como está seu dia (mínimo 8 caracteres).");
        momentInput.focus();
        return;
    }

    const matchedMoment = detectMomentFromText(userText);
    const variantIndex = pickVariantIndex(matchedMoment.id, userText);

    localStorage.setItem("todayMoment", JSON.stringify({
        date: today,
        userText,
        momentId: matchedMoment.id,
        variantIndex,
        skipped: false
    }));

    hideMomentOverlay();
    loadDevotional();
    updateDashboard();
    updateDevotionalVisibility();
    updateChangeMomentButtonLabel();
}

function changeMoment() {
    if (isTodayCompleted()) {
        const shouldChange = confirm(
            "Você já concluiu o devocional de hoje. Reescrever como está vai gerar um novo devocional. Deseja continuar?"
        );

        if (!shouldChange) {
            return;
        }
    }

    const previousText = getTodayMomentSelection()?.userText || "";
    localStorage.removeItem("todayMoment");
    showMomentOverlay(previousText);
    loadDevotionalPlaceholder();
}

function loadDevotionalPlaceholder() {
    devotionalLabel.textContent = "Aguardando o que você compartilhar";
    devotionalMomentBadge.hidden = true;
    titleElement.textContent = "Como está seu dia?";
    verseElement.textContent = "Escreva com suas palavras para montar seu devocional.";
    summaryElement.textContent = "Não usamos frases prontas. O que você escrever guia a leitura de hoje.";
    contextElement.textContent = "";
    textElement.className = "bible-passage muted";
    textElement.textContent = "";
    applicationElement.textContent = "";
    prayerElement.textContent = "";
    challengeElement.textContent = "";

    todayReading.textContent = "—";
    readingTime.textContent = "—";
    todayMission.textContent = "Conte como você está para começar";
    aiContext.textContent = "Escreva como está seu dia para personalizar o devocional.";
}

function initMomentFlow() {
    changeMomentButton.addEventListener("click", changeMoment);
    generateDevotionalButton.addEventListener("click", generateDevotionalFromInput);
    skipMomentButton.addEventListener("click", skipMomentOverlay);

    if (!hasTodayMomentChoice()) {
        showMomentOverlay();
        loadDevotionalPlaceholder();
        return;
    }

    loadDevotional();
    updateChangeMomentButtonLabel();
}

function updateChangeMomentButtonLabel() {
    const selection = getTodayMomentSelection();

    if (selection?.skipped) {
        changeMomentButton.textContent = "Personalizar meu devocional";
        return;
    }

    changeMomentButton.textContent = "Reescrever como estou hoje";
}

function getCurrentPlan() {
    return JSON.parse(localStorage.getItem("currentPlan")) || null;
}

function getPlanCatalogItem(planId) {
    return plans.find((plan) => plan.id === planId);
}

function getPlanDayIndex(currentPlan) {
    if (!currentPlan?.startedAt) {
        return 0;
    }

    const dayIndex = daysBetween(currentPlan.startedAt, today);
    return Math.max(0, Math.min(dayIndex, currentPlan.days - 1));
}

function getTodayReadingLabel() {
    const currentPlan = getCurrentPlan();

    if (currentPlan?.readings?.length) {
        const dayIndex = getPlanDayIndex(currentPlan);
        return currentPlan.readings[dayIndex];
    }

    return getTodayDevotional().verse;
}

function getCompletedDays() {
    return JSON.parse(localStorage.getItem("completedDays")) || [];
}

function getJournals() {
    return JSON.parse(localStorage.getItem("journals")) || [];
}

function getPrayers() {
    return JSON.parse(localStorage.getItem("prayers")) || [];
}

function getReflections() {
    return JSON.parse(localStorage.getItem("reflections")) || {};
}

function getAiHistory() {
    return JSON.parse(localStorage.getItem("aiHistory")) || [];
}

function getSpiritualProgress() {
    return JSON.parse(localStorage.getItem("spiritualProgress")) || [];
}

function isTopicCompleted(topicId) {
    return getSpiritualProgress().some((item) => item.topicId === topicId);
}

function getActiveSpiritualLevel() {
    let fallback = spiritualLevels[0];

    for (const level of spiritualLevels) {
        if (!isLevelAccessible(level) || level.topics.length === 0) {
            continue;
        }

        fallback = level;
        const progress = getSpiritualLevelProgress(level);

        if (progress.percentage < 100) {
            return level;
        }
    }

    return fallback;
}

function isLevelAccessible(level) {
    if (level.level === 1) {
        return true;
    }

    const previousLevel = spiritualLevels.find((item) => item.level === level.level - 1);

    if (!previousLevel?.topics?.length) {
        return false;
    }

    return getSpiritualLevelProgress(previousLevel).percentage === 100;
}

function getSpiritualLevelProgress(level) {
    if (!level?.topics?.length) {
        return { completed: 0, total: 0, percentage: 0 };
    }

    const completed = level.topics.filter((topic) => isTopicCompleted(topic.id)).length;
    const total = level.topics.length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
}

function completeSpiritualTopic(topicId) {
    if (isTopicCompleted(topicId)) {
        return;
    }

    const progress = getSpiritualProgress();

    progress.push({
        topicId,
        completedAt: today
    });

    localStorage.setItem("spiritualProgress", JSON.stringify(progress));
    renderSpiritualJourney();
    updateDashboard();
    renderHistory();
}

function renderSpiritualJourney() {
    const activeLevel = getActiveSpiritualLevel();
    const { completed, total, percentage } = getSpiritualLevelProgress(activeLevel);

    spiritualLevelDescription.textContent = activeLevel.description;
    spiritualProgressFill.style.width = `${percentage}%`;
    spiritualProgressText.textContent = `${completed}/${total} tópicos concluídos · ${percentage}%`;

    spiritualLevelsList.innerHTML = "";

    spiritualLevels.forEach((level) => {
        const levelCard = document.createElement("section");
        levelCard.classList.add("card", "spiritual-level");

        const previousLevel = spiritualLevels.find((item) => item.level === level.level - 1);
        const isLocked = !isLevelAccessible(level);

        if (isLocked) {
            levelCard.classList.add("locked");
        }

        const header = document.createElement("div");
        header.classList.add("spiritual-level-header");

        const title = document.createElement("h4");
        title.textContent = `Nível ${level.level} — ${level.title}`;

        const badge = document.createElement("span");
        badge.classList.add("spiritual-level-badge");

        if (isLocked) {
            badge.textContent = "🔒 Bloqueado";
        } else if (level.topics.length === 0) {
            badge.textContent = "Em breve";
        } else {
            const progress = getSpiritualLevelProgress(level);
            badge.textContent = `${progress.completed}/${progress.total}`;
        }

        header.appendChild(title);
        header.appendChild(badge);
        levelCard.appendChild(header);

        const description = document.createElement("p");
        description.classList.add("muted");
        description.textContent = level.description;
        levelCard.appendChild(description);

        if (!isLocked && level.topics.length > 0) {
            level.topics.forEach((topic) => {
                const topicCard = document.createElement("article");
                topicCard.classList.add("spiritual-topic");

                if (isTopicCompleted(topic.id)) {
                    topicCard.classList.add("completed");
                }

                const topicHeader = document.createElement("div");
                topicHeader.classList.add("spiritual-topic-header");

                const topicTitleWrap = document.createElement("div");
                const topicTitle = document.createElement("h5");
                topicTitle.textContent = topic.title;

                const topicVerse = document.createElement("p");
                topicVerse.classList.add("spiritual-topic-verse");
                topicVerse.textContent = topic.verse;

                topicTitleWrap.appendChild(topicTitle);
                topicTitleWrap.appendChild(topicVerse);

                const topicStatus = document.createElement("span");
                topicStatus.classList.add("spiritual-topic-status");
                topicStatus.textContent = isTopicCompleted(topic.id) ? "✔ Concluído" : "Pendente";

                topicHeader.appendChild(topicTitleWrap);
                topicHeader.appendChild(topicStatus);
                topicCard.appendChild(topicHeader);

                const topicSummary = document.createElement("p");
                topicSummary.textContent = topic.summary;
                topicCard.appendChild(topicSummary);

                const topicBody = document.createElement("div");
                topicBody.classList.add("spiritual-topic-body");

                const studyTitle = document.createElement("strong");
                studyTitle.textContent = "Estudo";
                const studyText = document.createElement("p");
                studyText.textContent = topic.study;

                const applicationTitle = document.createElement("strong");
                applicationTitle.textContent = "Aplicação";
                const applicationText = document.createElement("p");
                applicationText.textContent = topic.application;

                const challengeTitle = document.createElement("strong");
                challengeTitle.textContent = "Desafio";
                const challengeText = document.createElement("p");
                challengeText.textContent = topic.challenge;

                topicBody.appendChild(studyTitle);
                topicBody.appendChild(studyText);
                topicBody.appendChild(applicationTitle);
                topicBody.appendChild(applicationText);
                topicBody.appendChild(challengeTitle);
                topicBody.appendChild(challengeText);
                topicCard.appendChild(topicBody);

                const actions = document.createElement("div");
                actions.classList.add("spiritual-topic-actions");

                const readButton = document.createElement("button");
                readButton.type = "button";
                readButton.classList.add("btn-secondary");
                readButton.textContent = "Ler estudo";
                readButton.addEventListener("click", () => {
                    topicBody.classList.toggle("open");
                    readButton.textContent = topicBody.classList.contains("open")
                        ? "Ocultar estudo"
                        : "Ler estudo";
                });

                const completeButton = document.createElement("button");
                completeButton.type = "button";

                if (isTopicCompleted(topic.id)) {
                    completeButton.textContent = "Concluído";
                    completeButton.classList.add("completed");
                    completeButton.disabled = true;
                } else {
                    completeButton.textContent = "Marcar como concluído";
                    completeButton.addEventListener("click", () => completeSpiritualTopic(topic.id));
                }

                actions.appendChild(readButton);
                actions.appendChild(completeButton);
                topicCard.appendChild(actions);
                levelCard.appendChild(topicCard);
            });
        } else if (isLocked) {
            const lockedText = document.createElement("p");
            lockedText.classList.add("muted");
            lockedText.textContent = "Conclua o nível anterior para desbloquear esta etapa.";
            levelCard.appendChild(lockedText);
        }

        spiritualLevelsList.appendChild(levelCard);
    });
}

function updateSpiritualDashboard() {
    const activeLevel = getActiveSpiritualLevel();
    const { completed, total, percentage } = getSpiritualLevelProgress(activeLevel);
    const nextLevel = spiritualLevels.find((level) => level.level === activeLevel.level + 1);

    spiritualJourneyPreview.textContent = `${completed}/${total} tópicos`;
    spiritualJourneyLevel.textContent = `Nível ${activeLevel.level} — ${activeLevel.title}`;

    if (percentage === 100 && total > 0) {
        spiritualJourneyPreview.textContent = `Nível ${activeLevel.level} completo!`;

        if (nextLevel?.topics.length) {
            spiritualJourneyLevel.textContent = `Agora: ${nextLevel.title}`;
        } else if (nextLevel) {
            spiritualJourneyLevel.textContent = `Próximo: ${nextLevel.title} (em breve)`;
        } else {
            spiritualJourneyLevel.textContent = "Jornada concluída";
        }
    }
}

function openDevotionalView() {
    if (!hasTodayMomentChoice()) {
        showMomentOverlay();
        return;
    }

    devotionalContent.classList.remove("hidden");
    devotionalToggleSection.classList.add("hidden");
    devotionalContent.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateDevotionalVisibility() {
    const hasChoice = hasTodayMomentChoice();
    const completed = isTodayCompleted();

    if (!hasChoice) {
        devotionalContent.classList.add("hidden");
        devotionalToggleSection.classList.remove("hidden");
        openDevotionalButton.textContent = "Começar devocional de hoje";
        return;
    }

    if (completed) {
        devotionalContent.classList.remove("hidden");
        devotionalToggleSection.classList.add("hidden");
        return;
    }

    devotionalContent.classList.add("hidden");
    devotionalToggleSection.classList.remove("hidden");
    openDevotionalButton.textContent = "Começar devocional de hoje";
}

function setupDevotionalToggle() {
    openDevotionalButton.addEventListener("click", openDevotionalView);
}

function setupTabLinks() {
    document.querySelectorAll("[data-tab-link]").forEach((element) => {
        element.addEventListener("click", () => {
            const tabId = element.dataset.tabLink;
            const targetButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);

            if (targetButton) {
                targetButton.click();
            }

            if (tabId === "bible") {
                loadTodayBibleReading();
            }
        });
    });
}

function getTodayBibleReference() {
    const currentPlan = getCurrentPlan();

    if (currentPlan?.readings?.length) {
        return getTodayReadingLabel();
    }

    return getTodayDevotional().verse;
}

async function displayBiblePassage(reference, titleElement, contentElement, highlightReference = reference) {
    titleElement.textContent = reference;
    contentElement.className = "bible-passage bible-loading";
    contentElement.textContent = "Carregando Escrituras...";

    try {
        const data = await fetchPassage(reference);
        titleElement.textContent = data.reference || reference;
        contentElement.className = "bible-passage";
        contentElement.dataset.currentReference = data.reference || reference;
        contentElement.innerHTML = renderVersesHtml(data, {
            highlightedVerses: getHighlightedVerses(highlightReference),
            interactive: true,
            favoriteReferences: getFavoriteReferenceSet()
        });
        attachVerseFavoriteHandlers(contentElement);
    } catch (error) {
        contentElement.className = "bible-passage bible-error";
        contentElement.textContent = "Não foi possível carregar o texto bíblico. Verifique sua conexão.";
    }
}

function getFavoriteVerses() {
    return JSON.parse(localStorage.getItem("favoriteVerses")) || [];
}

function getFavoriteReferenceSet() {
    return new Set(getFavoriteVerses().map((item) => item.reference));
}

function isVerseFavorited(reference) {
    return getFavoriteReferenceSet().has(reference);
}

function buildShareVerseText(reference, text) {
    return `"${text}" — ${reference} (${BIBLE_VERSION_LABEL})\n\nCompartilhado via Discípulo`;
}

async function shareVerse(reference, text) {
    const shareText = buildShareVerseText(reference, text);

    if (navigator.share) {
        try {
            await navigator.share({
                title: reference,
                text: shareText
            });
            return;
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }
        }
    }

    try {
        await navigator.clipboard.writeText(shareText);
        alert("Versículo copiado! Cole onde quiser compartilhar.");
    } catch {
        window.prompt("Copie o versículo:", shareText);
    }
}

function toggleFavoriteVerse(reference, text) {
    const favorites = getFavoriteVerses();
    const existingIndex = favorites.findIndex((item) => item.reference === reference);

    if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
    } else {
        favorites.unshift({
            id: Date.now(),
            reference,
            text,
            savedAt: new Date().toISOString()
        });
    }

    localStorage.setItem("favoriteVerses", JSON.stringify(favorites));
    renderFavoriteVerses();
    refreshInteractiveBibleViews();
}

function removeFavoriteVerse(id) {
    const favorites = getFavoriteVerses().filter((item) => item.id !== id);
    localStorage.setItem("favoriteVerses", JSON.stringify(favorites));
    renderFavoriteVerses();
    refreshInteractiveBibleViews();
}

function attachVerseFavoriteHandlers(container) {
    container.querySelectorAll(".verse-favorite-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleFavoriteVerse(button.dataset.reference, button.dataset.text);
        });
    });

    container.querySelectorAll(".verse-share-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            shareVerse(button.dataset.reference, button.dataset.text);
        });
    });
}

function refreshInteractiveBibleViews() {
    if (biblePassageText.dataset.currentReference) {
        displayBiblePassage(
            biblePassageText.dataset.currentReference,
            biblePassageTitle,
            biblePassageText,
            biblePassageText.dataset.currentReference
        );
    }

    if (hasTodayMomentChoice()) {
        loadDevotional();
    }
}

function renderFavoriteVerses() {
    const favorites = getFavoriteVerses();
    favoriteVersesList.innerHTML = "";

    if (favorites.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhum versículo favorito ainda. Toque em ☆ ao lado de um versículo.";
        favoriteVersesList.appendChild(item);
        return;
    }

    favorites.forEach((favorite) => {
        const item = document.createElement("li");
        item.classList.add("favorite-verse-item");

        const title = document.createElement("strong");
        title.textContent = favorite.reference;

        const text = document.createElement("p");
        text.textContent = favorite.text;

        const actions = document.createElement("div");
        actions.classList.add("bible-item-actions");

        const openButton = document.createElement("button");
        openButton.type = "button";
        openButton.classList.add("btn-secondary");
        openButton.textContent = "Abrir";
        openButton.addEventListener("click", () => openBibleTabWithReference(favorite.reference));

        const shareButton = document.createElement("button");
        shareButton.type = "button";
        shareButton.classList.add("btn-secondary");
        shareButton.textContent = "Compartilhar";
        shareButton.addEventListener("click", () => shareVerse(favorite.reference, favorite.text));

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", () => removeFavoriteVerse(favorite.id));

        actions.appendChild(openButton);
        actions.appendChild(shareButton);
        actions.appendChild(removeButton);
        item.appendChild(title);
        item.appendChild(text);
        item.appendChild(actions);
        favoriteVersesList.appendChild(item);
    });
}

function looksLikeReference(query) {
    return /\d/.test(query) && parseReference(query);
}

const BIBLE_SEARCH_MAX_RESULTS = 30;
let bibleSearchToken = 0;

function setBibleSearchLoading(isLoading) {
    bibleSearchButton.disabled = isLoading;
    bibleSearchCancelButton.classList.toggle("hidden", !isLoading);
    bibleSearchButton.parentElement.classList.toggle("bible-search-actions--dual", isLoading);
}

function updateBibleSearchHint() {
    if (bibleSearchAllBooks.checked) {
        bibleSearchHint.textContent = "A busca percorre todos os 66 livros (até 30 resultados). Referências abrem direto no leitor.";
        return;
    }

    bibleSearchHint.textContent = "Digite uma referência ou uma palavra para buscar no livro selecionado abaixo.";
}

function createBibleSearchResultItem(result) {
    const item = document.createElement("li");
    item.classList.add("bible-search-item");

    const title = document.createElement("strong");
    title.textContent = result.reference;

    const text = document.createElement("p");
    text.textContent = result.text;

    const actions = document.createElement("div");
    actions.classList.add("bible-item-actions");

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.classList.add("btn-secondary");
    openButton.textContent = "Abrir";
    openButton.addEventListener("click", () => openBibleTabWithReference(result.reference));

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.textContent = isVerseFavorited(result.reference) ? "★ Favorito" : "☆ Favoritar";
    favoriteButton.addEventListener("click", () => {
        toggleFavoriteVerse(result.reference, result.text);
        favoriteButton.textContent = isVerseFavorited(result.reference) ? "★ Favorito" : "☆ Favoritar";
    });

    const shareButton = document.createElement("button");
    shareButton.type = "button";
    shareButton.classList.add("btn-secondary");
    shareButton.textContent = "Compartilhar";
    shareButton.addEventListener("click", () => shareVerse(result.reference, result.text));

    actions.appendChild(openButton);
    actions.appendChild(favoriteButton);
    actions.appendChild(shareButton);
    item.appendChild(title);
    item.appendChild(text);
    item.appendChild(actions);

    return item;
}

function renderBibleSearchResults(results, emptyMessage) {
    bibleSearchResults.innerHTML = "";

    if (results.length === 0) {
        const item = document.createElement("li");
        item.classList.add("bible-search-item");
        item.textContent = emptyMessage;
        bibleSearchResults.appendChild(item);
        return;
    }

    results.forEach((result) => {
        bibleSearchResults.appendChild(createBibleSearchResultItem(result));
    });
}

async function searchKeywordInBook(bookName, keyword, results, searchToken, updateProgress) {
    const book = getBookByName(bookName);

    if (!book) {
        return;
    }

    for (let chapter = 1; chapter <= book.chapters; chapter += 1) {
        if (searchToken !== bibleSearchToken || results.length >= BIBLE_SEARCH_MAX_RESULTS) {
            return;
        }

        updateProgress(bookName, chapter, book.chapters, results.length);

        try {
            const data = await fetchPassage(`${bookName} ${chapter}`);

            data.verses.forEach((verse) => {
                const verseText = cleanVerseText(verse.text);

                if (verseText.toLowerCase().includes(keyword) && results.length < BIBLE_SEARCH_MAX_RESULTS) {
                    results.push({
                        reference: buildVerseReference(data.book_name || bookName, chapter, verse.verse),
                        text: verseText
                    });
                }
            });
        } catch (error) {
            continue;
        }
    }
}

function cancelBibleSearch() {
    bibleSearchToken += 1;
    setBibleSearchLoading(false);

    const item = document.createElement("li");
    item.classList.add("bible-search-item");
    item.textContent = "Busca cancelada.";
    bibleSearchResults.innerHTML = "";
    bibleSearchResults.appendChild(item);
}

async function searchBible() {
    const query = bibleSearchInput.value.trim();

    if (!query) {
        alert("Digite uma palavra ou referência para buscar.");
        return;
    }

    bibleSearchResults.innerHTML = "";

    if (looksLikeReference(query)) {
        const reference = query;
        const item = document.createElement("li");
        item.classList.add("bible-search-item");
        item.innerHTML = `<strong>${escapeHtml(reference)}</strong><p>Referência encontrada. Abrindo passagem...</p>`;
        bibleSearchResults.appendChild(item);
        openBibleTabWithReference(reference);
        return;
    }

    const searchAllBooks = bibleSearchAllBooks.checked;
    const bookName = bibleBookSelect.value;
    const keyword = query.toLowerCase();
    const results = [];

    bibleSearchToken += 1;
    const searchToken = bibleSearchToken;

    const loadingItem = document.createElement("li");
    loadingItem.classList.add("bible-search-item");
    bibleSearchResults.appendChild(loadingItem);
    setBibleSearchLoading(true);

    const updateProgress = (currentBook, chapter, totalChapters, foundCount) => {
        if (searchAllBooks) {
            loadingItem.textContent = `Buscando "${query}" em toda a Bíblia... ${currentBook} ${chapter}/${totalChapters} · ${foundCount} resultado(s)`;
            return;
        }

        loadingItem.textContent = `Buscando "${query}" em ${currentBook}... capítulo ${chapter}/${totalChapters}`;
    };

    if (searchAllBooks) {
        for (const book of BIBLE_BOOKS) {
            if (searchToken !== bibleSearchToken || results.length >= BIBLE_SEARCH_MAX_RESULTS) {
                break;
            }

            await searchKeywordInBook(book.name, keyword, results, searchToken, updateProgress);
        }
    } else {
        await searchKeywordInBook(bookName, keyword, results, searchToken, updateProgress);
    }

    if (searchToken !== bibleSearchToken) {
        return;
    }

    setBibleSearchLoading(false);

    const emptyMessage = searchAllBooks
        ? `Nenhum resultado para "${query}" na Bíblia.`
        : `Nenhum resultado para "${query}" em ${bookName}.`;

    renderBibleSearchResults(results, emptyMessage);
}

function syncBibleSelectors(reference) {
    const parsed = parseReference(reference);

    if (!parsed) {
        return;
    }

    populateBibleSelectors(parsed.book, parsed.chapter);
}

function populateBibleSelectors(selectedBook = "João", selectedChapter = 1) {
    bibleBookSelect.innerHTML = "";

    BIBLE_BOOKS.forEach((book) => {
        const option = document.createElement("option");
        option.value = book.name;
        option.textContent = book.name;

        if (book.name === selectedBook) {
            option.selected = true;
        }

        bibleBookSelect.appendChild(option);
    });

    updateBibleChapterOptions(selectedBook, selectedChapter);
}

function updateBibleChapterOptions(bookName, selectedChapter = 1) {
    const book = getBookByName(bookName);

    if (!book) {
        return;
    }

    bibleChapterSelect.innerHTML = "";

    for (let chapter = 1; chapter <= book.chapters; chapter += 1) {
        const option = document.createElement("option");
        option.value = chapter;
        option.textContent = `Cap. ${chapter}`;

        if (chapter === selectedChapter) {
            option.selected = true;
        }

        bibleChapterSelect.appendChild(option);
    }
}

async function loadBibleFromSelectors() {
    const book = bibleBookSelect.value;
    const chapter = bibleChapterSelect.value;
    const reference = `${book} ${chapter}`;

    await displayBiblePassage(reference, biblePassageTitle, biblePassageText);
}

async function loadTodayBibleReading() {
    const reference = getTodayBibleReference();
    syncBibleSelectors(reference);
    await displayBiblePassage(reference, biblePassageTitle, biblePassageText, reference);
}

function openBibleTabWithReference(reference) {
    const tabButton = document.querySelector('.tab-button[data-tab="bible"]');

    if (tabButton) {
        tabButton.click();
    }

    syncBibleSelectors(reference);
    displayBiblePassage(reference, biblePassageTitle, biblePassageText, reference);
}

function setupBible() {
    if (bibleVersionLabel) {
        bibleVersionLabel.textContent = `Versão: ${BIBLE_VERSION_LABEL}`;
    }

    populateBibleSelectors();
    renderFavoriteVerses();

    bibleBookSelect.addEventListener("change", () => {
        updateBibleChapterOptions(bibleBookSelect.value, 1);
    });

    loadBibleButton.addEventListener("click", loadBibleFromSelectors);
    loadTodayReadingButton.addEventListener("click", loadTodayBibleReading);
    bibleSearchButton.addEventListener("click", searchBible);
    bibleSearchCancelButton.addEventListener("click", cancelBibleSearch);
    bibleSearchAllBooks.addEventListener("change", updateBibleSearchHint);
    updateBibleSearchHint();

    bibleSearchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchBible();
        }
    });

    openBibleFromDevotional.addEventListener("click", () => {
        const reference = getTodayDevotional().verse;
        openBibleTabWithReference(reference);
    });
}

function getPrayerSessions() {
    return JSON.parse(localStorage.getItem("prayerSessions")) || [];
}

function getPrayerGoalMinutes() {
    const savedGoal = Number(localStorage.getItem("prayerGoalMinutes"));
    return savedGoal > 0 ? savedGoal : 15;
}

function getTodayPrayerSeconds() {
    return getPrayerSessions()
        .filter((session) => session.date === today)
        .reduce((total, session) => total + session.durationSeconds, 0);
}

function formatTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatMinutesLabel(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
        return `${seconds}s`;
    }

    if (seconds === 0) {
        return `${minutes} min`;
    }

    return `${minutes} min ${seconds}s`;
}

function getCurrentTimerSeconds() {
    if (!prayerTimer.running || !prayerTimer.startedAt) {
        return prayerTimer.elapsedSeconds;
    }

    const runningSeconds = Math.floor((Date.now() - prayerTimer.startedAt) / 1000);
    return prayerTimer.elapsedSeconds + runningSeconds;
}

function updateTimerDisplay() {
    const currentSeconds = getCurrentTimerSeconds();
    const savedTodaySeconds = getTodayPrayerSeconds();
    const goalSeconds = getPrayerGoalMinutes() * 60;
    const totalTodaySeconds = savedTodaySeconds + (prayerTimer.running || prayerTimer.elapsedSeconds > 0 ? currentSeconds : 0);
    const progress = goalSeconds > 0 ? Math.min(Math.round((totalTodaySeconds / goalSeconds) * 100), 100) : 0;

    timerDisplay.textContent = formatTimer(currentSeconds);
    timerSummary.textContent = `Hoje: ${formatMinutesLabel(totalTodaySeconds)} · Meta: ${getPrayerGoalMinutes()} min`;
    prayerGoalFill.style.width = `${progress}%`;

    todayPrayerTime.textContent = formatMinutesLabel(totalTodaySeconds);
    prayerGoalPreview.textContent = `Meta: ${getPrayerGoalMinutes()} min · ${progress}%`;
}

function setTimerButtonsState() {
    const hasElapsed = getCurrentTimerSeconds() > 0;

    startTimerButton.textContent = !prayerTimer.running && prayerTimer.elapsedSeconds > 0
        ? "Retomar"
        : "Iniciar";
    startTimerButton.disabled = prayerTimer.running;
    pauseTimerButton.disabled = !prayerTimer.running;
    stopTimerButton.disabled = !prayerTimer.running && !hasElapsed;
}

function startPrayerTimer() {
    if (prayerTimer.running) {
        return;
    }

    prayerTimer.running = true;
    prayerTimer.startedAt = Date.now();

    prayerTimer.intervalId = window.setInterval(() => {
        updateTimerDisplay();
    }, 1000);

    setTimerButtonsState();
    updateTimerDisplay();
}

function pausePrayerTimer() {
    if (!prayerTimer.running) {
        return;
    }

    prayerTimer.elapsedSeconds = getCurrentTimerSeconds();
    prayerTimer.running = false;
    prayerTimer.startedAt = null;

    if (prayerTimer.intervalId) {
        clearInterval(prayerTimer.intervalId);
        prayerTimer.intervalId = null;
    }

    setTimerButtonsState();
    updateTimerDisplay();
}

function resetPrayerTimer() {
    prayerTimer.running = false;
    prayerTimer.startedAt = null;
    prayerTimer.elapsedSeconds = 0;

    if (prayerTimer.intervalId) {
        clearInterval(prayerTimer.intervalId);
        prayerTimer.intervalId = null;
    }

    setTimerButtonsState();
    updateTimerDisplay();
}

function savePrayerTimerSession() {
    const durationSeconds = getCurrentTimerSeconds();

    if (durationSeconds < 5) {
        alert("Ore pelo menos alguns segundos antes de salvar.");
        return;
    }

    const sessions = getPrayerSessions();

    sessions.unshift({
        id: Date.now(),
        date: today,
        durationSeconds,
        savedAt: new Date().toISOString()
    });

    localStorage.setItem("prayerSessions", JSON.stringify(sessions));

    resetPrayerTimer();
    renderPrayerSessions();
    updateDashboard();
    renderHistory();
}

function savePrayerGoal() {
    const goal = Number(prayerGoalInput.value);

    if (!goal || goal < 1 || goal > 180) {
        alert("Informe uma meta entre 1 e 180 minutos.");
        return;
    }

    localStorage.setItem("prayerGoalMinutes", String(goal));
    updateTimerDisplay();
    updateDashboard();
}

function renderPrayerSessions() {
    const sessions = getPrayerSessions().filter((session) => session.date === today);

    prayerSessionList.innerHTML = "";

    if (sessions.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhum tempo de oração salvo hoje.";
        prayerSessionList.appendChild(item);
        return;
    }

    sessions.forEach((session) => {
        const item = document.createElement("li");
        const time = new Date(session.savedAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });

        item.textContent = `${time} — ${formatMinutesLabel(session.durationSeconds)}`;
        prayerSessionList.appendChild(item);
    });
}

function setupPrayerTimer() {
    prayerGoalInput.value = getPrayerGoalMinutes();
    setTimerButtonsState();
    updateTimerDisplay();
    renderPrayerSessions();

    startTimerButton.addEventListener("click", startPrayerTimer);
    pauseTimerButton.addEventListener("click", pausePrayerTimer);
    stopTimerButton.addEventListener("click", savePrayerTimerSession);
    saveGoalButton.addEventListener("click", savePrayerGoal);
}

function getStreak() {
    const completedDays = new Set(getCompletedDays());

    if (completedDays.size === 0) {
        return 0;
    }

    let streak = 0;
    const cursor = new Date(`${today}T00:00:00`);

    if (!completedDays.has(today)) {
        cursor.setDate(cursor.getDate() - 1);
    }

    while (true) {
        const dateString = cursor.toISOString().split("T")[0];

        if (!completedDays.has(dateString)) {
            break;
        }

        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
}

function getPlanProgress(currentPlan) {
    if (!currentPlan) {
        return { completed: 0, total: 0, percentage: 0 };
    }

    const completed = currentPlan.completedDays?.length || 0;
    const total = currentPlan.days || 0;
    const percentage = total > 0 ? Math.min(Math.round((completed / total) * 100), 100) : 0;

    return { completed, total, percentage };
}

async function loadDevotional() {
    const selection = getTodayMomentSelection();

    if (!hasTodayMomentChoice()) {
        loadDevotionalPlaceholder();
        return;
    }

    const devotional = getTodayDevotional();

    if (selection.skipped) {
        devotionalLabel.textContent = "Devocional do dia";
        devotionalMomentBadge.hidden = true;
    } else {
        const userExcerpt = truncateText(selection.userText, 80);
        devotionalLabel.textContent = "Devocional montado para você";
        devotionalMomentBadge.hidden = false;
        devotionalMomentBadge.textContent = `💬 "${userExcerpt}"`;
    }

    titleElement.textContent = devotional.title;
    verseElement.textContent = devotional.verse;
    summaryElement.textContent = devotional.summary;
    contextElement.textContent = devotional.context;
    applicationElement.textContent = devotional.application;
    prayerElement.textContent = devotional.prayer;
    challengeElement.textContent = devotional.challenge;

    todayReading.textContent = getTodayBibleReference();
    readingTime.textContent = `${devotional.minutes} minutos`;
    todayMission.textContent = devotional.challenge;

    if (!selection.skipped) {
        const userExcerpt = truncateText(selection.userText, 80);
        aiContext.textContent = `Você escreveu: "${userExcerpt}" · Devocional: ${devotional.title} — ${devotional.verse}`;
    } else {
        aiContext.textContent = `Devocional: ${devotional.title} — ${devotional.verse}`;
    }

    if (devotionalBibleVersion) {
        devotionalBibleVersion.textContent = BIBLE_VERSION_LABEL;
    }

    textElement.className = "bible-passage bible-loading";
    textElement.textContent = "Carregando Escrituras...";

    try {
        const bibleData = await fetchPassage(devotional.verse);
        textElement.className = "bible-passage";
        textElement.dataset.currentReference = devotional.verse;
        textElement.innerHTML = renderVersesHtml(bibleData, {
            highlightedVerses: getHighlightedVerses(devotional.verse),
            interactive: true,
            favoriteReferences: getFavoriteReferenceSet()
        });
        attachVerseFavoriteHandlers(textElement);
    } catch (error) {
        textElement.className = "bible-passage bible-error";
        textElement.textContent = devotional.text || "Não foi possível carregar o texto bíblico.";
    }

    updateChangeMomentButtonLabel();
}

function isTodayCompleted() {
    return getCompletedDays().includes(today);
}

function saveCurrentPlan(planId) {
    const selectedPlan = getPlanCatalogItem(planId);

    if (!selectedPlan) {
        return;
    }

    const currentPlan = {
        ...selectedPlan,
        startedAt: today,
        completedDays: []
    };

    localStorage.setItem("currentPlan", JSON.stringify(currentPlan));

    renderPlans();
    renderCurrentPlan();
    loadDevotional();
    updateDashboard();
}

function completePlanDay() {
    const currentPlan = getCurrentPlan();

    if (!currentPlan) {
        return;
    }

    if (!currentPlan.completedDays.includes(today)) {
        currentPlan.completedDays.push(today);
        localStorage.setItem("currentPlan", JSON.stringify(currentPlan));
    }

    renderCurrentPlan();
}

function saveCompletedDay() {
    if (!hasTodayMomentChoice()) {
        alert("Escolha como deseja começar o devocional de hoje.");
        showMomentOverlay();
        return;
    }

    if (isTodayCompleted()) {
        return;
    }

    const completedDays = getCompletedDays();
    completedDays.push(today);
    localStorage.setItem("completedDays", JSON.stringify(completedDays));

    completePlanDay();
    updateDashboard();
    renderHistory();
    updateDevotionalVisibility();
}

function saveJournal() {
    const text = journalInput.value.trim();

    if (!text) {
        alert("Escreva uma anotação antes de salvar.");
        return;
    }

    const journals = getJournals();

    journals.unshift({
        date: today,
        text
    });

    localStorage.setItem("journals", JSON.stringify(journals));
    journalInput.value = "";

    updateDashboard();
    renderJournalList();
    renderHistory();
}

function savePrayer() {
    const text = prayerInput.value.trim();

    if (!text) {
        alert("Escreva um pedido antes de salvar.");
        return;
    }

    const prayers = getPrayers();

    prayers.unshift({
        id: Date.now(),
        date: today,
        text,
        answered: false
    });

    localStorage.setItem("prayers", JSON.stringify(prayers));
    prayerInput.value = "";

    renderPrayers();
    updateDashboard();
}

function togglePrayerAnswered(id) {
    const prayers = getPrayers().map((prayer) => {
        if (prayer.id === id) {
            return { ...prayer, answered: !prayer.answered };
        }

        return prayer;
    });

    localStorage.setItem("prayers", JSON.stringify(prayers));
    renderPrayers();
    updateDashboard();
}

function saveReflection(result) {
    const reflections = getReflections();

    reflections[today] = {
        result,
        challenge: getTodayDevotional().challenge,
        savedAt: new Date().toISOString()
    };

    localStorage.setItem("reflections", JSON.stringify(reflections));
    renderReflection();
    renderHistory();
}

function saveAiQuestion(question, answer) {
    const aiHistory = getAiHistory();

    aiHistory.unshift({
        date: today,
        question,
        answer
    });

    localStorage.setItem("aiHistory", JSON.stringify(aiHistory));
}

function truncateText(text, maxLength = 72) {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trim()}...`;
}

function updateDashboard() {
    const completedDays = getCompletedDays();
    const journals = getJournals();
    const currentPlan = getCurrentPlan();
    const streak = getStreak();
    const planProgress = getPlanProgress(currentPlan);
    const latestJournal = journals[0];
    const todayPrayerSeconds = getTodayPrayerSeconds() + (prayerTimer.running || prayerTimer.elapsedSeconds > 0 ? getCurrentTimerSeconds() : 0);
    const goalSeconds = getPrayerGoalMinutes() * 60;
    const prayerProgress = goalSeconds > 0 ? Math.min(Math.round((todayPrayerSeconds / goalSeconds) * 100), 100) : 0;

    streakNumber.textContent = streak;
    streakText.textContent = streak;
    growthDevotionalCount.textContent = completedDays.length;
    growthJournalCount.textContent = journals.length;
    growthPlanPercent.textContent = `${planProgress.percentage}%`;
    growthProgressFill.style.width = `${planProgress.percentage}%`;

    todayPrayerTime.textContent = formatMinutesLabel(todayPrayerSeconds);
    prayerGoalPreview.textContent = `Meta: ${getPrayerGoalMinutes()} min · ${prayerProgress}%`;

    if (latestJournal) {
        const prefix = latestJournal.date === today ? "Hoje" : formatDate(latestJournal.date);
        lastJournalPreview.textContent = `💬 ${prefix}: "${truncateText(latestJournal.text)}"`;
    } else {
        lastJournalPreview.textContent = "";
    }

    updateSpiritualDashboard();
    updateDevotionalVisibility();

    if (isTodayCompleted()) {
        todayStatus.textContent = "Concluído";
        completeButton.textContent = "Devocional concluído hoje";
        completeButton.classList.add("completed");
        completeButton.disabled = true;
    } else {
        todayStatus.textContent = "Pendente";
        completeButton.textContent = "Concluir devocional";
        completeButton.classList.remove("completed");
        completeButton.disabled = false;
    }
}

function renderPlans() {
    const currentPlan = getCurrentPlan();

    plansList.innerHTML = "";

    plans.forEach((plan) => {
        const card = document.createElement("div");
        card.classList.add("plan-card");

        const title = document.createElement("h4");
        title.textContent = plan.title;

        const description = document.createElement("p");
        description.textContent = plan.description;

        const meta = document.createElement("small");
        meta.classList.add("muted");
        meta.textContent = `${plan.days} dias`;

        const button = document.createElement("button");
        button.type = "button";

        if (currentPlan && currentPlan.id === plan.id) {
            button.textContent = "Plano selecionado";
            button.classList.add("completed");
            button.disabled = true;
        } else {
            button.textContent = "Escolher plano";
            button.addEventListener("click", () => saveCurrentPlan(plan.id));
        }

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(meta);
        card.appendChild(button);
        plansList.appendChild(card);
    });
}

function renderCurrentPlan() {
    const currentPlan = getCurrentPlan();

    if (!currentPlan) {
        currentPlanText.textContent = "Nenhum plano selecionado ainda.";
        planProgressFill.style.width = "0%";
        planProgressText.textContent = "0% concluído";
        return;
    }

    const { completed, total, percentage } = getPlanProgress(currentPlan);
    const readingToday = getTodayReadingLabel();

    currentPlanText.textContent = `${currentPlan.title} — ${completed}/${total} dias · Hoje: ${readingToday}`;
    planProgressFill.style.width = `${percentage}%`;
    planProgressText.textContent = `${percentage}% concluído`;
}

function renderPrayers() {
    const prayers = getPrayers();

    prayerList.innerHTML = "";

    if (prayers.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhum pedido de oração ainda.";
        prayerList.appendChild(item);
        return;
    }

    prayers.forEach((prayer) => {
        const item = document.createElement("li");
        item.classList.add("prayer-item");

        const text = document.createElement("span");
        text.textContent = prayer.answered ? `✅ ${prayer.text}` : prayer.text;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = prayer.answered ? "Reabrir" : "Respondida";
        button.addEventListener("click", () => togglePrayerAnswered(prayer.id));

        item.appendChild(text);
        item.appendChild(button);
        prayerList.appendChild(item);
    });
}

function renderJournalList() {
    const journals = getJournals();

    journalList.innerHTML = "";

    if (journals.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhuma anotação ainda.";
        journalList.appendChild(item);
        return;
    }

    journals.slice(0, 10).forEach((journal) => {
        const item = document.createElement("li");
        item.textContent = `${formatDate(journal.date)}: ${journal.text}`;
        journalList.appendChild(item);
    });
}

function renderHistory() {
    const completedDays = getCompletedDays();
    const journals = getJournals();
    const aiHistory = getAiHistory();
    const reflections = getReflections();
    const prayerSessions = getPrayerSessions();
    const spiritualProgress = getSpiritualProgress();

    historyList.innerHTML = "";

    const reflectionEntries = Object.entries(reflections)
        .map(([date, data]) => ({ type: "reflection", date, data }))
        .sort((a, b) => b.date.localeCompare(a.date));

    const hasContent = completedDays.length > 0
        || journals.length > 0
        || aiHistory.length > 0
        || reflectionEntries.length > 0
        || prayerSessions.length > 0
        || spiritualProgress.length > 0;

    if (!hasContent) {
        const item = document.createElement("li");
        item.textContent = "Nenhum registro ainda.";
        historyList.appendChild(item);
        return;
    }

    completedDays.slice().reverse().forEach((day) => {
        const item = document.createElement("li");
        item.textContent = `✅ Devocional concluído em ${formatDate(day)}`;
        historyList.appendChild(item);
    });

    reflectionEntries.forEach(({ date, data }) => {
        const labels = {
            yes: "Viveu o desafio",
            partial: "Viveu parcialmente",
            no: "Ainda não viveu o desafio"
        };

        const item = document.createElement("li");
        item.textContent = `🌙 ${formatDate(date)}: ${labels[data.result] || "Reflexão salva"}`;
        historyList.appendChild(item);
    });

    journals.forEach((journal) => {
        const item = document.createElement("li");
        item.textContent = `📝 ${formatDate(journal.date)}: ${journal.text}`;
        historyList.appendChild(item);
    });

    prayerSessions.slice(0, 5).forEach((session) => {
        const item = document.createElement("li");
        item.textContent = `🙏 ${formatDate(session.date)}: ${formatMinutesLabel(session.durationSeconds)} de oração`;
        historyList.appendChild(item);
    });

    spiritualProgress.slice(0, 5).forEach((entry) => {
        const topic = spiritualLevels
            .flatMap((level) => level.topics)
            .find((item) => item.id === entry.topicId);

        const item = document.createElement("li");
        item.textContent = `🌱 ${formatDate(entry.completedAt)}: ${topic?.title || "Tópico"} concluído`;
        historyList.appendChild(item);
    });

    aiHistory.slice(0, 5).forEach((entry) => {
        const item = document.createElement("li");
        item.textContent = `💬 ${formatDate(entry.date)}: ${entry.question}`;
        historyList.appendChild(item);
    });
}

function renderReflection() {
    const reflections = getReflections();
    const todayReflection = reflections[today];

    reflectionButtons.forEach((button) => {
        button.classList.toggle("active", todayReflection?.result === button.dataset.reflection);
    });

    if (!todayReflection) {
        reflectionStatus.textContent = "";
        return;
    }

    const labels = {
        yes: "Que bom! Continue firme na prática.",
        partial: "Um passo de cada vez. Amanhã é nova chance.",
        no: "Não desanime. A graça de Deus te sustenta amanhã."
    };

    reflectionStatus.textContent = labels[todayReflection.result] || "";
}

function askAi(questionFromChip) {
    const question = (questionFromChip || aiQuestionInput.value).trim();

    if (!question) {
        alert("Digite uma pergunta antes.");
        return;
    }

    if (!hasTodayMomentChoice()) {
        alert("Comece o devocional de hoje para usar a IA.");
        showMomentOverlay();
        return;
    }

    const devotional = getTodayDevotional();
    const selection = getTodayMomentSelection();
    const userText = selection?.userText || "";
    const lowerQuestion = question.toLowerCase();
    let answer = "";

    if (lowerQuestion.includes("permanecer") || lowerQuestion.includes("palavra")) {
        answer = `Permanecer na Palavra não é apenas ler um versículo e seguir a vida.

É continuar debaixo da direção de Cristo mesmo quando a emoção passa.

No devocional de hoje, a aplicação prática é: não trate a Palavra como frase bonita, mas como governo para suas decisões.

Pergunta prática:
Qual atitude sua hoje precisa ser ajustada pela Palavra?`;
    } else if (lowerQuestion.includes("oração") || lowerQuestion.includes("orar")) {
        answer = `Oração não é só pedir coisas a Deus.

É relacionamento, dependência e alinhamento.

Uma oração madura não tenta convencer Deus a fazer a nossa vontade; ela submete nosso coração à vontade dele.

Prática de hoje:
Ore 5 minutos sem pedir nada. Apenas agradeça, adore e se renda.`;
    } else if (lowerQuestion.includes("desafio")) {
        answer = `O desafio do dia existe para tirar o devocional da teoria.

A fé amadurece quando a Palavra vira prática.

O desafio de hoje é:
${devotional.challenge}`;
    } else if (devotional.personalized && userText && (lowerQuestion.includes("momento") || lowerQuestion.includes("por que") || lowerQuestion.includes("esse texto") || lowerQuestion.includes("meu dia"))) {
        answer = `Você compartilhou hoje:
"${truncateText(userText, 120)}"

Por isso montamos este devocional: "${devotional.title}"

${devotional.summary}

Contexto bíblico:
${devotional.context}

Aplicação para você hoje:
${devotional.application}`;
    } else if (lowerQuestion.includes("contexto") || lowerQuestion.includes("significa")) {
        answer = `Sobre "${devotional.title}":

${devotional.summary}

Contexto:
${devotional.context}

Aplicação para hoje:
${devotional.application}`;
    } else {
        answer = `Com base no devocional de hoje: "${devotional.title}", a direção principal é esta:

${devotional.application}

Pense nisso de forma prática:
A Palavra não foi dada apenas para informar, mas para transformar decisão, comportamento e caráter.`;
    }

    aiAnswer.textContent = answer;
    saveAiQuestion(question, answer);
    aiQuestionInput.value = "";
    renderHistory();
}

function setupTabs() {
    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedTab = button.dataset.tab;

            tabButtons.forEach((tabButton) => tabButton.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(selectedTab).classList.add("active");
        });
    });
}

function setupReflection() {
    reflectionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            saveReflection(button.dataset.reflection);
        });
    });
}

function setupAiSuggestions() {
    aiSuggestionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            aiQuestionInput.value = button.dataset.question;
            askAi(button.dataset.question);
        });
    });
}

completeButton.addEventListener("click", saveCompletedDay);
saveJournalButton.addEventListener("click", saveJournal);
savePrayerButton.addEventListener("click", savePrayer);
askAiButton.addEventListener("click", () => askAi());
editNameButton.addEventListener("click", editUserName);

function bootApp() {
    setGreeting();
    renderWelcome();
    setupTabs();
    setupReflection();
    setupAiSuggestions();
    setupPrayerTimer();
    setupDevotionalToggle();
    setupTabLinks();
    setupBible();
    initMomentFlow();
    updateDashboard();
    renderSpiritualJourney();
    renderPlans();
    renderCurrentPlan();
    renderPrayers();
    renderJournalList();
    renderHistory();
    renderReflection();
}

migrateOnboardingForExistingUsers();
setupOnboarding();

if (isOnboardingCompleted()) {
    bootApp();
} else {
    showOnboarding();
}
