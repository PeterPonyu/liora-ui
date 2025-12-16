'use client';

import { useState } from 'react';
import { metricsData, metricCategories } from '@/data/metrics';
import { MetricCard } from '@/components/MetricCard';
import { Search } from 'lucide-react';

export default function MetricsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredMetrics = metricsData.filter(metric => {
    const matchesSearch =
      metric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      metric.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      metric.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || metric.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Evaluation Metrics
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Understand the {metricsData.length} metrics used for model evaluation
        </p>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search metrics by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === null
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Metrics ({metricsData.length})
          </button>
          {metricCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </section>

      {/* Results Count */}
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing {filteredMetrics.length} of {metricsData.length} metrics
      </p>

      {/* Metrics Grid */}
      {filteredMetrics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMetrics.map(metric => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No metrics found matching your search
          </p>
        </div>
      )}

      {/* Metric Categories Info */}
      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Metric Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metricCategories.map(cat => (
            <div
              key={cat.id}
              className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {cat.label}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {cat.description}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-3">
                {cat.count} metrics
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
