import { Dataset } from '@/types/models';
import { getDataTypeLabel, getSpeciesLabel, getDatasetStatsDescription } from '@/lib/utils';
import Link from 'next/link';

export function DatasetCard({ dataset }: { dataset: Dataset }) {
  const { label: typeLabel, color: typeColor } = getDataTypeLabel(dataset.dataType);

  return (
    <Link href={`/datasets/${dataset.id}`}>
      <div
        className="h-full p-6 rounded-lg border transition-all hover:shadow-lg cursor-pointer"
        style={{
          borderColor: 'rgb(var(--border))',
          backgroundColor: 'rgb(var(--card))',
        }}
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold transition-colors" style={{ color: 'rgb(var(--text-primary))' }}>
              {dataset.displayName}
            </h3>
            <p className="text-xs mt-1 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
              {dataset.accession}
            </p>
          </div>
          <span
            className="px-3 py-1 rounded text-xs font-semibold text-white"
            style={{ backgroundColor: typeColor }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm mb-4 line-clamp-2 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
          {dataset.description}
        </p>

        {/* Stats */}
        <div
          className="mb-4 p-3 rounded transition-colors"
          style={{
            backgroundColor: 'rgb(var(--secondary))',
          }}
        >
          <p className="text-sm font-mono transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
            {getDatasetStatsDescription(dataset)}
          </p>
        </div>

        {/* Tissues */}
        <div className="flex flex-wrap gap-1 mb-3">
          {dataset.tissues.map(tissue => (
            <span
              key={tissue}
              className="text-xs px-2 py-1 rounded-full transition-colors"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: 'rgb(37, 99, 235)',
              }}
            >
              {tissue}
            </span>
          ))}
        </div>

        {/* Species & Category */}
        <div className="flex gap-2 text-xs">
          <span
            className="px-2 py-1 rounded transition-colors"
            style={{
              backgroundColor: 'rgb(var(--secondary))',
              color: 'rgb(var(--text-secondary))',
            }}
          >
            {getSpeciesLabel(dataset.species)}
          </span>
          <span
            className="px-2 py-1 rounded capitalize transition-colors"
            style={{
              backgroundColor: 'rgb(var(--secondary))',
              color: 'rgb(var(--text-secondary))',
            }}
          >
            {dataset.category}
          </span>
        </div>

        {/* Benchmarked Models Count */}
        <div
          className="mt-4 pt-4 border-t transition-colors"
          style={{ borderColor: 'rgb(var(--border))' }}
        >
          <p className="text-xs transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
            <span
              className="font-semibold transition-colors"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              {dataset.benchmarkedModels.length}
            </span>
            {' '}models benchmarked
          </p>
        </div>
      </div>
    </Link>
  );
}
