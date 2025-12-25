import { Model } from '@/types/models';

export const predictiveModels: Model[] = [
  {
    id: 'scgcc',
    name: 'scGCC',
    displayName: 'Graph Contrastive Clustering',
    category: 'predictive',
    description: 'Graph neural network with MoCo-based contrastive learning for single-cell clustering and embedding (encoder-only)',
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
      dataFlow: 'Expression → kNN Graph → GAT Encoder → MoCo Head → Contrastive Embeddings (No Decoder)',
    },
    architecture: {
      name: 'Graph Attention Encoder',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Graph Attention Network with Contrastive Head (Encoder-Only)',
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
    tags: ['contrastive', 'graph', 'clustering', 'encoder-only', 'rna'],
    complexity: 'complex',
    interpretability: 'medium',
    usesInLAIOR: true,
    modalitySupport: ['rna'],
  },

  {
    id: 'clear',
    name: 'CLEAR',
    displayName: 'Contrastive Learning for Enhanced scRNA-seq',
    category: 'predictive',
    description: 'MoCo-based contrastive learning framework for learning robust cell representations (encoder-only)',
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
      dataFlow: 'Data → Two Augmented Views → Query/Momentum Encoders → Feature Similarity → Contrastive Loss (No Decoder)',
    },
    architecture: {
      name: 'MoCo Encoder',
      inputType: 'single-cell',
      outputType: 'latent',
      architectureType: 'Momentum Contrast Framework (Encoder-Only)',
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
    tags: ['contrastive', 'embedding', 'batch-robust', 'encoder-only', 'rna'],
    complexity: 'moderate',
    interpretability: 'medium',
    usesInLAIOR: true,
    modalitySupport: ['rna'],
  },
];
