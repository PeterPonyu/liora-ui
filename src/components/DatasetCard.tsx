import { Dataset } from '@/types/models';
import { getSpeciesLabel, getDatasetStatsDescription } from '@/lib/utils';
import Link from 'next/link';
import styles from './DatasetCard.module.css';

export function DatasetCard({ dataset }: { dataset: Dataset }) {
  const dataType = dataset.dataType || 'RNA';
  const typeLabel = dataType === 'RNA' ? 'scRNA-seq' : dataType === 'ATAC' ? 'scATAC-seq' : dataType;
  const typeLower = dataType.toLowerCase();

  return (
    <Link href={`/datasets/${typeLower}-${dataset.id}`}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h3 className={styles.title}>{dataset.title}</h3>
            <p className={styles.accession}>{dataset.accession}</p>
          </div>
          <span className={`${styles.typeBadge} ${styles[typeLower]}`}>
            {typeLabel}
          </span>
        </div>

        {/* Description */}
        <p className={styles.description}>{dataset.description}</p>

        {/* Platform & Source */}
        <div className={styles.platformBox}>
          <p className={styles.platformText}>
            {getDatasetStatsDescription(dataset)}
          </p>
        </div>

        {/* Source/Tissue */}
        <div className={styles.sourceBadges}>
          <span className={`${styles.sourceBadge} ${styles[typeLower]}`}>
            {dataset.source}
          </span>
        </div>

        {/* Species & Author */}
        <div className={styles.footer}>
          <span className={styles.speciesBadge}>
            {getSpeciesLabel(dataset.species)}
          </span>
          <p className={styles.author} title={dataset.author}>
            {dataset.author}
          </p>
        </div>
      </div>
    </Link>
  );
}