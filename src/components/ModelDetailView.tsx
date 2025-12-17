'use client';

import { Model } from '@/types/models';
import { getCategoryColor, getCategoryMetadata } from '@/lib/utils';
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

export function ModelDetailView({ model }: { model: Model }) {
  const categoryColor = getCategoryColor(model.category);
  const categoryMetadata = getCategoryMetadata(model.category);

  // Get star ratings
  const complexityStars = ['simple', 'moderate', 'complex'].indexOf(model.complexity) + 1;
  const interpretabilityStars = ['low', 'medium', 'high'].indexOf(model.interpretability) + 1;

  const renderStars = (count: number, total: number = 3) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="text-yellow-400 text-xl"
          >
            {i < count ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link 
        href="/models"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        style={{ color: 'rgb(var(--text-tertiary))' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Models
      </Link>

      {/* ============================================
          HEADER SECTION
          ============================================ */}
      <section className="space-y-6 bg-card rounded-xl p-8" style={{ 
        backgroundColor: 'rgb(var(--card))',
        color: 'rgb(var(--card-foreground))'
      }}>
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
                {model.name}
              </h1>
              <span
                className="px-3 py-1 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {categoryMetadata.icon} {categoryMetadata.label}
              </span>
            </div>
            <h2 className="text-2xl" style={{ color: 'rgb(var(--text-secondary))' }}>
              {model.displayName}
            </h2>
          </div>

          {/* Modality Badges */}
          <div className="flex gap-2">
            {model.modalitySupport.includes('rna') && (
              <div className="px-4 py-2 rounded-lg border-2" style={{
                backgroundColor: 'rgb(22 163 74 / 0.1)',
                borderColor: 'rgb(22 163 74)',
                color: 'rgb(22 163 74)'
              }}>
                <div className="font-semibold flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  RNA
                </div>
              </div>
            )}
            {model.modalitySupport.includes('atac') && (
              <div className="px-4 py-2 rounded-lg border-2" style={{
                backgroundColor: 'rgb(217 119 6 / 0.1)',
                borderColor: 'rgb(217 119 6)',
                color: 'rgb(217 119 6)'
              }}>
                <div className="font-semibold flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  ATAC
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
          {model.description}
        </p>

        {/* Publications */}
        <div className="detail-info-box rounded-xl p-6 space-y-3 border">
          <h3 className="text-sm font-semibold uppercase tracking-wide flex items-center gap-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            <Info className="w-4 h-4" />
            Publications
          </h3>
          {model.publications.map((pub, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
                  {pub.title}
                </p>
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {pub.authors || 'Authors N/A'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {pub.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="detail-metric-card rounded-xl p-4 border">
            <div className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Complexity</div>
            <div className="flex items-center gap-2">
              {renderStars(complexityStars)}
              <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-primary))' }}>
                {model.complexity}
              </span>
            </div>
          </div>

          <div className="detail-metric-card rounded-xl p-4 border">
            <div className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Interpretability</div>
            <div className="flex items-center gap-2">
              {renderStars(interpretabilityStars)}
              <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-primary))' }}>
                {model.interpretability}
              </span>
            </div>
          </div>

          <div className="detail-metric-card rounded-xl p-4 border">
            <div className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Architecture</div>
            <div className="text-base font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              {model.architecture.name}
            </div>
          </div>

          <div className="detail-metric-card rounded-xl p-4 border">
            <div className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Latent Dim</div>
            <div className="text-base font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              {model.architecture.latentDim || 'N/A'}
            </div>
          </div>
        </div>

        {/* Liora Badge */}
        {model.usesInLiora && (
          <div className="detail-success-badge inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border">
            <CheckCircle className="w-5 h-5" />
            Used in Liora Framework
          </div>
        )}
      </section>

      {/* ============================================
          LOGIC SECTION
          ============================================ */}
      <section className="bg-card rounded-xl p-8 border space-y-6" style={{ 
        backgroundColor: 'rgb(var(--card))',
        color: 'rgb(var(--card-foreground))',
        borderColor: 'rgb(var(--border))'
      }}>
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6" style={{ color: 'rgb(37 99 235)' }} />
          <h2 className="text-2xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
            {model.logic.title}
          </h2>
        </div>

        <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
          {model.logic.description}
        </p>

        {/* Main Idea */}
        <div className="detail-info-highlight p-4 rounded-r-lg border-l-4">
          <h3 className="font-semibold mb-2" style={{ color: 'rgb(var(--text-primary))' }}>Main Idea</h3>
          <p style={{ color: 'rgb(var(--text-secondary))' }}>{model.logic.mainIdea}</p>
        </div>

        {/* Key Components */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'rgb(var(--text-primary))' }}>
            <Layers className="w-5 h-5" />
            Key Components
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {model.logic.keyComponents.map((component, idx) => (
              <div
                key={idx}
                className="detail-component-box rounded-lg p-4 border"
              >
                <h4 className="font-semibold mb-2" style={{ color: 'rgb(var(--text-primary))' }}>
                  {component.name}
                </h4>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mathematical Formulation */}
        {model.logic.mathematicalFormulation && (
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'rgb(var(--text-primary))' }}>
              Mathematical Formulation
            </h3>
            <div className="detail-code-block p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {model.logic.mathematicalFormulation}
            </div>
          </div>
        )}

        {/* Loss Functions */}
        {model.logic.loss && model.logic.loss.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text-primary))' }}>
              <Zap className="w-5 h-5" />
              Loss Functions
            </h3>
            <div className="space-y-3">
              {model.logic.loss.map((loss, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
                    {loss.name}
                  </div>
                  <div className="detail-code-block p-3 rounded-lg font-mono text-sm overflow-x-auto">
                    {loss.formula}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Flow */}
        <div>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text-primary))' }}>
            <GitBranch className="w-5 h-5" />
            Data Flow
          </h3>
          <div className="detail-info-box border rounded-lg p-4">
            <p className="font-mono text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {model.logic.dataFlow}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          ARCHITECTURE SECTION
          ============================================ */}
      <section className="bg-card rounded-xl p-8 border space-y-6" style={{ 
        backgroundColor: 'rgb(var(--card))',
        color: 'rgb(var(--card-foreground))',
        borderColor: 'rgb(var(--border))'
      }}>
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6" style={{ color: 'rgb(147 51 234)' }} />
          <h2 className="text-2xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
            Architecture Details
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              Architecture Type
            </h3>
            <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              {model.architecture.architectureType}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              Input/Output Types
            </h3>
            <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
              {model.architecture.inputType} → {model.architecture.outputType}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
              Key Layers
            </h3>
            <div className="flex flex-wrap gap-2">
              {model.architecture.keyLayers.map((layer, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: 'rgb(147 51 234 / 0.1)',
                    color: 'rgb(147 51 234)',
                    border: '1px solid rgb(147 51 234 / 0.5)'
                  }}
                >
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
      <section className="grid md:grid-cols-2 gap-6">
        {/* Frameworks */}
        <div className="bg-card rounded-xl p-6 border" style={{ 
          backgroundColor: 'rgb(var(--card))',
          color: 'rgb(var(--card-foreground))',
          borderColor: 'rgb(var(--border))'
        }}>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'rgb(var(--text-primary))' }}>
            <Code className="w-5 h-5" />
            Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {model.frameworks.map(fw => (
              <span
                key={fw}
                className="px-3 py-2 rounded-lg text-sm font-medium border"
                style={{
                  backgroundColor: 'rgb(var(--secondary))',
                  color: 'rgb(var(--text-secondary))',
                  borderColor: 'rgb(var(--border))'
                }}
              >
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-card rounded-xl p-6 border" style={{ 
          backgroundColor: 'rgb(var(--card))',
          color: 'rgb(var(--card-foreground))',
          borderColor: 'rgb(var(--border))'
        }}>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'rgb(var(--text-primary))' }}>
            <Tag className="w-5 h-5" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {model.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-2 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: 'rgb(var(--secondary))',
                  color: 'rgb(var(--text-secondary))',
                  borderColor: 'rgb(var(--border))'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}