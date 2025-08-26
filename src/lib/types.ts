
export type Plate = {
  id:string;
  title: string;
  desc: string;
  imageUrl: string;
  categoryId: string;
  status: boolean;
  bestSale: boolean;
  sizes: {
    size: "S" | "M" | "L" | "R";
    takeawayPrice: string;
    dineinPrice: string;
  }[];
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
