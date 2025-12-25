import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LAIOR Benchmarks - Single-Cell Models & Datasets",
  description: "Comprehensive benchmarking and visualization for single-cell analysis models including unified models, external tools, and disentanglement methods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.style.colorScheme = theme;

                  const storedFontSize = localStorage.getItem('fontSize');
                  const fontSize = storedFontSize || 'medium';
                  const multipliers = { small: 0.875, medium: 1, large: 1.125 };
                  document.documentElement.style.fontSize = (multipliers[fontSize] * 16) + 'px';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-200`}>
        <div 
          className="flex flex-col min-h-screen transition-colors duration-200"
          style={{
            backgroundColor: 'rgb(var(--background))',
            color: 'rgb(var(--foreground))',
          }}
        >
          <Header />
          <main className="flex-1 w-full py-6">  {/* ✅ Reduced from py-8 to py-6 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}