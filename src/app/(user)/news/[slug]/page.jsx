import { getArticleBySlug, getAllArticles, getArticlesByCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons"; // Import the new component
import ArticleGrid from "@/components/ArticleGrid";   // Import for related articles
import AdBanner from "@/components/AdBanner";

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.summary };
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) { notFound(); }
  
  const publishedDate = new Date(article.publishedDate).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // --- NEW: Logic to find related articles ---
  // Gets other articles from the same category, excluding the current one
  const relatedArticles = getArticlesByCategory(article.category)
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <article className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{article.title}</h1>
        
        {/* Updated metadata section */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y py-4 my-4">
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <span>By <strong>{article.author}</strong></span>
            <span>•</span>
            <span>{publishedDate}</span>
          </div>
          {/* --- NEW: Share Buttons --- */}
          <ShareButtons title={article.title} slug={article.slug} />
        </div>

        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} priority/>
        </div>

        <div className="prose lg:prose-xl max-w-full">
          {article.content}
        </div>
      </article>

      {/* Ad Banner after the article content */}
      <div className="my-8">
        <AdBanner
          data-ad-client="ca-pub-1874560417184600"
          data-ad-slot="1234567890"
          data-ad-layout="in-article"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* --- NEW: Related Articles Section --- */}
      {relatedArticles.length > 0 && (
        <section className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-4 border-gray-400 pb-2 mb-8">
            Related Stories
          </h2>
          <ArticleGrid articles={relatedArticles} />
        </section>
      )}
    </>
  );
}