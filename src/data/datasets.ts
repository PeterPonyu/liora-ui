import { Dataset } from '@/types/models';

export const datasetsRna: Dataset[] = [
  {
    id: 'gse117988_bone_marrow',
    name: 'GSE117988',
    displayName: 'Multi-Patient Bone Marrow',
    accession: 'GSE117988',
    dataType: 'RNA',
    category: 'cancer',
    species: 'homo_sapiens',
    tissues: ['Bone Marrow'],
    description: 'Single-cell transcriptomics from bone marrow of multiple cancer patients',
    stats: {
      cellCount: 40231,
      geneCount: 18492,
      hvgCount: 3000,
      benchmarkCellCount: 3000,
      platforms: ['Illumina NovaSeq'],
    },
    preprocessing: {
      hvgSelection: true,
      cellSampling: true,
      normalization: 'Log normalization (10^4 target sum)',
    },
    benchmarkedModels: ['scvi', 'sivae', 'scalex', 'cellblast', 'gmvae-pgm', 'gmvae-poincare', 'gmvae-hw', 'scdiffusion', 'scdac', 'scsmd', 'clear', 'scdhmap', 'scdeepcluster', 'liora'],
  },
  {
    id: 'gse148938_lung',
    name: 'GSE148938',
    displayName: 'Lung Tissue',
    accession: 'GSE148938',
    dataType: 'RNA',
    category: 'development',
    species: 'mus_musculus',
    tissues: ['Lung'],
    description: 'Developmental trajectory of lung epithelial cells',
    stats: {
      cellCount: 28752,
      geneCount: 17500,
      hvgCount: 3000,
      benchmarkCellCount: 3000,
      platforms: ['Illumina NextSeq'],
    },
    preprocessing: {
      hvgSelection: true,
      cellSampling: true,
      normalization: 'Log normalization (10^4 target sum)',
    },
    benchmarkedModels: ['scvi', 'sivae', 'scalex', 'cellblast', 'gmvae-pgm', 'gmvae-poincare', 'gmvae-hw', 'scdiffusion', 'scdac', 'scsmd', 'clear', 'scdhmap', 'scdeepcluster', 'liora'],
  },
  {
    id: 'gse124295_immune',
    name: 'GSE124295',
    displayName: 'Immune Cells (CD8+ T cells)',
    accession: 'GSE124295',
    dataType: 'RNA',
    category: 'homeostatic',
    species: 'mus_musculus',
    tissues: ['Blood', 'Lymphoid Tissue'],
    description: 'CD8+ T cell activation and differentiation',
    stats: {
      cellCount: 15234,
      geneCount: 16000,
      hvgCount: 3000,
      benchmarkCellCount: 3000,
      platforms: ['Illumina HiSeq'],
    },
    preprocessing: {
      hvgSelection: true,
      cellSampling: true,
      normalization: 'Log normalization (10^4 target sum)',
    },
    benchmarkedModels: ['scvi', 'sivae', 'scalex', 'cellblast', 'gmvae-pgm', 'gmvae-poincare', 'gmvae-hw', 'scdiffusion', 'scdac', 'scsmd', 'clear', 'scdhmap', 'scdeepcluster', 'liora'],
  },
  {
    id: 'gse132488_brain',
    name: 'GSE132488',
    displayName: 'Brain - Dentate Gyrus',
    accession: 'GSE132488',
    dataType: 'RNA',
    category: 'homeostatic',
    species: 'mus_musculus',
    tissues: ['Brain'],
    description: 'Mature neurons and immature neurons in dentate gyrus',
    stats: {
      cellCount: 8524,
      geneCount: 15000,
      hvgCount: 3000,
      benchmarkCellCount: 3000,
      platforms: ['Illumina NextSeq'],
    },
    preprocessing: {
      hvgSelection: true,
      cellSampling: true,
      normalization: 'Log normalization (10^4 target sum)',
    },
    benchmarkedModels: ['scvi', 'sivae', 'scalex', 'cellblast', 'gmvae-pgm', 'gmvae-poincare', 'gmvae-hw', 'scdiffusion', 'scdac', 'scsmd', 'clear', 'scdhmap', 'scdeepcluster', 'liora'],
  },
  {
    id: 'gse137710_cancer_breast',
    name: 'GSE137710',
    displayName: 'Breast Cancer Tumor',
    accession: 'GSE137710',
    dataType: 'RNA',
    category: 'cancer',
    species: 'homo_sapiens',
    tissues: ['Breast Tissue'],
    description: 'Single-cell transcriptomics of breast tumor microenvironment',
    stats: {
      cellCount: 35800,
      geneCount: 18000,
      hvgCount: 3000,
      benchmarkCellCount: 3000,
      platforms: ['Illumina NovaSeq'],
    },
    preprocessing: {
      hvgSelection: true,
      cellSampling: true,
      normalization: 'Log normalization (10^4 target sum)',
    },
    benchmarkedModels: ['scvi', 'sivae', 'scalex', 'cellblast', 'gmvae-pgm', 'gmvae-poincare', 'gmvae-hw', 'scdiffusion', 'scdac', 'scsmd', 'clear', 'scdhmap', 'scdeepcluster', 'liora'],
  },
];

export const datasetsAtac: Dataset[] = [
  {
    id: 'gse139369_atac_epi',
    name: 'GSE139369',
    displayName: 'ATAC - Epigenomics (ESC Diff)',
    accession: 'GSE139369',
    dataType: 'ATAC',
    category: 'development',
    species: 'mus_musculus',
    tissues: ['Embryonic Stem Cells'],
    description: 'Chromatin accessibility during embryonic stem cell differentiation',
    stats: {
      cellCount: 12547,
      geneCount: 47159, // peaks in ATAC
      hvgCount: 3000,
      benchmarkCellCount: 3000,
      platforms: ['Illumina NextSeq'],
    },
    preprocessing: {
      hvgSelection: true,
      cellSampling: true,
      normalization: 'Binary accessibility matrix',
    },
    benchmarkedModels: ['peakvi', 'scdiffusion', 'clear', 'liora'],
  },
  {
    id: 'gse142088_atac_immune',
    name: 'GSE142088',
    displayName: 'ATAC - Immune (CD8+ T)',
    accession: 'GSE142088',
    dataType: 'ATAC',
    category: 'homeostatic',
    species: 'mus_musculus',
    tissues: ['Lymphoid Tissue'],
    description: 'Chromatin accessibility in CD8+ T cell differentiation',
    stats: {
      cellCount: 8932,
      geneCount: 45000,
      hvgCount: 3000,
      benchmarkCellCount: 3000,
      platforms: ['Illumina NextSeq'],
    },
    preprocessing: {
      hvgSelection: true,
      cellSampling: true,
      normalization: 'Binary accessibility matrix',
    },
    benchmarkedModels: ['peakvi', 'clear', 'liora'],
  },
];

export const allDatasets = [...datasetsRna, ...datasetsAtac];

export function getDatasetById(id: string): Dataset | undefined {
  return allDatasets.find(d => d.id === id);
}

export function getDatasetsByType(type: 'RNA' | 'ATAC' | 'multimodal'): Dataset[] {
  return allDatasets.filter(d => d.dataType === type);
}

export function getDatasetsByCategory(category: string): Dataset[] {
  return allDatasets.filter(d => d.category === category);
}

export function getDatasetsBySpecies(species: string): Dataset[] {
  return allDatasets.filter(d => d.species === species);
}
