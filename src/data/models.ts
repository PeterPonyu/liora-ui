import { Model, ModelCategory } from '@/types/models';
import { predictiveModels } from './models/predictive';
import { generativeModels } from './models/generative';
import { atacSpecificModels } from './models/atac-specific';
import { trajectoryModels } from './models/trajectory';
import { gaussianGeometricModels } from './models/gaussian-geometric';
import { disentanglementModels } from './models/disentanglement';

// Combine all models
export const modelsData: Model[] = [
  ...predictiveModels,
  ...generativeModels,
  ...atacSpecificModels,
  ...trajectoryModels,
  ...gaussianGeometricModels,
  ...disentanglementModels,
];

export function getModelById(id: string): Model | undefined {
  return modelsData.find(m => m.id === id);
}

export function getModelsByCategory(category: ModelCategory): Model[] {
  return modelsData.filter(m => m.category === category);
}

export function getModelsByModality(modality: 'rna' | 'atac'): Model[] {
  return modelsData.filter(m => m.modalitySupport.includes(modality));
}

export function searchModels(query: string): Model[] {
  const lowerQuery = query.toLowerCase();
  return modelsData.filter(m =>
    m.name.toLowerCase().includes(lowerQuery) ||
    m.displayName.toLowerCase().includes(lowerQuery) ||
    m.description.toLowerCase().includes(lowerQuery) ||
    m.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Category metadata
export const modelCategories = [
  {
    id: 'predictive' as const,
    label: 'Predictive Models',
    description: 'Encoder-only models without decoder reconstruction (contrastive learning)',
    count: predictiveModels.length,
  },
  {
    id: 'generative' as const,
    label: 'Generative Models',
    description: 'VAE/autoencoder models with encoder + decoder reconstruction (general VAE class)',
    count: generativeModels.length,
  },
  {
    id: 'trajectory' as const,
    label: 'Trajectory Inference Models',
    description: 'VAE models specialized for developmental trajectory and pseudo-time inference',
    count: trajectoryModels.length,
  },
  {
    id: 'atac-specific' as const,
    label: 'scATAC-Specific Models',
    description: 'VAE models specifically designed for chromatin accessibility data',
    count: atacSpecificModels.length,
  },
  {
    id: 'gaussian-geometric' as const,
    label: 'Gaussian Geometric Models',
    description: 'VAE models using geometric structures (hyperbolic, mixture models, learnable curvature)',
    count: gaussianGeometricModels.length,
  },
  {
    id: 'disentanglement' as const,
    label: 'Disentanglement Models',
    description: 'VAE models focused on learning disentangled factor representations',
    count: disentanglementModels.length,
  },
] as const;

// Statistics helper
export function getModelStats() {
  return {
    total: modelsData.length,
    byCategory: {
      predictive: predictiveModels.length,
      generative: generativeModels.length,
      trajectory: trajectoryModels.length,
      'atac-specific': atacSpecificModels.length,
      'gaussian-geometric': gaussianGeometricModels.length,
      disentanglement: disentanglementModels.length,
    },
    byModality: {
      rna: modelsData.filter(m => m.modalitySupport.includes('rna')).length,
      atac: modelsData.filter(m => m.modalitySupport.includes('atac')).length,
    },
    usedInLAIOR: modelsData.filter(m => m.usesInLAIOR).length,
    notImplemented: modelsData.filter(m => !m.usesInLAIOR).length,
  };
}

// Filter models by implementation status
export function getLAIORModels(): Model[] {
  return modelsData.filter(m => m.usesInLAIOR);
}

// Backward compatibility alias
export function getLioraModels(): Model[] {
  return getLAIORModels();
}

export function getExternalModels(): Model[] {
  return modelsData.filter(m => !m.usesInLAIOR);
}

// Filter by complexity
export function getModelsByComplexity(complexity: 'simple' | 'moderate' | 'complex'): Model[] {
  return modelsData.filter(m => m.complexity === complexity);
}

// Filter by interpretability
export function getModelsByInterpretability(interpretability: 'low' | 'medium' | 'high'): Model[] {
  return modelsData.filter(m => m.interpretability === interpretability);
}