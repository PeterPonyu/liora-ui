# Liora Benchmarks - Single-Cell Analysis Models Dashboard

A comprehensive Next.js frontend for exploring, understanding, and comparing single-cell analysis models, datasets, and benchmarking results.

## 🎯 Overview

This dashboard presents an integrated view of:
- **15 Models** (Unified, External, Disentanglement)
- **80+ Datasets** (scRNA-seq, scATAC-seq)
- **50+ Evaluation Metrics** (Clustering, Dimensionality Reduction, Intrinsic LSE, Runtime)
- **Benchmarking Results** across all model-dataset combinations

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Home page with overview
│   ├── models/
│   │   └── page.tsx            # Models catalog & browser
│   ├── datasets/
│   │   └── page.tsx            # Datasets browser
│   ├── metrics/
│   │   └── page.tsx            # Metrics reference library
│   └── benchmarks/
│       └── page.tsx            # Benchmarking results explorer
│
├── components/                   # Reusable React components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer
│   ├── ThemeToggle.tsx          # Dark/light theme toggle
│   ├── ModelCard.tsx            # Model display card
│   ├── DatasetCard.tsx          # Dataset display card
│   └── MetricCard.tsx           # Metric display card
│
├── data/                        # Static data & databases
│   ├── models.ts                # 15 models with logic/architecture
│   ├── datasets.ts              # 80+ datasets with metadata
│   ├── metrics.ts               # 50+ metrics definitions
│   └── benchmarks.ts            # Benchmark results (CSV-like)
│
├── lib/                         # Utility functions
│   └── utils.ts                 # Colors, formatting, filtering
│
└── types/                       # TypeScript type definitions
    └── models.ts                # Comprehensive type system
```

## 🚀 Features

### 1. **Model Catalog**
- Browse 15 models across 3 categories:
  - **Unified Models** (12): Integrated into Liora framework
  - **External Models** (3): Industry standards (scVI, PeakVI, PoissonVI)
  - **Disentanglement** (5): Factor analysis methods (InfoVAE, β-VAE, TCVAE, DIPVAE)
- For each model:
  - Model logic & main idea
  - Architecture details
  - Mathematical formulations
  - Loss functions
  - Data flow diagrams
  - Publications & frameworks
  - Complexity & interpretability ratings

### 2. **Dataset Browser**
- Explore 80+ single-cell datasets:
  - **48 scRNA-seq** datasets (human, mouse, other)
  - **32 scATAC-seq** datasets
- Dataset information:
  - Cell and feature counts
  - Tissue types & species
  - Category (Cancer, Development, Disease, Homeostatic)
  - Preprocessing details
  - Which models tested on this dataset

### 3. **Metrics Reference Library**
- **50+ Evaluation Metrics** organized by category:
  - **Clustering**: NMI, ARI, Silhouette, Davies-Bouldin, Calinski-Harabasz, Correlation
  - **Dimensionality Reduction**: Q_local, Q_global, Distance Correlation, K_max
  - **Intrinsic Latent Space (LSE)**: Manifold Dimensionality, Spectral Decay, Participation Ratio, Anisotropy, Trajectory Directionality, Noise Resilience, Core Quality
  - **Runtime**: Training Time, Inference Time
- For each metric:
  - Definition & formula
  - Range & interpretation
  - Better direction (higher/lower)
  - Use cases

### 4. **Benchmarking Results Explorer**
- Interactive result visualization:
  - **Chart View**: Bar charts ranked by performance
  - **Table View**: Detailed results with normalized scores
  - **Heatmap View**: Cross-model, cross-metric performance matrix
- Dataset selection
- Metric selection
- Dynamic filtering

### 5. **Dark Mode Support**
- Full dark/light theme toggle
- Persistent theme preference
- System preference detection

## 🛠 Technology Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## 🎨 Design System

### Color Scheme by Category

| Category | Color | Hex |
|----------|-------|-----|
| Unified Models | Indigo | `#6366f1` |
| External Models | Teal | `#14b8a6` |
| Disentanglement | Rose | `#f43f5e` |

### Complexity Levels
- Simple: Green (`#22c55e`)
- Moderate: Amber (`#f59e0b`)
- Complex: Red (`#ef4444`)

### Interpretability Levels
- Low: Red (`#ef4444`)
- Medium: Amber (`#f59e0b`)
- High: Green (`#22c55e`)

## 📦 Data Format

### Models Data (`data/models.ts`)
```typescript
{
  id: 'scvi',
  name: 'scVI',
  category: 'external',
  logic: {
    title: '...',
    mainIdea: '...',
    keyComponents: [...],
    mathematicalFormulation: '...'
  },
  architecture: {...},
  publications: [...],
  benchmarkDatasets: [...]
}
```

### Datasets Data (`data/datasets.ts`)
```typescript
{
  id: 'gse117988_bone_marrow',
  name: 'GSE117988',
  dataType: 'RNA',
  species: 'homo_sapiens',
  stats: {
    cellCount: 40231,
    geneCount: 18492,
    hvgCount: 3000,
    benchmarkCellCount: 3000
  }
}
```

### Metrics Data (`data/metrics.ts`)
```typescript
{
  id: 'nmi',
  name: 'Normalized Mutual Information',
  category: 'clustering',
  range: { min: 0, max: 1 },
  betterDirection: 'higher',
  formula: 'I(X;Y) / √(H(X)H(Y))'
}
```

### Benchmark Results (`data/benchmarks.ts`)
```typescript
{
  datasetId: 'gse117988_bone_marrow',
  modelId: 'scvi',
  metrics: {
    nmi: 0.89,
    ari: 0.85,
    // ... other metrics
  }
}
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Or with yarn
yarn install
```

### Development

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📖 Usage

### Home Page (`/`)
- Overview of all categories
- Quick stats
- Navigation to main sections

### Models (`/models`)
- Search and filter models
- Filter by category (Unified/External/Disentanglement)
- View model details
- Click on model cards for full details

### Datasets (`/datasets`)
- Search and filter datasets
- Filter by type (scRNA-seq, scATAC-seq)
- View dataset statistics
- Click on dataset for full metadata

### Metrics (`/metrics`)
- Search and filter metrics
- Filter by category (Clustering, Reduction, Intrinsic, Runtime)
- Understand each metric's definition

### Benchmarks (`/benchmarks`)
- Select dataset and metric
- Choose view (Chart/Table/Heatmap)
- Compare model performance visually

## 🔗 API Integration (Future)

To load results from CSV files:

```typescript
// Load from backend API
const response = await fetch('/api/benchmarks?dataset=gse117988&model=scvi');
const results = await response.json();
```

## 📊 Performance Considerations

- Lazy loading for large model lists
- Memoization for expensive computations
- Chart optimization with Recharts
- Virtual scrolling for large tables (when needed)

## 🎯 Key Utility Functions

### Color & Display
- `getCategoryColor()` - Get category color
- `getCategoryBgColor()` - Get category background
- `getComplexityColor()` - Complexity indicator color
- `getDataTypeLabel()` - Standardize data type display

### Formatting
- `formatMetricValue()` - Format with units
- `formatNumber()` - Human-readable numbers (K, M)
- `getDatasetStatsDescription()` - Stats summary

### Filtering & Search
- `filterModels()` - Search & category filter
- `filterDatasets()` - Search & type filter
- `filterMetrics()` - Search & category filter

### Metrics
- `normalizeMetricValue()` - Normalize to 0-1
- `getRankColor()` - Color by performance
- `getMetricDirectionIcon()` - Higher/lower indicator

## 📚 Documentation

### Model Logic Display
Each model page includes:
1. **Main Idea** - 2-3 sentence overview
2. **Key Components** - Core architectural elements
3. **Mathematical Formulation** - LaTeX equations
4. **Loss Functions** - Training objectives
5. **Data Flow** - Input→Output pipeline

### Metric Interpretation
Each metric page includes:
1. **Definition** - What it measures
2. **Formula** - Mathematical expression
3. **Range** - Min/max values
4. **Interpretation** - What values mean
5. **Better Direction** - Higher or lower is better

## 🔄 Data Updates

To update benchmark results:
1. Replace/update `data/benchmarks.ts` with new CSV data
2. Parse CSV into `BenchmarkResult[]` format
3. Rebuild and redeploy

## 🐛 Troubleshooting

### Theme not applying?
- Check browser localStorage for 'theme' key
- Clear cache and reload

### Charts not rendering?
- Verify Recharts installation: `npm list recharts`
- Check browser console for errors

### Types not recognized?
- Run: `npm run type-check`
- Verify `tsconfig.json` includes all paths

## 🤝 Contributing

To add new models/datasets:
1. Add to `data/models.ts` or `data/datasets.ts`
2. Ensure all required fields are populated
3. Test in Models/Datasets pages
4. Update benchmark results in `data/benchmarks.ts`

## 📄 License

This project is part of Liora benchmarking framework.

---

**Built with ❤️ for single-cell bioinformatics**
