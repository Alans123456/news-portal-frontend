import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AppThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Online Kanda | Your Trusted News Source",
    template: "%s | Online Kanda",
  },
  description:
    "Your trusted source for timely and accurate news coverage from Nepal and around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-white text-gray-800 transition-colors">
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
