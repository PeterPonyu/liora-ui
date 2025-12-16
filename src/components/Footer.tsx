'use client';

import Link from 'next/link';
import { Github, FileText, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="border-t mt-20 transition-colors"
      style={{
        borderColor: 'rgb(var(--border))',
        backgroundColor: 'rgb(var(--card))',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3
              className="text-sm font-semibold mb-4 transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Liora
            </h3>
            <p
              className="text-sm transition-colors"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              Comprehensive benchmarking for single-cell analysis models
            </p>
          </div>
          <div>
            <h4
              className="text-sm font-semibold mb-4 transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Explore
            </h4>
            <ul className="space-y-2 text-sm footer-links">
              <li>
                <Link href="/datasets">Datasets</Link>
              </li>
              <li>
                <Link href="/models">Models</Link>
              </li>
              <li>
                <Link href="/metrics">Metrics</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="text-sm font-semibold mb-4 transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Learn
            </h4>
            <ul className="space-y-2 text-sm footer-links">
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">API Reference</a>
              </li>
              <li>
                <a href="#">Tutorial</a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="text-sm font-semibold mb-4 transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Resources
            </h4>
            <ul className="space-y-2 text-sm footer-links">
              <li>
                <a href="https://github.com">GitHub</a>
              </li>
              <li>
                <a href="#">Publication</a>
              </li>
              <li>
                <a href="#">Citation</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{
            borderColor: 'rgb(var(--border))',
          }}
        >
          <p
            className="text-sm transition-colors"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            &copy; 2025 Liora. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 social-links">
            <a href="https://github.com">
              <Github className="w-5 h-5" />
            </a>
            <a href="#">
              <FileText className="w-5 h-5" />
            </a>
            <a href="mailto:contact@liora.org">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        ul.footer-links a {
          color: rgb(var(--text-secondary));
          transition: color 0.2s;
        }

        ul.footer-links a:hover {
          color: rgb(var(--text-primary));
        }

        div.social-links a {
          color: rgb(var(--text-secondary));
          transition: color 0.2s;
          display: flex;
        }

        div.social-links a:hover {
          color: rgb(var(--primary));
        }
      `}</style>
    </footer>
  );
}
