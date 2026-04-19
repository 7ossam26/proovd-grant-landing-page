/* TODO(assets): replace with real ecosystem illustration from /public/assets/ecosystem-N.svg */
export default function EcosystemPlaceholder() {
  return (
    <svg
      width="210"
      height="210"
      viewBox="0 0 210 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Brand-lime circle */}
      <circle cx="105" cy="105" r="105" fill="#BCFCA1" />

      {/* Stylized plant — brand-forest stroke, no fill */}
      {/* Main stem */}
      <line
        x1="105" y1="168" x2="105" y2="75"
        stroke="#1E4D2F" strokeWidth="3.5" strokeLinecap="round"
      />
      {/* Top leaf */}
      <path
        d="M105 75 C118 55 138 48 130 30 C110 40 98 60 105 75Z"
        stroke="#1E4D2F" strokeWidth="2.5" strokeLinejoin="round"
        fill="#BCFCA1"
      />
      {/* Top leaf vein */}
      <line
        x1="105" y1="75" x2="122" y2="45"
        stroke="#1E4D2F" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Left mid leaf */}
      <path
        d="M105 115 C88 102 72 104 68 88 C88 86 104 100 105 115Z"
        stroke="#1E4D2F" strokeWidth="2.5" strokeLinejoin="round"
        fill="#BCFCA1"
      />
      {/* Left leaf vein */}
      <line
        x1="105" y1="115" x2="76" y2="94"
        stroke="#1E4D2F" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Right mid leaf */}
      <path
        d="M105 130 C122 117 138 119 142 103 C122 101 106 115 105 130Z"
        stroke="#1E4D2F" strokeWidth="2.5" strokeLinejoin="round"
        fill="#BCFCA1"
      />
      {/* Right leaf vein */}
      <line
        x1="105" y1="130" x2="134" y2="109"
        stroke="#1E4D2F" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Small bottom-left sprout */}
      <path
        d="M105 150 C93 142 86 130 80 118 C96 122 105 138 105 150Z"
        stroke="#1E4D2F" strokeWidth="2" strokeLinejoin="round"
        fill="#BCFCA1"
      />
      {/* Root base */}
      <path
        d="M95 168 Q105 172 115 168"
        stroke="#1E4D2F" strokeWidth="2.5" strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
