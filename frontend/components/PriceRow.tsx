import { Quote } from "../types/quote";

interface PriceRowProps {
  quote: Quote;
  showVolume: boolean;
}

function formatPrice(price: number, currency: string): string {
  if (currency === "N/A" || price === 0) return "—";
  try {
    const digits =
      currency === "JPY"
        ? 0
        : price >= 1000
        ? 2
        : price >= 1
        ? 4
        : 6;
    return new Intl.NumberFormat("ja-JP", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(price);
  } catch {
    return price.toFixed(2);
  }
}

function formatVolume(volume: number | null): string {
  if (volume === null) return "—";
  if (volume >= 1_000_000_000) return `${(volume / 1_000_000_000).toFixed(1)}B`;
  if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `${(volume / 1_000).toFixed(0)}K`;
  return volume.toString();
}

function MarketStateBadge({ state }: { state: string }) {
  const config: Record<string, { label: string; className: string }> = {
    REGULAR: { label: "通常", className: "bg-green-100 text-green-700" },
    PRE: { label: "プレ", className: "bg-yellow-100 text-yellow-700" },
    POST: { label: "アフター", className: "bg-orange-100 text-orange-700" },
    CLOSED: { label: "休場", className: "bg-gray-100 text-gray-500" },
    ERROR: { label: "エラー", className: "bg-red-100 text-red-500" },
  };
  const { label, className } = config[state] ?? config.CLOSED;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${className}`}>
      {label}
    </span>
  );
}

export default function PriceRow({ quote, showVolume }: PriceRowProps) {
  const isPositive = quote.regularMarketChange > 0;
  const isNegative = quote.regularMarketChange < 0;
  const changeClass = isPositive
    ? "text-green-600"
    : isNegative
    ? "text-red-500"
    : "text-gray-400";
  const changeSign = isPositive ? "+" : "";

  return (
    <tr className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
      <td className="py-3 px-4">
        <div className="font-semibold text-gray-800">{quote.shortName}</div>
        <div className="text-xs text-gray-400 mt-0.5">{quote.symbol}</div>
      </td>
      <td className="py-3 px-4 text-right">
        <span className="font-mono text-base font-semibold text-gray-900">
          {formatPrice(quote.regularMarketPrice, quote.currency)}
        </span>
        <span className="text-xs text-gray-400 ml-1">{quote.currency !== "N/A" ? quote.currency : ""}</span>
      </td>
      <td className={`py-3 px-4 text-right font-mono font-semibold ${changeClass}`}>
        {quote.currency !== "N/A"
          ? `${changeSign}${formatPrice(quote.regularMarketChange, quote.currency)}`
          : "—"}
      </td>
      <td className={`py-3 px-4 text-right font-mono font-semibold ${changeClass}`}>
        {quote.currency !== "N/A"
          ? `${changeSign}${quote.regularMarketChangePercent.toFixed(2)}%`
          : "—"}
      </td>
      <td className="py-3 px-4 text-right font-mono text-gray-600">
        {formatPrice(quote.regularMarketPreviousClose, quote.currency)}
      </td>
      {showVolume && (
        <td className="py-3 px-4 text-right text-gray-500 text-sm">
          {formatVolume(quote.regularMarketVolume)}
        </td>
      )}
      <td className="py-3 px-4 text-center">
        <MarketStateBadge state={quote.marketState} />
      </td>
    </tr>
  );
}
