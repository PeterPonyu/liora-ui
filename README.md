# Liora Benchmarking Dashboard

A comprehensive interactive dashboard for exploring single-cell analysis models, datasets, and benchmarking results from the Liora project.

## 🎯 What You Can Do Here

### 📊 **Explore Datasets**
Browse and analyze **80+ single-cell RNA-seq and ATAC-seq datasets** from NCBI GEO with detailed metadata, preprocessing information, and statistics.

### 🧬 **Discover Models**
Learn about **21 state-of-the-art models** organized by category:
- **Predictive Models** (8): scVI, scGNN, SCALEX, CellBLAST, scGCC, CLEAR, scDAC, scDeepCluster
- **Generative Models** (2): scDiffusion, siVAE
- **scATAC-Specific** (2): PeakVI, scTour
- **Geometric Models** (3): GMVAE variants (PGM, Poincaré, Hyperbolic-Wrapped)
- **Disentanglement Models** (4): β-VAE, InfoVAE, TCVAE, DIPVAE

Each model includes:
- **Main Idea**: Core concept and approach
- **Architecture**: Technical details and components
- **Mathematical Formulation**: Key equations and loss functions
- **Data Flow**: How data moves through the model
- **Publications**: Links to original papers

### 📈 **View Benchmarking Results**
Analyze how models perform across datasets using multiple metrics:
- **Clustering Metrics**: NMI, ARI, ASW, Calinski-Harabasz Index, Davies-Bouldin Index
- **Dimensionality Reduction**: Q_local, Q_global, trustworthiness
- **Intrinsic Latent Space**: Manifold dimensionality, intrinsic dimension
- **Runtime & Efficiency**: Training time, memory usage

### 🔍 **Understand Metrics**
Interactive reference library explaining all 50+ evaluation metrics with:
- Clear definitions and interpretations
- Range and direction (higher/lower is better)
- Mathematical formulas
- Use cases and limitations

## 🌓 **User Experience**

- **Dark/Light Theme Toggle**: Seamlessly switch between themes with persistent storage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Fast Navigation**: Quick links between related models, datasets, and metrics
- **Advanced Filtering**: Search and filter by model category, modality, complexity, and more
- **Consistent Styling**: Professional design inspired by modern data platforms

## 🚀 **Live Demo**

Access the dashboard at: **https://PeterPonyu.github.io/liora-ui**

## 📚 **Key Features**

✨ **Unified Model Catalog** - All Liora unified models in one place  
✨ **Cross-Model Comparison** - Compare performance across datasets  
✨ **Interactive Visualizations** - Heatmaps, charts, and tables  
✨ **Educational Content** - Learn model architectures and methods  
✨ **Fast & Responsive** - Optimized for modern browsers  

## 🛠 **Technology Stack**

- **Frontend Framework**: Next.js 15+ with React 19
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Visualizations**: Recharts for interactive charts
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Deployment**: GitHub Pages with GitHub Actions

## 🔗 **Related Projects**

- **Liora**: Main benchmarking framework - https://github.com/PeterPonyu/Liora
- **UI**: Web pages - https://github.com/PeterPonyu/liora-ui

## 📖 **Learn More**

For detailed information about Liora models and benchmarking methodology, visit the main Liora repository.

---

**Created with ❤️ for the single-cell analysis community**