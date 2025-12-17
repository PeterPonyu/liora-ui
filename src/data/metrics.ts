import { Metric } from '@/types/models';

export const metricsData: Metric[] = [
  // ==================== CLUSTERING METRICS (6) ====================
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

  // ==================== EMBEDDING QUALITY (UMAP + t-SNE = 8 metrics) ====================
  
  // UMAP-based metrics (4)
  {
    id: 'umap_distance_correlation',
    name: 'UMAP Distance Correlation',
    shortName: 'UMAP_Dist',
    category: 'embedding',
    description: 'Spearman correlation between latent space and UMAP-reduced pairwise distance matrices',
    formula: 'ρ = spearmanr(D_latent.flatten(), D_umap.flatten())',
    range: { min: -1, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Measures global structure preservation in UMAP visualization. 1 = perfect distance rank preservation.',
  },

  {
    id: 'umap_q_local',
    name: 'UMAP Local Structure Quality',
    shortName: 'UMAP_Q_local',
    category: 'embedding',
    description: 'Average coranking quality for local neighborhoods in UMAP space',
    formula: 'mean(Q_NX[1:K_max]) from coranking matrix',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: '1 = perfect local neighbor preservation. Measures how well UMAP preserves k-NN structure.',
  },

  {
    id: 'umap_q_global',
    name: 'UMAP Global Structure Quality',
    shortName: 'UMAP_Q_global',
    category: 'embedding',
    description: 'Average coranking quality for global relationships in UMAP space',
    formula: 'mean(Q_NX[K_max:]) from coranking matrix',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: '1 = perfect global structure preservation. Measures long-range distance fidelity in UMAP.',
  },

  {
    id: 'umap_overall_quality',
    name: 'UMAP Overall Embedding Quality',
    shortName: 'UMAP_Overall',
    category: 'embedding',
    description: 'Comprehensive UMAP quality combining distance correlation, local and global preservation',
    formula: 'mean(distance_correlation, Q_local, Q_global)',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: '≥0.8 = excellent, ≥0.6 = good, ≥0.4 = moderate, <0.4 = poor. Holistic UMAP quality measure.',
  },

  // t-SNE-based metrics (4)
  {
    id: 'tsne_distance_correlation',
    name: 't-SNE Distance Correlation',
    shortName: 'tSNE_Dist',
    category: 'embedding',
    description: 'Spearman correlation between latent space and t-SNE-reduced pairwise distance matrices',
    formula: 'ρ = spearmanr(D_latent.flatten(), D_tsne.flatten())',
    range: { min: -1, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Measures global structure preservation in t-SNE visualization. 1 = perfect distance rank preservation.',
  },

  {
    id: 'tsne_q_local',
    name: 't-SNE Local Structure Quality',
    shortName: 'tSNE_Q_local',
    category: 'embedding',
    description: 'Average coranking quality for local neighborhoods in t-SNE space',
    formula: 'mean(Q_NX[1:K_max]) from coranking matrix',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: '1 = perfect local neighbor preservation. Measures how well t-SNE preserves k-NN structure.',
  },

  {
    id: 'tsne_q_global',
    name: 't-SNE Global Structure Quality',
    shortName: 'tSNE_Q_global',
    category: 'embedding',
    description: 'Average coranking quality for global relationships in t-SNE space',
    formula: 'mean(Q_NX[K_max:]) from coranking matrix',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: '1 = perfect global structure preservation. Measures long-range distance fidelity in t-SNE.',
  },

  {
    id: 'tsne_overall_quality',
    name: 't-SNE Overall Embedding Quality',
    shortName: 'tSNE_Overall',
    category: 'embedding',
    description: 'Comprehensive t-SNE quality combining distance correlation, local and global preservation',
    formula: 'mean(distance_correlation, Q_local, Q_global)',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: '≥0.8 = excellent, ≥0.6 = good, ≥0.4 = moderate, <0.4 = poor. Holistic t-SNE quality measure.',
  },

  // ==================== INTRINSIC LATENT SPACE METRICS (8) ====================
  {
    id: 'manifold_dimensionality',
    name: 'Manifold Dimensionality Efficiency',
    shortName: 'Manifold_Dim',
    category: 'intrinsic',
    description: 'Multi-method dimensionality efficiency score combining variance thresholds, Kaiser criterion, elbow detection, and spectral decay',
    formula: 'mean(threshold_efficiencies, kaiser_efficiency, elbow_efficiency, decay_score)',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Higher = more efficient compression (fewer dimensions capture variance). 1 = ideal dimensionality concentration.',
  },

  {
    id: 'spectral_decay_rate',
    name: 'Spectral Decay Rate',
    shortName: 'Spectral_Decay',
    category: 'intrinsic',
    description: 'Rate of eigenvalue decay indicating information concentration in leading dimensions',
    formula: '0.6 * sigmoid(-slope_log_eigenvalues) + 0.4 * (λ₁ / Σλᵢ)',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Higher = faster exponential decay = information concentrated in few dimensions. Indicates dimensionality efficiency.',
  },

  {
    id: 'participation_ratio',
    name: 'Participation Ratio Score',
    shortName: 'Part_Ratio',
    category: 'intrinsic',
    description: 'Effective dimensionality measure from eigenvalue distribution (trajectory: lower is better, steady-state: higher is better)',
    formula: 'PR = (Σλᵢ)² / Σλᵢ²; Score = 1-PR (trajectory) or PR (steady-state)',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'For trajectory data: lower PR = information concentrated along developmental axis. For steady-state: higher PR = balanced representation.',
  },

  {
    id: 'anisotropy_score',
    name: 'Anisotropy Score',
    shortName: 'Anisotropy',
    category: 'intrinsic',
    description: 'Multi-method anisotropy combining log-ellipticity, condition numbers, ratio variance, entropy, dominance, and effective dimensionality',
    formula: 'Weighted combination: 0.25*ellipticity + 0.25*condition + 0.20*ratio_var + 0.15*entropy + 0.10*dominance + 0.05*eff_dim',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'High anisotropy = strong directional bias (good for trajectories). Low anisotropy = spherical distribution (good for steady-state).',
  },

  {
    id: 'trajectory_directionality',
    name: 'Trajectory Directionality',
    shortName: 'Traj_Dir',
    category: 'intrinsic',
    description: 'Dominance of primary developmental axis relative to other directions',
    formula: 'λ₁ / (1 + λ₁/Σλᵢ₊₁) from PCA eigenvalues',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'High = clear single developmental trajectory. Low = steady-state or multi-branched development. Data type indicator.',
  },

  {
    id: 'noise_resilience',
    name: 'Noise Resilience',
    shortName: 'Noise_Resil',
    category: 'intrinsic',
    description: 'Signal-to-noise ratio based on leading vs. trailing PCA components',
    formula: 'min(SNR/10, 1), where SNR = Σλ₁₋₂ / Σλ₃₊',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Higher = better noise filtering. Indicates robustness to technical variation and measurement errors.',
  },

  {
    id: 'core_quality',
    name: 'Core Latent Space Quality',
    shortName: 'Core_Quality',
    category: 'intrinsic',
    description: 'Fundamental quality score combining manifold, spectral, participation, and anisotropy metrics',
    formula: 'mean(manifold_dim, spectral_decay, participation_ratio, anisotropy)',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: 'Aggregate measure of geometric and topological properties. Foundation for overall quality assessment.',
  },

  {
    id: 'overall_quality_intrinsic',
    name: 'Overall Intrinsic Quality',
    shortName: 'Overall_LSE',
    category: 'intrinsic',
    description: 'Comprehensive latent space quality with data-type-aware weighting',
    formula: 'Trajectory: 0.5*core + 0.3*traj_dir + 0.2*noise; Steady-state: 0.7*core + 0.3*noise',
    range: { min: 0, max: 1 },
    betterDirection: 'higher',
    interpretation: '≥0.8 = excellent, ≥0.6 = good, ≥0.4 = moderate, <0.4 = needs improvement. Holistic latent space assessment.',
  },

  // ==================== RUNTIME METRICS (2) ====================
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
  { 
    id: 'clustering', 
    label: 'Clustering & Cell Type Discovery', 
    description: 'Supervised metrics comparing predicted clusters to ground truth labels', 
    count: 6 
  },
  { 
    id: 'embedding', 
    label: 'Embedding Quality (UMAP & t-SNE)', 
    description: 'Visualization quality via coranking analysis (4 metrics × 2 methods)', 
    count: 8 
  },
  { 
    id: 'intrinsic', 
    label: 'Intrinsic Latent Space (LSE)', 
    description: 'Unsupervised geometric, spectral, and topological properties', 
    count: 8 
  },
  { 
    id: 'runtime', 
    label: 'Computational Efficiency', 
    description: 'Training and inference performance', 
    count: 2 
  },
];