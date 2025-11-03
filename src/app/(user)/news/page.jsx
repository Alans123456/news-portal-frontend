import { getCategories, getArticlesByCategory } from "@/lib/data";
import ArticleGrid from "@/components/ArticleGrid";
import Link from "next/link";

export const metadata = {
  title: 'All News',
  description: 'Browse all news articles from every category on Online Kanda.',
};

export default function AllNewsPage() {
  const allCategories = getCategories();

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-4">
        All News Categories
      </h1>
      
      {allCategories.map((category) => {
        // For each category, get its articles
        const articles = getArticlesByCategory(category).slice(0, 6); // Show up to 6 articles per category here
        const categorySlug = category.toLowerCase().replace(/ /g, '-');

        if (articles.length === 0) return null;

        return (
          <section key={category}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-extrabold text-gray-800">
                {category}
              </h2>
              <Link href={`/${categorySlug}`} className="text-blue-600 font-semibold hover:underline">
                View All in {category} &rarr;
              </Link>
            </div>
            <ArticleGrid articles={articles} />
          </section>
        );
      })}
    </div>
  );
}