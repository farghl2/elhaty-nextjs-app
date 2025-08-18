
export enum ServiceType {
  TAKEAWAY = "TAKEAWAY",
  DINEIN = "DINEIN",
}

export type PlateSizePrice = {
  id: number;
  type: ServiceType;
  price: number;
  offer?: number | null;
};

export type PlateSize = {
  id: number;
  size: string; // "صغير" | "وسط" | "كبير"
  prices: PlateSizePrice[];
};

export type Category = {
  id: number;
  name: string;
  plates: Plate[];
};

export type Plate = {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
  status: boolean;
  bestSale: boolean;
  categoryId: number;
  sizes: PlateSize[];
};


export type OfferPlate = {
  id: number;
  title: string;
  desc?: string;
  imageUrl: string;
  status: boolean;
  bestSale: boolean;
  categoryId: number;
  price:number;
  offer:number
};
