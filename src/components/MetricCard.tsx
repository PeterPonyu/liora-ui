'use client';

import { Metric } from '@/types/models';
import { 
  getMetricDirectionIcon, 
  getMetricCategoryColor, 
  getMetricCategoryBgColor 
} from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export function MetricCard({ metric }: { metric: Metric }) {
  const categoryColor = getMetricCategoryColor(metric.category);
  const categoryBg = getMetricCategoryBgColor(metric.category);

  return (
    <div
      className="p-6 rounded-lg border transition-all hover:shadow-lg cursor-pointer"
      style={{
        backgroundColor: categoryBg,
        borderColor: categoryColor,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold transition-colors" style={{ color: 'rgb(var(--text-primary))' }}>
            {metric.shortName}
          </h3>
          <p className="text-xs mt-1 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
            {metric.name}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="text-lg font-bold"
            style={{ color: categoryColor }}
          >
            {getMetricDirectionIcon(metric.betterDirection)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 line-clamp-2 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
        {metric.description}
      </p>

      {/* Range & Direction */}
      <div className="mb-4 p-3 rounded transition-colors" style={{ backgroundColor: 'rgba(var(--text-primary), 0.05)' }}>
        <div className="flex justify-between text-xs">
          <span className="transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
            {metric.range ? `Range: [${metric.range.min}, ${metric.range.max ?? '∞'}]` : 'Custom range'}
          </span>
          <span className="font-semibold" style={{ color: categoryColor }}>
            {metric.betterDirection === 'higher' ? 'Higher better' : 'Lower better'}
          </span>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex items-center justify-between">
        <span
          className="px-3 py-1 rounded text-xs font-semibold text-white"
          style={{ backgroundColor: categoryColor }}
        >
          {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}
        </span>
        <ChevronRight
          className="w-4 h-4 transition-colors"
          style={{ color: 'rgb(var(--text-secondary))' }}
        />
      </div>
    </div>
  );
}