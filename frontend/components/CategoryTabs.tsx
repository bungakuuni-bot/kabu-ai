"use client";

import { Category, CATEGORY_LABELS } from "../types/quote";

interface CategoryTabsProps {
  active: Category;
  onChange: (category: Category) => void;
}

const CATEGORIES: Category[] = ["jp", "us", "crypto", "fx"];

const CATEGORY_ICONS: Record<Category, string> = {
  jp: "🇯🇵",
  us: "🇺🇸",
  crypto: "₿",
  fx: "💱",
};

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            active === cat
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="mr-1.5">{CATEGORY_ICONS[cat]}</span>
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
