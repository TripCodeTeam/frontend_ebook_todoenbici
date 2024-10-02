export type ScalarBook = {
  id?: string;
  nameBook: string;
  cover_page: string;
  back_cover: string;
  description: string;
  author: string;
  price: number;
  rating: number;
  number_pages: number;
  editorial?: string;
  language: string[];
  genre: string[];
  stock: number;
  upId: string;
  media: string;
  isPhysical: Boolean;
  isVirtual: Boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type ScalarPurchased = {
  id?: string;
  clientId: string;
  bookId: string;
  purchased_key?: string;
  isAproved?: boolean;
  created_at?: Date;
  updated_at?: Date;
};
