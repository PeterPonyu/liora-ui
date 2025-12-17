import Link from 'next/link';
import { Metric } from '@/types/models';
import { getMetricDirectionIcon } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import styles from './MetricCard.module.css';

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Link
      href={`/metrics/${metric.id}`}
      className={`${styles.card} ${styles[metric.category]}`}
    >
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{metric.shortName}</h3>
          <p className={styles.subtitle}>{metric.name}</p>
        </div>
        <div className={`${styles.direction} ${styles[metric.category]}`}>
          <span>{getMetricDirectionIcon(metric.betterDirection)}</span>
        </div>
      </div>

      {/* Description */}
      <p className={styles.description}>{metric.description}</p>

      {/* Range & Direction */}
      <div className={styles.rangeBox}>
        <div className={styles.rangeContent}>
          <span className={styles.rangeText}>
            {metric.range
              ? `Range: [${metric.range.min}, ${metric.range.max ?? '∞'}]`
              : 'Custom range'}
          </span>
          <span className={`${styles.rangeBetter} ${styles[metric.category]}`}>
            {metric.betterDirection === 'higher' ? 'Higher better' : 'Lower better'}
          </span>
        </div>
      </div>

      {/* Category Badge */}
      <div className={styles.footer}>
        <span className={`${styles.badge} ${styles[metric.category]}`}>
          {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}
        </span>
        <ChevronRight className={styles.chevron} />
      </div>
    </Link>
  );
}