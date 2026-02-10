import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
                  // Theme initialization
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
                  
                  // SPA routing fix for GitHub Pages
                  // Handle redirects from 404.html
                  (function(l) {
                    if (l.search[1] === '/') {
                      var decoded = l.search.slice(1).split('&').map(function(s) { 
                        return s.replace(/~and~/g, '&')
                      }).join('?');
                      window.history.replaceState(null, null,
                        l.pathname.slice(0, -1) + decoded + l.hash
                      );
                    }
                  }(window.location));
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased transition-colors duration-200 font-sans`}>
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