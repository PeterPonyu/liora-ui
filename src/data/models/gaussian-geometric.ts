import { Model } from '@/types/models';

export const gaussianGeometricModels: Model[] = [
  {
    id: 'gmvae-pgm',
    name: 'GMVAE (PGM)',
    displayName: 'Gaussian Mixture VAE - Product of Experts',
    category: 'gaussian-geometric',
    description: 'VAE with Product of Experts Gaussian mixture prior for clustering in Euclidean space',
    logic: {
      title: 'Gaussian Mixture Clustering',
      description: 'GMVAE-PGM uses a mixture of Gaussians as the prior to learn discrete clusters while maintaining continuous representations with Product of Experts and full VAE reconstruction',
      mainIdea: 'Learn interpretable clusters by combining Gaussian mixtures with VAE framework in Euclidean space',
      keyComponents: [
        {
          name: 'Mixture Encoder',
          description: 'Encodes to mixture of K Gaussians',
        },
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
        {
          name: 'Cluster-Specific Decoder',
          description: 'Reconstructs expression conditioned on cluster',
        },
      ],
      mathematicalFormulation: 'p(z) = Σ_k π_k N(μ_k, Σ_k); p(c) = Categorical(π); X̂ = Decoder(z,c)',
      loss: [
        { name: 'ELBO', formula: 'Reconstruction + KL with mixture prior' },
      ],
      dataFlow: 'Expression → Mixture Encoder → (z, c) → Cluster-Specific Decoder → Reconstructed Expression',
    },
    architecture: {
      name: 'GMVAE-PGM',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Gaussian Mixture VAE (VAE Architecture)',
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
    tags: ['vae', 'mixture', 'clustering', 'gaussian', 'generative', 'rna'],
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
    description: 'GMVAE in hyperbolic Poincaré space for hierarchical cell type relationships',
    logic: {
      title: 'Hyperbolic Hierarchical Clustering',
      description: 'Uses Poincaré ball model to represent hierarchical relationships between cell types naturally in hyperbolic geometry with full VAE reconstruction',
      mainIdea: 'Capture hierarchical cell type relationships using hyperbolic geometry that naturally represents tree structures',
      keyComponents: [
        {
          name: 'Poincaré Encoder',
          description: 'Maps cells to Poincaré ball',
        },
        {
          name: 'Hyperbolic Distances',
          description: 'Measures similarity in hyperbolic space',
        },
        {
          name: 'Wrapped Normal Distribution',
          description: 'Gaussian analog in hyperbolic space for mixture',
        },
        {
          name: 'Geometric Decoder',
          description: 'Reconstructs expression from hyperbolic embeddings',
        },
      ],
      mathematicalFormulation: 'z ∈ B^d (Poincaré ball); d_H(z_i,z_j) = acosh(1 + 2||z_i⊖z_j||²/((1-||z_i||²)(1-||z_j||²))); X̂ = Decoder(z)',
      loss: [
        { name: 'Hyperbolic ELBO', formula: 'Reconstruction + KL in hyperbolic space' },
      ],
      dataFlow: 'Expression → Poincaré Encoder → Hyperbolic Mixture → Geometric Decoder → Reconstructed Expression',
    },
    architecture: {
      name: 'Hyperbolic GMVAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'GMVAE in Poincaré Ball (VAE Architecture)',
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
    tags: ['vae', 'hyperbolic', 'hierarchical', 'geometric', 'generative', 'rna'],
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
    description: 'GMVAE using Hyperbolic-Wrapped distributions for hierarchical clustering on Lorentz hyperboloid',
    logic: {
      title: 'Wrapped Hyperbolic Clustering',
      description: 'Uses Hyperbolic-Wrapped normal distributions on the hyperboloid model to naturally encode hierarchical relationships with full VAE reconstruction',
      mainIdea: 'Capture complex hierarchical structures using wrapped distributions on Lorentz hyperboloid geometry',
      keyComponents: [
        {
          name: 'Lorentz Encoder',
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
        {
          name: 'HW Decoder',
          description: 'Reconstructs expression from hyperboloid embeddings',
        },
      ],
      mathematicalFormulation: 'p(z) = Σ_k π_k WrappedNormal_k(μ_k, σ_k) on Lorentz hyperboloid; X̂ = Decoder(z)',
      loss: [
        { name: 'HW-ELBO', formula: 'Reconstruction + KL with wrapped distributions' },
      ],
      dataFlow: 'Expression → HW Encoder → Hyperboloid Mixture → HW Decoder → Reconstructed Expression + Hierarchical Clusters',
    },
    architecture: {
      name: 'HW-GMVAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'GMVAE with Hyperbolic-Wrapped Distributions (VAE Architecture)',
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
    tags: ['vae', 'hyperbolic', 'wrapped', 'hierarchical', 'generative', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'gmvae-learnable-pgm',
    name: 'GMVAE (LearnablePGM)',
    displayName: 'Learnable Pseudo-Gaussian Manifold VAE',
    category: 'gaussian-geometric',
    description: 'GMVAE with learnable curvature PGM for adaptive geometric structure',
    logic: {
      title: 'Adaptive Curvature Geometric Clustering',
      description: 'LearnablePGM extends PGM by learning per-dimension curvature parameters (α, β², c), enabling adaptive geometric structure that adjusts to data characteristics',
      mainIdea: 'Learn both latent representations AND per-dimension geometric curvature, allowing the manifold to adaptively adjust its structure from data',
      keyComponents: [
        {
          name: 'ExpEncoderLayer',
          description: 'Maps features to half-plane via exponential map from Poincaré disk; encodes learnable [α, log(β²), log(c)]',
        },
        {
          name: 'Learnable Curvature Parameters',
          description: '[α, log(β²), log(c)] per latent dimension: shape parameter α, variance log(β²), curvature magnitude log(c)',
        },
        {
          name: 'Adaptive Manifold',
          description: 'Geometric structure adapts per latent dimension via learned c parameter',
        },
        {
          name: 'LogDecoderLayer',
          description: 'Maps latent from half-plane to Poincaré disk via logarithmic map; reconstructs expression',
        },
      ],
      mathematicalFormulation: 'θ_i = [α_i, β_i², c_i] learned per dimension i; manifold curvature = -c_i; z ~ PGM(θ); X̂ = Decoder(z)',
      loss: [
        { name: 'LearnablePGM-ELBO', formula: 'E_q[log p(x|z)] - KL(q(z|α,β²,c) || p(z|α_0,β_0²,c_0))' },
      ],
      dataFlow: 'Expression → ExpEncoder [α,β²,c] → Adaptive Manifold Space → LogDecoder → Reconstructed Expression',
    },
    architecture: {
      name: 'LearnablePGM-GMVAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'GMVAE with Learnable Per-Dimension Curvature (VAE Architecture)',
      keyLayers: ['ExpEncoderLayer', 'LearnableManifold', 'LogDecoderLayer', 'GeooptPoincareBall'],
      latentDim: 10,
    },
    frameworks: ['PyTorch', 'geoopt'],
    publications: [
      {
        title: 'Geometric Manifold Learning with Adaptive Curvature for Single-Cell Analysis',
        year: 2024,
        authors: 'GM-VAE Authors',
      },
    ],
    tags: ['vae', 'learnable-curvature', 'pgm', 'geometric', 'adaptive', 'manifold', 'generative', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLiora: true,
    modalitySupport: ['rna'],
  },
];
