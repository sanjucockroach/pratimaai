interface NodeMotifProps {
  colour?: "coral" | "blue" | "green" | "all";
  className?: string;
}

const colours = {
  coral: "#FF5D5B",
  blue: "#2EB1FF",
  green: "#9AE265",
  all: "#FFBE4A",
};

export function NodeMotif({ colour = "all", className = "" }: NodeMotifProps) {
  const satellite = colours[colour];
  return (
    <svg className={className} viewBox="0 0 420 240" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#A8A8A8" strokeWidth="2">
        <path d="M92 164 208 98 344 146" />
        <path d="M208 98 264 44" />
      </g>
      <circle cx="208" cy="98" r="34" fill={colour === "all" ? "#FFBE4A" : satellite} />
      <circle cx="92" cy="164" r="15" fill={colour === "all" ? "#FF5D5B" : satellite} />
      <circle cx="344" cy="146" r="18" fill={colour === "all" ? "#2EB1FF" : satellite} />
      <circle cx="264" cy="44" r="22" fill={colour === "all" ? "#9AE265" : satellite} />
    </svg>
  );
}
