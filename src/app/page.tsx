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
    <div className="space-y-8">  {/* ✅ Reduced from space-y-12 (48px → 32px) */}
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className={`${styles.hero} space-y-5`}>  {/* ✅ Reduced from space-y-6 */}
        <div className="space-y-4 max-w-4xl">  {/* ✅ Reduced from space-y-5 */}
          {/* Badge */}
          <div className={styles.heroBadge}>
            <Sparkles className={styles.heroBadgeIcon} />
            <span className={styles.heroBadgeText}>
              Comprehensive Benchmarking Platform
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2">  {/* ✅ Reduced from space-y-3 */}
            <h1 className={styles.heroTitle}>
              Liora Benchmarks
            </h1>
            <p className={styles.heroSubtitle}>
              Explore, compare, and analyze <span className={styles.heroHighlight}>{modelsData.length} single-cell models</span> across <span className={styles.heroHighlight}>{modelCategories.length} categories</span> with comprehensive benchmarking data.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6">  {/* ✅ Reduced from pt-8 (32px → 24px) */}
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
      <section className="space-y-3">  {/* ✅ Reduced from space-y-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">  {/* ✅ Consistent gap-3 */}
          <Link href="/models" className={styles.quickNavCard}>
            <Brain className="w-8 h-8 text-[rgb(var(--icon-blue))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Explore {modelsData.length} Models</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Compare architectures, performance metrics, and implementation details
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>
          
          <Link href="/datasets" className={styles.quickNavCard}>
            <Database className="w-8 h-8 text-[rgb(var(--icon-purple))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Browse {datasets.length} Datasets</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Single-cell transcriptomics and chromatin accessibility benchmarks
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* ============================================
          MODELS SECTION
          ============================================ */}
      <section className="space-y-5">  {/* ✅ Reduced from space-y-8 (32px → 20px) */}
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Model Categories
          </h2>
          <p className={styles.sectionSubtitle}>
            Six distinct approaches to single-cell analysis, from contrastive learning to disentangled representations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">  {/* ✅ Consistent gap-3 */}
          {modelCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.label}
              description={cat.description}
              count={cat.count}
              color={`rgb(var(--category-${cat.id}))`}
              icon={getCategoryIcon(cat.id)}
              href={`/models?category=${cat.id}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          DATASETS SECTION
          ============================================ */}
      <section className="space-y-5">  {/* ✅ Reduced from space-y-8 */}
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Benchmark Datasets
          </h2>
          <p className={styles.sectionSubtitle}>
            Single-cell transcriptomics and chromatin accessibility data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">  {/* ✅ Consistent gap-3 */}
          <DatasetCard
            title="scRNA-seq Datasets"
            description="Gene expression profiling"
            count={rnaDatasets.length}
            color="rgb(var(--rna-primary))"
            icon={Database}
            href="/datasets?type=RNA"
          />
          <DatasetCard
            title="scATAC-seq Datasets"
            description="Chromatin accessibility profiling"
            count={atacDatasets.length}
            color="rgb(var(--atac-primary))"
            icon={Database}
            href="/datasets?type=ATAC"
          />
        </div>
      </section>

      {/* ============================================
          METRICS SECTION
          ============================================ */}
      <section className="space-y-5">  {/* ✅ Reduced from space-y-8 */}
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Evaluation Metrics
          </h2>
          <p className={styles.sectionSubtitle}>
            Standardized metrics across {metricCategories.length} evaluation categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">  {/* ✅ Consistent gap-3 */}
          {metricCategories.map(cat => (
            <Link key={cat.id} href={`/metrics?category=${cat.id}`}>
              <div className={styles.metricCategoryCard}>
                <h3 className={styles.metricCategoryTitle}>
                  {cat.label}
                </h3>
                <p className={styles.metricCategoryDescription}>
                  {cat.description}
                </p>
                <div className={styles.metricCategoryCount}>
                  <span className={styles.metricCategoryCountValue}>
                    {cat.count}
                  </span>
                  <span className={styles.metricCategoryCountLabel}>
                    metrics
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section className="space-y-5 py-6">  {/* ✅ Reduced from space-y-8 and py-6 stays */}
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Platform Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">  {/* ✅ Consistent gap-3 */}
          <FeatureCard
            icon={Brain}
            title="Architecture Analysis"
            description={`Detailed breakdowns of ${modelsData.length} models including encoder/decoder structures, loss functions, and mathematical foundations`}
          />
          <FeatureCard
            icon={Database}
            title="Multi-Modal Data"
            description={`${datasets.length} single-cell datasets spanning scRNA-seq (${rnaDatasets.length}) and scATAC-seq (${atacDatasets.length}) modalities`}
          />
          <FeatureCard
            icon={BarChart3}
            title="Comprehensive Metrics"
            description={`${metricsData.length} standardized metrics across clustering (6), embedding quality (8), latent space evaluation (8), and runtime (2)`}
          />
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className={styles.finalCta}>
        <div className="space-y-2">  {/* ✅ Reduced from space-y-3 */}
          <h2 className={styles.finalCtaTitle}>
            Ready to explore?
          </h2>
          <p className={styles.finalCtaDescription}>
            Dive into our comprehensive benchmarking data and discover which models work best for your analysis
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

/* ============================================
   COMPONENT DEFINITIONS
   ============================================ */

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

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  color: string;
  icon: typeof Brain;
  href: string;
}

function CategoryCard({
  title,
  description,
  count,
  color,
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
            models
          </span>
        </div>
      </div>
    </Link>
  );
}

interface DatasetCardProps {
  title: string;
  description: string;
  count: number;
  color: string;
  icon: typeof Brain;
  href: string;
}

function DatasetCard({
  title,
  description,
  count,
  color,
  icon: Icon,
  href,
}: DatasetCardProps) {
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
            datasets
          </span>
        </div>
      </div>
    </Link>
  );
}

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