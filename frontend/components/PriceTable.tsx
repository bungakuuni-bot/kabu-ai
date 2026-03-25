"use client";

import { Category } from "../types/quote";
import { useQuotes } from "../hooks/useQuotes";
import PriceRow from "./PriceRow";

interface PriceTableProps {
  category: Category;
}

const SHOW_VOLUME: Record<Category, boolean> = {
  jp: true,
  us: true,
  crypto: false,
  fx: false,
};

const PRICE_HEADER: Record<Category, string> = {
  jp: "価格 (JPY)",
  us: "価格 (USD)",
  crypto: "価格 (USD)",
  fx: "レート",
};

export default function PriceTable({ category }: PriceTableProps) {
  const { quotes, updatedAt, isLoading, isError, refresh } = useQuotes(category);
  const showVolume = SHOW_VOLUME[category];

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">データの取得に失敗しました</p>
        <p className="text-red-400 text-sm mt-1">バックエンドサーバーが起動しているか確認してください</p>
        <button
          onClick={refresh}
          className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
              取得中...
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              {updatedAt
                ? `更新: ${new Date(updatedAt).toLocaleTimeString("ja-JP")}`
                : "—"}
            </div>
          )}
        </div>
        <button
          onClick={refresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          更新
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wide bg-gray-50/80">
              <th className="py-2.5 px-4 text-left font-medium">銘柄</th>
              <th className="py-2.5 px-4 text-right font-medium">{PRICE_HEADER[category]}</th>
              <th className="py-2.5 px-4 text-right font-medium">変動</th>
              <th className="py-2.5 px-4 text-right font-medium">変動率</th>
              <th className="py-2.5 px-4 text-right font-medium">前日終値</th>
              {showVolume && <th className="py-2.5 px-4 text-right font-medium">出来高</th>}
              <th className="py-2.5 px-4 text-center font-medium">状態</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && quotes.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Array.from({ length: showVolume ? 7 : 6 }).map((_, j) => (
                      <td key={j} className="py-3 px-4">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : quotes.map((quote) => (
                  <PriceRow key={quote.symbol} quote={quote} showVolume={showVolume} />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
