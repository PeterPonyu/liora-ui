import { Model } from '@/types/models';

export const disentanglementModels: Model[] = [
  {
    id: 'betavae',
    name: 'β-VAE',
    displayName: 'Beta Variational Autoencoder',
    category: 'disentanglement',
    description: 'VAE with weighted KL divergence for learning disentangled factors',
    logic: {
      title: 'Weighted Disentanglement',
      description: 'β-VAE uses a hyperparameter β to weight the KL term, encouraging each latent dimension to encode independent factors of variation with full VAE reconstruction',
      mainIdea: 'Learn disentangled representations by increasing pressure on latent bottleneck while maintaining reconstruction',
      keyComponents: [
        {
          name: 'Encoder',
          description: 'Maps data to latent factors',
        },
        {
          name: 'Weighted KL Term',
          description: 'β > 1 increases disentanglement pressure',
        },
        {
          name: 'Information Bottleneck',
          description: 'Forces compact, factorized representations',
        },
        {
          name: 'Decoder',
          description: 'Reconstructs data from disentangled factors',
        },
      ],
      mathematicalFormulation: 'L = E_q[log p(x|z)] - β*KL(q(z|x)||p(z)); X̂ = Decoder(z)',
      loss: [
        { name: 'β-VAE Loss', formula: 'Reconstruction + β*KL (β > 1 for disentanglement)' },
      ],
      dataFlow: 'Data → Encoder → Disentangled Factors → Decoder → Reconstruction',
    },
    architecture: {
      name: 'β-VAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Weighted Variational Autoencoder (VAE Architecture)',
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
    tags: ['vae', 'disentanglement', 'factors', 'generative', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLAIOR: false,
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
      description: 'InfoVAE balances reconstruction, KL divergence, and mutual information to learn disentangled yet informative factors with full VAE reconstruction',
      mainIdea: 'Maximize information between data and latent code while encouraging disentanglement and reconstruction',
      keyComponents: [
        {
          name: 'Encoder',
          description: 'Maps data to informative latent factors',
        },
        {
          name: 'Mutual Information Term',
          description: 'I(x;z) encourages informativeness',
        },
        {
          name: 'Maximum Mean Discrepancy',
          description: 'Matches aggregate posterior to prior',
        },
        {
          name: 'Decoder',
          description: 'Reconstructs from informative factors',
        },
      ],
      mathematicalFormulation: 'L = -E_q[log p(x|z)] + (1-α)KL(q(z|x)||p(z)) + (α+λ-1)KL(q(z)||p(z)); X̂ = Decoder(z)',
      loss: [
        { name: 'InfoVAE Loss', formula: 'Reconstruction + Weighted KL + MMD' },
      ],
      dataFlow: 'Data → Encoder → Informative Factors → Decoder → Reconstruction',
    },
    architecture: {
      name: 'InfoVAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Information-Theoretic VAE (VAE Architecture)',
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
    tags: ['vae', 'disentanglement', 'information-theory', 'generative', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLAIOR: false,
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
      description: 'TCVAE decomposes the KL term into index-code mutual information, total correlation, and dimension-wise KL, then minimizes total correlation with full VAE reconstruction',
      mainIdea: 'Achieve disentanglement by explicitly minimizing statistical dependence (total correlation) between latent dimensions while reconstructing',
      keyComponents: [
        {
          name: 'Encoder',
          description: 'Maps to decorrelated latent factors',
        },
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
        {
          name: 'Decoder',
          description: 'Reconstructs from decorrelated factors',
        },
      ],
      mathematicalFormulation: 'KL(q(z|x)||p(z)) = I(x;z) + TC(z) + Σ_j KL(q(z_j)||p(z_j)); X̂ = Decoder(z)',
      loss: [
        { name: 'β-TCVAE Loss', formula: 'Reconstruction + I(x;z) + β*TC(z) + Dimension KL' },
      ],
      dataFlow: 'Data → Encoder → Decorrelated Latents → Decoder → Reconstruction',
    },
    architecture: {
      name: 'TCVAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'Total Correlation VAE (VAE Architecture)',
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
    tags: ['vae', 'disentanglement', 'total-correlation', 'generative', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLAIOR: false,
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
      description: 'DIPVAE encourages disentanglement by regularizing the covariance of the aggregate posterior to be diagonal (factorized) with full VAE reconstruction',
      mainIdea: 'Encourage factorial posterior by matching aggregate posterior covariance to identity matrix while reconstructing',
      keyComponents: [
        {
          name: 'Encoder',
          description: 'Maps to factorial latent space',
        },
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
        {
          name: 'Decoder',
          description: 'Reconstructs from factorial latents',
        },
      ],
      mathematicalFormulation: 'L = ELBO + λ*||Cov_q(z) - I||_F²; X̂ = Decoder(z)',
      loss: [
        { name: 'DIPVAE Loss', formula: 'Reconstruction + KL + λ*Covariance Penalty' },
      ],
      dataFlow: 'Data → Encoder → Factorial Latents → Decoder → Reconstruction',
    },
    architecture: {
      name: 'DIPVAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'VAE with Factorial Prior Learning (VAE Architecture)',
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
    tags: ['vae', 'disentanglement', 'factorial-prior', 'generative', 'rna'],
    complexity: 'complex',
    interpretability: 'high',
    usesInLAIOR: false,
    modalitySupport: ['rna'],
  },
];
