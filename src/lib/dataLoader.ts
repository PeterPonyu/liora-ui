import { Dataset } from '@/types/models';

let cachedDatasets: Dataset[] | null = null;

/**
 * Load and merge datasets from both JSON files
 * Adds dataType based on source file
 */
export async function loadDatasets(): Promise<Dataset[]> {
  if (cachedDatasets) return cachedDatasets;

  try {
    const [rnaResponse, atacResponse] = await Promise.all([
      fetch('/scRNA.json'),
      fetch('/scATAC.json'),
    ]);

    const rnaData = await rnaResponse.json();
    const atacData = await atacResponse.json();

    const rnaDatasets: Dataset[] = rnaData.datasets.map((d: Dataset) => ({
      ...d,
      dataType: 'RNA' as const,
    }));

    const atacDatasets: Dataset[] = atacData.datasets.map((d: Dataset) => ({
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