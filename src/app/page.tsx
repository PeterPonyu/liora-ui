// src/app/page.tsx
'use client';

import Link from 'next/link';
import { modelsData, modelCategories } from '@/data/models';
import { loadDatasets, loadDatasetsSync } from '@/lib/dataLoader';
import { metricsData, metricCategories } from '@/data/metrics';
import { Brain, Database, BarChart3, TrendingUp, ArrowRight, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { homepageLink, scportalLink } from '@/lib/publicGraph';
import type { Dataset } from '@/types/models';
import { useEffect, useState } from 'react';
import styles from './home.module.css';

export default function HomePage() {
  const [datasets, setDatasets] = useState<Dataset[]>(() => loadDatasetsSync());

  useEffect(() => {
    loadDatasets().then(data => setDatasets(data));
  }, []);
  
  const rnaDatasets = datasets.filter(d => d.dataType === 'RNA');
  const atacDatasets = datasets.filter(d => d.dataType === 'ATAC');

  return (
    <div className="space-y-8">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className={styles.heroShell}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGrid}>
          <div className="space-y-5">
            <div className={styles.heroBadge}>
              <Sparkles className={styles.heroBadgeIcon} />
              <span className={styles.heroBadgeText}>Benchmark Gateway</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-[rgb(var(--text-secondary))]">
              <a
                href={scportalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border px-3 py-1 transition-colors hover:bg-[rgb(var(--card))]"
              >
                {scportalLink.name} discovery hub
              </a>
              <a
                href={homepageLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border px-3 py-1 transition-colors hover:bg-[rgb(var(--card))]"
              >
                {homepageLink.name} identity root
              </a>
            </div>
            <div className="space-y-3">
              <h1 className={styles.heroTitle}>LAIOR Benchmarks</h1>
              <p className={styles.heroSubtitle}>
                A focused benchmark microsite for <span className={styles.heroHighlight}>single-cell analysis models</span>, featuring LAIOR (Lorentz Attentive Interpretable ODE Regularized VAE)—the latest evolution in variational autoencoders from <span className={styles.heroHighlight}>VAE → iVAE → LiVAE → LAIOR</span>. Use it after SCPortal discovery to compare <span className={styles.heroHighlight}>{modelsData.length} models</span>, inspect <span className={styles.heroHighlight}>{datasets.length || 'curated'} datasets</span>, and choose from <span className={styles.heroHighlight}>{metricsData.length} standardized metrics</span>.
              </p>
            </div>
            <div className={styles.heroActions}>
              <Link href="/models" className={styles.heroPrimary}>
                Explore Models
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/datasets" className={styles.heroSecondary}>
                Browse Datasets
              </Link>
              <Link href="/metrics" className={styles.heroSecondary}>
                Review Metrics
              </Link>
            </div>
            <div className={styles.heroMeta}>
              <span>{modelsData.length} Models</span>
              <span>{metricsData.length} Metrics</span>
              <span>{datasets.length} Datasets</span>
              <span>{modelCategories.length} Categories</span>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.heroPanelTag}>Snapshot</div>
            <div className={styles.heroPanelTitle}>Benchmark Coverage</div>
            <div className={styles.heroPanelGrid}>
              <StatCard icon={Brain} label="Models" value={modelsData.length} />
              <StatCard icon={Database} label="RNA" value={rnaDatasets.length} />
              <StatCard icon={Database} label="ATAC" value={atacDatasets.length} />
              <StatCard icon={BarChart3} label="Metrics" value={metricsData.length} />
            </div>
            <div className={styles.heroPanelNote}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Purpose-built for benchmark inspection; broader project navigation stays in SCPortal.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FLAGSHIP JOURNEY CONTINUITY
          ============================================ */}
      <section className={styles.journeySection} aria-labelledby="flagship-journey-title">
        <div className={styles.sectionEyebrow}>Flagship triad</div>
        <div className={styles.journeyHeader}>
          <div>
            <h2 id="flagship-journey-title" className={styles.sectionTitle}>
              Identity → discovery → benchmark proof
            </h2>
            <p className={styles.sectionSubtitle}>
              This site stays intentionally narrow: verify the public identity on the homepage, explore the ecosystem in SCPortal, then use LAIOR Benchmarks for model, dataset, and metric decisions.
            </p>
          </div>
          <a
            href={scportalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.journeyHubLink}
          >
            Open discovery hub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className={styles.journeyGrid}>
          <JourneyCard
            index="01"
            title={`${homepageLink.name}: identity root`}
            description="Confirm authorship, public profile context, and canonical project naming before evaluating a benchmark destination."
            href={homepageLink.href}
            cta="Visit identity root"
            external
          />
          <JourneyCard
            index="02"
            title={`${scportalLink.name}: discovery hub`}
            description="Use SCPortal when the task is still exploratory: compare public surfaces, route across projects, and preserve landing-only/local-first boundaries."
            href={scportalLink.href}
            cta="Explore routes"
            external
          />
          <JourneyCard
            index="03"
            title="LAIOR Benchmarks: focused product"
            description="Stay here when the task is benchmark-specific: compare model families, inspect datasets, and choose evaluation metrics."
            href="/models"
            cta="Start benchmark review"
          />
        </div>
      </section>

      {/* ============================================
          QUICK NAVIGATION
          ============================================ */}
      <section className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/models" className={styles.quickNavCard}>
            <Brain className="w-8 h-8 text-[rgb(var(--icon-blue))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Explore {modelsData.length} Models</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Compare architectures, performance, and implementation details
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>
          
          <Link href="/datasets" className={styles.quickNavCard}>
            <Database className="w-8 h-8 text-[rgb(var(--icon-purple))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Browse {datasets.length} Datasets</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Single-cell transcriptomics and chromatin accessibility data
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>

          <Link href="/metrics" className={styles.quickNavCard}>
            <BarChart3 className="w-8 h-8 text-[rgb(var(--icon-emerald))]" />
            <div>
              <h3 className="font-bold text-lg mb-1">Explore {metricsData.length} Metrics</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Standardized evaluation across clustering, embedding, and runtime
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* ============================================
          TASK-FOCUSED BENCHMARK WORKFLOWS
          ============================================ */}
      <section className="space-y-5" aria-labelledby="workflow-title">
        <div className="space-y-2">
          <div className={styles.sectionEyebrow}>Choose a benchmark task</div>
          <h2 id="workflow-title" className={styles.sectionTitle}>
            Product-quality paths for model evaluation
          </h2>
          <p className={styles.sectionSubtitle}>
            The homepage and SCPortal establish context; these task cards move directly into benchmark evidence.
          </p>
        </div>

        <div className={styles.workflowGrid}>
          <WorkflowCard
            icon={Brain}
            title="Compare model families"
            description="Review predictive, generative, trajectory, ATAC-specific, geometric, and disentanglement approaches side by side."
            href="/models"
            cta={`View ${modelsData.length} models`}
          />
          <WorkflowCard
            icon={Database}
            title="Audit dataset coverage"
            description="Inspect scRNA-seq and scATAC-seq benchmark coverage before choosing an evaluation route."
            href="/datasets"
            cta={`Browse ${datasets.length || 'curated'} datasets`}
          />
          <WorkflowCard
            icon={BarChart3}
            title="Select evaluation metrics"
            description="Match clustering, embedding, intrinsic latent-space, and runtime metrics to the benchmark question."
            href="/metrics"
            cta={`Review ${metricsData.length} metrics`}
          />
        </div>
      </section>

      {/* ============================================
          MODEL CATEGORIES
          ============================================ */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Model Categories
          </h2>
            <p className={styles.sectionSubtitle}>
              Compare {modelCategories.length} distinct approaches in LAIOR&apos;s benchmarking suite, from contrastive learning to disentangled representations
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {modelCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.label}
              description={cat.description}
              count={cat.count}
              color={`rgb(var(--category-${cat.id}))`}
              countLabel="models"
              icon={getCategoryIcon(cat.id)}
              href={`/models?category=${cat.id}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          BENCHMARK DATASETS
          ============================================ */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Benchmark Datasets
          </h2>
            <p className={styles.sectionSubtitle}>
              LAIOR&apos;s curated collection of {datasets.length} single-cell datasets for rigorous model evaluation
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CategoryCard
            title="scRNA-seq Datasets"
            description="Gene expression profiling datasets"
            count={rnaDatasets.length}
            color="rgb(var(--rna-primary))"
            countLabel="datasets"
            icon={Database}
            href="/datasets?type=RNA"
          />
          <CategoryCard
            title="scATAC-seq Datasets"
            description="Chromatin accessibility profiling datasets"
            count={atacDatasets.length}
            color="rgb(var(--atac-primary))"
            countLabel="datasets"
            icon={Database}
            href="/datasets?type=ATAC"
          />
        </div>
      </section>

      {/* ============================================
          EVALUATION METRICS
          ============================================ */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Evaluation Metrics
          </h2>
          <p className={styles.sectionSubtitle}>
            {metricsData.length} standardized metrics across {metricCategories.length} evaluation categories for comprehensive model comparison
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {metricCategories.map(cat => (
            <CategoryCard
              key={cat.id}
              title={cat.label}
              description={cat.description}
              count={cat.count}
              color={`rgb(var(--metric-${cat.id}))`}
              countLabel="metrics"
              icon={getMetricIcon(cat.id)}
              href={`/metrics?category=${cat.id}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================
          PLATFORM CAPABILITIES
          ============================================ */}
      <section className="space-y-5 py-6">
        <div className="space-y-2">
          <h2 className={styles.sectionTitle}>
            Platform Capabilities
          </h2>
          <p className={styles.sectionSubtitle}>
            Use this microsite for deep benchmark inspection, and use SCPortal for cross-project discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FeatureCard
            icon={Brain}
            title="Architecture Analysis"
            description="Detailed model comparisons including LAIOR's integrated architecture (ODE regularization + Lorentz geometry + information bottleneck + transformer attention) vs. LiVAE, iVAE, and classical VAE approaches"          />
          <FeatureCard
            icon={Database}
            title="Multi-Modal Benchmarking"
            description={`Evaluate models across ${datasets.length} curated datasets spanning scRNA-seq (${rnaDatasets.length}) and scATAC-seq (${atacDatasets.length}) modalities`}
          />
          <FeatureCard
            icon={BarChart3}
            title="Comprehensive Metrics"
            description={`${metricsData.length} standardized metrics across clustering (${metricCategories.find(c => c.id === 'clustering')?.count || 6}), embedding quality (${metricCategories.find(c => c.id === 'embedding')?.count || 8}), latent space (${metricCategories.find(c => c.id === 'intrinsic')?.count || 8}), and runtime (${metricCategories.find(c => c.id === 'runtime')?.count || 2})`}
          />
        </div>
      </section>

      {/* ============================================
          CALL TO ACTION
          ============================================ */}
      <section className={styles.finalCta}>
        <div className="space-y-2">
          <h2 className={styles.finalCtaTitle}>
            Ready to inspect benchmark evidence?
          </h2>
          <p className={styles.finalCtaDescription}>
            Start with model families, then validate the dataset and metric assumptions behind the comparison.
          </p>
        </div>
        <Link href="/models" className={styles.finalCtaButton}>
          Start Benchmark Review
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Get icon component for model category
 */
function getCategoryIcon(categoryId: string) {
  const iconMap: Record<string, typeof Brain> = {
    'predictive': Brain,
    'generative': Sparkles,
    'trajectory': TrendingUp,
    'atac-specific': Database,
    'gaussian-geometric': BarChart3,
    'disentanglement': Brain,
  };
  return iconMap[categoryId] || Brain;
}

/**
 * Get icon component for metric category
 */
function getMetricIcon(categoryId: string) {
  const iconMap: Record<string, typeof Brain> = {
    'clustering': Brain,
    'embedding': TrendingUp,
    'intrinsic': BarChart3,
    'runtime': Database,
  };
  return iconMap[categoryId] || BarChart3;
}

/* ============================================
   COMPONENT DEFINITIONS
   ============================================ */

/**
 * Stat Card - Displays a single statistic with icon
 */
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Brain;
  label: string;
  value: number;
}) {
  return (
    <div className={styles.statCard}>
      <Icon className={styles.statIcon} />
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

interface JourneyCardProps {
  index: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}

function JourneyCard({
  index,
  title,
  description,
  href,
  cta,
  external = false,
}: JourneyCardProps) {
  const content = (
    <>
      <span className={styles.journeyIndex}>{index}</span>
      <h3 className={styles.journeyTitle}>{title}</h3>
      <p className={styles.journeyDescription}>{description}</p>
      <span className={styles.journeyCta}>
        {cta}
        {external ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.journeyCard}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.journeyCard}>
      {content}
    </Link>
  );
}

interface WorkflowCardProps {
  icon: typeof Brain;
  title: string;
  description: string;
  href: string;
  cta: string;
}

function WorkflowCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: WorkflowCardProps) {
  return (
    <Link href={href} className={styles.workflowCard}>
      <div className={styles.workflowIcon}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className={styles.workflowTitle}>{title}</h3>
      <p className={styles.workflowDescription}>{description}</p>
      <span className={styles.workflowCta}>
        {cta}
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

/**
 * Category Card - Unified card for models, datasets, and metrics
 * Uses CSS variables for consistent theming
 */
interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  color: string;
  countLabel: string;
  icon: typeof Brain;
  href: string;
}

function CategoryCard({
  title,
  description,
  count,
  color,
  countLabel,
  icon: Icon,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div
        className={styles.categoryCard}
        style={{
          borderColor: color,
          backgroundColor: `${color}08`,
        }}
      >
        <div className={styles.categoryCardHeader}>
          <div>
            <h3 className={styles.categoryCardTitle}>
              {title}
            </h3>
            <p className={styles.categoryCardDescription}>
              {description}
            </p>
          </div>
          <Icon className={styles.categoryCardIcon} style={{ color }} />
        </div>
        <div className={styles.categoryCardCount}>
          <span className={styles.categoryCardCountValue} style={{ color }}>
            {count}
          </span>
          <span className={styles.categoryCardCountLabel}>
            {countLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Feature Card - Displays platform capabilities
 */
interface FeatureCardProps {
  icon: typeof Brain;
  title: string;
  description: string;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIconWrapper}>
        <Icon className={styles.featureIcon} />
      </div>
      <h3 className={styles.featureTitle}>
        {title}
      </h3>
      <p className={styles.featureDescription}>
        {description}
      </p>
    </div>
  );
}
