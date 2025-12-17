import { Dataset } from '@/types/models';
import scRNAData from '@/data/scRNA.json';
import scATACData from '@/data/scATAC.json';

let cachedDatasets: Dataset[] | null = null;

/**
 * Load and merge datasets from both JSON files
 * Adds dataType based on source file
 */
export async function loadDatasets(): Promise<Dataset[]> {
  if (cachedDatasets) return cachedDatasets;

  try {
    const rnaDatasets: Dataset[] = scRNAData.datasets.map((d: Dataset) => ({
      ...d,
      dataType: 'RNA' as const,
    }));

    const atacDatasets: Dataset[] = scATACData.datasets.map((d: Dataset) => ({
      ...d,
      dataType: 'ATAC' as const,
    }));

    cachedDatasets = [...rnaDatasets, ...atacDatasets];
    return cachedDatasets;
  } catch (error) {
    console.error('Failed to load datasets:', error);
    return [];
  }
}

/**
 * Get dataset by ID (searches both RNA and ATAC)
 */
export async function getDatasetById(id: number): Promise<Dataset | undefined> {
  const datasets = await loadDatasets();
  return datasets.find(d => d.id === id);
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