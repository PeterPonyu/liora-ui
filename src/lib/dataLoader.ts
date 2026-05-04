import { Dataset } from '@/types/models';
import scRNAData from '@/data/scRNA.json';
import scATACData from '@/data/scATAC.json';

let cachedDatasets: Dataset[] | null = null;

function buildDatasets(): Dataset[] {
  const rnaDatasets: Dataset[] = scRNAData.datasets.map((d: Dataset) => ({
    ...d,
    dataType: 'RNA' as const,
  }));

  const atacDatasets: Dataset[] = scATACData.datasets.map((d: Dataset) => ({
    ...d,
    dataType: 'ATAC' as const,
  }));

  return [...rnaDatasets, ...atacDatasets];
}

export function loadDatasetsSync(): Dataset[] {
  if (cachedDatasets) return cachedDatasets;

  try {
    cachedDatasets = buildDatasets();
    return cachedDatasets;
  } catch (error) {
    console.error('Failed to load datasets:', error);
    return [];
  }
}

/**
 * Load and merge datasets from both JSON files
 * Adds dataType based on source file
 */
export async function loadDatasets(): Promise<Dataset[]> {
  return loadDatasetsSync();
}

/**
 * Get dataset by slug (e.g. "rna-1", "atac-1") to avoid id collisions
 * between RNA and ATAC datasets that share the same numeric id.
 * Falls back to first numeric match if no type prefix is present.
 */
export async function getDatasetById(slug: string | number): Promise<Dataset | undefined> {
  const datasets = await loadDatasets();
  if (typeof slug === 'number') {
    return datasets.find(d => d.id === slug);
  }
  const parts = slug.split('-');
  const numericPart = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  const numId = parseInt(numericPart, 10);
  if (Number.isNaN(numId)) return undefined;
  if (parts.length > 1) {
    const typePrefix = parts.slice(0, -1).join('-').toUpperCase();
    const typed = datasets.find(d => d.id === numId && d.dataType === typePrefix);
    if (typed) return typed;
  }
  return datasets.find(d => d.id === numId);
}

/**
 * Get all dataset IDs for static generation
 */
export async function getAllDatasetIds(): Promise<string[]> {
  const datasets = await loadDatasets();
  return datasets.map(d => `${d.dataType?.toLowerCase() || 'rna'}-${d.id}`);
}

/**
 * Filter datasets by type
 */
export async function getDatasetsByType(type: 'RNA' | 'ATAC'): Promise<Dataset[]> {
  const datasets = await loadDatasets();
  return datasets.filter(d => d.dataType === type);
}

/**
 * Search datasets
 */
export function searchDatasets(datasets: Dataset[], query: string): Dataset[] {
  if (!query) return datasets;
  
  const lowerQuery = query.toLowerCase();
  return datasets.filter(d =>
    d.title.toLowerCase().includes(lowerQuery) ||
    d.accession.toLowerCase().includes(lowerQuery) ||
    d.description.toLowerCase().includes(lowerQuery) ||
    d.source.toLowerCase().includes(lowerQuery) ||
    d.author.toLowerCase().includes(lowerQuery) ||
    d.species.toLowerCase().includes(lowerQuery)
  );
}
