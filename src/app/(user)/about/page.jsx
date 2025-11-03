// src/app/about/page.jsx

import { metadata as siteMetadata } from '../layout';

export const metadata = {
  title: 'About Us',
  description: `Learn more about, our mission, our story, and our commitment to delivering factual news.`,
};

export default function AboutPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-4 mb-6">
        About Online Kanda
      </h1>
      
      <div className="prose lg:prose-xl max-w-full text-gray-700">
        <p className="lead text-xl">
          Welcome to Online Kanda, your most trusted source for timely and accurate news coverage, with a special focus on Nepal and relevant global affairs.
        </p>

        <h2>Our Mission</h2>
        <p>
          In an age of information overload, our mission is to cut through the noise and deliver news that is factual, unbiased, and easy to understand. We are committed to upholding the highest standards of journalism to empower our readers with the knowledge they need to make informed decisions.
        </p>

        <h2>Our Story</h2>
        <p>
          Online Kanda was founded in 2025 by a small group of passionate journalists in Bharatpur, Nepal, who saw a need for a digital-first news platform dedicated to integrity. What started as a small blog has grown into a comprehensive news source, thanks to our dedicated team and the loyal support of our readers.
        </p>
        
        <h2>Why Trust Us?</h2>
        <ul>
          <li><strong>Fact-Checked Content:</strong> Every story is rigorously verified by our editorial team before publication.</li>
          <li><strong>Unbiased Reporting:</strong> We are committed to presenting all sides of the story without political or commercial influence.</li>
          <li><strong>Experienced Journalists:</strong> Our team consists of seasoned professionals with deep expertise in their respective fields.</li>
        </ul>
      </div>
    </div>
  );
}