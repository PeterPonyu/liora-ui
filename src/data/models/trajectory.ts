import { Model } from '@/types/models';

export const trajectoryModels: Model[] = [
  {
    id: 'sctour',
    name: 'scTour',
    displayName: 'Trajectory Inference and Ordering',
    category: 'trajectory',
    description: 'Trajectory inference VAE for learning cell developmental paths in single-cell data',
    logic: {
      title: 'Latent Trajectory Inference',
      description: 'scTour learns latent developmental trajectories by modeling cell progression through ordered latent representations with VAE reconstruction',
      mainIdea: 'Infer cell differentiation trajectories by learning smooth paths through latent space with reconstruction',
      keyComponents: [
        {
          name: 'Trajectory Encoder',
          description: 'VAE encoder with ordered latent structure',
        },
        {
          name: 'Path Smoothness',
          description: 'Regularization for smooth trajectories',
        },
        {
          name: 'Pseudo-timing',
          description: 'Assigns pseudo-time along trajectories',
        },
        {
          name: 'Decoder',
          description: 'Reconstructs expression from trajectory embeddings',
        },
      ],
      mathematicalFormulation: 'z_t = f_θ(t); smooth ordering via latent trajectory; X̂ = Decoder(z)',
      loss: [
        { name: 'ELBO', formula: 'Reconstruction + KL' },
        { name: 'Smoothness', formula: 'Temporal regularization' },
      ],
      dataFlow: 'Expression → Encoder → Ordered Latent → Trajectory Inference → Decoder → Pseudo-time + Reconstructed Expression',
    },
    architecture: {
      name: 'Trajectory VAE',
      inputType: 'single-cell',
      outputType: 'reconstruction',
      architectureType: 'VAE with Temporal Structure',
      keyLayers: ['Encoder', 'TemporalDecoder', 'TrajectoryHead'],
      latentDim: 10,
    },
    frameworks: ['PyTorch'],
    publications: [
      {
        title: 'Deep generative modeling of transcriptional dynamics for RNA velocity analysis in single cells',
        year: 2023,
        authors: 'Li et al.',
      },
    ],
    tags: ['trajectory', 'pseudo-time', 'development', 'vae', 'generative', 'rna'],
    complexity: 'moderate',
    interpretability: 'high',
    usesInLAIOR: false,
    modalitySupport: ['rna', 'atac'],
  },
];
