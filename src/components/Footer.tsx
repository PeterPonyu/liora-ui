// src/components/Footer/Footer.tsx
'use client';

import Link from 'next/link';
import { Github, FileText, Mail } from 'lucide-react';
import styles from './Footer.module.css';

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">  {/* ✅ Changed to 5 columns */}
          {/* ✅ NEW ABOUT SECTION */}
          <div className="md:col-span-2">
            <h3
              className="text-sm font-semibold mb-4 transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              About This Site
            </h3>
            <p
              className="text-sm mb-3 transition-colors leading-relaxed"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              LAIOR Benchmarks is a focused public microsite for benchmark datasets, model summaries, and metric views.
            </p>
            <ul
              className="text-sm space-y-1.5 transition-colors"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              <li>
                <strong style={{ color: 'rgb(var(--text-primary))' }}>Homepage</strong> — Public identity and top-level overview
              </li>
              <li>
                <strong style={{ color: 'rgb(var(--text-primary))' }}>SCPortal</strong> — Canonical discovery hub
              </li>
              <li>
                <strong style={{ color: 'rgb(var(--text-primary))' }}>LAIOR Benchmarks</strong> — Detailed benchmark destination
              </li>
              <li>
                <strong style={{ color: 'rgb(var(--primary))' }}>Related Utilities</strong> — Linked where workflows overlap
              </li>
            </ul>

          </div>

          <div>
            <h4
              className="text-sm font-semibold mb-4 transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Navigate
            </h4>
            <ul className={`space-y-2 text-sm ${styles.footerLinks}`}>
              <li>
                <a href="https://peterponyu.github.io/scportal/" target="_blank" rel="noopener noreferrer">Portal</a>
              </li>
              <li>
                <a href="https://peterponyu.github.io/" target="_blank" rel="noopener noreferrer">Homepage</a>
              </li>
              <li>
                <Link href="/models">Models</Link>
              </li>
              <li>
                <Link href="/datasets">Datasets</Link>
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
              Related Tools
            </h4>
            <ul className={`space-y-2 text-sm ${styles.footerLinks}`}>
              <li>
                <a href="https://peterponyu.github.io/mrnapp-intersection/" target="_blank" rel="noopener noreferrer">mRNA Intersection</a>
              </li>
              <li>
                <a href="https://peterponyu.github.io/scportal/datasets/" target="_blank" rel="noopener noreferrer">Dataset Hub</a>
              </li>
              <li>
                <a href="https://peterponyu.github.io/scportal/benchmarks/" target="_blank" rel="noopener noreferrer">Benchmark Overview</a>
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
            <ul className={`space-y-2 text-sm ${styles.footerLinks}`}>
              <li>
                <a href="https://github.com/PeterPonyu/liora-ui" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/PeterPonyu/Liora" target="_blank" rel="noopener noreferrer">LAIOR Source</a>
              </li>
              <li>
                <a href="https://github.com/PeterPonyu" target="_blank" rel="noopener noreferrer">Profile</a>
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
            &copy; 2025 LAIOR. All rights reserved.
          </p>

          {/* Social Links */}
          <div className={`flex items-center gap-4 ${styles.socialLinks}`}>
            <a href="https://github.com/PeterPonyu/Liora" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://github.com/PeterPonyu/Liora" aria-label="Documentation">
              <FileText className="w-5 h-5" />
            </a>
            <a href="mailto:fuzeyu99@126.com" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
