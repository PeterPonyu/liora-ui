import { Model, ModelCategory, Dataset, Metric, MetricCategory } from '@/types/models';

// Color utilities for categories
export function getCategoryColor(category: ModelCategory | string): string {
  switch (category) {
    case 'unified':
      return '#6366f1';
    case 'external':
      return '#14b8a6';
    case 'disentanglement':
      return '#f43f5e';
    default:
      return '#64748b';
  }
}

export function getCategoryBgColor(category: ModelCategory | string): string {
  switch (category) {
    case 'unified':
      return '#eef2ff';
    case 'external':
      return '#f0fdfa';
    case 'disentanglement':
      return '#ffe4e6';
    default:
      return '#f1f5f9';
  }
}

export function getCategoryBorderColor(category: ModelCategory | string): string {
  switch (category) {
    case 'unified':
      return '#c7d2fe';
    case 'external':
      return '#7ee8df';
    case 'disentanglement':
      return '#fbcfe8';
    default:
      return '#cbd5e1';
  }
}

export function getCategoryTextColor(category: ModelCategory | string): string {
  switch (category) {
    case 'unified':
      return '#4338ca';
    case 'external':
      return '#0d9488';
    case 'disentanglement':
      return '#9f103f';
    default:
      return '#475569';
  }
}

// Complexity and interpretability indicators
export function getComplexityColor(level: string): string {
  switch (level) {
    case 'simple':
      return '#22c55e';
    case 'moderate':
      return '#f59e0b';
    case 'complex':
      return '#ef4444';
    default:
      return '#6b7280';
  }
}

export function getInterpretabilityColor(level: string): string {
  switch (level) {
    case 'low':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'high':
      return '#22c55e';
    default:
      return '#6b7280';
  }
}

// Metric direction indicator
export function getMetricDirectionIcon(direction: 'higher' | 'lower'): string {
  return direction === 'higher' ? '↑' : '↓';
}

export function formatMetricValue(value: number | null | undefined, metric?: Metric): string {
  if (value === null || value === undefined) return 'N/A';
  
  if (metric?.unit) {
    return `${value.toFixed(2)} ${metric.unit}`;
  }
  
  if (value > 100) {
    return value.toFixed(0);
  }
  
  return value.toFixed(3);
}

// Data type icons and labels
export function getDataTypeLabel(type: string): { label: string; color: string } {
  switch (type) {
    case 'RNA':
      return { label: 'scRNA-seq', color: '#3b82f6' };
    case 'ATAC':
      return { label: 'scATAC-seq', color: '#8b5cf6' };
    case 'multimodal':
      return { label: 'Multimodal', color: '#06b6d4' };
    default:
      return { label: type, color: '#6b7280' };
  }
}

// Species display
export function getSpeciesLabel(species: string): string {
  switch (species) {
    case 'homo_sapiens':
      return 'Homo sapiens';
    case 'mus_musculus':
      return 'Mus musculus';
    case 'danio_rerio':
      return 'Danio rerio';
    default:
      return species;
  }
}

// Format numbers for display
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
}

// Normalize metric values for comparison (0-1 scale)
export function normalizeMetricValue(value: number, metric: Metric): number {
  if (!metric.range) return value;
  
  const { min, max } = metric.range;
  if (max === null) {
    // Open-ended range - normalize with log scale for large values
    const normalized = Math.min(1, value / 100);
    return metric.betterDirection === 'higher' ? normalized : 1 - normalized;
  }
  
  let normalized = (value - min) / (max - min);
  normalized = Math.max(0, Math.min(1, normalized));
  
  return metric.betterDirection === 'lower' ? 1 - normalized : normalized;
}

// Get rank color based on normalized value
export function getRankColor(normalized: number): string {
  if (normalized >= 0.8) return '#22c55e'; // green
  if (normalized >= 0.6) return '#84cc16'; // lime
  if (normalized >= 0.4) return '#eab308'; // yellow
  if (normalized >= 0.2) return '#f97316'; // orange
  return '#ef4444'; // red
}

// Dataset stats formatter
export function getDatasetStatsDescription(dataset: Dataset): string {
  const { cellCount, geneCount, benchmarkCellCount } = dataset.stats;
  return `${formatNumber(cellCount)} cells • ${formatNumber(geneCount)} features${
    benchmarkCellCount ? ` (${formatNumber(benchmarkCellCount)} benchmarked)` : ''
  }`;
}

// Model frameworks badge
export function getFrameworkColor(framework: string): string {
  switch (framework.toLowerCase()) {
    case 'pytorch':
      return '#ee4c2c';
    case 'jax':
      return '#0066cc';
    case 'tensorflow':
      return '#ff6f00';
    default:
      return '#6b7280';
  }
}

// Search and filter utilities
export function highlightSearchText(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function filterModels(
  models: Model[],
  query: string,
  categories?: ModelCategory[]
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
  
  return filtered;
}

export function filterDatasets(
  datasets: Dataset[],
  query: string,
  dataTypes?: string[],
  species?: string[]
): Dataset[] {
  let filtered = datasets;
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(lowerQuery) ||
      d.displayName.toLowerCase().includes(lowerQuery) ||
      d.description.toLowerCase().includes(lowerQuery) ||
      d.tissues.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }
  
  if (dataTypes && dataTypes.length > 0) {
    filtered = filtered.filter(d => dataTypes.includes(d.dataType));
  }
  
  if (species && species.length > 0) {
    filtered = filtered.filter(d => species.includes(d.species));
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
