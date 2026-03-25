import yahooFinanceModule from "yahoo-finance2";
import { SYMBOLS, Category } from "../config/symbols";
import { Quote, CategoryResponse } from "../types";

// yahoo-finance2 v3 requires instantiation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const YahooFinanceClass = yahooFinanceModule as any;
const yf = new YahooFinanceClass({ suppressNotices: ["yahooSurvey"] });

const CACHE_TTL_MS = 30_000;

interface CacheEntry {
  data: CategoryResponse;
  expiresAt: number;
}

const cache = new Map<Category, CacheEntry>();

export async function getQuotesByCategory(
  category: Category
): Promise<CategoryResponse> {
  const cached = cache.get(category);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  const symbolMetas = SYMBOLS[category];
  const symbols = symbolMetas.map((m) => m.symbol);

  const results = await Promise.all(
    symbols.map(async (s, idx) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = (await yf.quote(s)) as Record<string, any>;
        const meta = symbolMetas[idx];
        const quote: Quote = {
          symbol: r["symbol"] ?? s,
          shortName: r["shortName"] ?? meta.displayName,
          currency: r["currency"] ?? "USD",
          regularMarketPrice: r["regularMarketPrice"] ?? 0,
          regularMarketChange: r["regularMarketChange"] ?? 0,
          regularMarketChangePercent: r["regularMarketChangePercent"] ?? 0,
          regularMarketPreviousClose: r["regularMarketPreviousClose"] ?? 0,
          regularMarketVolume: r["regularMarketVolume"] ?? null,
          marketState: r["marketState"] ?? "CLOSED",
        };
        return quote;
      } catch (err) {
        console.error(`Failed to fetch ${s}:`, err);
        const meta = symbolMetas[idx];
        return {
          symbol: s,
          shortName: meta.displayName,
          currency: "N/A",
          regularMarketPrice: 0,
          regularMarketChange: 0,
          regularMarketChangePercent: 0,
          regularMarketPreviousClose: 0,
          regularMarketVolume: null,
          marketState: "ERROR",
        } as Quote;
      }
    })
  );

  const response: CategoryResponse = {
    category,
    updatedAt: new Date().toISOString(),
    quotes: results,
  };

  cache.set(category, { data: response, expiresAt: Date.now() + CACHE_TTL_MS });
  return response;
}

export async function getAllQuotes(): Promise<Record<Category, CategoryResponse>> {
  const results = await Promise.all([
    getQuotesByCategory("jp"),
    getQuotesByCategory("us"),
    getQuotesByCategory("crypto"),
    getQuotesByCategory("fx"),
  ]);
  return {
    jp: results[0],
    us: results[1],
    crypto: results[2],
    fx: results[3],
  };
}

export function clearCache(): void {
  cache.clear();
}
