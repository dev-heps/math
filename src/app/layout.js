import { Geist, Geist_Mono } from "next/font/google";
import MathHeaderNav from "@/components/MathHeaderNav";
import "./globals.css";
import "katex/dist/katex.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Math Archive - Dongwoo Lee",
    template: "%s - Math Archive",
  },
  description: "Dongwoo Lee's math archive for notes, studies, and formalizations.",
};

const isDev = process.env.NODE_ENV === 'development';
const portfolioUrl = isDev ? 'http://localhost:3000/' : 'https://dev-heps.github.io/';

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ backgroundColor: '#ffffff', color: '#09090b', colorScheme: 'light' }}
    >
      <body
        className="min-h-full bg-white text-zinc-900"
        style={{ backgroundColor: '#ffffff', color: '#09090b', colorScheme: 'light' }}
      >
        <div
          className="min-h-screen bg-white text-zinc-900"
          style={{ backgroundColor: '#ffffff', color: '#09090b' }}
        >
          <header
            className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-2 pt-2 border-b border-zinc-200"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <div className="mx-auto flex min-h-12 w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
              <MathHeaderNav portfolioUrl={portfolioUrl} />
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 bg-white">
            <article className="math-article prose prose-zinc max-w-none">
              {children}
            </article>
          </main>
          <footer
            className="mx-auto w-full max-w-6xl px-4 pb-10 text-center font-mono text-xs text-zinc-400 sm:px-6 lg:px-8 border-t border-zinc-100 mt-16"
          >
            &copy; 2026 Dongwoo Lee. Back to <a href={portfolioUrl} className="text-zinc-900 hover:underline underline-offset-4">Portfolio</a>.
          </footer>
        </div>
      </body>
    </html>
  );
}
