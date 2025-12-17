// src/components/ModelCard/ModelCard.tsx
'use client';

import { Model } from '@/types/models';
import {
  getCategoryColor,
} from '@/lib/utils';
import Link from 'next/link';
import { Database, Calendar, Users } from 'lucide-react';
import styles from './ModelCard.module.css';

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
      <div className={styles.metricStars}>
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
        className={styles.card}
        data-category={model.category}
      >
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.name}>
              <div className={styles.shortname}>{model.name}</div>
              <div className={styles.displayname}>
                {model.displayName}
              </div>
            </div>
            <div
              className={styles.categoryBadge}
              style={{ backgroundColor: categoryColor }}
              title={model.category}
            >
              {model.category
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </div>
          </div>

          <div className={styles.modalityBadges}>
            {model.modalitySupport.includes('rna') && (
              <div className={`${styles.modalityBadge} ${styles.rna}`}>
                <Database className="w-3 h-3" />
                RNA
              </div>
            )}
            {model.modalitySupport.includes('atac') && (
              <div className={`${styles.modalityBadge} ${styles.atac}`}>
                <Database className="w-3 h-3" />
                ATAC
              </div>
            )}
          </div>

          {primaryPublication && (
            <div className={styles.publication}>
              <div className={styles.publicationItem}>
                <Users className="w-3.5 h-3.5" />
                <span>{primaryPublication.authors || 'Authors N/A'}</span>
              </div>
              <div className={styles.publicationItem}>
                <Calendar className="w-3.5 h-3.5" />
                <span>{primaryPublication.year}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.body}>
          <p className={styles.description}>{model.description}</p>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Complexity</div>
              <div className={styles.metricValue}>
                {renderStars(complexityStars)}
              </div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Interpretability</div>
              <div className={styles.metricValue}>
                {renderStars(interpretabilityStars)}
              </div>
            </div>
          </div>

          {model.frameworks.length > 0 && (
            <div className={styles.frameworks}>
              {model.frameworks.slice(0, 3).map(fw => (
                <span key={fw} className={styles.frameworkTag}>
                  {fw}
                </span>
              ))}
              {model.frameworks.length > 3 && (
                <span className={styles.frameworkTag}>
                  +{model.frameworks.length - 3}
                </span>
              )}
            </div>
          )}

          {model.tags.length > 0 && (
            <div className={styles.tags}>
              {model.tags.slice(0, 4).map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
              {model.tags.length > 4 && (
                <span className={styles.tag}>
                  +{model.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {model.usesInLiora && (
          <div className={styles.footer}>
            <span className={styles.lioraBadge}>
              <span>✓</span>
              Used in Liora
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}