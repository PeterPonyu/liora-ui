import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const siteTitle = "LAIOR Benchmarks | Public Microsite";
const siteDescription = "Public microsite for LAIOR benchmark datasets, model summaries, metrics, and detailed benchmark exploration.";
const canonicalPath = "/liora-ui/";
const canonicalUrl = "https://peterponyu.github.io/liora-ui/";
const iconPath = process.env.NODE_ENV === "production" ? "/liora-ui/favicon.svg" : "/favicon.svg";

export const metadata: Metadata = {
  metadataBase: new URL("https://peterponyu.github.io"),
  title: {
    default: siteTitle,
    template: "%s | LAIOR Benchmarks",
  },
  description: siteDescription,
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: canonicalUrl,
    siteName: "LAIOR Benchmarks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: { url: iconPath, type: 'image/svg+xml' },
  },
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
      <body className="antialiased transition-colors duration-200 font-sans">
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
