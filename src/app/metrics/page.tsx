'use client';

import { useState } from 'react';
import { metricsData, metricCategories } from '@/data/metrics';
import { MetricCard } from '@/components/MetricCard';
import { Search, Filter } from 'lucide-react';
import { getMetricCategoryColor, getMetricCategoryMetadata } from '@/lib/utils';
import styles from '../pages.module.css';

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <section>
        <h1 className={styles.pageTitle}>Evaluation Metrics</h1>
        <p className={styles.pageSubtitle}>
          Understand the {metricsData.length} metrics used for model evaluation across 4 categories
        </p>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search metrics by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Category Filters */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterLabel}>
            <Filter className="w-4 h-4" />
            Filter by Category
          </h3>
          <div className={styles.filterButtons}>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`${styles.filterButton} ${selectedCategory === null ? styles.active : ''}`}
            >
              All Metrics ({metricsData.length})
            </button>
            {metricCategories.map(cat => {
              const metadata = getMetricCategoryMetadata(cat.id);
              const color = getMetricCategoryColor(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.filterButton} ${selectedCategory === cat.id ? styles.active : ''}`}
                  style={
                    selectedCategory === cat.id
                      ? { backgroundColor: color, color: 'white' }
                      : {}
                  }
                  title={metadata.description}
                >
                  {metadata.icon} {metadata.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <p className={styles.resultsCount}>
        Showing {filteredMetrics.length} of {metricsData.length} metrics
      </p>

      {/* Metrics Grid */}
      {filteredMetrics.length > 0 ? (
        <div className={styles.grid3}>
          {filteredMetrics.map(metric => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No metrics found matching your search
          </p>
          <p className={styles.emptyStateHint}>
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Metric Categories Info */}
      <section className="mt-12 space-y-6">
        <h2 className={styles.pageTitle} style={{ fontSize: '1.875rem' }}>
          Metric Categories
        </h2>
        <div className={styles.grid2}>
          {metricCategories.map(cat => {
            const metadata = getMetricCategoryMetadata(cat.id);
            const color = getMetricCategoryColor(cat.id);
            return (
              <div 
                key={cat.id} 
                className={styles.infoBox}
                style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
              >
                <h3 className={styles.infoBoxTitle}>
                  {metadata.icon} {cat.label}
                </h3>
                <p className={styles.infoBoxDescription}>{cat.description}</p>
                <p className={styles.infoBoxCount}>{cat.count} metrics</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}