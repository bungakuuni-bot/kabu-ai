import { Category } from "./config/symbols";

export interface Quote {
  symbol: string;
  shortName: string;
  currency: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketPreviousClose: number;
  regularMarketVolume: number | null;
  marketState: string;
}

export interface CategoryResponse {
  category: Category;
  updatedAt: string;
  quotes: Quote[];
}
