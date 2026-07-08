export default function Logo({ size = "md" }) {
  return (
    <div className={`logo ${size === "lg" ? "splash-logo" : ""}`}>
      <div className="logo-mark">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 16 L12 6 L18 16"
            stroke="#00E676"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="logo-text">
        Verd<span>ex</span>
      </div>
    </div>
  );
}
