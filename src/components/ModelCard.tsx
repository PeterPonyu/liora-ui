import { Model } from '@/types/models';
import { getCategoryColor, getCategoryBgColor, getComplexityColor, getInterpretabilityColor } from '@/lib/utils';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export function ModelCard({ model }: { model: Model }) {
  const categoryColor = getCategoryColor(model.category);
  const categoryBg = getCategoryBgColor(model.category);

  return (
    <Link href={`/models/${model.id}`}>
      <div
        className="h-full p-6 rounded-lg border transition-all hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: categoryBg,
          borderColor: getCategoryColor(model.category),
        }}
      >
        {/* Category Badge */}
        <div className="mb-3 flex items-start justify-between">
          <span
            className="inline-block px-3 py-1 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: categoryColor }}
          >
            {model.category.charAt(0).toUpperCase() + model.category.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 transition-colors" style={{ color: 'rgb(var(--text-primary))' }}>
          {model.displayName}
        </h3>

        {/* Description */}
        <p className="text-sm mb-4 line-clamp-2 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
          {model.description}
        </p>

        {/* Complexity & Interpretability */}
        <div className="flex gap-4 mb-4 text-xs">
          <div>
            <span className="transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>Complexity:</span>
            <div
              className="font-semibold mt-1"
              style={{ color: getComplexityColor(model.complexity) }}
            >
              {'★'.repeat(['simple', 'moderate', 'complex'].indexOf(model.complexity) + 1)}
            </div>
          </div>
          <div>
            <span className="transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>Interpretability:</span>
            <div
              className="font-semibold mt-1"
              style={{ color: getInterpretabilityColor(model.interpretability) }}
            >
              {'★'.repeat(['low', 'medium', 'high'].indexOf(model.interpretability) + 1)}
            </div>
          </div>
        </div>

        {/* Frameworks */}
        <div className="flex flex-wrap gap-1 mb-4">
          {model.frameworks.map(fw => (
            <span
              key={fw}
              className="text-xs px-2 py-1 rounded transition-colors"
              style={{
                backgroundColor: 'rgb(var(--secondary))',
                color: 'rgb(var(--text-secondary))',
              }}
            >
              {fw}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {model.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full transition-colors"
              style={{
                backgroundColor: 'rgb(var(--secondary))',
                color: 'rgb(var(--text-secondary))',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* In Liora Badge */}
        {model.usesInLiora && (
          <div
            className="mt-4 pt-4 border-t transition-colors"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <span
              className="inline-block px-2 py-1 rounded text-xs font-semibold"
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: 'rgb(22, 163, 74)',
              }}
            >
              ✓ Used in Liora
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
