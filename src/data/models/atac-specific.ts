import { Model } from '@/types/models';

export const atacSpecificModels: Model[] = [
  {
    id: 'peakvi',
    name: 'PeakVI',
    displayName: 'Peak Variational Inference',
    category: 'atac-specific',
    description: 'Deep generative VAE model for single-cell chromatin accessibility peak analysis',
    logic: {
      title: 'Sparse Peak Accessibility Modeling',
      description: 'PeakVI models scATAC-seq peak data using a noise model tailored to the sparsity and binary nature of accessibility with full VAE reconstruction',
      mainIdea: 'Learn informative latent representations by modeling peak accessibility with appropriate probabilistic framework and reconstruction',
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
        {
          name: 'Bernoulli Decoder',
          description: 'Reconstructs peak accessibility probabilities',
        },
      ],
      mathematicalFormulation: 'p(x|z,s) = Bernoulli(ρ); ρ learned from latent; X̂ = Decoder(z)',
      loss: [
        { name: 'ELBO', formula: 'E_q[log p(x|z)] - KL(q(z|x)||p(z))' },
      ],
      dataFlow: 'Peak Data (Sparse) → Encoder → Latent Space → Bernoulli Decoder → Reconstructed Peak Probabilities',
    },
    architecture: {
      name: 'Sparse VAE',
      inputType: 'peak',
      outputType: 'reconstruction',
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
    tags: ['vae', 'atac-seq', 'sparse', 'chromatin', 'generative'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['atac'],
  },

  {
    id: 'poissonvi',
    name: 'PoissonVI',
    displayName: 'Poisson Variational Inference',
    category: 'atac-specific',
    description: 'Deep generative VAE model for quantitative scATAC-seq fragment counts using Poisson likelihood',
    logic: {
      title: 'Fragment Count Modeling',
      description: 'PoissonVI uses Poisson likelihood to model scATAC-seq fragment counts, capturing quantitative accessibility information with full VAE reconstruction',
      mainIdea: 'Learn latent representations from scATAC fragment counts by modeling the Poisson-distributed count data with reconstruction',
      keyComponents: [
        {
          name: 'Fragment Count Encoder',
          description: 'Encodes quantitative accessibility from fragment counts',
        },
        {
          name: 'Poisson Likelihood',
          description: 'Models fragment count distribution',
        },
        {
          name: 'Batch Correction',
          description: 'Handles technical variation in ATAC experiments',
        },
        {
          name: 'Poisson Decoder',
          description: 'Reconstructs fragment counts from latent representation',
        },
      ],
      mathematicalFormulation: 'p(x|z,s) = Poisson(λ); λ = exp(decoder(z,s)); X̂ = Decoder(z)',
      loss: [
        { name: 'ELBO', formula: 'E_q[log Poisson(x|λ(z))] - KL(q(z|x)||p(z))' },
      ],
      dataFlow: 'Fragment Counts → Encoder → Latent Space → Poisson Decoder → Reconstructed Fragment Counts',
    },
    architecture: {
      name: 'Poisson VAE',
      inputType: 'peak',
      outputType: 'reconstruction',
      architectureType: 'VAE with Poisson Likelihood',
      keyLayers: ['Encoder', 'PoissonDecoder', 'BatchLayer'],
      latentDim: 10,
    },
    frameworks: ['PyTorch', 'JAX'],
    publications: [
      {
        title: 'Joint probabilistic modeling of single-cell multi-omic data with totalVI',
        year: 2021,
        authors: 'Gayoso et al.',
      },
    ],
    tags: ['vae', 'atac-seq', 'poisson', 'fragment-counts', 'generative'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLiora: false,
    modalitySupport: ['atac'],
  },
];
