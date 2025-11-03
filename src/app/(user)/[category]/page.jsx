import { getArticlesByCategory, getCategories } from "@/lib/data";
import ArticleGrid from "@/components/ArticleGrid";
import { notFound } from 'next/navigation';

// This function is correct as is.
export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/ /g, '-'),
  }));
}

// This function is also correct as is.
export async function generateMetadata({ params }) {
  const categorySlug = params.category;
  const categories = getCategories();
  const originalCategory = categories.find(c => c.toLowerCase().replace(/ /g, '-') === categorySlug);
  
  if (!originalCategory) return { title: "Category Not Found" };
  
  return {
    title: `${originalCategory} News`,
    description: `The latest news and articles in the ${originalCategory} category.`,
  };
}

// --- THIS IS THE FIX ---
// The page component for a dynamic route should be an async function.
export default async function CategoryPage({ params }) {
  const categorySlug = params.category;
  const categories = getCategories();
  
  const originalCategory = categories.find(c => c.toLowerCase().replace(/ /g, '-') === categorySlug);

  if (!originalCategory) {
      notFound();
  }
  
  const filteredArticles = getArticlesByCategory(originalCategory);

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 border-b pb-4">
        {originalCategory}
      </h1>
      <ArticleGrid articles={filteredArticles} />
    </section>
  );
}