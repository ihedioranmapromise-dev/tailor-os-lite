export const STAGES = [
  "Order received",
  "Cutting",
  "Sewing",
  "Pressing / finishing",
  "Fitting",
  "Ready for pickup",
  "Delivered",
] as const;

export type Stage = (typeof STAGES)[number];

export const STYLES = [
  "Agbada",
  "Suit",
  "Senator",
  "Gown",
  "Shirt",
  "Trouser",
  "Other",
] as const;

export type StyleType = (typeof STYLES)[number];

export type MediaItem = {
  type: "image" | "video";
  url: string;
  caption?: string;
};

export type Measurements = {
  chest?: string;
  shoulder?: string;
  sleeve?: string;
  length?: string;
  waist?: string;
  hip?: string;
  neck?: string;
  thigh?: string;
  inseam?: string;
  other?: string;
};

export type Order = {
  id: string;
  clientFirstName: string;
  clientPhone: string;
  style: StyleType;
  styleNote?: string;
  measurements: Measurements;
  price?: number;
  dueDate: string;
  stage: Stage;
  note?: string;
  mediaByStage: Partial<Record<Stage, MediaItem[]>>;
  createdAt: string;
};

export type ShowroomItem = {
  id: string;
  title: string;
  category: string;
  price?: number;
  image: string;
  description?: string;
};

export type Shop = {
  slug: string;
  name: string;
  legalName?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  logo?: string;
  coverImage?: string;
  tagline?: string;
  about?: string;
  yearsInBusiness?: string;
  specialties?: string[];
  workingHours?: string;
  instagram?: string;
  owner: {
    fullName: string;
    title?: string;
    photo?: string;
    bio?: string;
  };
};

export const MAX_IMAGES_PER_STAGE = 2;
export const MAX_VIDEOS_PER_STAGE = 1;

/** Smaller Unsplash params for faster loads */
const q = "w=640&q=70&auto=format";
const IMG = {
  fabricSelect: `https://images.unsplash.com/photo-1558171813-4c0880cf059b?${q}`,
  measuring: `https://images.unsplash.com/photo-1509631179647-0177331693ae?${q}`,
  patternCut: `https://images.unsplash.com/photo-1590736969955-71cc94c4b6b2?${q}`,
  scissorsFabric: `https://images.unsplash.com/photo-1586075010923-2dd45799fb4d?${q}`,
  sewingMachine: `https://images.unsplash.com/photo-1517677208171-0bc6725a3d60?${q}`,
  sewingHands: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?${q}`,
  ironPress: `https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?${q}`,
  finishedRack: `https://images.unsplash.com/photo-1558769132-cb1aea458c5e?${q}`,
  suitDetail: `https://images.unsplash.com/photo-1594938298603-c8148c4dae35?${q}`,
  atelier: `https://images.unsplash.com/photo-1556905055-8f358a7a47b2?${q}`,
  tailorPortrait: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=70&auto=format`,
  logoMark: `https://images.unsplash.com/photo-1517677208171-0bc6725a3d60?w=160&h=160&fit=crop&q=70&auto=format`,
};

export const DEMO_SHOP: Shop = {
  slug: "atelier-noir",
  name: "Atelier Noir",
  legalName: "Atelier Noir Tailoring Co.",
  phone: "+234 803 000 0000",
  whatsapp: "+234 803 000 0000",
  email: "hello@ateliernoir.demo",
  address: "12 Studio Lane",
  city: "Lagos",
  state: "Lagos",
  country: "Nigeria",
  logo: IMG.logoMark,
  coverImage: IMG.atelier,
  tagline: "Bespoke tailoring with clear progress",
  about:
    "We cut and sew made-to-measure pieces with a transparent production timeline. Every client gets a tracking code and stage updates with workshop photos.",
  yearsInBusiness: "8",
  specialties: ["Senator", "Suits", "Agbada", "Corporate wear"],
  workingHours: "Mon–Sat · 9:00 – 18:00",
  instagram: "@ateliernoir",
  owner: {
    fullName: "Daniel Okeke",
    title: "Head tailor & founder",
    photo: IMG.tailorPortrait,
    bio: "Trained in classic pattern cutting. Focused on fit, finish, and honest delivery dates.",
  },
};

export const DEMO_ORDERS: Order[] = [
  {
    id: "TO-2026-0142",
    clientFirstName: "Chinedu",
    clientPhone: "+234 801 111 1111",
    style: "Senator",
    measurements: {
      chest: "42",
      shoulder: "18",
      sleeve: "25",
      length: "30",
      waist: "34",
    },
    price: 45000,
    dueDate: "2026-11-14",
    stage: "Sewing",
    note: "Fitting scheduled Thursday 2pm",
    mediaByStage: {
      "Order received": [
        { type: "image", url: IMG.fabricSelect, caption: "Fabric selected with client" },
        { type: "image", url: IMG.measuring, caption: "Measurements locked" },
      ],
      Cutting: [
        { type: "image", url: IMG.scissorsFabric, caption: "Pattern laid and cut" },
        { type: "image", url: IMG.patternCut, caption: "Pieces ready for sewing" },
        { type: "video", url: IMG.scissorsFabric, caption: "Cut walkthrough (clip)" },
      ],
      Sewing: [
        { type: "image", url: IMG.sewingMachine, caption: "On the machine" },
        { type: "image", url: IMG.sewingHands, caption: "Hand finish in progress" },
      ],
    },
    createdAt: "2026-11-05",
  },
  {
    id: "TO-2026-0140",
    clientFirstName: "Ada",
    clientPhone: "+234 802 222 2222",
    style: "Gown",
    measurements: {
      chest: "36",
      waist: "28",
      hip: "40",
      length: "58",
    },
    price: 62000,
    dueDate: "2026-11-12",
    stage: "Ready for pickup",
    mediaByStage: {
      "Pressing / finishing": [
        { type: "image", url: IMG.ironPress, caption: "Pressed and cleaned" },
      ],
      "Ready for pickup": [
        { type: "image", url: IMG.finishedRack, caption: "Ready on the rack" },
        { type: "image", url: IMG.suitDetail, caption: "Final detail check" },
        { type: "video", url: IMG.finishedRack, caption: "Ready for pickup (clip)" },
      ],
    },
    createdAt: "2026-11-01",
  },
  {
    id: "TO-2026-0138",
    clientFirstName: "Emeka",
    clientPhone: "+234 803 333 3333",
    style: "Suit",
    measurements: {
      chest: "40",
      shoulder: "17",
      sleeve: "24",
      length: "29",
      waist: "32",
      inseam: "30",
    },
    price: 95000,
    dueDate: "2026-11-18",
    stage: "Cutting",
    createdAt: "2026-11-07",
    mediaByStage: {
      "Order received": [
        { type: "image", url: IMG.measuring, caption: "Suit measurements taken" },
      ],
    },
  },
];

export const DEMO_SHOWROOM: ShowroomItem[] = [
  {
    id: "sr-1",
    title: "Classic Senator",
    category: "Senator",
    price: 48000,
    image: IMG.suitDetail,
    description: "Clean lines, breathable fabric. Made to measure.",
  },
  {
    id: "sr-2",
    title: "Evening silhouette",
    category: "Gown",
    price: 75000,
    image: IMG.finishedRack,
    description: "Structured bodice, soft fall.",
  },
  {
    id: "sr-3",
    title: "Two-piece Suit",
    category: "Suit",
    price: 110000,
    image: IMG.atelier,
    description: "Boardroom ready. Full canvas option.",
  },
  {
    id: "sr-4",
    title: "Workshop craft",
    category: "Agbada",
    price: 150000,
    image: IMG.sewingMachine,
    description: "Ceremonial weight with modern cut.",
  },
];

export function stageIndex(stage: Stage) {
  return STAGES.indexOf(stage);
}

export function findOrder(code: string) {
  const normalized = code.trim().toUpperCase();
  return DEMO_ORDERS.find((o) => o.id.toUpperCase() === normalized);
}

export function formatNaira(n?: number) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}
