'use client';

import { useState, useEffect } from 'react';
import { Dataset } from '@/types/models';
import { loadDatasets, searchDatasets } from '@/lib/dataLoader';
import { DatasetCard } from '@/components/DatasetCard';
import { Search } from 'lucide-react';
import styles from '../pages.module.css';

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
      <div className={styles.loadingState}>
        <div className={styles.loadingText}>Loading datasets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className={styles.pageTitle}>Datasets</h1>
        <p className={styles.pageSubtitle}>
          Browse {datasets.length} single-cell datasets used for benchmarking
        </p>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search datasets by title, accession, tissue, author, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Type Filters */}
        <div className={styles.filterButtons}>
          <button
            onClick={() => setSelectedDataType(null)}
            className={`${styles.filterButton} ${selectedDataType === null ? styles.active : ''}`}
          >
            All Types ({datasets.length})
          </button>
          <button
            onClick={() => setSelectedDataType('RNA')}
            className={`${styles.filterButton} ${selectedDataType === 'RNA' ? styles.active : ''}`}
            data-color="blue"
            style={selectedDataType === 'RNA' ? { backgroundColor: '#3b82f6', color: 'white' } : {}}
          >
            scRNA-seq ({rnaCount})
          </button>
          <button
            onClick={() => setSelectedDataType('ATAC')}
            className={`${styles.filterButton} ${selectedDataType === 'ATAC' ? styles.active : ''}`}
            data-color="purple"
            style={selectedDataType === 'ATAC' ? { backgroundColor: '#8b5cf6', color: 'white' } : {}}
          >
            scATAC-seq ({atacCount})
          </button>
        </div>
      </section>

      {/* Results Count */}
      <p className={styles.resultsCount}>
        Showing {filteredDatasets.length} of {datasets.length} datasets
      </p>

      {/* Datasets Grid */}
      {filteredDatasets.length > 0 ? (
        <div className={styles.grid2}>
          {filteredDatasets.map(dataset => (
            <DatasetCard key={`${dataset.dataType}-${dataset.id}`} dataset={dataset} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No datasets found matching your search
          </p>
        </div>
      )}
    </div>
  );
}