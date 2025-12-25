// src/app/page.tsx
'use client';

import Link from 'next/link';
import { modelsData, modelCategories } from '@/data/models';
import { loadDatasets } from '@/lib/dataLoader';
import { metricsData, metricCategories } from '@/data/metrics';
import { Brain, Database, BarChart3, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './home.module.css';

export default function HomePage() {
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    loadDatasets().then(data => setDatasets(data));
  }, []);
  
  const rnaDatasets = datasets.filter(d => d.dataType === 'RNA');
  const atacDatasets = datasets.filter(d => d.dataType === 'ATAC');

  return (
    <div className="space-y-8">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className={`${styles.hero} space-y-5`}>
        <div className="space-y-4 max-w-4xl">
          <div className="space-y-2">
            <h1 className={styles.heroTitle}>
              LAIOR Benchmarks
            </h1>
            <p className={styles.heroSubtitle}>
              A comprehensive benchmarking library for <span className={styles.heroHighlight}>single-cell analysis models</span>, featuring LAIOR (Lorentz Attentive Interpretable ODE Regularized VAE)—the latest evolution in variational autoencoders from <span className={styles.heroHighlight}>VAE → iVAE → LiVAE → LAIOR</span>, integrating <span className={styles.heroHighlight}>geometric regularization, information bottleneck, and ODE-based trajectory stabilization</span>. Compare <span className={styles.heroHighlight}>{modelsData.length} models</span> across <span className={styles.heroHighlight}>{modelCategories.length} categories</span> using <span className={styles.heroHighlight}>{metricsData.length} standardized metrics</span>.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6">
          <StatCard icon={Brain} label="Models" value={modelsData.length} />
          <StatCard icon={Database} label="RNA Datasets" value={rnaDatasets.length} />
          <StatCard icon={Database} label="ATAC Datasets" value={atacDatasets.length} />
          <StatCard icon={BarChart3} label="Metrics" value={metricsData.length} />
          <StatCard icon={TrendingUp} label="Categories" value={modelCategories.length} />
        </div>
      </section>

      {/* ============================================
          QUICK NAVIGATION
          ============================================ */}
      <section className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/models" className={styles.quickNavCard}>
            <Brain className="w-8 h-8 text-[rgb(var(--icon-blue))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Explore {modelsData.length} Models</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Compare architectures, performance, and implementation details
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>
          
          <Link href="/datasets" className={styles.quickNavCard}>
            <Database className="w-8 h-8 text-[rgb(var(--icon-purple))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Browse {datasets.length} Datasets</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Single-cell transcriptomics and chromatin accessibility data
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>

          <Link href="/metrics" className={styles.quickNavCard}>
            <BarChart3 className="w-8 h-8 text-[rgb(var(--icon-emerald))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Explore {metricsData.length} Metrics</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Standardized evaluation across clustering, embedding, and runtime
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* ============================================
          MODEL CATEGORIES
          ============================================ */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Model Categories
          </h2>
            <p className={styles.sectionSubtitle}>
              Compare {modelCategories.length} distinct approaches in LAIOR's benchmarking suite, from contrastive learning to disentangled representations
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {modelCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.label}
              description={cat.description}
              count={cat.count}
              color={`rgb(var(--category-${cat.id}))`}
              countLabel="models"
              icon={getCategoryIcon(cat.id)}
              href={`/models?category=${cat.id}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          BENCHMARK DATASETS
          ============================================ */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Benchmark Datasets
          </h2>
            <p className={styles.sectionSubtitle}>
              LAIOR's curated collection of {datasets.length} single-cell datasets for rigorous model evaluation
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CategoryCard
            title="scRNA-seq Datasets"
            description="Gene expression profiling datasets"
            count={rnaDatasets.length}
            color="rgb(var(--rna-primary))"
            countLabel="datasets"
            icon={Database}
            href="/datasets?type=RNA"
          />
          <CategoryCard
            title="scATAC-seq Datasets"
            description="Chromatin accessibility profiling datasets"
            count={atacDatasets.length}
            color="rgb(var(--atac-primary))"
            countLabel="datasets"
            icon={Database}
            href="/datasets?type=ATAC"
          />
        </div>
      </section>

      {/* ============================================
          EVALUATION METRICS
          ============================================ */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Evaluation Metrics
          </h2>
          <p className={styles.sectionSubtitle}>
            {metricsData.length} standardized metrics across {metricCategories.length} evaluation categories for comprehensive model comparison
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {metricCategories.map(cat => (
            <CategoryCard
              key={cat.id}
              title={cat.label}
              description={cat.description}
              count={cat.count}
              color={`rgb(var(--metric-${cat.id}))`}
              countLabel="metrics"
              icon={getMetricIcon(cat.id)}
              href={`/metrics?category=${cat.id}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          PLATFORM CAPABILITIES
          ============================================ */}
      <section className="space-y-5 py-6">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Platform Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FeatureCard
            icon={Brain}
            title="Architecture Analysis"
            description="Detailed model comparisons including LAIOR's integrated architecture (ODE regularization + Lorentz geometry + information bottleneck + transformer attention) vs. LiVAE, iVAE, and classical VAE approaches"          />
          <FeatureCard
            icon={Database}
            title="Multi-Modal Benchmarking"
            description={`Evaluate models across ${datasets.length} curated datasets spanning scRNA-seq (${rnaDatasets.length}) and scATAC-seq (${atacDatasets.length}) modalities`}
          />
          <FeatureCard
            icon={BarChart3}
            title="Comprehensive Metrics"
            description={`${metricsData.length} standardized metrics across clustering (${metricCategories.find(c => c.id === 'clustering')?.count || 6}), embedding quality (${metricCategories.find(c => c.id === 'embedding')?.count || 8}), latent space (${metricCategories.find(c => c.id === 'intrinsic')?.count || 8}), and runtime (${metricCategories.find(c => c.id === 'runtime')?.count || 2})`}
          />
        </div>
      </section>

      {/* ============================================
          CALL TO ACTION
          ============================================ */}
      <section className={styles.finalCta}>
        <div className="space-y-2">
          <h2 className={styles.finalCtaTitle}>
            Ready to explore?
          </h2>
          <p className={styles.finalCtaDescription}>
            Dive into LAIOR's benchmarking library and discover which models work best for your single-cell analysis
          </p>
        </div>
        <Link href="/models" className={styles.finalCtaButton}>
          Start Exploring
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Get icon component for model category
 */
function getCategoryIcon(categoryId: string) {
  const iconMap: Record<string, typeof Brain> = {
    'predictive': Brain,
    'generative': Sparkles,
    'trajectory': TrendingUp,
    'atac-specific': Database,
    'gaussian-geometric': BarChart3,
    'disentanglement': Brain,
  };
  return iconMap[categoryId] || Brain;
}

/**
 * Get icon component for metric category
 */
function getMetricIcon(categoryId: string) {
  const iconMap: Record<string, typeof Brain> = {
    'clustering': Brain,
    'embedding': TrendingUp,
    'intrinsic': BarChart3,
    'runtime': Database,
  };
  return iconMap[categoryId] || BarChart3;
}

/* ============================================
   COMPONENT DEFINITIONS
   ============================================ */

/**
 * Stat Card - Displays a single statistic with icon
 */
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Brain;
  label: string;
  value: number;
}) {
  return (
    <div className={styles.statCard}>
      <Icon className={styles.statIcon} />
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

/**
 * Category Card - Unified card for models, datasets, and metrics
 * Uses CSS variables for consistent theming
 */
interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  color: string;
  countLabel: string;
  icon: typeof Brain;
  href: string;
}

function CategoryCard({
  title,
  description,
  count,
  color,
  countLabel,
  icon: Icon,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div
        className={styles.categoryCard}
        style={{
          borderColor: color,
          backgroundColor: `${color}08`,
        }}
      >
        <div className={styles.categoryCardHeader}>
          <div>
            <h3 className={styles.categoryCardTitle}>
              {title}
            </h3>
            <p className={styles.categoryCardDescription}>
              {description}
            </p>
          </div>
          <Icon className={styles.categoryCardIcon} style={{ color }} />
        </div>
        <div className={styles.categoryCardCount}>
          <span className={styles.categoryCardCountValue} style={{ color }}>
            {count}
          </span>
          <span className={styles.categoryCardCountLabel}>
            {countLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Feature Card - Displays platform capabilities
 */
interface FeatureCardProps {
  icon: typeof Brain;
  title: string;
  description: string;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIconWrapper}>
        <Icon className={styles.featureIcon} />
      </div>
      <h3 className={styles.featureTitle}>
        {title}
      </h3>
      <p className={styles.featureDescription}>
        {description}
      </p>
    </div>
  );
}