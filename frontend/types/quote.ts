export type Category = "jp" | "us" | "crypto" | "fx";

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

export const CATEGORY_LABELS: Record<Category, string> = {
  jp: "日本株",
  us: "米国株",
  crypto: "暗号資産",
  fx: "FX",
};
