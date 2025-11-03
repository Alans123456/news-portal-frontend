"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { getAllArticles } from "@/lib/data";
import ArticleGrid from "@/components/ArticleGrid";

const allArticles = getAllArticles();

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedQuery(query); }, 300);
    return () => { clearTimeout(handler); };
  }, [query]);

  const filteredArticles = useMemo(() => {
    if (!debouncedQuery) return allArticles;
    return allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  return (
    <section>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">Search News</h1>
        <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-500 hover:text-gray-900" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          <span className="hidden md:inline">Close</span>
        </button>
      </div>
      <div className="relative w-full mb-8">
        <input type="text" placeholder="Search by title, summary, or category..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {query && (
          <button onClick={() => setQuery("")} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800" aria-label="Clear search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      <ArticleGrid articles={filteredArticles} />
    </section>
  );
}