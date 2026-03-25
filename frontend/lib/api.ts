import { Category, CategoryResponse } from "../types/quote";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function fetchQuotes(category: Category): Promise<CategoryResponse> {
  const res = await fetch(`${API_BASE}/api/quotes?category=${category}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${category} quotes: ${res.status}`);
  }
  return res.json();
}
