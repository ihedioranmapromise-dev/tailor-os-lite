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
  phone: string;
  address: string;
  logo?: string;
  tagline?: string;
};

export const DEMO_SHOP: Shop = {
  slug: "aba-craft-atelier",
  name: "Aba Craft Atelier",
  phone: "+234 803 000 0000",
  address: "Aba, Abia State",
  tagline: "Bespoke tailoring · clear progress",
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
    note: "Client prefers matte buttons",
    mediaByStage: {
      "Order received": [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
          caption: "Fabric confirmed",
        },
      ],
      Cutting: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1558171813-4c0880cf059b?w=800&q=80",
          caption: "Pieces cut",
        },
      ],
      Sewing: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
          caption: "Body in progress",
        },
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
      "Ready for pickup": [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
          caption: "Finished piece",
        },
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
    mediaByStage: {},
  },
];

export const DEMO_SHOWROOM: ShowroomItem[] = [
  {
    id: "sr-1",
    title: "Classic Senator",
    category: "Senator",
    price: 48000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    description: "Clean lines, breathable fabric. Made to measure.",
  },
  {
    id: "sr-2",
    title: "Evening Gown",
    category: "Gown",
    price: 75000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    description: "Structured bodice, soft fall.",
  },
  {
    id: "sr-3",
    title: "Two-piece Suit",
    category: "Suit",
    price: 110000,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    description: "Boardroom ready. Full canvas option.",
  },
  {
    id: "sr-4",
    title: "Agbada Set",
    category: "Agbada",
    price: 150000,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    description: "Ceremonial weight with modern cut.",
  },
];

export function stageIndex(stage: Stage) {
  return STAGES.indexOf(stage);
}

export function formatNaira(n?: number) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}
