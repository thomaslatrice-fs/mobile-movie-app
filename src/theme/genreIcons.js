const GENRE_ICONS = {
  action: "💥",
  adventure: "🗺️",
  animation: "🧸",
  comedy: "😂",
  crime: "🕵️",
  documentary: "🎥",
  drama: "🎭",
  fantasy: "🐉",
  horror: "👻",
  musical: "🎵",
  mystery: "🔍",
  romance: "💕",
  "sci-fi": "👽",
  scifi: "👽",
  thriller: "🔪",
  western: "🤠",
};

export function genreIcon(genre = "") {
  const key = genre.trim().toLowerCase();
  return GENRE_ICONS[key] || "🍿";
}
