'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors"
      style={{
        borderColor: 'rgb(var(--border))',
        backgroundColor: 'rgb(var(--card))',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">Ⓛ</span>
            </div>
            <span
              className="hidden sm:inline text-lg font-bold transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Liora Benchmarks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/datasets">Datasets</NavLink>
            <NavLink href="/models">Models</NavLink>
            <NavLink href="/metrics">Metrics</NavLink>
            <NavLink href="/benchmarks">Results</NavLink>
            <NavLink href="/comparison">Compare</NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: mobileMenuOpen ? 'rgb(var(--secondary))' : 'transparent',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X
                  className="w-6 h-6"
                  style={{ color: 'rgb(var(--text-primary))' }}
                />
              ) : (
                <Menu
                  className="w-6 h-6"
                  style={{ color: 'rgb(var(--text-primary))' }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden pb-4 border-t space-y-1"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <MobileNavLink href="/datasets">Datasets</MobileNavLink>
            <MobileNavLink href="/models">Models</MobileNavLink>
            <MobileNavLink href="/metrics">Metrics</MobileNavLink>
            <MobileNavLink href="/benchmarks">Results</MobileNavLink>
            <MobileNavLink href="/comparison">Compare</MobileNavLink>
          </div>
        )}
      </nav>

      <style jsx>{`
        a.nav-link {
          color: rgb(var(--text-secondary));
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.375rem;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
        }

        a.nav-link:hover {
          color: rgb(var(--text-primary));
          background-color: rgb(var(--secondary));
        }

        a.mobile-nav-link {
          color: rgb(var(--text-secondary));
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.375rem;
          transition: all 0.2s;
          display: block;
        }

        a.mobile-nav-link:hover {
          color: rgb(var(--text-primary));
          background-color: rgb(var(--secondary));
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="nav-link">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="mobile-nav-link">
      {children}
    </Link>
  );
}
