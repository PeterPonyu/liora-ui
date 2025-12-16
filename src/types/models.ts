export type ModelCategory = 'unified' | 'external' | 'disentanglement';
export type DataType = 'RNA' | 'ATAC' | 'multimodal';
export type DataCategory = 'cancer' | 'development' | 'disease' | 'homeostatic';
export type Species = 'homo_sapiens' | 'mus_musculus' | 'danio_rerio' | 'other';

// ==================== MODEL TYPES ====================
export interface ModelLogic {
  title: string;
  description: string;
  mainIdea: string;
  keyComponents: {
    name: string;
    description: string;
  }[];
  mathematicalFormulation?: string;
  loss?: {
    name: string;
    formula: string;
  }[];
  dataFlow: string;
}

export interface ModelArchitecture {
  name: string;
  inputType: 'single-cell' | 'peak' | 'count' | 'mixed';
  outputType: 'latent' | 'clustering' | 'reconstruction' | 'factors' | 'trajectory';
  architectureType: string;
  keyLayers: string[];
  latentDim?: number;
}

export interface Publication {
  title: string;
  year: number;
  url?: string;
  authors?: string;
}

export interface Model {
  id: string;
  name: string;
  displayName: string;
  category: ModelCategory;
  description: string;
  logic: ModelLogic;
  architecture: ModelArchitecture;
  frameworks: string[];
  publications: Publication[];
  tags: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  interpretability: 'low' | 'medium' | 'high';
  usesInLiora: boolean;
  benchmarkDatasets: string[]; // IDs of datasets this model was benchmarked on
}

// ==================== DATASET TYPES ====================
export interface DatasetStats {
  cellCount: number;
  geneCount: number;
  hvgCount?: number; // highly variable genes used in benchmarking
  benchmarkCellCount?: number; // cells after preprocessing (usually 3000)
  platforms?: string[];
}

export interface Dataset {
  id: string;
  name: string;
  displayName: string;
  accession?: string; // GSE accession
  dataType: DataType;
  category: DataCategory;
  species: Species;
  tissues: string[];
  description: string;
  stats: DatasetStats;
  preprocessing: {
    hvgSelection: boolean;
    cellSampling: boolean;
    normalization: string;
  };
  benchmarkedModels: string[]; // Model IDs
}

// ==================== METRIC TYPES ====================
export type MetricCategory = 'clustering' | 'reduction' | 'intrinsic' | 'runtime';
export type BetterDirection = 'higher' | 'lower';

export interface Metric {
  id: string;
  name: string;
  shortName: string;
  category: MetricCategory;
  description: string;
  formula?: string;
  range?: {
    min: number;
    max: number | null;
  };
  betterDirection: BetterDirection;
  unit?: string;
  interpretation: string;
}

// ==================== BENCHMARK RESULT TYPES ====================
export interface BenchmarkResult {
  datasetId: string;
  modelId: string;
  metrics: {
    [metricId: string]: number | null;
  };
  timestamp?: string;
  notes?: string;
}

export interface BenchmarkSuite {
  id: string;
  name: string;
  description: string;
  datasets: string[]; // Dataset IDs
  models: string[]; // Model IDs
  metrics: string[]; // Metric IDs
  results: BenchmarkResult[];
  benchmarkDate: string;
}

// ==================== FILTERING & SEARCH ====================
export interface FilterOptions {
  categories?: ModelCategory[];
  dataTypes?: DataType[];
  dataCategories?: DataCategory[];
  species?: Species[];
  complexity?: ('simple' | 'moderate' | 'complex')[];
  interpretability?: ('low' | 'medium' | 'high')[];
}

export interface SearchResults {
  models: Model[];
  datasets: Dataset[];
  metrics: Metric[];
}
