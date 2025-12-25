'use client';

import { Model } from '@/types/models';
import { getCategoryMetadata } from '@/lib/utils';
import { 
  ArrowLeft, 
  Database, 
  Calendar, 
  Users, 
  ExternalLink,
  Layers,
  Target,
  Zap,
  GitBranch,
  Code,
  Tag,
  CheckCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';
import styles from './ModelDetailView.module.css';

export function ModelDetailView({ model }: { model: Model }) {
  const categoryMetadata = getCategoryMetadata(model.category);
  
  // Convert category to camelCase for CSS class
  const categoryClass = model.category.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

  // Get star ratings
  const complexityStars = ['simple', 'moderate', 'complex'].indexOf(model.complexity) + 1;
  const interpretabilityStars = ['low', 'medium', 'high'].indexOf(model.interpretability) + 1;

  const renderStars = (count: number, total: number = 3) => {
    return (
      <div className={styles.stars}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i}>{i < count ? '★' : '☆'}</span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Link href="/models" className={styles.backLink}>
        <ArrowLeft className="w-4 h-4" />
        Back to Models
      </Link>

      {/* ============================================
          HEADER SECTION
          ============================================ */}
      <section className={styles.sectionNoBorder}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{model.name}</h1>
              <span className={`${styles.categoryBadge} ${styles[categoryClass]}`}>
                {categoryMetadata.icon} {categoryMetadata.label}
              </span>
            </div>
            <h2 className={styles.subtitle}>{model.displayName}</h2>
          </div>

          {/* Modality Badges */}
          <div className={styles.modalityBadges}>
            {model.modalitySupport.includes('rna') && (
              <div className={`${styles.modalityBadge} ${styles.rna}`}>
                <Database className="w-4 h-4" />
                <span>RNA</span>
              </div>
            )}
            {model.modalitySupport.includes('atac') && (
              <div className={`${styles.modalityBadge} ${styles.atac}`}>
                <Database className="w-4 h-4" />
                <span>ATAC</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={styles.description}>{model.description}</p>

        {/* Publications */}
        <div className={styles.infoBox}>
          <h3 className={styles.infoBoxTitle}>
            <Info className="w-4 h-4" />
            Publications
          </h3>
          {model.publications.map((pub, idx) => (
            <div key={idx} className={styles.publicationItem}>
              <div className={styles.publicationHeader}>
                <p className={styles.publicationTitle}>{pub.title}</p>
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className={styles.publicationMeta}>
                <span className={styles.metaItem}>
                  <Users className="w-4 h-4" />
                  {pub.authors || 'Authors N/A'}
                </span>
                <span className={styles.metaItem}>
                  <Calendar className="w-4 h-4" />
                  {pub.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Complexity</div>
            <div className={styles.metricValue}>
              {renderStars(complexityStars)}
              <span className={styles.metricText}>{model.complexity}</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Interpretability</div>
            <div className={styles.metricValue}>
              {renderStars(interpretabilityStars)}
              <span className={styles.metricText}>{model.interpretability}</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Architecture</div>
            <div className={styles.metricValueText}>{model.architecture.name}</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Latent Dim</div>
            <div className={styles.metricValueText}>
              {model.architecture.latentDim || 'N/A'}
            </div>
          </div>
        </div>

        {/* LAIOR Badge */}
        {model.usesInLAIOR && (
          <div className={styles.badge}>
            <CheckCircle className="w-4 h-4" />
            Used in LAIOR Framework
          </div>
        )}
      </section>

      {/* ============================================
          LOGIC SECTION
          ============================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Target className={`w-6 h-6 ${styles.iconBlue}`} />
          <h2 className={styles.sectionTitle}>{model.logic.title}</h2>
        </div>

        <p className={styles.description}>{model.logic.description}</p>

        {/* Main Idea */}
        <div className={styles.highlightBox}>
          <h3 className={styles.highlightTitle}>Main Idea</h3>
          <p className={styles.highlightText}>{model.logic.mainIdea}</p>
        </div>

        {/* Key Components */}
        <div className={styles.subsectionMargin}>  {/* ✅ Replaced inline style */}
          <h3 className={styles.subsectionHeader}>  {/* ✅ New class instead of inline styles */}
            <Layers className="w-5 h-5" />
            <span className={styles.subsectionTitle}>Key Components</span>
          </h3>
          <div className={styles.componentsGrid}>
            {model.logic.keyComponents.map((component, idx) => (
              <div key={idx} className={styles.componentBox}>
                <h4 className={styles.componentTitle}>{component.name}</h4>
                <p className={styles.componentDescription}>{component.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mathematical Formulation */}
        {model.logic.mathematicalFormulation && (
          <div className={styles.subsectionMargin}>  {/* ✅ Replaced inline style */}
            <h3 className={styles.subsectionTitle}>Mathematical Formulation</h3>
            <div className={styles.codeBlock}>
              {model.logic.mathematicalFormulation}
            </div>
          </div>
        )}

        {/* Loss Functions */}
        {model.logic.loss && model.logic.loss.length > 0 && (
          <div className={styles.subsectionMargin}>  {/* ✅ Replaced inline style */}
            <h3 className={styles.subsectionHeader}>  {/* ✅ New class */}
              <Zap className="w-5 h-5" />
              <span className={styles.subsectionTitle}>Loss Functions</span>
            </h3>
            <div>
              {model.logic.loss.map((loss, idx) => (
                <div key={idx} className={styles.lossItem}>
                  <div className={styles.lossName}>{loss.name}</div>
                  <div className={styles.codeBlock}>{loss.formula}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Flow */}
        <div className={styles.subsectionMargin}>  {/* ✅ Replaced inline style */}
          <h3 className={styles.subsectionHeader}>  {/* ✅ New class */}
            <GitBranch className="w-5 h-5" />
            <span className={styles.subsectionTitle}>Data Flow</span>
          </h3>
          <div className={styles.infoBox}>
            <p className={styles.codeBlockCondensed}>  {/* ✅ New class instead of inline padding */}
              {model.logic.dataFlow}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          ARCHITECTURE SECTION
          ============================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Layers className={`w-6 h-6 ${styles.iconPurple}`} />
          <h2 className={styles.sectionTitle}>Architecture Details</h2>
        </div>

        <div className={styles.architectureGrid}>
          <div className={styles.architectureItem}>
            <h3 className={styles.architectureLabel}>Architecture Type</h3>
            <p className={styles.architectureValue}>{model.architecture.architectureType}</p>
          </div>

          <div className={styles.architectureItem}>
            <h3 className={styles.architectureLabel}>Input/Output Types</h3>
            <p className={styles.architectureValue}>
              {model.architecture.inputType} → {model.architecture.outputType}
            </p>
          </div>

          <div className={`${styles.architectureItem} ${styles.gridColumnFull}`}>  {/* ✅ New class instead of inline style */}
            <h3 className={styles.architectureLabel}>Key Layers</h3>
            <div className={styles.layerBadges}>
              {model.architecture.keyLayers.map((layer, idx) => (
                <span key={idx} className={styles.layerBadge}>
                  {layer}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FRAMEWORKS & TAGS
          ============================================ */}
      <section className={styles.gridTwo}>
        {/* Frameworks */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>
            <Code className="w-5 h-5" />
            <span className={styles.sectionTitle}>Frameworks</span>
          </h3>
          <div className={styles.tagContainer}>
            {model.frameworks.map(fw => (
              <span key={fw} className={styles.tag}>
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>
            <Tag className="w-5 h-5" />
            <span className={styles.sectionTitle}>Tags</span>
          </h3>
          <div className={styles.tagContainer}>
            {model.tags.map(tag => (
              <span key={tag} className={`${styles.tag} ${styles.tagRounded}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}