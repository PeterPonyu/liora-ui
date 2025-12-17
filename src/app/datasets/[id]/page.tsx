'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Dataset } from '@/types/models';
import { getDatasetById } from '@/lib/dataLoader';
import { getDataTypeLabel, getSpeciesLabel } from '@/lib/utils';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DatasetDetailPage() {
  const params = useParams();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDataset() {
      const idParam = params.id as string;
      // Parse ID from format: "rna-1" or "atac-2"
      const numericId = parseInt(idParam.split('-')[1]);
      
      const data = await getDatasetById(numericId);
      setDataset(data || null);
      setLoading(false);
    }
    
    loadDataset();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600 dark:text-slate-400">Loading dataset...</div>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-xl font-semibold text-slate-900 dark:text-white">Dataset not found</div>
        <Link href="/datasets" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
          ← Back to datasets
        </Link>
      </div>
    );
  }

  const { label: typeLabel, color: typeColor } = getDataTypeLabel(dataset.dataType || 'RNA');
  const gseUrl = `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${dataset.accession}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link 
        href="/datasets"
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to datasets
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {dataset.title}
          </h1>
          <span
            className="px-4 py-2 rounded text-sm font-semibold text-white whitespace-nowrap"
            style={{ backgroundColor: typeColor }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Accession with Link */}
        <a
          href={gseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          <span className="font-mono text-lg">{dataset.accession}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Species */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Species</h3>
          <p className="text-lg font-medium text-slate-900 dark:text-white italic">
            {getSpeciesLabel(dataset.species)}
          </p>
        </div>

        {/* Platform */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Platform</h3>
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            {dataset.platform}
          </p>
        </div>

        {/* Source */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Source</h3>
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            {dataset.source}
          </p>
        </div>

        {/* Author */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Author(s)</h3>
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            {dataset.author}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Description</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {dataset.description}
        </p>
      </div>

      {/* External Links */}
      <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">External Resources</h2>
        <a
          href={gseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
        >
          View on GEO
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}