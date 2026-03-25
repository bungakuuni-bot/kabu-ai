
"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, isLoading } = useSWR("/api/stocks", fetcher, { refreshInterval: 30000 });

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-2">カブアイ</h1>
      <p className="text-gray-400 mb-6">リアルタイム株価情報</p>
      {isLoading && <p className="text-gray-400">読み込み中...</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800 text-left">
              <th className="py-3 pr-6">銘柄</th>
              <th className="py-3 pr-6">現在値</th>
              <th className="py-3 pr-6">前日比</th>
              <th className="py-3">出来高</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((stock: any) => (
              <tr key={stock.symbol} className="border-b border-gray-800 hover:bg-gray-900">
                <td className="py-3 pr-6">
                  <div className="font-semibold">{stock.name}</div>
                  <div className="text-gray-500 text-xs">{stock.symbol}</div>
                </td>
                <td className="py-3 pr-6 font-mono">{stock.price?.toLocaleString()}</td>
                <td className={`py-3 pr-6 font-mono ${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {stock.change >= 0 ? "+" : ""}{stock.change?.toFixed(2)}
                  <span className="ml-1 text-xs">({stock.changePercent?.toFixed(2)}%)</span>
                </td>
                <td className="py-3 text-gray-400">{stock.volume?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}