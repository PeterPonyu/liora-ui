import { Model } from '@/types/models';

export const generativeModels: Model[] = [
  {
    id: 'scvi',
    name: 'scVI',
    displayName: 'Single-cell Variational Inference',
    category: 'generative',
    description: 'Deep generative VAE model for scRNA-seq with probabilistic inference and batch correction',
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
      outputType: 'reconstruction',
      architectureType: 'Variational Autoencoder with Zero-Inflation',
      keyLayers: ['DenseLayer', 'DispersionLayer', 'ZeroInflationLayer', 'Decoder'],
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
    category: 'generative',
    description: 'Graph autoencoder that models cell-cell relationships through cell graphs for imputation and clustering',
    logic: {
      title: 'Cell-Cell Graph Modeling',
      description: 'scGNN constructs cell-cell graphs and uses Graph Neural Networks to aggregate information across similar cells for imputation and clustering',
      mainIdea: 'Learn meaningful cell representations by modeling both gene expression and cell-cell similarity relationships with reconstruction',
      keyComponents: [
        {
          name: 'Graph Construction',
          description: 'Build cell graphs using expression similarity',
        },
        {
          name: 'Graph Neural Network Encoder',
          description: 'Aggregate neighbor information via message passing',
        },
        {
          name: 'Decoder',
          description: 'Reconstruct missing/dropout values',
        },
        {
          name: 'Clustering Module',
          description: 'Identify cell populations from learned embeddings',
        },
      ],
      mathematicalFormulation: 'H^(l+1) = σ(D^(-1/2) A D^(-1/2) H^(l) W^(l)); X̂ = Decoder(H_final)',
      loss: [
        { name: 'Reconstruction Loss', formula: 'MSE(X, X̂)' },
        { name: 'Clustering Loss', formula: 'Cross-Entropy' },
      ],
      dataFlow: 'Gene Expression → Cell Graph Construction → GNN Encoder → Embeddings → Decoder → Imputation + Clustering',
    },
    architecture: {
      name: 'Graph Autoencoder',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Graph Convolutional Autoencoder (VAE Architecture)',
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
    tags: ['graph', 'clustering', 'imputation', 'vae', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scalex',
    name: 'SCALEX',
    displayName: 'Online Single-Cell Data Integration',
    category: 'generative',
    description: 'Scalable VAE for online integration of single-cell data by projecting into batch-invariant space',
    logic: {
      title: 'Online Batch Integration',
      description: 'SCALEX uses VAE to learn batch-invariant representations that enable continuous atlas expansion and online integration',
      mainIdea: 'Enable scalable data integration by learning disentangled batch and biological factors with reconstruction',
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
      loss: [
        { name: 'ELBO', formula: 'Reconstruction + KL divergence + Batch loss' },
      ],
      dataFlow: 'Multi-batch Data → Encoder → Batch-Invariant Latent → Decoder → Integrated Expression',
    },
    architecture: {
      name: 'Batch-Aware VAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
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
    category: 'generative',
    description: 'Neural network VAE method for cell searching and annotation via unbiased cell embedding',
    logic: {
      title: 'Cell-to-Cell Similarity Search',
      description: 'Cell BLAST learns unbiased cell embeddings via VAE that enable accurate cell-to-cell similarity search across datasets',
      mainIdea: 'Enable accurate cell annotation by learning batch-corrected embeddings for similarity search with reconstruction',
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
          name: 'Decoder',
          description: 'Reconstructs expression with uncertainty',
        },
        {
          name: 'Similarity Metric',
          description: 'Computes cell-to-cell similarity with uncertainty',
        },
      ],
      mathematicalFormulation: 'L = E[log p(x|z)] - KL(q(z|x)||p(z)); Similarity based on probabilistic embeddings',
      loss: [
        { name: 'ELBO', formula: 'Reconstruction + KL divergence' },
      ],
      dataFlow: 'Query Cells → VAE Encoder → Batch Correction → Decoder → Similarity Search → Reference Matches',
    },
    architecture: {
      name: 'VAE with Search',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'VAE with Cell Similarity Module',
      keyLayers: ['Encoder', 'BatchCorrector', 'Decoder', 'SimilarityLayer'],
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
    id: 'scdac',
    name: 'scDAC',
    displayName: 'Deep Adaptive Clustering',
    category: 'generative',
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
      dataFlow: 'Expression → Autoencoder Encoder → Embeddings → DPMM Inference → Autoencoder Decoder → Clusters + Posterior',
    },
    architecture: {
      name: 'Adaptive Autoencoder',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Deep Autoencoder with DPMM (VAE Architecture)',
      keyLayers: ['MLPEncoder', 'DPMMLayer', 'MLPDecoder'],
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
    tags: ['clustering', 'adaptive', 'autoencoder', 'vae', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scdeepcluster',
    name: 'scDeepCluster',
    displayName: 'Deep Clustering with ZINB',
    category: 'generative',
    description: 'Autoencoder with Zero-Inflated Negative Binomial reconstruction and DEC-style clustering',
    logic: {
      title: 'Joint Clustering and Reconstruction',
      description: 'scDeepCluster uses autoencoders with ZINB loss and clustering refinement via DEC (Deep Embedded Clustering) approach',
      mainIdea: 'Learn clusters by jointly optimizing reconstruction loss and clustering consistency with DEC-style centroid-based refinement',
      keyComponents: [
        {
          name: 'Encoder',
          description: 'Maps expression to latent embeddings',
        },
        {
          name: 'ZINB Decoder',
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
      ],
      mathematicalFormulation: 'p(x|z) = ZINB(π, μ, θ); clustering via centroid distances',
      loss: [
        { name: 'ZINB Reconstruction', formula: 'Zero-Inflated NB loss' },
        { name: 'Clustering', formula: 'KL divergence to soft cluster assignments' },
      ],
      dataFlow: 'Expression → AE Encoder → Pretrain → KMeans Init → Joint Optimization → ZINB Decoder → Clusters + Latent',
    },
    architecture: {
      name: 'DEC-based Autoencoder',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Autoencoder with ZINB + DEC (VAE Architecture)',
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
    tags: ['clustering', 'zinb', 'deep-embedded', 'vae', 'rna'],
    complexity: 'moderate',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scdhmap',
    name: 'scDHMap',
    displayName: 'Hyperbolic Diffusion Map',
    category: 'generative',
    description: 'Hyperbolic VAE with ZINB reconstruction and t-SNE repulsion for hierarchical cell visualization',
    logic: {
      title: 'Hierarchical Hyperbolic Embedding',
      description: 'scDHMap embeds cells in hyperbolic space (Lorentz hyperboloid) to capture hierarchical relationships naturally, with ZINB reconstruction and t-SNE repulsion',
      mainIdea: 'Preserve hierarchical cell type relationships using hyperbolic geometry with improved scalability via VAE reconstruction',
      keyComponents: [
        {
          name: 'Lorentz Encoder',
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
      mathematicalFormulation: 'z ∈ Lorentz hyperboloid; d_H(z_i,z_j) = acosh(-<z_i,z_j>_L); X̂ = ZINB_decode(z)',
      loss: [
        { name: 'ZINB', formula: 'Zero-Inflated NB reconstruction' },
        { name: 'Hyperbolic KL', formula: 'KL in hyperbolic space' },
        { name: 't-SNE', formula: 'Repulsive force regularization' },
      ],
      dataFlow: 'Expression → Hyperbolic Encoder → Lorentz Space → ZINB Decoder + tSNE → Reconstruction + Visualization',
    },
    architecture: {
      name: 'Hyperbolic VAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
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
    tags: ['hyperbolic', 'hierarchical', 'visualization', 'vae', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scsmd',
    name: 'scSMD',
    displayName: 'ResNet-based Clustering',
    category: 'generative',
    description: 'ResNet autoencoder with mutual information clustering for single-cell analysis',
    logic: {
      title: 'CNN-based Clustering via Mutual Information',
      description: 'scSMD reshapes gene expression as 2D images and uses ResNet autoencoders with mutual information-based clustering',
      mainIdea: 'Leverage CNN architectures by treating gene expression as 2D data, clustering via maximizing mutual information with reconstruction',
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
          name: 'ResNet Decoder',
          description: 'Reconstructs 2D gene expression via transposed convolutions',
        },
        {
          name: 'NB Loss',
          description: 'Negative Binomial reconstruction loss',
        },
      ],
      mathematicalFormulation: 'L = NB_loss(X, X̂) + β*MI(X; C)',
      loss: [
        { name: 'NB Reconstruction', formula: 'Negative Binomial loss' },
        { name: 'MI Clustering', formula: 'Mutual information between data and clusters' },
      ],
      dataFlow: 'Expression → Reshape 2D → ResNet Encoder → MI Clustering → ResNet Decoder → Reconstructed Expression',
    },
    architecture: {
      name: 'ResNet Autoencoder',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: '2D CNN Autoencoder with ResNet (VAE Architecture)',
      keyLayers: ['Conv2D', 'BottleneckBlock', 'TransposedConv', 'Decoder'],
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
    tags: ['clustering', 'cnn', 'mutual-information', 'vae', 'rna'],
    complexity: 'moderate',
    interpretability: 'low',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'scdiffusion',
    name: 'scDiffusion',
    displayName: 'Diffusion Model for Single-Cell',
    category: 'generative',
    description: 'Conditional diffusion model for high-quality single-cell data generation with cell-type control',
    logic: {
      title: 'Conditional Denoising Diffusion',
      description: 'scDiffusion combines diffusion models with foundation models to generate realistic single-cell data conditioned on cell types via iterative denoising (reconstruction process)',
      mainIdea: 'Generate high-quality synthetic single-cell data by learning to reverse a noise diffusion process through denoising reconstruction',
      keyComponents: [
        {
          name: 'Forward Diffusion',
          description: 'Gradually add Gaussian noise over T timesteps',
        },
        {
          name: 'Noise Predictor (Encoder)',
          description: 'Transformer-based network predicts noise at each step',
        },
        {
          name: 'Conditional Generation',
          description: 'Condition on cell type, tissue, or experimental factors',
        },
        {
          name: 'Reverse Sampling (Decoder)',
          description: 'Iteratively denoise to reconstruct/generate new samples',
        },
      ],
      mathematicalFormulation: 'q(x_t|x_{t-1}) = N(√(1-β_t)x_{t-1}, β_t I); p_θ(x_{t-1}|x_t,c) learned via denoising',
      loss: [
        { name: 'Denoising Loss', formula: '||ε - ε_θ(x_t, t, c)||² (reconstruction of clean data from noise)' },
      ],
      dataFlow: 'Real Data + Condition → Forward Noise Addition → Noisy Data → Noise Predictor → Reverse Denoising → Reconstructed/Generated Data',
    },
    architecture: {
      name: 'Conditional Diffusion Model',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Conditional Denoising Diffusion Probabilistic Model (VAE-like Architecture)',
      keyLayers: ['TransformerBlock', 'TimeEmbedding', 'ConditionEncoder', 'DenoisingDecoder'],
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
    tags: ['diffusion', 'generative', 'conditional', 'reconstruction', 'rna'],
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
      description: 'siVAE uses structured priors and regularization to learn interpretable latent representations with full VAE reconstruction',
      mainIdea: 'Learn interpretable factors by structuring the latent space with domain knowledge and reconstructing expression',
      keyComponents: [
        {
          name: 'Encoder',
          description: 'Maps expression to structured latent space',
        },
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
          description: 'Models count distribution appropriately for reconstruction',
        },
      ],
      mathematicalFormulation: 'p(x|z) = NB(μ(z), θ); structured prior on z; X̂ = Decoder(z)',
      loss: [
        { name: 'ELBO', formula: 'Reconstruction + KL divergence' },
      ],
      dataFlow: 'Expression → Encoder → Structured Latent → NB Decoder → Reconstructed Expression',
    },
    architecture: {
      name: 'Structured VAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
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
];
