// src/app/page.tsx
'use client';

import Link from 'next/link';
import { modelsData, getModelsByCategory } from '@/data/models';
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

  const predictiveModels = getModelsByCategory('predictive');
  const generativeModels = getModelsByCategory('generative');
  const disentangleModels = getModelsByCategory('disentanglement');
  
  const rnaDatasets = datasets.filter(d => d.dataType === 'RNA');
  const atacDatasets = datasets.filter(d => d.dataType === 'ATAC');

  return (
    <div className="space-y-20">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className={`${styles.hero} space-y-8`}>
        <div className="space-y-6 max-w-4xl">
          {/* Badge */}
          <div className={styles.heroBadge}>
            <Sparkles className={styles.heroBadgeIcon} />
            <span className={styles.heroBadgeText}>
              Comprehensive Benchmarking Platform
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className={styles.heroTitle}>
              Liora Benchmarks
            </h1>
            <p className={styles.heroSubtitle}>
              Explore, compare, and analyze <span className={styles.heroHighlight}>21 single-cell models</span> across <span className={styles.heroHighlight}>5 categories</span> with comprehensive benchmarking data.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <Link href="/models" className={styles.ctaPrimary}>
              Explore Models
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/datasets" className={styles.ctaSecondary}>
              Browse Datasets
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          <StatCard icon={Brain} label="Models" value={modelsData.length} />
          <StatCard icon={Database} label="Datasets" value={datasets.length} />
          <StatCard icon={BarChart3} label="Metrics" value={metricsData.length} />
          <StatCard icon={TrendingUp} label="Categories" value={5} />
        </div>
      </section>

      {/* ============================================
          MODELS SECTION
          ============================================ */}
      <section className="space-y-12">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Model Categories
          </h2>
          <p className={styles.sectionSubtitle}>
            Comprehensive collection of single-cell analysis models organized by approach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard
            title="Predictive Models"
            description="Clustering, classification, and imputation"
            count={predictiveModels.length}
            color="#3b82f6"
            icon={Brain}
            href="/models?category=predictive"
          />
          <CategoryCard
            title="Generative Models"
            description="Synthesis, augmentation, and sampling"
            count={generativeModels.length}
            color="#8b5cf6"
            icon={Sparkles}
            href="/models?category=generative"
          />
          <CategoryCard
            title="Disentanglement Models"
            description="Factor analysis and interpretability"
            count={disentangleModels.length}
            color="#f43f5e"
            icon={BarChart3}
            href="/models?category=disentanglement"
          />
        </div>
      </section>

      {/* ============================================
          DATASETS SECTION
          ============================================ */}
      <section className="space-y-12">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Benchmark Datasets
          </h2>
          <p className={styles.sectionSubtitle}>
            Single-cell transcriptomics and chromatin accessibility data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatasetCard
            title="scRNA-seq Datasets"
            description="Gene expression profiling"
            count={rnaDatasets.length}
            color="#3b82f6"
            icon={Database}
            href="/datasets?type=RNA"
          />
          <DatasetCard
            title="scATAC-seq Datasets"
            description="Chromatin accessibility profiling"
            count={atacDatasets.length}
            color="#8b5cf6"
            icon={Database}
            href="/datasets?type=ATAC"
          />
        </div>
      </section>

      {/* ============================================
          METRICS SECTION
          ============================================ */}
      <section className="space-y-12">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Evaluation Metrics
          </h2>
          <p className={styles.sectionSubtitle}>
            Standardized metrics across {metricCategories.length} categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <section className="space-y-12 py-8">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Platform Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Brain}
            title="Model Architecture"
            description="In-depth analysis of model logic, architecture, and mathematical foundations"
          />
          <FeatureCard
            icon={Database}
            title="Comprehensive Data"
            description="80+ single-cell datasets covering RNA-seq and ATAC-seq modalities"
          />
          <FeatureCard
            icon={BarChart3}
            title="Performance Metrics"
            description="Standardized benchmarking across clustering, reduction, and runtime metrics"
          />
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className={styles.finalCta}>
        <div className="space-y-3">
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