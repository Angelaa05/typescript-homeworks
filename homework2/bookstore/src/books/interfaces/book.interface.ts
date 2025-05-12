export interface Book {
  id: string;
  title: string;
  author: string; // Added author field
  price: number;
  stock: number;
}

export interface BookFilters {
  title?: string;
  author?: string;
  available?: boolean;
  minPrice?: number | null;
  maxPrice?: number | null;
}
