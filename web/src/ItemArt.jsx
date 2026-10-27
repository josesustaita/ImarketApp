const paths = {
  chair: (
    <>
      <path d="M62 119V77q0-25 25-25h65q25 0 25 25v42M57 115q-20 0-20 20v30h165v-30q0-20-20-20M60 165v30m120-30v30M70 121h99" />
      <path d="M80 55v46m37-46v46m37-46v46" />
    </>
  ),
  guitar: (
    <>
      <path d="M138 93l40-65 14 9-40 65q30 6 24 33-2 14-19 18 10 41-20 58-28 13-51-9-26-25-5-52 7-11 20-12-7-25 11-35 13-8 26-10z" />
      <circle cx="132" cy="139" r="14" />
      <path d="M123 153l-12 18m25-41 46-95M105 172l21 14" />
    </>
  ),
  camera: (
    <>
      <rect x="35" y="75" width="170" height="115" rx="15" />
      <path d="M65 75l16-22h57l17 22M35 105h170" />
      <circle cx="122" cy="137" r="35" />
      <circle cx="122" cy="137" r="23" />
      <path d="M55 89h15m100 0h15" />
    </>
  ),
  lamp: (
    <>
      <path d="M84 40h73l30 88H55zM120 128v67M83 200h75M167 129v26" />
      <path d="M91 128h57" />
    </>
  ),
  bike: (
    <>
      <circle cx="60" cy="163" r="39" />
      <circle cx="190" cy="163" r="39" />
      <path d="M60 163l44-73 43 73H60l45-53h59l26 53-35-97h22M89 86h33M147 163l17-53" />
    </>
  ),
  speaker: (
    <>
      <rect x="65" y="35" width="115" height="176" rx="18" />
      <circle cx="122" cy="90" r="23" />
      <circle cx="122" cy="158" r="32" />
      <circle cx="122" cy="158" r="15" />
      <path d="M205 97q18 27 0 54M220 80q30 44 0 86" />
    </>
  ),
};
export default function ItemArt({ type }) {
  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[type] || paths.chair}
    </svg>
  );
}
