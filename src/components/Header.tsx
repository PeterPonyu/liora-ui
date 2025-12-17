'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { FontSizeManager } from './FontSizeManager';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-sm transition-all"
      style={{
        borderColor: 'rgb(var(--border))',
        backgroundColor: 'rgb(var(--card) / 0.8)',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3"
              style={{
                background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(99 102 241) 100%)',
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className="text-lg font-bold tracking-tight transition-colors"
                style={{ 
                  color: 'rgb(var(--text-primary))',
                  background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(99 102 241))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Liora Benchmarks
              </span>
              <span 
                className="hidden sm:block text-xs font-medium"
                style={{ color: 'rgb(var(--text-tertiary))' }}
              >
                Single-Cell Analysis
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/datasets">Datasets</NavLink>
            <NavLink href="/models">Models</NavLink>
            <NavLink href="/metrics">Metrics</NavLink>
            <NavLink href="/benchmarks">Results</NavLink>
            <NavLink href="/comparison">Compare</NavLink>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            <FontSizeManager />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: mobileMenuOpen ? 'rgb(var(--primary))' : 'rgb(var(--secondary))',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X
                  className="w-5 h-5 transition-transform"
                  style={{ color: mobileMenuOpen ? 'white' : 'rgb(var(--text-primary))' }}
                />
              ) : (
                <Menu
                  className="w-5 h-5"
                  style={{ color: 'rgb(var(--text-primary))' }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden pb-4 pt-2 border-t space-y-1 animate-in slide-in-from-top-2 duration-200"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <MobileNavLink href="/datasets" onClick={() => setMobileMenuOpen(false)}>
              Datasets
            </MobileNavLink>
            <MobileNavLink href="/models" onClick={() => setMobileMenuOpen(false)}>
              Models
            </MobileNavLink>
            <MobileNavLink href="/metrics" onClick={() => setMobileMenuOpen(false)}>
              Metrics
            </MobileNavLink>
            <MobileNavLink href="/benchmarks" onClick={() => setMobileMenuOpen(false)}>
              Results
            </MobileNavLink>
            <MobileNavLink href="/comparison" onClick={() => setMobileMenuOpen(false)}>
              Compare
            </MobileNavLink>
          </div>
        )}
      </nav>

      <style jsx>{`
        a.nav-link {
          position: relative;
          color: rgb(var(--text-secondary));
          padding: 0.625rem 1rem;
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
        }

        a.nav-link::after {
          content: '';
          position: absolute;
          bottom: 0.25rem;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: linear-gradient(90deg, rgb(var(--primary)), rgb(99 102 241));
          transform: scaleX(0);
          transition: transform 0.2s ease;
          border-radius: 2px;
        }

        a.nav-link:hover {
          color: rgb(var(--text-primary));
          background-color: rgb(var(--secondary));
        }

        a.nav-link:hover::after {
          transform: scaleX(1);
        }

        a.mobile-nav-link {
          color: rgb(var(--text-secondary));
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          display: block;
          border-left: 3px solid transparent;
        }

        a.mobile-nav-link:hover {
          color: rgb(var(--text-primary));
          background-color: rgb(var(--secondary));
          border-left-color: rgb(var(--primary));
          padding-left: 1.25rem;
        }

        @keyframes slide-in-from-top-2 {
          from {
            opacity: 0;
            transform: translateY(-0.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: slide-in-from-top-2 0.2s ease-out;
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

function MobileNavLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className="mobile-nav-link" onClick={onClick}>
      {children}
    </Link>
  );
}