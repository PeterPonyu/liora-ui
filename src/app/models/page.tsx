'use client';

import { useState } from 'react';
import { modelsData } from '@/data/models';
import { ModelCard } from '@/components/ModelCard';
import { Search } from 'lucide-react';

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredModels = modelsData.filter(model => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || model.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'unified', label: 'Unified Models', color: '#6366f1' },
    { id: 'external', label: 'External Models', color: '#14b8a6' },
    { id: 'disentanglement', label: 'Disentanglement', color: '#f43f5e' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Model Catalog
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Explore {modelsData.length} models: unified architectures, external tools, and disentanglement methods
        </p>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search models by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === null
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Models ({modelsData.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              style={
                selectedCategory === cat.id ? { backgroundColor: cat.color } : {}
              }
            >
              {cat.label} ({modelsData.filter(m => m.category === cat.id).length})
            </button>
          ))}
        </div>
      </section>

      {/* Results Count */}
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing {filteredModels.length} of {modelsData.length} models
      </p>

      {/* Models Grid */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No models found matching your search
          </p>
        </div>
      )}
    </div>
  );
}
