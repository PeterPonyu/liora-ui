import { Dataset } from '@/types/models';
import { getDataTypeLabel, getSpeciesLabel, getDatasetStatsDescription } from '@/lib/utils';
import Link from 'next/link';

export function DatasetCard({ dataset }: { dataset: Dataset }) {
  const { label: typeLabel, color: typeColor } = getDataTypeLabel(dataset.dataType || 'RNA');

  return (
    <Link href={`/datasets/${dataset.dataType?.toLowerCase()}-${dataset.id}`}>
      <div
        className="h-full p-6 rounded-lg border transition-all hover:shadow-lg cursor-pointer"
        style={{
          borderColor: 'rgb(var(--border))',
          backgroundColor: 'rgb(var(--card))',
        }}
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold transition-colors line-clamp-2" style={{ color: 'rgb(var(--text-primary))' }}>
              {dataset.title}
            </h3>
            <p className="text-xs mt-1 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
              {dataset.accession}
            </p>
          </div>
          <span
            className="px-3 py-1 rounded text-xs font-semibold text-white whitespace-nowrap"
            style={{ backgroundColor: typeColor }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm mb-4 line-clamp-3 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
          {dataset.description}
        </p>

        {/* Platform & Source */}
        <div
          className="mb-4 p-3 rounded transition-colors"
          style={{
            backgroundColor: 'rgb(var(--secondary))',
          }}
        >
          <p className="text-sm transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>
            {getDatasetStatsDescription(dataset)}
          </p>
        </div>

        {/* Source/Tissue */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span
            className="text-xs px-2 py-1 rounded-full transition-colors"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: 'rgb(37, 99, 235)',
            }}
          >
            {dataset.source}
          </span>
        </div>

        {/* Species & Author */}
        <div className="flex flex-col gap-2 text-xs">
          <span
            className="px-2 py-1 rounded transition-colors inline-block"
            style={{
              backgroundColor: 'rgb(var(--secondary))',
              color: 'rgb(var(--text-secondary))',
            }}
          >
            {getSpeciesLabel(dataset.species)}
          </span>
          <p
            className="text-xs italic transition-colors truncate"
            style={{ color: 'rgb(var(--text-secondary))' }}
            title={dataset.author}
          >
            {dataset.author}
          </p>
        </div>
      </div>
    </Link>
  );
}