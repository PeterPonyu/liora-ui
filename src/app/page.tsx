'use client';

import Link from 'next/link';
import { modelsData, getModelsByCategory } from '@/data/models';
import { allDatasets } from '@/data/datasets';
import { metricsData, metricCategories } from '@/data/metrics';
import { Brain, Database, BarChart3, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const unifiedModels = getModelsByCategory('unified');
  const externalModels = getModelsByCategory('external');
  const disentangleModels = getModelsByCategory('disentanglement');
  const rnaDatasets = allDatasets.filter(d => d.dataType === 'RNA');
  const atacDatasets = allDatasets.filter(d => d.dataType === 'ATAC');

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
          Liora Benchmarks
        </h1>
        <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
          Comprehensive visualization and comparison of single-cell analysis models including unified architectures, external tools, and disentanglement methods
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Brain} label="Models" value={modelsData.length} href="/models" />
        <StatCard icon={Database} label="Datasets" value={allDatasets.length} href="/datasets" />
        <StatCard icon={BarChart3} label="Metrics" value={metricsData.length} href="/metrics" />
        <StatCard icon={TrendingUp} label="Benchmarks" value={`${allDatasets.length * modelsData.length}`} href="/benchmarks" />
      </section>

      {/* Models Overview */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CategoryOverview
            title="Unified Models"
            description="Integrated in Liora architecture"
            count={unifiedModels.length}
            color="#6366f1"
            href="/models?category=unified"
            icon={Brain}
          />
          <CategoryOverview
            title="External Models"
            description="State-of-the-art tools"
            count={externalModels.length}
            color="#14b8a6"
            href="/models?category=external"
            icon={TrendingUp}
          />
          <CategoryOverview
            title="Disentanglement"
            description="Factor analysis methods"
            count={disentangleModels.length}
            color="#f43f5e"
            href="/models?category=disentanglement"
            icon={BarChart3}
          />
        </div>
      </section>

      {/* Datasets Overview */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Datasets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CategoryOverview
            title="scRNA-seq Datasets"
            description="Transcriptomics data"
            count={rnaDatasets.length}
            color="#3b82f6"
            href="/datasets?type=RNA"
          />
          <CategoryOverview
            title="scATAC-seq Datasets"
            description="Accessibility data"
            count={atacDatasets.length}
            color="#8b5cf6"
            href="/datasets?type=ATAC"
          />
        </div>
      </section>

      {/* Metrics Overview */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Evaluation Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCategories.map(cat => (
            <div
              key={cat.id}
              className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {cat.label}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {cat.description}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {cat.count}
              </p>
              <Link
                href={`/metrics?category=${cat.id}`}
                className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <CtaCard
          icon={Brain}
          title="Explore Models"
          description="Understand the logic, architecture, and performance of each model"
          href="/models"
        />
        <CtaCard
          icon={Database}
          title="Browse Datasets"
          description="Discover the 80+ single-cell datasets used for benchmarking"
          href="/datasets"
        />
        <CtaCard
          icon={TrendingUp}
          title="Compare Performance"
          description="Visualize and compare model performance across datasets and metrics"
          href="/benchmarks"
        />
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Brain;
  label: string;
  value: number | string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer">
        <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
        <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {label}
        </p>
      </div>
    </Link>
  );
}

function CategoryOverview({
  title,
  description,
  count,
  color,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  count: number;
  color: string;
  href: string;
  icon?: typeof Brain;
}) {
  return (
    <Link href={href}>
      <div
        className="p-8 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer"
        style={{
          borderColor: color,
          backgroundColor: color + '10',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {description}
            </p>
          </div>
          {Icon && (
            <Icon className="w-8 h-8" style={{ color }} />
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            {count}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            items
          </span>
        </div>
      </div>
    </Link>
  );
}

function CtaCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: typeof Brain;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="p-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer">
        <Icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </Link>
  );
}
