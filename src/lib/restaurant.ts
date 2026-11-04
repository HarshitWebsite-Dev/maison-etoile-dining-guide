import wagyu from "@/assets/dish-wagyu.jpg";
import lobster from "@/assets/dish-lobster.jpg";
import dessert from "@/assets/dish-dessert.jpg";

export const contact = {
  address: "14 Rue du Faubourg Saint-Honoré",
  city: "75008 Paris, France",
  phone: "+33 1 42 65 00 00",
  email: "reservations@maison-etoile.fr",
  hours: [
    { days: "Tuesday — Saturday", time: "19:00 — 23:30" },
    { days: "Saturday Lunch", time: "12:30 — 14:30" },
    { days: "Sunday & Monday", time: "Closed" },
  ],
  mapQuery: "Rue du Faubourg Saint-Honoré, Paris",
};

export const signatureDishes = [
  {
    name: "Bœuf Wagyu & Truffe Noire",
    note: "Périgord black truffle, cèpes, sauce bordelaise",
    price: "€96",
    image: wagyu,
  },
  {
    name: "Homard Bleu au Safran",
    note: "Butter-poached Breton lobster, saffron émulsion, wild fennel",
    price: "€88",
    image: lobster,
  },
  {
    name: "Sphère de Chocolat",
    note: "Grand cru chocolate, raspberry, Tahitian vanilla, gold leaf",
    price: "€34",
    image: dessert,
  },
];

export type MenuItem = { name: string; description: string; price: string };
export type MenuCourse = { id: string; title: string; subtitle: string; items: MenuItem[] };

export const menu: MenuCourse[] = [
  {
    id: "entrees",
    title: "Entrées",
    subtitle: "To begin",
    items: [
      { name: "Saint-Jacques & Caviar Osciètre", description: "Seared Hokkaido scallops, beurre blanc, chive oil", price: "€58" },
      { name: "Foie Gras de Canard", description: "Sauternes gelée, brioche toast, fig compote", price: "€42" },
      { name: "Velouté de Châtaigne", description: "Chestnut velouté, white truffle, hazelnut", price: "€36" },
      { name: "Tartare de Bar", description: "Line-caught sea bass, yuzu, cucumber, oyster leaf", price: "€38" },
    ],
  },
  {
    id: "plats",
    title: "Plats",
    subtitle: "The main course",
    items: [
      { name: "Bœuf Wagyu & Truffe Noire", description: "A5 wagyu tenderloin, cèpes, sauce bordelaise", price: "€96" },
      { name: "Homard Bleu au Safran", description: "Breton lobster, saffron émulsion, wild fennel", price: "€88" },
      { name: "Pigeon de Bresse", description: "Roasted breast, confit leg, beetroot, cocoa jus", price: "€72" },
      { name: "Turbot Sauvage", description: "Champagne sauce, leeks, Avruga caviar", price: "€78" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "To finish",
    items: [
      { name: "Sphère de Chocolat", description: "Grand cru chocolate, raspberry, gold leaf", price: "€34" },
      { name: "Soufflé au Grand Marnier", description: "Orange zest, crème anglaise", price: "€28" },
      { name: "Plateau de Fromages", description: "Selection of affinés from Maison Barthélémy", price: "€32" },
      { name: "Mignardises", description: "Petit fours from our pâtisserie", price: "€18" },
    ],
  },
];

export const tastingMenu = {
  name: "Menu Dégustation",
  description: "Seven courses composed nightly by Chef Laurent Delacroix",
  price: "€245",
  pairing: "Wine pairing by our sommelier — €165",
};

export const reviews = [
  {
    quote:
      "An evening of quiet perfection. Every plate arrives like a small work of art, and the service moves with the grace of a ballet.",
    author: "Le Guide Gastronomique",
    role: "Two Stars",
  },
  {
    quote:
      "The lobster in saffron is the single most memorable dish I have eaten in Paris this decade. Unhurried, intimate, unforgettable.",
    author: "Camille Moreau",
    role: "Food critic, Le Monde Gourmand",
  },
  {
    quote:
      "Candlelight, velvet and an impeccable wine list. Maison Étoile is where we return for every occasion that matters.",
    author: "James & Eleanor Whitfield",
    role: "Guests since 2019",
  },
];
