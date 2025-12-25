// PATCH: Update ModelCategory type and remove benchmarkDatasets

export type ModelCategory = 
  | 'predictive' 
  | 'generative' 
  | 'atac-specific' 
  | 'gaussian-geometric' 
  | 'disentanglement'
  | 'trajectory';

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
  usesInLAIOR: boolean;
  modalitySupport: ('rna' | 'atac')[];
}

// ==================== DATASET TYPES (JSON-Based) ====================
export interface Dataset {
  id: number;
  title: string;
  species: string; // "Homo sapiens" or "Mus musculus"
  author: string;
  source: string; // Tissue/cell source
  platform: string; // Sequencing platform
  accession: string; // GSE accession
  description: string;
  dataType?: 'RNA' | 'ATAC'; // Added during loading, not in JSON
}

// ==================== METRIC TYPES ====================
export type MetricCategory = 'clustering' | 'embedding' | 'intrinsic' | 'runtime';
export type BetterDirection = 'higher' | 'lower' ;

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
  dataType: 'RNA' | 'ATAC'; // Benchmarks are modality-specific
  datasets: string[]; // All datasets of this modality
  models: string[]; // All models supporting this modality
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
  modalitySupport?: ('rna' | 'atac')[];
}

export interface SearchResults {
  models: Model[];
  datasets: Dataset[];
  metrics: Metric[];
}