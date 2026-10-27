export const categories = ["All finds", "Home", "Music", "Outdoors", "Tech"];
export const initialListings = [
  {
    id: "chair",
    title: "A chair with a story",
    price: 45,
    category: "Home",
    condition: "Gently loved",
    art: "chair",
    color: "#ede4d5",
    seller: "Maya",
    description:
      "A cozy reading chair, ready for its next chapter. This is an example listing for the neighborhood demo.",
  },
  {
    id: "guitar",
    title: "Your next campfire guitar",
    price: 85,
    category: "Music",
    condition: "Good as ever",
    art: "guitar",
    color: "#e6e9d9",
    seller: "Alex",
    description:
      "Six strings, plenty of stories still to tell. This is an example listing for the neighborhood demo.",
  },
  {
    id: "camera",
    title: "Little moments, on film",
    price: 60,
    category: "Tech",
    condition: "Vintage find",
    art: "camera",
    color: "#e7e4ec",
    seller: "Sam",
    description:
      "A little camera for big memories. This is an example listing for the neighborhood demo.",
  },
  {
    id: "lamp",
    title: "A brighter reading corner",
    price: 25,
    category: "Home",
    condition: "Gently loved",
    art: "lamp",
    color: "#f4e8d5",
    seller: "Jordan",
    description:
      "A warm little light for late-night pages. This is an example listing for the neighborhood demo.",
  },
  {
    id: "bike",
    title: "The scenic-route bike",
    price: 120,
    category: "Outdoors",
    condition: "Ready to roll",
    art: "bike",
    color: "#dce8e2",
    seller: "Riley",
    description:
      "Built for a slower afternoon and a longer way home. This is an example listing for the neighborhood demo.",
  },
  {
    id: "speaker",
    title: "Tiny speaker, big energy",
    price: 35,
    category: "Tech",
    condition: "Good as ever",
    art: "speaker",
    color: "#e6e6d7",
    seller: "Casey",
    description:
      "Bring your soundtrack along. This is an example listing for the neighborhood demo.",
  },
];
export function filterListings(
  listings,
  query,
  category,
  savedOnly = false,
  saved = [],
) {
  const term = query.trim().toLowerCase();
  return listings.filter(
    (item) =>
      (category === "All finds" || item.category === category) &&
      (!savedOnly || saved.includes(item.id)) &&
      `${item.title} ${item.category}`.toLowerCase().includes(term),
  );
}
export function createListing(input, id) {
  const title = String(input.title || "").trim(),
    price = Number(input.price),
    category = String(input.category || "");
  if (
    !title ||
    title.length > 80 ||
    !Number.isFinite(price) ||
    price < 1 ||
    price > 10000 ||
    !categories.slice(1).includes(category)
  )
    throw new Error(
      "Choose a category, a title up to 80 characters, and a price from $1 to $10,000.",
    );
  return {
    id,
    title,
    price,
    category,
    condition: "Just added",
    art:
      category === "Music"
        ? "guitar"
        : category === "Outdoors"
          ? "bike"
          : category === "Tech"
            ? "camera"
            : "chair",
    color: "#ece5d8",
    seller: "You",
    description: String(input.description || "A new neighborhood find.").slice(
      0,
      500,
    ),
  };
}
export function readSaved(storage, key, fallback) {
  try {
    const value = JSON.parse(storage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function restoreListings(storage) {
  const seen = new Set();
  return readSaved(storage, "imarket-listings", []).flatMap((item) => {
    if (
      !item ||
      typeof item.id !== "string" ||
      !item.id.startsWith("local-") ||
      seen.has(item.id)
    )
      return [];
    try {
      const restored = createListing(item, item.id);
      seen.add(item.id);
      return [restored];
    } catch {
      return [];
    }
  });
}
