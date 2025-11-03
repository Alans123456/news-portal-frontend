// src/app/terms/page.jsx

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Read the terms and conditions for using the Online Kanda website.',
};

export default function TermsPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-4 mb-6">
        Terms and Conditions
      </h1>
      
      <div className="prose lg:prose-xl max-w-full text-gray-700">
        <p className="text-sm text-gray-500">Last Updated: September 16, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Online Kanda. By accessing our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not use our website.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these Terms, Online Kanda and/or its licensors own all the intellectual property rights and materials contained in this website. You are granted a limited license only for purposes of viewing the material contained on this website.
        </p>

        <h2>3. Restrictions</h2>
        <p>
          You are specifically restricted from all of the following:
        </p>
        <ul>
          <li>Publishing any website material in any other media without prior consent.</li>
          <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
          <li>Using this website in any way that is or may be damaging to this website.</li>
          <li>Using this website contrary to applicable laws and regulations.</li>
        </ul>

        <h2>4. Limitation of Liability</h2>
        <p>
          In no event shall Online Kanda, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.
        </p>
        
        <h2>5. Governing Law & Jurisdiction</h2>
        <p>
          These Terms will be governed by and interpreted in accordance with the laws of Nepal, and you submit to the non-exclusive jurisdiction of the courts located in Nepal for the resolution of any disputes.
        </p>
      </div>
    </div>
  );
}