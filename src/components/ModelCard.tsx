'use client';

import { Model } from '@/types/models';
import {
  getCategoryColor,
} from '@/lib/utils';
import Link from 'next/link';
import { Database, Calendar, Users } from 'lucide-react';

export function ModelCard({ model }: { model: Model }) {
  const categoryColor = getCategoryColor(model.category);

  const complexityStars = ['simple', 'moderate', 'complex'].indexOf(
    model.complexity
  ) + 1;
  const interpretabilityStars = ['low', 'medium', 'high'].indexOf(
    model.interpretability
  ) + 1;

  const renderStars = (count: number, total: number = 3) => {
    return (
      <div className="model-card-metric-stars">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="star"
            title={i < count ? 'Filled' : 'Empty'}
          >
            {i < count ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const primaryPublication = model.publications[0];

  return (
    <Link href={`/models/${model.id}`}>
      <div
        className="model-card"
        data-category={model.category}
      >
        <div className="model-card-header">
          <div className="model-card-title-section">
            <div className="model-card-name">
              <div className="model-card-shortname">{model.name}</div>
              <div className="model-card-displayname">
                {model.displayName}
              </div>
            </div>
            <div
              className="model-card-category-badge"
              style={{ backgroundColor: categoryColor }}
              title={model.category}
            >
              {model.category
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </div>
          </div>

          <div className="model-card-modality-badges">
            {model.modalitySupport.includes('rna') && (
              <div className="model-card-modality-badge rna">
                <Database className="w-3 h-3" />
                RNA
              </div>
            )}
            {model.modalitySupport.includes('atac') && (
              <div className="model-card-modality-badge atac">
                <Database className="w-3 h-3" />
                ATAC
              </div>
            )}
          </div>

          {primaryPublication && (
            <div className="model-card-publication">
              <div className="model-card-publication-item">
                <Users className="w-3.5 h-3.5" />
                <span>{primaryPublication.authors || 'Authors N/A'}</span>
              </div>
              <div className="model-card-publication-item">
                <Calendar className="w-3.5 h-3.5" />
                <span>{primaryPublication.year}</span>
              </div>
            </div>
          )}
        </div>

        <div className="model-card-body">
          <p className="model-card-description">{model.description}</p>

          <div className="model-card-metrics">
            <div className="model-card-metric">
              <div className="model-card-metric-label">Complexity</div>
              <div className="model-card-metric-value">
                {renderStars(complexityStars)}
              </div>
            </div>
            <div className="model-card-metric">
              <div className="model-card-metric-label">Interpretability</div>
              <div className="model-card-metric-value">
                {renderStars(interpretabilityStars)}
              </div>
            </div>
          </div>

          {model.frameworks.length > 0 && (
            <div className="model-card-frameworks">
              {model.frameworks.slice(0, 3).map(fw => (
                <span key={fw} className="model-card-framework-tag">
                  {fw}
                </span>
              ))}
              {model.frameworks.length > 3 && (
                <span className="model-card-framework-tag">
                  +{model.frameworks.length - 3}
                </span>
              )}
            </div>
          )}

          {model.tags.length > 0 && (
            <div className="model-card-tags">
              {model.tags.slice(0, 4).map(tag => (
                <span key={tag} className="model-card-tag">
                  {tag}
                </span>
              ))}
              {model.tags.length > 4 && (
                <span className="model-card-tag">
                  +{model.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {model.usesInLiora && (
          <div className="model-card-footer">
            <span className="model-card-liora-badge">
              <span>✓</span>
              Used in Liora
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}