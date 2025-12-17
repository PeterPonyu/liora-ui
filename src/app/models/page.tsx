'use client';

import { useState } from 'react';
import { modelsData, modelCategories } from '@/data/models';
import { ModelCard } from '@/components/ModelCard';
import { Search, Filter } from 'lucide-react';
import { getCategoryColor, getCategoryMetadata } from '@/lib/utils';
import styles from '../pages.module.css';

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);

  const filteredModels = modelsData.filter(model => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || model.category === selectedCategory;
    
    const matchesModality = !selectedModality || 
      model.modalitySupport.includes(selectedModality as 'rna' | 'atac');

    return matchesSearch && matchesCategory && matchesModality;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-5">  {/* ✅ Changed from space-y-8 to space-y-5 */}
      {/* Header */}
      <section>
        <h1 className={styles.pageTitle}>Model Catalog</h1>
        <p className={styles.pageSubtitle}>
          Explore {modelsData.length} single-cell analysis models across 5 categories
        </p>
      </section>

      {/* Filters */}
      <section className="space-y-3">  {/* ✅ Changed from space-y-4 to space-y-3 */}
        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search models by name, description, or tags..."
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
              All Models ({modelsData.length})
            </button>
            {modelCategories.map(cat => {
              const metadata = getCategoryMetadata(cat.id as any);
              const color = getCategoryColor(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.filterButton} ${selectedCategory === cat.id ? styles.active : ''}`}
                  data-color={cat.id}
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

        {/* Modality Filters */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterLabel}>Filter by Modality</h3>
          <div className={styles.filterButtons}>
            <button
              onClick={() => setSelectedModality(null)}
              className={`${styles.filterButton} ${selectedModality === null ? styles.active : ''}`}
            >
              All Modalities
            </button>
            <button
              onClick={() => setSelectedModality('rna')}
              className={`${styles.filterButton} ${selectedModality === 'rna' ? styles.active : ''}`}
              data-color="emerald"
              style={selectedModality === 'rna' ? { backgroundColor: '#10b981', color: 'white' } : {}}
            >
              RNA ({modelsData.filter(m => m.modalitySupport.includes('rna')).length})
            </button>
            <button
              onClick={() => setSelectedModality('atac')}
              className={`${styles.filterButton} ${selectedModality === 'atac' ? styles.active : ''}`}
              data-color="amber"
              style={selectedModality === 'atac' ? { backgroundColor: '#f59e0b', color: 'white' } : {}}
            >
              ATAC ({modelsData.filter(m => m.modalitySupport.includes('atac')).length})
            </button>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <p className={styles.resultsCount}>
        Showing {filteredModels.length} of {modelsData.length} models
      </p>

      {/* Models Grid */}
      {filteredModels.length > 0 ? (
        <div className={styles.grid3}>
          {filteredModels.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No models found matching your filters
          </p>
          <p className={styles.emptyStateHint}>
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}