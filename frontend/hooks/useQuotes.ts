"use client";

import useSWR from "swr";
import { Category, CategoryResponse } from "../types/quote";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

export function useQuotes(category: Category) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
  const url = `${apiBase}/api/quotes?category=${category}`;

  const { data, error, isLoading, mutate } = useSWR<CategoryResponse>(
    url,
    fetcher,
    {
      refreshInterval: 30_000,
      revalidateOnFocus: true,
      dedupingInterval: 10_000,
    }
  );

  return {
    quotes: data?.quotes ?? [],
    updatedAt: data?.updatedAt,
    isLoading,
    isError: !!error,
    errorMessage: error?.message,
    refresh: () => mutate(),
  };
}
