'use client';

import { useState, useEffect } from 'react';
import { Dataset } from '@/types/models';
import { loadDatasets, searchDatasets } from '@/lib/dataLoader';
import { DatasetCard } from '@/components/DatasetCard';
import { Search } from 'lucide-react';

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataType, setSelectedDataType] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await loadDatasets();
      setDatasets(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredDatasets = searchDatasets(datasets, searchQuery).filter(dataset => {
    const matchesDataType = !selectedDataType || dataset.dataType === selectedDataType;
    return matchesDataType;
  });

  const rnaCount = datasets.filter(d => d.dataType === 'RNA').length;
  const atacCount = datasets.filter(d => d.dataType === 'ATAC').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600 dark:text-slate-400">Loading datasets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Datasets
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Browse {datasets.length} single-cell datasets used for benchmarking
        </p>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search datasets by title, accession, tissue, author, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDataType(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDataType === null
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Types ({datasets.length})
          </button>
          <button
            onClick={() => setSelectedDataType('RNA')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDataType === 'RNA'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            scRNA-seq ({rnaCount})
          </button>
          <button
            onClick={() => setSelectedDataType('ATAC')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDataType === 'ATAC'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            scATAC-seq ({atacCount})
          </button>
        </div>
      </section>

      {/* Results Count */}
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing {filteredDatasets.length} of {datasets.length} datasets
      </p>

      {/* Datasets Grid */}
      {filteredDatasets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDatasets.map(dataset => (
            <DatasetCard key={`${dataset.dataType}-${dataset.id}`} dataset={dataset} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No datasets found matching your search
          </p>
        </div>
      )}
    </div>
  );
}