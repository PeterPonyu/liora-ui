import { Metric } from '@/types/models';

export const metricsData: Metric[] = [
  // ==================== CLUSTERING METRICS ====================
  {
    id: 'nmi',
    name: 'Normalized Mutual Information',
    shortName: 'NMI',
    category: 'clustering',
    description: 'Measures the mutual information between predicted clusters and true labels, normalized by the entropy of the two distributions',
    formula: 'NMI(Y, Ŷ) = I(Y; Ŷ) / √(H(Y) * H(Ŷ))',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Range [0, 1]. 1 = perfect clustering match with ground truth. Symmetric, accounts for chance clustering.',
  },

  {
    id: 'ari',
    name: 'Adjusted Rand Index',
    shortName: 'ARI',
    category: 'clustering',
    description: 'Similarity between predicted and true clusters adjusted for chance',
    formula: 'ARI = (RI - E[RI]) / (max(RI) - E[RI])',
    range: { min: -1, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Range [-1, 1]. 1 = identical clusters, 0 = random clusters, -1 = opposite clusters. More robust to label permutations than NMI.',
  },

  {
    id: 'asw',
    name: 'Silhouette Score (Average)',
    shortName: 'ASW',
    category: 'clustering',
    description: 'Average silhouette coefficient measuring cluster cohesion and separation',
    formula: 'ASW = (1/n) * Σ(b_i - a_i) / max(a_i, b_i)',
    range: { min: -1, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Range [-1, 1]. 1 = well-separated clusters, 0 = overlapping clusters, -1 = incorrect assignments. Measures geometric cluster quality.',
  },

  {
    id: 'dav',
    name: 'Davies-Bouldin Index',
    shortName: 'DAV',
    category: 'clustering',
    description: 'Average similarity between each cluster and its most similar neighboring cluster',
    formula: 'DB = (1/k) * Σ max(r_ij), where r_ij = (s_i + s_j) / d(c_i, c_j)',
    range: { min: 0, max: null },
    betterDirection: 'lower',
    unit: 'arbitrary',
    interpretation: 'Lower is better. 0 = ideal separation. Biased toward globular clusters. Computationally cheaper than silhouette.',
  },

  {
    id: 'cal',
    name: 'Calinski-Harabasz Index',
    shortName: 'CAL',
    category: 'clustering',
    description: 'Ratio of between-cluster to within-cluster dispersion',
    formula: 'CH = (B / (k-1)) / (W / (n-k))',
    range: { min: 0, max: null },
    betterDirection: 'higher',
    interpretation: 'Higher is better. Assumes convex, isotropic clusters. Fast to compute. Biased toward many small clusters.',
  },

  {
    id: 'cor',
    name: 'Correlation-Based Distance',
    shortName: 'COR',
    category: 'clustering',
    description: 'Measure based on Pearson correlation of latent representations',
    formula: 'Uses pairwise correlations between cell latent vectors',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Measures biological structure preservation in latent space through correlation patterns.',
  },

  // ==================== DIMENSIONALITY REDUCTION METRICS ====================
  {
    id: 'q_local',
    name: 'Local Structure Preservation',
    shortName: 'Q_local',
    category: 'reduction',
    description: 'Quality of local neighborhood preservation in dimensionality reduction',
    formula: 'Based on K-NN graph preservation after reduction',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    unit: 'proportion',
    interpretation: 'Measures how well k-nearest neighbors in high-D are preserved in low-D (e.g., UMAP). 1 = perfect preservation.',
  },

  {
    id: 'q_global',
    name: 'Global Structure Preservation',
    shortName: 'Q_global',
    category: 'reduction',
    description: 'Quality of global distance relationships preservation',
    formula: 'Based on Spearman correlation of distance matrices',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Measures correlation of original vs. reduced distances. 1 = perfect global structure preservation.',
  },

  {
    id: 'distance_corr',
    name: 'Distance Correlation',
    shortName: 'Dist_Corr',
    category: 'reduction',
    description: 'Correlation between original high-dimensional and reduced low-dimensional distances',
    formula: 'Spearman or Pearson correlation of pairwise distance matrices',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'How well pairwise distances are preserved after reduction. 1 = perfect correlation.',
  },

  {
    id: 'k_max',
    name: 'Maximum K for Faithful Preservation',
    shortName: 'K_max',
    category: 'reduction',
    description: 'Largest k for which k-NN graph is preserved with high fidelity',
    formula: 'Maximum k where Jaccard similarity > threshold (~0.9)',
    range: { min: 1, max: 500 },
    betterDirection: 'higher',
    interpretation: 'Higher K_max indicates more reliable neighborhood structure at larger scales.',
  },

  {
    id: 'overall_quality_dr',
    name: 'Overall Dimensionality Reduction Quality',
    shortName: 'Overall_DR',
    category: 'reduction',
    description: 'Combined quality score for dimensionality reduction',
    formula: 'Weighted combination of local, global, and distance metrics',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Comprehensive quality metric combining multiple aspects of structure preservation.',
  },

  // ==================== INTRINSIC LATENT SPACE METRICS (LSE) ====================
  {
    id: 'manifold_dim',
    name: 'Manifold Dimensionality',
    shortName: 'Manifold_Dim',
    category: 'intrinsic',
    description: 'Effective dimensionality of the latent space (how much information is packed efficiently)',
    formula: 'Based on participation ratio of PCA components',
    range: { min: 1, max: 128 },
    betterDirection: 'lower',
    interpretation: 'Lower indicates more efficient dimensionality (less noise, more concentrated signal).',
  },

  {
    id: 'spectral_decay',
    name: 'Spectral Decay Rate',
    shortName: 'Spectral_Decay',
    category: 'intrinsic',
    description: 'How quickly information is concentrated in leading dimensions',
    formula: 'Exponential decay rate of eigenvalues',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Higher decay = information concentrated in few dimensions = cleaner representation.',
  },

  {
    id: 'participation_ratio',
    name: 'Participation Ratio',
    shortName: 'Part_Ratio',
    category: 'intrinsic',
    description: 'Ratio of effective to actual dimensionality (inverse of Shannon entropy of eigenvalues)',
    formula: '(Σ λ_i)² / Σ λ_i²',
    range: { min: 0, max: 1 },
    betterDirection: 'lower',
    unit: 'ratio',
    interpretation: 'Lower = fewer dimensions carry information = better compression. High value = information spread across dimensions.',
  },

  {
    id: 'anisotropy',
    name: 'Anisotropy Score',
    shortName: 'Anisotropy',
    category: 'intrinsic',
    description: 'Degree of directional bias in data (important for trajectory inference)',
    formula: 'Variance ratio of leading vs. orthogonal directions',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Higher = stronger directional bias = better for trajectory detection. Low = spherical distribution.',
  },

  {
    id: 'trajectory_directionality',
    name: 'Trajectory Directionality',
    shortName: 'Traj_Dir',
    category: 'intrinsic',
    description: 'Presence and strength of clear developmental/temporal axes',
    formula: 'Based on principal curve fitting and kurtosis',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'For trajectory data: 1 = clear trajectory, 0 = steady-state. Indicates data type fitness.',
  },

  {
    id: 'noise_resilience',
    name: 'Noise Resilience',
    shortName: 'Noise_Resilience',
    category: 'intrinsic',
    description: 'Robustness of structure to small perturbations (noise tolerance)',
    formula: 'Stability score under Gaussian perturbation',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Higher = structure more robust to measurement noise = reliable representation.',
  },

  {
    id: 'core_quality',
    name: 'Core Structure Quality',
    shortName: 'Core_Quality',
    category: 'intrinsic',
    description: 'Quality of central data structure (density and coherence)',
    formula: 'Based on local density and geometric properties',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Higher = cleaner core structure without spurious outliers.',
  },

  {
    id: 'overall_quality_intrin',
    name: 'Overall Intrinsic Latent Space Quality',
    shortName: 'Overall_LSE',
    category: 'intrinsic',
    description: 'Comprehensive quality metric for intrinsic latent space properties',
    formula: 'Weighted combination of all LSE metrics',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Holistic measure of latent space quality across all aspects.',
  },

  // ==================== RUNTIME METRICS ====================
  {
    id: 'training_time',
    name: 'Training Time',
    shortName: 'Train_Time',
    category: 'runtime',
    description: 'Total time to train the model on the dataset',
    formula: 'Wall-clock time for 400 epochs with early stopping',
    range: { min: 0, max: null },
    betterDirection: 'lower',
    unit: 'seconds',
    interpretation: 'Lower is better (faster training). Values typically 10-1000s depending on model and hardware.',
  },

  {
    id: 'inference_time',
    name: 'Inference Time',
    shortName: 'Inference_Time',
    category: 'runtime',
    description: 'Time to embed all cells through the trained encoder',
    formula: 'Wall-clock time for one forward pass through encoder',
    range: { min: 0, max: null },
    betterDirection: 'lower',
    unit: 'seconds',
    interpretation: 'Time to generate latent representations from data. Critical for interactive applications.',
  },
];

export function getMetricById(id: string): Metric | undefined {
  return metricsData.find(m => m.id === id);
}

export function getMetricsByCategory(category: string): Metric[] {
  return metricsData.filter(m => m.category === category);
}

export const metricCategories = [
  { id: 'clustering', label: 'Clustering Metrics', description: 'Quality of discovered cell type clusters', count: 6 },
  { id: 'reduction', label: 'Dimensionality Reduction', description: 'Visualization and structure preservation', count: 5 },
  { id: 'intrinsic', label: 'Intrinsic Latent Space', description: 'Internal representation quality (LSE)', count: 8 },
  { id: 'runtime', label: 'Runtime Performance', description: 'Computational efficiency', count: 2 },
];
