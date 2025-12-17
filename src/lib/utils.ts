import { Model, ModelCategory, Dataset, Metric, MetricCategory } from '@/types/models';

// ==================== COLOR UTILITIES FOR NEW CATEGORIES ====================

/**
 * Get primary category color (for badges, text, borders)
 * WCAG AA Compliant: Ensures 4.5:1 contrast ratio
 */
export function getCategoryColor(category: ModelCategory | string): string {
  switch (category) {
    case 'predictive':
      return '#3b82f6'; // blue-500
    case 'generative':
      return '#8b5cf6'; // purple-500
    case 'atac-specific':
      return '#ec4899'; // pink-500
    case 'gaussian-geometric':
      return '#14b8a6'; // teal-500
    case 'disentanglement':
      return '#f43f5e'; // rose-500
    default:
      return '#64748b'; // slate-500
  }
}

/**
 * Get category background color (light mode)
 * Safe for use in light theme only
 */
export function getCategoryBgColor(category: ModelCategory | string): string {
  switch (category) {
    case 'predictive':
      return '#eff6ff'; // blue-50
    case 'generative':
      return '#f5f3ff'; // purple-50
    case 'atac-specific':
      return '#fdf2f8'; // pink-50
    case 'gaussian-geometric':
      return '#f0fdfa'; // teal-50
    case 'disentanglement':
      return '#fff1f2'; // rose-50
    default:
      return '#f8fafc'; // slate-50
  }
}

/**
 * Get category border color
 * Use for card borders in both light and dark mode
 */
export function getCategoryBorderColor(category: ModelCategory | string): string {
  switch (category) {
    case 'predictive':
      return '#3b82f6'; // blue-500
    case 'generative':
      return '#8b5cf6'; // purple-500
    case 'atac-specific':
      return '#ec4899'; // pink-500
    case 'gaussian-geometric':
      return '#14b8a6'; // teal-500
    case 'disentanglement':
      return '#f43f5e'; // rose-500
    default:
      return '#cbd5e1'; // slate-300
  }
}

/**
 * Get category text color for dark backgrounds
 * Ensures readability on colored backgrounds
 */
export function getCategoryTextColor(category: ModelCategory | string): string {
  switch (category) {
    case 'predictive':
      return '#1e40af'; // blue-800
    case 'generative':
      return '#5b21b6'; // purple-800
    case 'atac-specific':
      return '#9f1239'; // pink-800
    case 'gaussian-geometric':
      return '#115e59'; // teal-800
    case 'disentanglement':
      return '#9f1239'; // rose-800
    default:
      return '#475569'; // slate-600
  }
}

/**
 * Get category background color for dark mode
 * Uses low opacity for subtle appearance
 */
export function getCategoryDarkBgColor(category: ModelCategory | string): string {
  switch (category) {
    case 'predictive':
      return 'rgb(30 58 138 / 0.2)'; // blue-900/20
    case 'generative':
      return 'rgb(88 28 135 / 0.2)'; // purple-900/20
    case 'atac-specific':
      return 'rgb(157 23 77 / 0.2)'; // pink-900/20
    case 'gaussian-geometric':
      return 'rgb(19 78 74 / 0.2)'; // teal-900/20
    case 'disentanglement':
      return 'rgb(159 18 57 / 0.2)'; // rose-900/20
    default:
      return 'rgb(55 65 81 / 0.2)'; // slate-600/20
  }
}

// ==================== MODALITY COLORS ====================

export function getModalityColor(modality: 'rna' | 'atac'): string {
  switch (modality) {
    case 'rna':
      return '#16a34a'; // green-600
    case 'atac':
      return '#22c55e'; // green-500
    default:
      return '#6b7280';
  }
}

export function getModalityBgColor(modality: 'rna' | 'atac'): string {
  switch (modality) {
    case 'rna':
      return '#dcfce7'; // green-100
    case 'atac':
      return '#dcfce7'; // green-100
    default:
      return '#f3f4f6';
  }
}

export function getModalityLabel(modality: 'rna' | 'atac' | string): string {
  switch (modality) {
    case 'rna':
      return 'RNA';
    case 'atac':
      return 'ATAC';
    default:
      return modality.toUpperCase();
  }
}

// ==================== COMPLEXITY & INTERPRETABILITY ====================

export function getComplexityColor(level: string): string {
  switch (level) {
    case 'simple':
      return '#15803d'; // green-700
    case 'moderate':
      return '#ea580c'; // orange-600
    case 'complex':
      return '#dc2626'; // red-600
    default:
      return '#6b7280';
  }
}

export function getInterpretabilityColor(level: string): string {
  switch (level) {
    case 'low':
      return '#dc2626'; // red-600
    case 'medium':
      return '#ea580c'; // orange-600
    case 'high':
      return '#15803d'; // green-700
    default:
      return '#6b7280';
  }
}

// ==================== METRIC UTILITIES ====================

export function getMetricDirectionIcon(direction: 'higher' | 'lower'): string {
  return direction === 'higher' ? '↑' : '↓';
}

export function formatMetricValue(
  value: number | null | undefined,
  metric?: Metric
): string {
  if (value === null || value === undefined) return 'N/A';

  if (metric?.unit) {
    return `${value.toFixed(2)} ${metric.unit}`;
  }

  if (value > 100) {
    return value.toFixed(0);
  }

  return value.toFixed(3);
}

// ==================== DATA TYPE UTILITIES ====================

export function getDataTypeLabel(type: string): { label: string; color: string } {
  switch (type) {
    case 'RNA':
      return { label: 'scRNA-seq', color: '#16a34a' };
    case 'ATAC':
      return { label: 'scATAC-seq', color: '#f59e0b' };
    case 'multimodal':
      return { label: 'Multimodal', color: '#06b6d4' };
    default:
      return { label: type, color: '#6b7280' };
  }
}

// ==================== SPECIES DISPLAY ====================

export function getSpeciesLabel(species: string): string {
  // Handle both formats from JSON
  if (species === 'Homo sapiens' || species === 'homo_sapiens') {
    return 'Homo sapiens';
  }
  if (species === 'Mus musculus' || species === 'mus_musculus') {
    return 'Mus musculus';
  }
  if (species === 'Danio rerio' || species === 'danio_rerio') {
    return 'Danio rerio';
  }
  return species;
}


export function getSpeciesShortLabel(species: string): string {
  if (species === 'Homo sapiens' || species === 'homo_sapiens') {
    return 'Human';
  }
  if (species === 'Mus musculus' || species === 'mus_musculus') {
    return 'Mouse';
  }
  if (species === 'Danio rerio' || species === 'danio_rerio') {
    return 'Zebrafish';
  }
  return species;
}

// ==================== NUMBER FORMATTING ====================

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
}

// ==================== METRIC NORMALIZATION ====================

export function normalizeMetricValue(value: number, metric: Metric): number {
  if (!metric.range) return value;

  const { min, max } = metric.range;
  if (max === null) {
    const normalized = Math.min(1, value / 100);
    return metric.betterDirection === 'higher' ? normalized : 1 - normalized;
  }

  let normalized = (value - min) / (max - min);
  normalized = Math.max(0, Math.min(1, normalized));

  return metric.betterDirection === 'lower' ? 1 - normalized : normalized;
}

// ==================== RANK COLOR ====================

export function getRankColor(normalized: number): string {
  if (normalized >= 0.8) return '#15803d'; // green
  if (normalized >= 0.6) return '#84cc16'; // lime
  if (normalized >= 0.4) return '#eab308'; // yellow
  if (normalized >= 0.2) return '#f97316'; // orange
  return '#dc2626'; // red
}

// ==================== DATASET STATS ====================

export function getDatasetStatsDescription(dataset: Dataset): string {
  // Since JSON doesn't have stats, show available info
  return `${dataset.platform} • ${dataset.source}`;
}

export function getDatasetDisplayId(dataset: Dataset): string {
  return `${dataset.dataType}-${dataset.id}`;
}

// ==================== FRAMEWORK COLORS ====================

export function getFrameworkColor(framework: string): string {
  switch (framework.toLowerCase()) {
    case 'pytorch':
      return '#ee4c2c';
    case 'jax':
      return '#0066cc';
    case 'tensorflow':
      return '#ff6f00';
    case 'pytorch geometric':
      return '#a855f7';
    case 'scikit-learn':
      return '#f89939';
    default:
      return '#6b7280';
  }
}

// ==================== SEARCH & FILTER UTILITIES ====================

export function highlightSearchText(text: string, query: string): string {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function filterModels(
  models: Model[],
  query: string,
  categories?: ModelCategory[],
  modalities?: ('rna' | 'atac')[]
): Model[] {
  let filtered = models;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.displayName.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery) ||
      m.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  if (categories && categories.length > 0) {
    filtered = filtered.filter(m => categories.includes(m.category));
  }

  if (modalities && modalities.length > 0) {
    filtered = filtered.filter(m =>
      modalities.some(mod => m.modalitySupport.includes(mod))
    );
  }

  return filtered;
}

export function filterMetrics(
  metrics: Metric[],
  query: string,
  categories?: MetricCategory[]
): Metric[] {
  let filtered = metrics;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.shortName.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery)
    );
  }

  if (categories && categories.length > 0) {
    filtered = filtered.filter(m => categories.includes(m.category));
  }

  return filtered;
}

// ==================== CATEGORY METADATA ====================

export function getCategoryMetadata(category: ModelCategory) {
  const metadata = {
    predictive: {
      label: 'Predictive Models',
      description: 'Clustering, classification, imputation, and annotation',
      icon: '🎯',
    },
    generative: {
      label: 'Generative Models',
      description: 'Data synthesis, augmentation, and generation',
      icon: '✨',
    },
    'atac-specific': {
      label: 'scATAC-Specific',
      description: 'Chromatin accessibility and peak analysis',
      icon: '🧬',
    },
    'gaussian-geometric': {
      label: 'Gaussian Geometric',
      description: 'Hyperbolic, spherical, and mixture models',
      icon: '📐',
    },
    disentanglement: {
      label: 'Disentanglement',
      description: 'Independent factor learning and interpretability',
      icon: '🔍',
    },
  };

  return metadata[category] || {
    label: category,
    description: '',
    icon: '📊',
  };
}