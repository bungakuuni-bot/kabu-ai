import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

const yf = new YahooFinance();

const SYMBOLS = [
  { symbol: "7203.T", name: "トヨタ自動車" },
  { symbol: "6758.T", name: "ソニーグループ" },
  { symbol: "9984.T", name: "ソフトバンクグループ" },
  { symbol: "6861.T", name: "キーエンス" },
  { symbol: "8306.T", name: "三菱UFJ" },
  { symbol: "AAPL", name: "Apple" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "MSFT", name: "Microsoft" },
];

export async function GET() {
  const results = await Promise.all(
    SYMBOLS.map(async ({ symbol, name }) => {
      const quote = await yf.quote(symbol);
      return {
        symbol,
        name,
        price: quote.regularMarketPrice,
        change: quote.regularMarketChange,
        changePercent: quote.regularMarketChangePercent,
        volume: quote.regularMarketVolume,
      };
    })
  );
  return NextResponse.json(results);
}