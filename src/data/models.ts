import { Model } from '@/types/models';

export const modelsData: Model[] = [
  // ==================== UNIFIED MODELS ====================
  {
    id: 'scdiffusion',
    name: 'scDiffusion',
    displayName: 'Diffusion-Based Generative Model',
    category: 'unified',
    description: 'Generative model using diffusion process for single-cell expression data',
    logic: {
      title: 'Denoising Diffusion Process',
      description: 'scDiffusion learns to gradually denoise corrupted cell expression by reversing a Markov chain. During training, it learns to transform noise into realistic single-cell data through iterative denoising steps.',
      mainIdea: 'Generate realistic single-cell data by learning the reverse of a noise diffusion process, enabling data augmentation and imputation',
      keyComponents: [
        {
          name: 'Forward Diffusion',
          description: 'Gradually add Gaussian noise to real data over T timesteps',
        },
        {
          name: 'Noise Predictor Network',
          description: 'Transformer-based network predicts noise added at each timestep',
        },
        {
          name: 'Reverse Process',
          description: 'Iteratively denoise from pure noise to generate new samples',
        },
        {
          name: 'Time Conditioning',
          description: 'Condition generation on diffusion timestep for control',
        },
      ],
      mathematicalFormulation: 'q(x_t|x_0) = √ᾱ_t x_0 + √(1-ᾱ_t) ε; ε_θ(x_t, t) learns to predict ε',
      loss: [
        { name: 'Denoising Loss', formula: '||ε - ε_θ(x_t, t)||²' },
      ],
      dataFlow: 'Real Data → Add Noise (T steps) → Noisy Data → Denoise Network → Predicted Noise → Reverse Process → Generated Data',
    },
    architecture: {
      name: 'Transformer-based Denoiser',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Denoising Diffusion Probabilistic Model (DDPM)',
      keyLayers: ['TransformerBlock', 'TimeEmbedding', 'LinearLayer'],
      latentDim: 128,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Denoising Diffusion Probabilistic Models',
        year: 2020,
        authors: 'Ho et al.',
      },
    ],
    tags: ['generative', 'diffusion', 'denoising', 'rna', 'atac'],
    complexity: 'complex',
    interpretability: 'low',
    usesInLiora: true,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune', 'gse137710_cancer_breast', 'gse139369_atac_epi'],
  },

  {
    id: 'scgnn',
    name: 'scGNN',
    displayName: 'Graph Neural Network VAE',
    category: 'unified',
    description: 'Graph neural network-based VAE that models cell-cell relationships through kNN graphs',
    logic: {
      title: 'Cell-Cell Graph Modeling',
      description: 'scGNN constructs a k-nearest neighbor graph from cell embeddings and uses Graph Convolutional Networks (GCN) to learn cell representations while reconstructing both the gene expression and cell adjacency.',
      mainIdea: 'Learn meaningful cell representations by modeling both gene expression and spatial/similarity-based relationships between cells',
      keyComponents: [
        {
          name: 'Graph Construction',
          description: 'Build kNN graph using cosine similarity of normalized expressions',
        },
        {
          name: 'GCN Encoder',
          description: 'Graph convolutional layers to aggregate neighbor information',
        },
        {
          name: 'Inner Product Decoder',
          description: 'Reconstruct adjacency matrix from latent representations',
        },
        {
          name: 'VAE Framework',
          description: 'Probabilistic latent space with reparameterization trick',
        },
      ],
      mathematicalFormulation: 'A = GCN(X, Adj); μ, logσ = GCN(h); z ~ N(μ, σ²); Â = σ(zz^T)',
      loss: [
        { name: 'Reconstruction Loss', formula: 'MSE(X, X̂)' },
        { name: 'Adjacency Loss', formula: 'BCE(A, Â)' },
        { name: 'KL Divergence', formula: 'KL(q(z|x) || p(z))' },
      ],
      dataFlow: 'Gene Expression → Normalization → kNN Graph → GCN Encoder → Latent Space → Dual Decoder → Expression + Adjacency',
    },
    architecture: {
      name: 'GCN-VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Graph Convolutional Network with Variational Autoencoder',
      keyLayers: ['GraphConvolution', 'VariationalEncoder', 'InnerProductDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'scGNN is a novel graph neural network framework for single-cell transcriptomics',
        year: 2021,
        authors: 'Cui et al.',
      },
    ],
    tags: ['graph', 'vae', 'clustering', 'reconstruction', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune', 'gse137710_cancer_breast'],
  },

  {
    id: 'sivae',
    name: 'siVAE',
    displayName: 'Spherical Inverse VAE',
    category: 'unified',
    description: 'Variational autoencoder with spherical geometry for normalized representations',
    logic: {
      title: 'Spherical Latent Space',
      description: 'siVAE constrains the latent space to a unit sphere, encouraging normalized representations that preserve angular relationships between cells',
      mainIdea: 'Learn angle-preserving representations by constraining latent space to sphere geometry',
      keyComponents: [
        {
          name: 'Spherical Constraint',
          description: 'Latent vectors constrained to unit sphere ||z|| = 1',
        },
        {
          name: 'Inverse Gamma Prior',
          description: 'Spherical prior for latent dimensions',
        },
        {
          name: 'Reconstruction Decoder',
          description: 'Maps sphere to gene expression',
        },
      ],
      mathematicalFormulation: 'z ~ Sphere(d); p(x|z) = NB(μ(z), θ)',
      dataFlow: 'Normalized Expression → Encoder → Sphere → Decoder → Expression',
    },
    architecture: {
      name: 'Spherical VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'VAE with Spherical Latent Manifold',
      keyLayers: ['DenseLayer', 'SphericalNormalization', 'NBDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Spherical VAE for Single-Cell Analysis',
        year: 2022,
        authors: 'Liora Team',
      },
    ],
    tags: ['vae', 'manifold', 'rna'],
    complexity: 'moderate',
    interpretability: 'medium',
    usesInLiora: true,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune'],
  },

  {
    id: 'scalex',
    name: 'scaleX',
    displayName: 'Scalable Expression VAE',
    category: 'unified',
    description: 'Scalable variational autoencoder optimized for large-scale scRNA-seq datasets',
    logic: {
      title: 'Scalable Latent Variable Model',
      description: 'scaleX combines VAE with scalable inference techniques to handle millions of cells efficiently',
      mainIdea: 'Achieve scalability without sacrificing model quality through mini-batch training and distributed inference',
      keyComponents: [
        {
          name: 'Mini-batch Optimization',
          description: 'Efficient training on subsets of data',
        },
        {
          name: 'Scalable Encoder',
          description: 'Linear encoder for quick inference',
        },
        {
          name: 'Sparse Representation',
          description: 'Maintains sparse input structure throughout',
        },
      ],
      mathematicalFormulation: 'Supports count likelihoods: NB, ZINB, Poisson',
      dataFlow: 'Large-Scale Expression → Mini-batch Encoder → Latent → Scalable Decoder → Reconstructed',
    },
    architecture: {
      name: 'Scalable VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Sparse-Efficient Variational Autoencoder',
      keyLayers: ['SparseEncoder', 'VariationalLayer', 'SparseDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch', 'JAX'],
    publications: [
      {
        title: 'Scalable VAE for Single-Cell',
        year: 2021,
        authors: 'Li et al.',
      },
    ],
    tags: ['vae', 'scalable', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: true,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune', 'gse137710_cancer_breast'],
  },

  {
    id: 'cellblast',
    name: 'CellBLAST',
    displayName: 'Cell Batch-effect Alignment & Search',
    category: 'unified',
    description: 'Deep learning method for cell searching and batch effect removal',
    logic: {
      title: 'Batch-Aware Cell Alignment',
      description: 'CellBLAST learns a common latent space across batches while preserving biological signal',
      mainIdea: 'Enable cross-batch cell search by learning batch-invariant representations',
      keyComponents: [
        {
          name: 'Batch Encoder',
          description: 'Learns batch-specific and shared components',
        },
        {
          name: 'Adversarial Loss',
          description: 'Removes batch effects during training',
        },
        {
          name: 'Retrieval Network',
          description: 'Fast cell-to-cell similarity search',
        },
      ],
      mathematicalFormulation: 'L = L_rec + λ*L_adv + μ*L_reg',
      dataFlow: 'Multi-batch Expression → Batch-aware Encoder → Aligned Latent → Cell Searcher',
    },
    architecture: {
      name: 'Batch-Aware VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'VAE with Adversarial Batch Correction',
      keyLayers: ['BatchEncoder', 'AdversarialDiscriminator', 'SimilarityLayer'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'CellBLAST: Fast Search of Large-Scale Unannotated Single-Cell Transcriptomes',
        year: 2020,
        authors: 'Li et al.',
      },
    ],
    tags: ['vae', 'batch-correction', 'search', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune', 'gse137710_cancer_breast'],
  },

  {
    id: 'gmvae-pgm',
    name: 'GMVAE (PGM)',
    displayName: 'Gaussian Mixture VAE - Product Gaussian Multinomial',
    category: 'unified',
    description: 'Gaussian mixture VAE with product-of-Gaussian-multinomial distribution',
    logic: {
      title: 'Hierarchical Mixture Modeling',
      description: 'GMVAE combines Gaussian mixtures with categorical cluster assignments for interpretable clustering',
      mainIdea: 'Learn interpretable clusters by combining continuous Gaussian manifold with discrete cluster assignments',
      keyComponents: [
        {
          name: 'Gaussian Mixture Prior',
          description: 'Multiple Gaussian components for cell types',
        },
        {
          name: 'Categorical Assignment',
          description: 'Soft cluster assignments via categorical distribution',
        },
        {
          name: 'PGM Parameterization',
          description: 'Product-of-Gaussian-Multinomial for scalability',
        },
      ],
      mathematicalFormulation: 'p(z|c) = N(μ_c, Σ_c); p(c) = Categorical(π)',
      dataFlow: 'Expression → Encoder → (z, c) → Cluster-Specific Decoder → Reconstruction',
    },
    architecture: {
      name: 'GMVAE-PGM',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: 'Gaussian Mixture Variational Autoencoder',
      keyLayers: ['MixtureEncoder', 'CategoricalSampler', 'ClusterDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Gaussian Mixture Variational Autoencoder',
        year: 2018,
        authors: 'Dilokthanakul et al.',
      },
    ],
    tags: ['vae', 'mixture', 'clustering', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: true,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune', 'gse137710_cancer_breast'],
  },

  {
    id: 'gmvae-poincare',
    name: 'GMVAE (Poincaré)',
    displayName: 'GMVAE - Hyperbolic Geometry',
    category: 'unified',
    description: 'GMVAE with Poincaré hyperbolic space for hierarchical clustering',
    logic: {
      title: 'Hierarchical Hyperbolic Clustering',
      description: 'Uses Poincaré ball geometry to capture hierarchical relationships between cell types naturally',
      mainIdea: 'Better capture hierarchical cell type relationships using hyperbolic geometry',
      keyComponents: [
        {
          name: 'Poincaré Encoder',
          description: 'Maps to hyperbolic space (Poincaré ball)',
        },
        {
          name: 'Hyperbolic Distances',
          description: 'Use hyperbolic distance for relationships',
        },
        {
          name: 'Hierarchical Clustering',
          description: 'Natural hierarchical structure emerges',
        },
      ],
      mathematicalFormulation: 'z ∈ B^d (Poincaré ball); d_H(z_i, z_j) = acosh(1 + 2||z_i - z_j||²/((1-||z_i||²)(1-||z_j||²)))',
      dataFlow: 'Expression → Poincaré Encoder → Hyperbolic Space → Hierarchical Decoder → Expression',
    },
    architecture: {
      name: 'GMVAE-Poincaré',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: 'Gaussian Mixture VAE with Hyperbolic Geometry',
      keyLayers: ['PoincareEncoder', 'HyperbolicMixture', 'GeometricDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Hyperbolic VAE',
        year: 2020,
        authors: 'Mathieu et al.',
      },
    ],
    tags: ['vae', 'hyperbolic', 'hierarchical', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: true,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune', 'gse137710_cancer_breast'],
  },

  // ==================== EXTERNAL MODELS ====================
  {
    id: 'scvi',
    name: 'scVI',
    displayName: 'Variational Inference for Single-Cell RNA-seq',
    category: 'external',
    description: 'Deep generative model for scRNA-seq with hierarchical structure learning and batch correction',
    logic: {
      title: 'Probabilistic Generative Modeling',
      description: 'scVI learns a low-dimensional latent representation while explicitly modeling zero-inflation and library size effects common in scRNA-seq',
      mainIdea: 'Learn interpretable latent representations by modeling the generative process of scRNA-seq data with explicit noise and batch effects',
      keyComponents: [
        {
          name: 'Encoder Network',
          description: 'Maps high-dimensional counts to latent space',
        },
        {
          name: 'Decoder Network',
          description: 'Reconstructs counts from latent representation',
        },
        {
          name: 'Zero-Inflation Module',
          description: 'Handles dropout events specific to scRNA-seq',
        },
        {
          name: 'Batch Effect Correction',
          description: 'Learns and corrects batch-specific parameters',
        },
      ],
      mathematicalFormulation: 'p(x|z,l) = ZI-NB(μ, θ, π); q(z|x) learned via encoder',
      loss: [
        { name: 'ELBO', formula: 'E_q[log p(x|z)] - β*KL(q(z|x) || p(z))' },
      ],
      dataFlow: 'Count Data → Encoder → Latent Space → Decoder → Zero-Inflated NB Distribution → Reconstructed Counts',
    },
    architecture: {
      name: 'Hierarchical VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Variational Autoencoder with Zero-Inflation',
      keyLayers: ['DenseLayer', 'DispersionLayer', 'ZeroInflationLayer'],
      latentDim: 10,
    },
    frameworks: ['PyTorch', 'JAX'],
    publications: [
      {
        title: 'Deep generative modeling of single-cell time-series data',
        year: 2021,
        authors: 'Lopez et al.',
      },
    ],
    tags: ['vae', 'generative', 'batch-correction', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung', 'gse124295_immune', 'gse137710_cancer_breast'],
  },

  {
    id: 'peakvi',
    name: 'PeakVI',
    displayName: 'Peak Variational Inference for scATAC-seq',
    category: 'external',
    description: 'Variational inference for scATAC-seq peak data with zero-inflation',
    logic: {
      title: 'Sparse Peak Modeling',
      description: 'PeakVI extends scVI to handle binary/sparse peak data from scATAC-seq by using a hierarchical model accounting for sparsity',
      mainIdea: 'Model sparse scATAC-seq data with explicit treatment of zero-inflation and accessibility patterns',
      keyComponents: [
        {
          name: 'Sparse Encoder',
          description: 'Efficiently encodes sparse peak presence/absence',
        },
        {
          name: 'Zero-Inflated Bernoulli',
          description: 'Models presence/absence of peaks',
        },
        {
          name: 'Chromatin Accessibility Prior',
          description: 'Incorporates biological constraints on peak accessibility',
        },
      ],
      mathematicalFormulation: 'p(x|z) = ZI-Bernoulli(π, p); accessibility constraints enforced',
      loss: [
        { name: 'ELBO', formula: 'E_q[log p(x|z)] - KL(q(z|x) || p(z))' },
      ],
      dataFlow: 'Peak Data (Binary) → Sparse Encoder → Latent Space → Decoder → Peak Probabilities',
    },
    architecture: {
      name: 'Sparse VAE',
      inputType: 'peak',
      outputType: 'latent',
      architectureType: 'VAE for Sparse Peak Data',
      keyLayers: ['SparseLayer', 'BernoulliLayer', 'VariationalLayer'],
      latentDim: 10,
    },
    frameworks: ['PyTorch', 'JAX'],
    publications: [
      {
        title: 'Deep learning for accessibility prediction in single-cell ATAC-seq',
        year: 2022,
        authors: 'Liora Team',
      },
    ],
    tags: ['vae', 'atac-seq', 'sparse'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    benchmarkDatasets: ['gse139369_atac_epi', 'gse142088_atac_immune'],
  },

  {
    id: 'poissonvi',
    name: 'PoissonVI',
    displayName: 'Poisson Variational Inference',
    category: 'external',
    description: 'Variational inference with Poisson likelihood for counting process data',
    logic: {
      title: 'Poisson Generative Modeling',
      description: 'Uses Poisson likelihood appropriate for raw count data from various sequencing modalities',
      mainIdea: 'Model raw counts with Poisson distribution for unbiased statistical inference',
      keyComponents: [
        {
          name: 'Poisson Likelihood',
          description: 'Natural for raw count data',
        },
        {
          name: 'Variational Inference',
          description: 'Efficient posterior approximation',
        },
      ],
      mathematicalFormulation: 'p(x|z) = Poisson(λ(z))',
      dataFlow: 'Raw Counts → Encoder → Latent → Poisson Decoder → Expected Counts',
    },
    architecture: {
      name: 'Poisson VAE',
      inputType: 'count',
      outputType: 'latent',
      architectureType: 'VAE with Poisson Likelihood',
      keyLayers: ['DenseEncoder', 'PoissonLayer'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Poisson Variational Inference',
        year: 2021,
        authors: 'Inference Team',
      },
    ],
    tags: ['vae', 'poisson', 'count-data'],
    complexity: 'simple',
    interpretability: 'high',
    usesInLiora: false,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung'],
  },

  // ==================== DISENTANGLEMENT MODELS ====================
  {
    id: 'infovae',
    name: 'InfoVAE',
    displayName: 'Information-Theoretic VAE',
    category: 'disentanglement',
    description: 'VAE with explicit information-theoretic objective for disentangled representations',
    logic: {
      title: 'Information-Theoretic Disentanglement',
      description: 'InfoVAE balances reconstruction, KL divergence, and mutual information terms to learn disentangled factors',
      mainIdea: 'Learn disentangled latent factors by maximizing mutual information between data and latent code',
      keyComponents: [
        {
          name: 'Information Bottleneck',
          description: 'Balance between compression and information retention',
        },
        {
          name: 'Mutual Information Term',
          description: 'I(x; z) encourages informativeness',
        },
        {
          name: 'Disentanglement Objective',
          description: 'Separates independent factors',
        },
      ],
      mathematicalFormulation: 'ELBO + β*I(x;z) + γ*D_KL(q(z)||p(z))',
      loss: [
        { name: 'InfoVAE Loss', formula: 'Recon + (λ₁+λ₂)KL + λ₂*I(x;z)' },
      ],
      dataFlow: 'Data → Encoder → Disentangled Factors → Decoder → Reconstruction',
    },
    architecture: {
      name: 'InfoVAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'Information-Theoretic VAE',
      keyLayers: ['DisentanglingEncoder', 'MutualInfoLayer', 'InfoDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'InfoVAE: Balancing Learning and Inference in Variational Autoencoders',
        year: 2019,
        authors: 'Zhao et al.',
      },
    ],
    tags: ['vae', 'disentanglement', 'interpretability'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: false,
    benchmarkDatasets: ['gse117988_bone_marrow', 'gse148938_lung'],
  },

  {
    id: 'betavae',
    name: 'Beta-VAE',
    displayName: 'β-VAE: Weighted Disentanglement',
    category: 'disentanglement',
    description: 'VAE with weighted KL divergence for learning disentangled factors',
    logic: {
      title: 'Weighted Disentanglement',
      description: 'β-VAE weights the KL divergence term to encourage disentanglement by forcing independent factor learning',
      mainIdea: 'Encourage disentangled representations by upweighting KL, forcing each latent dimension to encode independent variation',
      keyComponents: [
        {
          name: 'Weighted KL',
          description: 'β parameter controls KL weight for disentanglement strength',
        },
        {
          name: 'Factorized Posterior',
          description: 'Posterior factorizes over latent dimensions',
        },
        {
          name: 'Independent Factors',
          description: 'Each dimension learns one factor of variation',
        },
      ],
      mathematicalFormulation: 'ELBO = E_q[log p(x|z)] - β*KL(q(z|x)||p(z))',
      loss: [
        { name: 'β-VAE Loss', formula: 'Reconstruction + β*KL' },
      ],
      dataFlow: 'Data → Encoder → Independent Latent Factors → Decoder → Reconstruction',
    },
    architecture: {
      name: 'β-VAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'Weighted Variational Autoencoder',
      keyLayers: ['StandardEncoder', 'KLWeighting', 'StandardDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Understanding disentangling in β-VAE',
        year: 2018,
        authors: 'Burgess et al.',
      },
    ],
    tags: ['vae', 'disentanglement', 'factors'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    benchmarkDatasets: ['gse117988_bone_marrow'],
  },

  {
    id: 'tcvae',
    name: 'TCVAE',
    displayName: 'Total Correlation VAE',
    category: 'disentanglement',
    description: 'VAE with total correlation constraint for disentangled representations',
    logic: {
      title: 'Total Correlation Minimization',
      description: 'TCVAE explicitly minimizes total correlation between latent dimensions to achieve disentanglement',
      mainIdea: 'Minimize statistical dependence between latent dimensions for maximal disentanglement',
      keyComponents: [
        {
          name: 'Total Correlation',
          description: 'TC(z) measures dependence between dimensions',
        },
        {
          name: 'Dimension-wise KL',
          description: 'KL term for each dimension separately',
        },
        {
          name: 'Index-Code Mutual Info',
          description: 'I(x_i; z_j) for factor discovery',
        },
      ],
      mathematicalFormulation: 'ELBO - β*TC(q(z)) - γ*(D_KL∑ - D_KL∑)',
      loss: [
        { name: 'TC Loss', formula: 'Reconstruction + β*TC(z) + Dimension-wise KL' },
      ],
      dataFlow: 'Data → Encoder → Decorrelated Factors → Decoder → Reconstruction',
    },
    architecture: {
      name: 'TCVAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'Total Correlation VAE',
      keyLayers: ['Encoder', 'TotalCorrelationLayer', 'Decoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Isolating Sources of Disentanglement in Variational Autoencoders',
        year: 2019,
        authors: 'Kumar et al.',
      },
    ],
    tags: ['vae', 'disentanglement', 'correlation'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: false,
    benchmarkDatasets: ['gse117988_bone_marrow'],
  },

  {
    id: 'dipvae',
    name: 'DIPVAE',
    displayName: 'Disentangled Inferred Prior VAE',
    category: 'disentanglement',
    description: 'VAE that encourages disentanglement through inferred prior modification',
    logic: {
      title: 'Disentangled Inferred Prior',
      description: 'DIPVAE learns a factorized prior by matching the aggregate posterior to a factorized distribution',
      mainIdea: 'Achieve disentanglement by ensuring the aggregate posterior q(z) is factorial (independent dimensions)',
      keyComponents: [
        {
          name: 'Factorial Prior',
          description: 'Prior that factorizes over dimensions',
        },
        {
          name: 'Aggregate Posterior Matching',
          description: 'Match q(z) to factorial distribution',
        },
        {
          name: 'Dimension-wise Independence',
          description: 'Enforce independence through prior learning',
        },
      ],
      mathematicalFormulation: 'L = E_q[log p(x|z)] - KL(q(z)||p(z)); p(z) learned to be factorial',
      loss: [
        { name: 'DIPVAE Loss', formula: 'Reconstruction + FactorialKL' },
      ],
      dataFlow: 'Data → Encoder → Independent Posterior → Inferred Prior → Decoder',
    },
    architecture: {
      name: 'DIPVAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'VAE with Inferred Factorial Prior',
      keyLayers: ['Encoder', 'PriorLearner', 'Decoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Variational Inference of Disentangled Latent Concepts for Unlabeled Data',
        year: 2017,
        authors: 'Kumar et al.',
      },
    ],
    tags: ['vae', 'disentanglement', 'prior'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: false,
    benchmarkDatasets: ['gse117988_bone_marrow'],
  },
];

export function getModelById(id: string): Model | undefined {
  return modelsData.find(m => m.id === id);
}

export function getModelsByCategory(category: string): Model[] {
  return modelsData.filter(m => m.category === category);
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
