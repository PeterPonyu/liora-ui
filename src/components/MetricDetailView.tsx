'use client';

import Link from 'next/link';
import { Metric } from '@/types/models';
import { metricsData } from '@/data/metrics';
import { 
  getMetricCategoryMetadata,
  getMetricDirectionIcon 
} from '@/lib/utils';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import styles from './MetricDetailView.module.css';

interface MetricDetailViewProps {
  metric: Metric;
}

export function MetricDetailView({ metric }: MetricDetailViewProps) {
  const categoryMeta = getMetricCategoryMetadata(metric.category);
  const directionIcon = getMetricDirectionIcon(metric.betterDirection);

  // Get related metrics in the same category
  const relatedMetrics = metricsData
    .filter(m => m.category === metric.category && m.id !== metric.id)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link href="/metrics" className={styles.backLink}>
        <ArrowLeft className="w-4 h-4" />
        Back to metrics
      </Link>

      {/* Header */}
      <div className={styles.header}>
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className={styles.title}>{metric.shortName}</h1>
            <span className={`${styles.categoryBadge} ${styles[metric.category]}`}>
              {categoryMeta.icon} {categoryMeta.label}
            </span>
          </div>
          <h2 className={styles.subtitle}>{metric.name}</h2>
        </div>
      </div>

      {/* Overview Grid */}
      <div className={styles.overviewGrid}>
        {/* Direction */}
        <div className={`${styles.infoBox} ${styles[metric.category]}`}>
          <h3 className={styles.infoLabel}>Direction</h3>
          <div className={`${styles.directionValue} ${styles[metric.category]}`}>
            {metric.betterDirection === 'higher' ? (
              <TrendingUp className="w-6 h-6" />
            ) : (
              <TrendingDown className="w-6 h-6" />
            )}
            <span>
              {metric.betterDirection === 'higher' ? 'Higher is Better' : 'Lower is Better'}
            </span>
          </div>
        </div>

        {/* Range */}
        <div className={`${styles.infoBox} ${styles[metric.category]}`}>
          <h3 className={styles.infoLabel}>Value Range</h3>
          <p className={styles.infoValue}>
            {metric.range 
              ? `[${metric.range.min}, ${metric.range.max ?? '∞'}]${metric.unit ? ` ${metric.unit}` : ''}`
              : 'Custom range'
            }
          </p>
        </div>

        {/* Category */}
        <div className={`${styles.infoBox} ${styles[metric.category]}`}>
          <h3 className={styles.infoLabel}>Category</h3>
          <p className={styles.infoValue}>{categoryMeta.label}</p>
          <p className={styles.infoHint}>{categoryMeta.description}</p>
        </div>
      </div>

      {/* Description */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.description}>{metric.description}</p>
      </section>

      {/* Formula (if available) */}
      {metric.formula && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mathematical Formula</h2>
          <div className={`${styles.formulaBox} ${styles[metric.category]}`}>
            <code className={styles.formula}>{metric.formula}</code>
          </div>
        </section>
      )}

      {/* Interpretation */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Interpretation Guide</h2>
        <div className={`${styles.interpretationBox} ${styles[metric.category]}`}>
          <p className={styles.interpretation}>{metric.interpretation}</p>
        </div>
      </section>

      {/* Related Metrics */}
      {relatedMetrics.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Related Metrics</h2>
          <p className={styles.sectionSubtitle}>
            Other metrics in the {categoryMeta.label} category
          </p>
          <div className={styles.relatedGrid}>
            {relatedMetrics.map(related => (
              <Link
                key={related.id}
                href={`/metrics/${related.id}`}
                className={`${styles.relatedCard} ${styles[related.category]}`}
              >
                <div className={styles.relatedHeader}>
                  <h3 className={styles.relatedName}>{related.shortName}</h3>
                  <span className={`${styles.relatedIcon} ${styles[related.category]}`}>
                    {getMetricDirectionIcon(related.betterDirection)}
                  </span>
                </div>
                <p className={styles.relatedDescription}>{related.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}