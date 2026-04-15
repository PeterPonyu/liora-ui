// src/components/Header/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { FontSizeManager } from './FontSizeManager';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

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
          <Link href="/" className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-lg">
            <svg 
              className="w-9 h-9 flex-shrink-0 shadow-md rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95"
              viewBox="0 0 128 128"
            >
              <circle cx="64" cy="64" r="62" fill="#1e3a8a"/>
              <circle cx="64" cy="64" r="60" fill="none" stroke="#3451b2" strokeWidth="2.5"/>
              <path d="M18 46 C38 46,50 22,64 22 C78 22,92 46,110 46" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M18 22 C38 22,50 46,64 46 C78 46,92 22,110 22" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="18" cy="46" r="3" fill="#818cf8"/><circle cx="110" cy="46" r="3" fill="#818cf8"/>
              <circle cx="18" cy="22" r="3" fill="#818cf8"/><circle cx="110" cy="22" r="3" fill="#818cf8"/>
              <text x="64" y="82" fontFamily="JetBrains Mono,monospace" fontSize="44" fontWeight="700" fill="#fff" textAnchor="middle" dominantBaseline="central">LU</text>
            </svg>
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
                LAIOR Benchmarks
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
            <NavLink href="/datasets" isActive={isActive('/datasets')}>Datasets</NavLink>
            <NavLink href="/models" isActive={isActive('/models')}>Models</NavLink>
            <NavLink href="/metrics" isActive={isActive('/metrics')}>Metrics</NavLink>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            <FontSizeManager />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ 
                backgroundColor: mobileMenuOpen ? 'rgb(var(--primary))' : 'rgb(var(--secondary))',
                color: mobileMenuOpen ? 'white' : 'rgb(var(--text-primary))',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 transition-transform" />
              ) : (
                <Menu className="w-5 h-5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden pb-4 pt-2 border-t space-y-1 ${styles.mobileMenu}`}
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <MobileNavLink 
              href="/datasets" 
              isActive={isActive('/datasets')}
              onClick={() => setMobileMenuOpen(false)}
            >
              Datasets
            </MobileNavLink>
            <MobileNavLink 
              href="/models" 
              isActive={isActive('/models')}
              onClick={() => setMobileMenuOpen(false)}
            >
              Models
            </MobileNavLink>
            <MobileNavLink 
              href="/metrics" 
              isActive={isActive('/metrics')}
              onClick={() => setMobileMenuOpen(false)}
            >
              Metrics
            </MobileNavLink>
          </div>
        )}
      </nav>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className={`${styles.navLink} ${isActive ? styles.active : ''}`}
    >
      {children}
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function MobileNavLink({ href, children, isActive, onClick }: MobileNavLinkProps) {
  return (
    <Link 
      href={href} 
      className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}