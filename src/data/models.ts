// Updated models.ts - Complete with all 21 models

import { Model, ModelCategory } from '@/types/models';

export const modelsData: Model[] = [
  // ==================== PREDICTIVE MODELS ====================
  {
    id: 'scvi',
    name: 'scVI',
    displayName: 'Single-cell Variational Inference',
    category: 'predictive',
    description: 'Deep generative model for scRNA-seq with probabilistic inference and batch correction',
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
      mathematicalFormulation: 'p(x|z,l,s) = ZINB(μ, θ, π); q(z|x) learned via encoder',
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
        title: 'Deep generative modeling for single-cell transcriptomics',
        year: 2018,
        authors: 'Lopez et al.',
      },
    ],
    tags: ['vae', 'generative', 'batch-correction', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['rna'],
  },

  {
    id: 'scgnn',
    name: 'scGNN',
    displayName: 'Graph Neural Network for Single-Cell',
    category: 'predictive',
    description: 'Graph neural network that models cell-cell relationships through cell graphs for imputation and clustering',
    logic: {
      title: 'Cell-Cell Graph Modeling',
      description: 'scGNN constructs cell-cell graphs and uses Graph Neural Networks to aggregate information across similar cells for imputation and clustering',
      mainIdea: 'Learn meaningful cell representations by modeling both gene expression and cell-cell similarity relationships',
      keyComponents: [
        {
          name: 'Graph Construction',
          description: 'Build cell graphs using expression similarity',
        },
        {
          name: 'Graph Neural Network',
          description: 'Aggregate neighbor information via message passing',
        },
        {
          name: 'Imputation Module',
          description: 'Reconstruct missing/dropout values',
        },
        {
          name: 'Clustering Module',
          description: 'Identify cell populations from learned embeddings',
        },
      ],
      mathematicalFormulation: 'H^(l+1) = σ(D^(-1/2) A D^(-1/2) H^(l) W^(l))',
      loss: [
        { name: 'Reconstruction Loss', formula: 'MSE(X, X̂)' },
        { name: 'Clustering Loss', formula: 'Cross-Entropy' },
      ],
      dataFlow: 'Gene Expression → Cell Graph Construction → GNN Layers → Embeddings → Imputation + Clustering',
    },
    architecture: {
      name: 'Graph Neural Network',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Graph Convolutional Network',
      keyLayers: ['GraphConvolution', 'Aggregation', 'MLPDecoder'],
      latentDim: 16,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'scGNN is a novel graph neural network framework for single-cell RNA-Seq analyses',
        year: 2021,
        authors: 'Wang et al.',
      },
    ],
    tags: ['graph', 'clustering', 'imputation', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scalex',
    name: 'SCALEX',
    displayName: 'Online Single-Cell Data Integration',
    category: 'predictive',
    description: 'Scalable VAE for online integration of single-cell data by projecting into batch-invariant space',
    logic: {
      title: 'Online Batch Integration',
      description: 'SCALEX uses VAE to learn batch-invariant representations that enable continuous atlas expansion and online integration',
      mainIdea: 'Enable scalable data integration by learning disentangled batch and biological factors',
      keyComponents: [
        {
          name: 'Batch-Invariant Encoder',
          description: 'Learns representations invariant to batch effects',
        },
        {
          name: 'Online Projection',
          description: 'Projects new data into existing latent space',
        },
        {
          name: 'Probabilistic Decoder',
          description: 'Reconstructs expression from latent codes',
        },
      ],
      mathematicalFormulation: 'L = L_recon + KL(q(z|x)||p(z)) + L_batch',
      dataFlow: 'Multi-batch Data → Encoder → Batch-Invariant Latent → Decoder → Integrated Expression',
    },
    architecture: {
      name: 'Batch-Aware VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'VAE with Batch Disentanglement',
      keyLayers: ['BatchEncoder', 'ProjectionLayer', 'Decoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Online single-cell data integration through projecting heterogeneous datasets into a common cell-embedding space',
        year: 2022,
        authors: 'Xiong et al.',
      },
    ],
    tags: ['vae', 'batch-correction', 'integration', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'cellblast',
    name: 'Cell BLAST',
    displayName: 'Cell Querying via Neural Embedding',
    category: 'predictive',
    description: 'Neural network method for cell searching and annotation via unbiased cell embedding',
    logic: {
      title: 'Cell-to-Cell Similarity Search',
      description: 'Cell BLAST learns unbiased cell embeddings that enable accurate cell-to-cell similarity search across datasets',
      mainIdea: 'Enable accurate cell annotation by learning batch-corrected embeddings for similarity search',
      keyComponents: [
        {
          name: 'VAE Encoder',
          description: 'Learns cell embeddings from expression',
        },
        {
          name: 'Batch Correction',
          description: 'Removes multi-level batch effects',
        },
        {
          name: 'Similarity Metric',
          description: 'Computes cell-to-cell similarity with uncertainty',
        },
      ],
      mathematicalFormulation: 'Similarity based on probabilistic embeddings with uncertainty quantification',
      dataFlow: 'Query Cells → Embedding → Batch Correction → Similarity Search → Reference Matches',
    },
    architecture: {
      name: 'VAE with Search',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'VAE with Cell Similarity Module',
      keyLayers: ['Encoder', 'BatchCorrector', 'SimilarityLayer'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Searching large-scale scRNA-seq databases via unbiased cell embedding',
        year: 2020,
        authors: 'Cao et al.',
      },
    ],
    tags: ['vae', 'search', 'annotation', 'batch-correction', 'rna'],
    complexity: 'moderate',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scgcc',
    name: 'scGCC',
    displayName: 'Graph Contrastive Clustering',
    category: 'predictive',
    description: 'Graph neural network with MoCo-based contrastive learning for single-cell clustering and embedding',
    logic: {
      title: 'Graph Contrastive Learning',
      description: 'scGCC uses Graph Attention Networks combined with Momentum Contrast to learn robust cell embeddings while preserving cell-cell relationships',
      mainIdea: 'Learn cell embeddings by contrasting augmented graph views while maintaining cell adjacency information',
      keyComponents: [
        {
          name: 'Graph Construction',
          description: 'Build cell graphs from expression similarity',
        },
        {
          name: 'GAT Encoder',
          description: 'Graph Attention layers for neighbor aggregation',
        },
        {
          name: 'MoCo Head',
          description: 'Momentum Contrast for contrastive learning',
        },
        {
          name: 'Augmentation',
          description: 'Feature masking and graph dropout for robustness',
        },
      ],
      mathematicalFormulation: 'L = InfoNCE(z_q, queue); z learned via GAT + augmentation',
      loss: [
        { name: 'Contrastive Loss', formula: 'InfoNCE(query, momentum_updated_queue)' },
      ],
      dataFlow: 'Expression → kNN Graph → GAT Layers → MoCo Head → Contrastive Embeddings',
    },
    architecture: {
      name: 'Graph Attention VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Graph Attention Network with Contrastive Head',
      keyLayers: ['GAT', 'MoCoHead', 'GraphAugmentation'],
      latentDim: 32,
    },
    frameworks: ['PyTorch', 'PyTorch Geometric'],
    publications: [
      {
        title: 'scGCC: Graph Contrastive Learning for Single-cell RNA-seq',
        year: 2023,
        authors: 'Tian et al.',
      },
    ],
    tags: ['contrastive', 'graph', 'clustering', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'clear',
    name: 'CLEAR',
    displayName: 'Contrastive Learning for Enhanced scRNA-seq',
    category: 'predictive',
    description: 'MoCo-based contrastive learning framework for learning robust cell representations',
    logic: {
      title: 'Momentum Contrast Learning',
      description: 'CLEAR applies Momentum Contrast to single-cell RNA-seq data with carefully designed augmentations (masking, noise, jittering) to learn invariant cell embeddings',
      mainIdea: 'Learn robust, batch-invariant representations through contrastive learning with momentum contrast queue',
      keyComponents: [
        {
          name: 'Query Encoder',
          description: 'Main encoder network for cell embeddings',
        },
        {  
          name: 'Momentum Encoder',
          description: 'Slow-moving encoder maintaining feature consistency',
        },
        {
          name: 'Augmentation Module',
          description: 'Feature masking, noise injection, and scaling jitter',
        },
        {
          name: 'Contrastive Queue',
          description: 'Large memory bank of negative samples',
        },
      ],
      mathematicalFormulation: 'L = -log(exp(sim(z_q, z_k^+)/τ) / Σ_i exp(sim(z_q, k_i)/τ))',
      loss: [
        { name: 'InfoNCE Loss', formula: 'Contrastive loss with queue-based negatives' },
      ],
      dataFlow: 'Data → Two Augmented Views → Query/Momentum Encoders → Feature Similarity → Contrastive Loss',
    },
    architecture: {
      name: 'MoCo Encoder',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Momentum Contrast Framework',
      keyLayers: ['MLPEncoder', 'MoCoHead', 'Augmentation'],
      latentDim: 128,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'CLEAR: Contrastive Learning for Single-cell RNA-seq',
        year: 2022,
        authors: 'Zhang et al.',
      },
    ],
    tags: ['contrastive', 'embedding', 'batch-robust', 'rna'],
    complexity: 'moderate',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scdac',
    name: 'scDAC',
    displayName: 'Deep Adaptive Clustering',
    category: 'predictive',
    description: 'Deep autoencoder with Dirichlet Process Mixture Model for adaptive cell clustering',
    logic: {
      title: 'Adaptive Clustering via DPMM',
      description: 'scDAC combines deep autoencoders with Dirichlet Process Mixture Models to perform nonparametric Bayesian clustering on learned embeddings',
      mainIdea: 'Learn both embeddings and cluster assignments adaptively using infinite mixture models without pre-specifying cluster count',
      keyComponents: [
        {
          name: 'Deep Autoencoder',
          description: 'Learns compressed cell representations',
        },
        {
          name: 'DPMM Clustering',
          description: 'Nonparametric Bayesian clustering of embeddings',
        },
        {
          name: 'Adaptive K',
          description: 'Automatically determines optimal number of clusters',
        },
        {
          name: 'Flexible Activation',
          description: 'Supports ReLU, Mish, Sigmoid activations',
        },
      ],
      mathematicalFormulation: 'z ~ AE(x); z | π,μ,Σ ~ ΣΠ_k π_k N(μ_k, Σ_k)',
      loss: [
        { name: 'Reconstruction', formula: 'MSE(x, AE_decode(z))' },
        { name: 'DPMM', formula: 'Bayesian clustering objective' },
      ],
      dataFlow: 'Expression → Autoencoder → Embeddings → DPMM Inference → Clusters + Posterior',
    },
    architecture: {
      name: 'Adaptive AE',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: 'Deep Autoencoder with DPMM',
      keyLayers: ['MLP', 'DPMMLayer', 'Decoder'],
      latentDim: 32,
    },
    frameworks: ['PyTorch', 'scikit-learn'],
    publications: [
      {
        title: 'scDAC: Deep Adaptive Clustering for Single-cell RNA-seq',
        year: 2021,
        authors: 'Tian et al.',
      },
    ],
    tags: ['clustering', 'adaptive', 'autoencoder', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scdeepcluster',
    name: 'scDeepCluster',
    displayName: 'Deep Clustering with ZINB',
    category: 'predictive',
    description: 'Autoencoder with Zero-Inflated Negative Binomial reconstruction and DEC-style clustering',
    logic: {
      title: 'Joint Clustering and Reconstruction',
      description: 'scDeepCluster uses autoencoders with ZINB loss and clustering refinement via DEC (Deep Embedded Clustering) approach',
      mainIdea: 'Learn clusters by jointly optimizing reconstruction loss and clustering consistency with DEC-style centroid-based refinement',
      keyComponents: [
        {
          name: 'ZINB Loss',
          description: 'Zero-Inflated NB reconstruction loss for count data',
        },
        {
          name: 'KMeans Initialization',
          description: 'Pre-clustering for warm start',
        },
        {
          name: 'DEC Refinement',
          description: 'Iterative cluster assignment refinement',
        },
        {
          name: 'Multi-stage Training',
          description: 'Pretraining → initialization → joint optimization',
        },
      ],
      mathematicalFormulation: 'p(x|z) = ZINB(π, μ, θ); clustering via centroid distances',
      loss: [
        { name: 'ZINB Reconstruction', formula: 'Zero-Inflated NB loss' },
        { name: 'Clustering', formula: 'KL divergence to soft cluster assignments' },
      ],
      dataFlow: 'Expression → AE Pretrain → KMeans Init → Joint Optimization → Clusters + Latent',
    },
    architecture: {
      name: 'DEC-based Autoencoder',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: 'Autoencoder with ZINB + DEC',
      keyLayers: ['Encoder', 'ZINBDecoder', 'ClusteringLayer'],
      latentDim: 32,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'scDeepCluster: Clustering single-cell RNA-seq data with deep learning and ZINB',
        year: 2019,
        authors: 'Tian et al.',
      },
    ],
    tags: ['clustering', 'zinb', 'deep-embedded', 'rna'],
    complexity: 'moderate',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scdhmap',
    name: 'scDHMap',
    displayName: 'Hyperbolic Diffusion Map',
    category: 'predictive',
    description: 'Hyperbolic VAE with ZINB reconstruction and t-SNE repulsion for hierarchical cell visualization',
    logic: {
      title: 'Hierarchical Hyperbolic Embedding',
      description: 'scDHMap embeds cells in hyperbolic space (Lorentz hyperboloid) to capture hierarchical relationships naturally, with ZINB reconstruction and t-SNE repulsion',
      mainIdea: 'Preserve hierarchical cell type relationships using hyperbolic geometry with improved scalability via VAE',
      keyComponents: [
        {
          name: 'Lorentz Hyperboloid',
          description: 'Hyperbolic embedding space for hierarchical structure',
        },
        {
          name: 'ZINB Decoder',
          description: 'Count-appropriate reconstruction',
        },
        {
          name: 't-SNE Repulsion',
          description: 'Prevents cluster collapse and separation',
        },
        {
          name: 'Poincaré-Lorentz Conversion',
          description: 'Unified geometric computations',
        },
      ],
      mathematicalFormulation: 'z ∈ Lorentz hyperboloid; d_H(z_i,z_j) = acosh(-<z_i,z_j>_L)',
      loss: [
        { name: 'ZINB', formula: 'Zero-Inflated NB reconstruction' },
        { name: 'Hyperbolic KL', formula: 'KL in hyperbolic space' },
        { name: 't-SNE', formula: 'Repulsive force regularization' },
      ],
      dataFlow: 'Expression → Hyperbolic Encoder → Lorentz Space → ZINB + tSNE → Visualization',
    },
    architecture: {
      name: 'Hyperbolic VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'VAE on Lorentz Hyperboloid',
      keyLayers: ['PoincareEncoder', 'LorentzMapping', 'ZINBDecoder'],
      latentDim: 2,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'scDHMap: Single-cell hyperbolic diffusion for visualizing complex hierarchies',
        year: 2023,
        authors: 'Tian et al.',
      },
    ],
    tags: ['hyperbolic', 'hierarchical', 'visualization', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scsmd',
    name: 'scSMD',
    displayName: 'ResNet-based Clustering',
    category: 'predictive',
    description: 'ResNet autoencoder with mutual information clustering for single-cell analysis',
    logic: {
      title: 'CNN-based Clustering via Mutual Information',
      description: 'scSMD reshapes gene expression as 2D images and uses ResNet autoencoders with mutual information-based clustering',
      mainIdea: 'Leverage CNN architectures by treating gene expression as 2D data, clustering via maximizing mutual information',
      keyComponents: [
        {
          name: 'ResNet Encoder',
          description: '2D CNN-based feature extraction from reshaped genes',
        },
        {
          name: 'Mutual Information',
          description: 'Clustering by maximizing MI between data and clusters',
        },
        {
          name: 'NB Loss',
          description: 'Negative Binomial reconstruction loss',
        },
        {
          name: 'Bottleneck Blocks',
          description: 'ResNet bottleneck architecture',
        },
      ],
      mathematicalFormulation: 'L = NB_loss + β*MI(X; C)',
      loss: [
        { name: 'NB Reconstruction', formula: 'Negative Binomial loss' },
        { name: 'MI Clustering', formula: 'Mutual information between data and clusters' },
      ],
      dataFlow: 'Expression → Reshape 2D → ResNet Encoder → MI Clustering → Clusters',
    },
    architecture: {
      name: 'ResNet Autoencoder',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: '2D CNN Autoencoder with ResNet',
      keyLayers: ['Conv2D', 'BottleneckBlock', 'TransposedConv'],
      latentDim: 32,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'scSMD: Single-cell clustering via mutual information with ResNet',
        year: 2020,
        authors: 'Song et al.',
      },
    ],
    tags: ['clustering', 'cnn', 'mutual-information', 'rna'],
    complexity: 'moderate',
    interpretability: 'low',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  // ==================== GENERATIVE MODELS ====================
  {
    id: 'scdiffusion',
    name: 'scDiffusion',
    displayName: 'Diffusion Model for Single-Cell',
    category: 'generative',
    description: 'Conditional diffusion model for high-quality single-cell data generation with cell-type control',
    logic: {
      title: 'Conditional Denoising Diffusion',
      description: 'scDiffusion combines diffusion models with foundation models to generate realistic single-cell data conditioned on cell types and other attributes',
      mainIdea: 'Generate high-quality synthetic single-cell data by learning to reverse a noise diffusion process',
      keyComponents: [
        {
          name: 'Forward Diffusion',
          description: 'Gradually add Gaussian noise over T timesteps',
        },
        {
          name: 'Noise Predictor',
          description: 'Transformer-based network predicts noise at each step',
        },
        {
          name: 'Conditional Generation',
          description: 'Condition on cell type, tissue, or experimental factors',
        },
        {
          name: 'Reverse Sampling',
          description: 'Iteratively denoise to generate new samples',
        },
      ],
      mathematicalFormulation: 'q(x_t|x_{t-1}) = N(√(1-β_t)x_{t-1}, β_t I); p_θ(x_{t-1}|x_t,c) learned',
      loss: [
        { name: 'Denoising Loss', formula: '||ε - ε_θ(x_t, t, c)||²' },
      ],
      dataFlow: 'Real Data + Condition → Noise Schedule → Noisy Data → Denoiser → Predicted Noise → Generated Data',
    },
    architecture: {
      name: 'Conditional Diffusion Model',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Conditional Denoising Diffusion Probabilistic Model',
      keyLayers: ['TransformerBlock', 'TimeEmbedding', 'ConditionEncoder'],
      latentDim: 128,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'scDiffusion: conditional generation of high-quality single-cell data using diffusion model',
        year: 2024,
        authors: 'Luo et al.',
      },
    ],
    tags: ['diffusion', 'generative', 'conditional', 'rna'],
    complexity: 'complex',
    interpretability: 'low',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'sivae',
    name: 'siVAE',
    displayName: 'Interpretable Deep Generative Model',
    category: 'generative',
    description: 'VAE with structured latent space for interpretable single-cell modeling',
    logic: {
      title: 'Structured Latent Space',
      description: 'siVAE uses structured priors and regularization to learn interpretable latent representations',
      mainIdea: 'Learn interpretable factors by structuring the latent space with domain knowledge',
      keyComponents: [
        {
          name: 'Structured Prior',
          description: 'Incorporates biological structure into latent space',
        },
        {
          name: 'Interpretable Factors',
          description: 'Each dimension corresponds to biological variation',
        },
        {
          name: 'Negative Binomial Decoder',
          description: 'Models count distribution appropriately',
        },
      ],
      mathematicalFormulation: 'p(x|z) = NB(μ(z), θ); structured prior on z',
      dataFlow: 'Expression → Encoder → Structured Latent → NB Decoder → Reconstructed Expression',
    },
    architecture: {
      name: 'Structured VAE',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'VAE with Structured Prior',
      keyLayers: ['Encoder', 'StructuredPrior', 'NBDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'siVAE: interpretable deep generative models for single-cell transcriptomes',
        year: 2023,
        authors: 'Choi et al.',
      },
    ],
    tags: ['vae', 'interpretable', 'generative', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  // ==================== scATAC-SPECIFIC MODELS ====================
  {
    id: 'peakvi',
    name: 'PeakVI',
    displayName: 'Peak Variational Inference',
    category: 'atac-specific',
    description: 'Deep generative model for single-cell chromatin accessibility analysis',
    logic: {
      title: 'Sparse Peak Accessibility Modeling',
      description: 'PeakVI models scATAC-seq peak data using a noise model tailored to the sparsity and binary nature of accessibility',
      mainIdea: 'Learn informative latent representations by modeling peak accessibility with appropriate probabilistic framework',
      keyComponents: [
        {
          name: 'Sparse Encoder',
          description: 'Efficiently handles sparse peak matrices',
        },
        {
          name: 'Accessibility Noise Model',
          description: 'Models peak presence/absence with appropriate distribution',
        },
        {
          name: 'Batch Correction',
          description: 'Corrects technical batch effects in ATAC data',
        },
      ],
      mathematicalFormulation: 'p(x|z,s) = Bernoulli(ρ); ρ learned from latent',
      loss: [
        { name: 'ELBO', formula: 'E_q[log p(x|z)] - KL(q(z|x)||p(z))' },
      ],
      dataFlow: 'Peak Data (Sparse) → Encoder → Latent Space → Decoder → Peak Probabilities',
    },
    architecture: {
      name: 'Sparse VAE',
      inputType: 'peak',
      outputType: 'latent',
      architectureType: 'VAE for Sparse Binary Data',
      keyLayers: ['SparseEncoder', 'BernoulliDecoder', 'BatchLayer'],
      latentDim: 10,
    },
    frameworks: ['PyTorch', 'JAX'],
    publications: [
      {
        title: 'PeakVI: A deep generative model for single-cell chromatin accessibility analysis',
        year: 2022,
        authors: 'Ashuach et al.',
      },
    ],
    tags: ['vae', 'atac-seq', 'sparse', 'chromatin'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['atac'],
  },

  {
    id: 'scTour',
    name: 'scTour',
    displayName: 'Trajectory Inference and Ordering',
    category: 'atac-specific',
    description: 'Trajectory inference tool for learning cell developmental paths in single-cell data',
    logic: {
      title: 'Latent Trajectory Inference',
      description: 'scTour learns latent developmental trajectories by modeling cell progression through ordered latent representations',
      mainIdea: 'Infer cell differentiation trajectories by learning smooth paths through latent space',
      keyComponents: [
        {
          name: 'Trajectory VAE',
          description: 'VAE with ordered latent structure',
        },
        {
          name: 'Path Smoothness',
          description: 'Regularization for smooth trajectories',
        },
        {
          name: 'Pseudo-timing',
          description: 'Assigns pseudo-time along trajectories',
        },
      ],
      mathematicalFormulation: 'z_t = f_θ(t); smooth ordering via latent trajectory',
      loss: [
        { name: 'ELBO', formula: 'Reconstruction + KL' },
        { name: 'Smoothness', formula: 'Temporal regularization' },
      ],
      dataFlow: 'Expression → Encoder → Ordered Latent → Trajectory Inference → Pseudo-time + Path',
    },
    architecture: {
      name: 'Trajectory VAE',
      inputType: 'single-cell',
      outputType: 'trajectory',
      architectureType: 'VAE with Temporal Structure',
      keyLayers: ['Encoder', 'TemporalDecoder', 'TrajectoryHead'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'scTour: Single-cell trajectory inference using autoencoders',
        year: 2023,
        authors: 'Li et al.',
      },
    ],
    tags: ['trajectory', 'pseudo-time', 'development', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['rna', 'atac'],
  },

  // ==================== GAUSSIAN GEOMETRIC MODELS ====================
  {
    id: 'gmvae-pgm',
    name: 'GMVAE (PGM)',
    displayName: 'Gaussian Mixture VAE - Product of Experts',
    category: 'gaussian-geometric',
    description: 'VAE with Product of Experts Gaussian mixture prior for clustering in Euclidean space',
    logic: {
      title: 'Gaussian Mixture Clustering',
      description: 'GMVAE-PGM uses a mixture of Gaussians as the prior to learn discrete clusters while maintaining continuous representations with Product of Experts',
      mainIdea: 'Learn interpretable clusters by combining Gaussian mixtures with VAE framework in Euclidean space',
      keyComponents: [
        {
          name: 'Mixture Prior',
          description: 'Prior is mixture of K Gaussians for K clusters',
        },
        {
          name: 'Categorical Variable',
          description: 'Discrete cluster assignment variable',
        },
        {
          name: 'Joint Inference',
          description: 'Infer both continuous embedding and cluster',
        },
      ],
      mathematicalFormulation: 'p(z) = Σ_k π_k N(μ_k, Σ_k); p(c) = Categorical(π)',
      dataFlow: 'Expression → Encoder → (z, c) → Cluster-Specific Decoder → Reconstruction',
    },
    architecture: {
      name: 'GMVAE-PGM',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: 'Gaussian Mixture VAE',
      keyLayers: ['MixtureEncoder', 'CategoricalSampler', 'ClusterDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Deep Unsupervised Clustering with Gaussian Mixture Variational Autoencoders',
        year: 2016,
        authors: 'Dilokthanakul et al.',
      },
    ],
    tags: ['vae', 'mixture', 'clustering', 'gaussian', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'gmvae-poincare',
    name: 'GMVAE (Poincaré)',
    displayName: 'Hyperbolic Gaussian Mixture VAE',
    category: 'gaussian-geometric',
    description: 'GMVAE in hyperbolic space for hierarchical cell type relationships',
    logic: {
      title: 'Hyperbolic Hierarchical Clustering',
      description: 'Uses Poincaré ball model to represent hierarchical relationships between cell types naturally in hyperbolic geometry',
      mainIdea: 'Capture hierarchical cell type relationships using hyperbolic geometry that naturally represents tree structures',
      keyComponents: [
        {
          name: 'Poincaré Embedding',
          description: 'Maps cells to Poincaré ball',
        },
        {
          name: 'Hyperbolic Distances',
          description: 'Measures similarity in hyperbolic space',
        },
        {
          name: 'Wrapped Normal Distribution',
          description: 'Gaussian analog in hyperbolic space',
        },
      ],
      mathematicalFormulation: 'z ∈ B^d (Poincaré ball); d_H(z_i,z_j) = acosh(1 + 2||z_i⊖z_j||²/((1-||z_i||²)(1-||z_j||²)))',
      dataFlow: 'Expression → Poincaré Encoder → Hyperbolic Mixture → Geometric Decoder → Expression',
    },
    architecture: {
      name: 'Hyperbolic GMVAE',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: 'GMVAE in Poincaré Ball',
      keyLayers: ['PoincareEncoder', 'WrappedNormal', 'GeometricDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Hyperbolic Deep Learning',
        year: 2019,
        authors: 'Mathieu et al.',
      },
    ],
    tags: ['vae', 'hyperbolic', 'hierarchical', 'geometric', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'gmvae-hw',
    name: 'GMVAE (HW)',
    displayName: 'Hyperbolic-Wrapped Gaussian Mixture VAE',
    category: 'gaussian-geometric',
    description: 'GMVAE using Hyperbolic-Wrapped (HW) distributions for hierarchical clustering',
    logic: {
      title: 'Wrapped Hyperbolic Clustering',
      description: 'Uses Hyperbolic-Wrapped normal distributions on the hyperboloid model to naturally encode hierarchical relationships',
      mainIdea: 'Capture complex hierarchical structures using wrapped distributions on Lorentz hyperboloid geometry',
      keyComponents: [
        {
          name: 'Lorentz Hyperboloid',
          description: 'Hyperbolic embedding on hyperboloid model',
        },
        {
          name: 'Wrapped Normal Distribution',
          description: 'Gaussian analog on hyperboloid for mixture components',
        },
        {
          name: 'Hierarchical Clustering',
          description: 'Natural tree-like structure preservation',
        },
        {
          name: 'Geometric Inference',
          description: 'Leverages hyperbolic geometry for inference',
        },
      ],
      mathematicalFormulation: 'p(z) = Σ_k π_k WrappedNormal_k(μ_k, σ_k) on Lorentz hyperboloid',
      dataFlow: 'Expression → HW Encoder → Hyperboloid Mixture → Decoder → Hierarchical Clusters',
    },
    architecture: {
      name: 'HW-GMVAE',
      inputType: 'single-cell',
      outputType: 'clustering',
      architectureType: 'GMVAE with Hyperbolic-Wrapped Distributions',
      keyLayers: ['HWEncoder', 'WrappedMixture', 'HWDecoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Hyperbolic-Wrapped Variational Autoencoders for Hierarchical Representations',
        year: 2021,
        authors: 'Gu et al.',
      },
    ],
    tags: ['vae', 'hyperbolic', 'wrapped', 'hierarchical', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  // ==================== DISENTANGLEMENT MODELS ====================
  {
    id: 'betavae',
    name: 'β-VAE',
    displayName: 'Beta Variational Autoencoder',
    category: 'disentanglement',
    description: 'VAE with weighted KL divergence for learning disentangled factors',
    logic: {
      title: 'Weighted Disentanglement',
      description: 'β-VAE uses a hyperparameter β to weight the KL term, encouraging each latent dimension to encode independent factors of variation',
      mainIdea: 'Learn disentangled representations by increasing pressure on latent bottleneck',
      keyComponents: [
        {
          name: 'Weighted KL Term',
          description: 'β > 1 increases disentanglement pressure',
        },
        {
          name: 'Information Bottleneck',
          description: 'Forces compact, factorized representations',
        },
        {
          name: 'Independent Factors',
          description: 'Each dimension captures one variation factor',
        },
      ],
      mathematicalFormulation: 'L = E_q[log p(x|z)] - β*KL(q(z|x)||p(z))',
      loss: [
        { name: 'β-VAE Loss', formula: 'Reconstruction + β*KL' },
      ],
      dataFlow: 'Data → Encoder → Disentangled Factors → Decoder → Reconstruction',
    },
    architecture: {
      name: 'β-VAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'Weighted Variational Autoencoder',
      keyLayers: ['Encoder', 'KLWeighting', 'Decoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'β-VAE: Learning Basic Visual Concepts with a Constrained Variational Framework',
        year: 2017,
        authors: 'Higgins et al.',
      },
    ],
    tags: ['vae', 'disentanglement', 'factors', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['rna'],
  },

  {
    id: 'infovae',
    name: 'InfoVAE',
    displayName: 'Information Maximizing VAE',
    category: 'disentanglement',
    description: 'VAE with mutual information maximization for disentangled and informative representations',
    logic: {
      title: 'Information-Theoretic Disentanglement',
      description: 'InfoVAE balances reconstruction, KL divergence, and mutual information to learn disentangled yet informative factors',
      mainIdea: 'Maximize information between data and latent code while encouraging disentanglement',
      keyComponents: [
        {
          name: 'Mutual Information Term',
          description: 'I(x;z) encourages informativeness',
        },
        {
          name: 'Maximum Mean Discrepancy',
          description: 'Matches aggregate posterior to prior',
        },
        {
          name: 'Balanced Objective',
          description: 'Trade-off between reconstruction and regularization',
        },
      ],
      mathematicalFormulation: 'L = -E_q[log p(x|z)] + (1-α)KL(q(z|x)||p(z)) + (α+λ-1)KL(q(z)||p(z))',
      loss: [
        { name: 'InfoVAE Loss', formula: 'Reconstruction + Weighted KL + MMD' },
      ],
      dataFlow: 'Data → Encoder → Informative Factors → Decoder → Reconstruction',
    },
    architecture: {
      name: 'InfoVAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'Information-Theoretic VAE',
      keyLayers: ['Encoder', 'MMDLayer', 'Decoder'],
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
    tags: ['vae', 'disentanglement', 'information-theory', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['rna'],
  },

  {
    id: 'tcvae',
    name: 'TCVAE',
    displayName: 'Total Correlation VAE',
    category: 'disentanglement',
    description: 'VAE that explicitly decomposes and minimizes total correlation for disentanglement',
    logic: {
      title: 'Total Correlation Decomposition',
      description: 'TCVAE decomposes the KL term into index-code mutual information, total correlation, and dimension-wise KL, then minimizes total correlation',
      mainIdea: 'Achieve disentanglement by explicitly minimizing statistical dependence (total correlation) between latent dimensions',
      keyComponents: [
        {
          name: 'KL Decomposition',
          description: 'Decomposes KL into three interpretable terms',
        },
        {
          name: 'Total Correlation',
          description: 'TC(z) = KL(q(z)||∏_j q(z_j))',
        },
        {
          name: 'Minibatch Stratified Sampling',
          description: 'Estimates TC from minibatches',
        },
      ],
      mathematicalFormulation: 'KL(q(z|x)||p(z)) = I(x;z) + TC(z) + Σ_j KL(q(z_j)||p(z_j))',
      loss: [
        { name: 'β-TCVAE Loss', formula: 'Reconstruction + I(x;z) + β*TC(z) + Dimension KL' },
      ],
      dataFlow: 'Data → Encoder → Decorrelated Latents → Decoder → Reconstruction',
    },
    architecture: {
      name: 'TCVAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'Total Correlation VAE',
      keyLayers: ['Encoder', 'TotalCorrelationEstimator', 'Decoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Isolating Sources of Disentanglement in Variational Autoencoders',
        year: 2018,
        authors: 'Chen et al.',
      },
    ],
    tags: ['vae', 'disentanglement', 'total-correlation', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['rna'],
  },

  {
    id: 'dipvae',
    name: 'DIPVAE',
    displayName: 'Disentangled Inferred Prior VAE',
    category: 'disentanglement',
    description: 'VAE that learns a factorial prior to encourage disentanglement',
    logic: {
      title: 'Factorial Prior Learning',
      description: 'DIPVAE encourages disentanglement by regularizing the covariance of the aggregate posterior to be diagonal (factorized)',
      mainIdea: 'Encourage factorial posterior by matching aggregate posterior covariance to identity matrix',
      keyComponents: [
        {
          name: 'Covariance Regularization',
          description: 'Regularizes Cov[q(z)] to be diagonal',
        },
        {
          name: 'Factorial Prior',
          description: 'Encourages independence across dimensions',
        },
        {
          name: 'Type I/II Variants',
          description: 'Different regularization strategies',
        },
      ],
      mathematicalFormulation: 'L = ELBO + λ*||Cov_q(z) - I||_F²',
      loss: [
        { name: 'DIPVAE Loss', formula: 'Reconstruction + KL + λ*Covariance Penalty' },
      ],
      dataFlow: 'Data → Encoder → Factorial Latents → Decoder → Reconstruction',
    },
    architecture: {
      name: 'DIPVAE',
      inputType: 'single-cell',
      outputType: 'factors',
      architectureType: 'VAE with Factorial Prior Learning',
      keyLayers: ['Encoder', 'CovarianceRegularizer', 'Decoder'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Variational Inference of Disentangled Latent Concepts from Unlabeled Observations',
        year: 2018,
        authors: 'Kumar et al.',
      },
    ],
    tags: ['vae', 'disentanglement', 'factorial-prior', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['rna'],
  },
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
    id: 'predictive',
    label: 'Predictive Models',
    description: 'Models focused on prediction tasks: clustering, classification, imputation',
    count: modelsData.filter(m => m.category === 'predictive').length,
  },
  {
    id: 'generative',
    label: 'Generative Models',
    description: 'Models focused on data generation: synthesis, augmentation, sampling',
    count: modelsData.filter(m => m.category === 'generative').length,
  },
  {
    id: 'atac-specific',
    label: 'scATAC-Specific Models',
    description: 'Models specifically designed for chromatin accessibility data',
    count: modelsData.filter(m => m.category === 'atac-specific').length,
  },
  {
    id: 'gaussian-geometric',
    label: 'Gaussian Geometric Models',
    description: 'Models using geometric structures: hyperbolic, spherical, mixture models',
    count: modelsData.filter(m => m.category === 'gaussian-geometric').length,
  },
  {
    id: 'disentanglement',
    label: 'Disentanglement Models',
    description: 'Models focused on learning disentangled factor representations',
    count: modelsData.filter(m => m.category === 'disentanglement').length,
  },
] as const;