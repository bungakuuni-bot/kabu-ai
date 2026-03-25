export type Category = "jp" | "us" | "crypto" | "fx";

export interface SymbolMeta {
  symbol: string;
  displayName: string;
}

export const SYMBOLS: Record<Category, SymbolMeta[]> = {
  jp: [
    { symbol: "7203.T", displayName: "トヨタ自動車" },
    { symbol: "9984.T", displayName: "ソフトバンクG" },
    { symbol: "6758.T", displayName: "ソニーグループ" },
    { symbol: "9432.T", displayName: "NTT" },
    { symbol: "6861.T", displayName: "キーエンス" },
    { symbol: "8306.T", displayName: "三菱UFJ" },
    { symbol: "6954.T", displayName: "ファナック" },
    { symbol: "4519.T", displayName: "中外製薬" },
  ],
  us: [
    { symbol: "AAPL", displayName: "Apple" },
    { symbol: "GOOGL", displayName: "Alphabet" },
    { symbol: "MSFT", displayName: "Microsoft" },
    { symbol: "AMZN", displayName: "Amazon" },
    { symbol: "TSLA", displayName: "Tesla" },
    { symbol: "NVDA", displayName: "NVIDIA" },
    { symbol: "META", displayName: "Meta" },
    { symbol: "BRK-B", displayName: "Berkshire B" },
  ],
  crypto: [
    { symbol: "BTC-USD", displayName: "ビットコイン" },
    { symbol: "ETH-USD", displayName: "イーサリアム" },
    { symbol: "XRP-USD", displayName: "リップル" },
    { symbol: "SOL-USD", displayName: "ソラナ" },
    { symbol: "BNB-USD", displayName: "バイナンスコイン" },
    { symbol: "DOGE-USD", displayName: "ドージコイン" },
  ],
  fx: [
    { symbol: "USDJPY=X", displayName: "USD/JPY" },
    { symbol: "EURUSD=X", displayName: "EUR/USD" },
    { symbol: "GBPUSD=X", displayName: "GBP/USD" },
    { symbol: "EURJPY=X", displayName: "EUR/JPY" },
    { symbol: "AUDUSD=X", displayName: "AUD/USD" },
    { symbol: "GBPJPY=X", displayName: "GBP/JPY" },
  ],
};

export const ALL_CATEGORIES: Category[] = ["jp", "us", "crypto", "fx"];

export const CATEGORY_LABELS: Record<Category, string> = {
  jp: "日本株",
  us: "米国株",
  crypto: "暗号資産",
  fx: "FX",
};
