'use client';

import { useEffect, useState } from 'react';
import { Dataset } from '@/types/models';
import { getDatasetById } from '@/lib/dataLoader';
import { getDataTypeLabel, getSpeciesLabel } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

interface DatasetDetailClientProps {
  id: string;
}

export default function DatasetDetailClient({ id }: DatasetDetailClientProps) {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDataset() {
      // Parse ID from format: "rna-1" or "atac-2"
      const numericId = parseInt(id.split('-')[1]);
      
      const data = await getDatasetById(numericId);
      setDataset(data || null);
      setLoading(false);
    }
    
    loadDataset();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingText}>Loading dataset...</div>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorTitle}>Dataset not found</div>
        <Link href="/datasets" className={styles.errorLink}>
          ← Back to datasets
        </Link>
      </div>
    );
  }

  const { label: typeLabel, color: typeColor } = getDataTypeLabel(dataset.dataType || 'RNA');
  const gseUrl = `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${dataset.accession}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link href="/datasets" className={styles.backLink}>
        ← Back to datasets
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className={styles.header}>
          <h1 className={styles.title}>
            {dataset.title}
          </h1>
          <span
            className={styles.badge}
            style={{ backgroundColor: typeColor }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Accession with Link */}
        <a
          href={gseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.accessionLink}
        >
          <span className={styles.accessionCode}>{dataset.accession}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Info Grid */}
      <div className={styles.infoGrid}>
        {/* Species */}
        <div className={styles.infoBox}>
          <h3 className={styles.infoLabel}>Species</h3>
          <p className={`${styles.infoValue} ${styles.infoValueItalic}`}>
            {getSpeciesLabel(dataset.species)}
          </p>
        </div>

        {/* Platform */}
        <div className={styles.infoBox}>
          <h3 className={styles.infoLabel}>Platform</h3>
          <p className={styles.infoValue}>
            {dataset.platform}
          </p>
        </div>

        {/* Source */}
        <div className={styles.infoBox}>
          <h3 className={styles.infoLabel}>Source</h3>
          <p className={styles.infoValue}>
            {dataset.source}
          </p>
        </div>

        {/* Author */}
        <div className={styles.infoBox}>
          <h3 className={styles.infoLabel}>Author(s)</h3>
          <p className={styles.infoValue}>
            {dataset.author}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className={styles.descriptionBox}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.descriptionText}>
          {dataset.description}
        </p>
      </div>

      {/* External Links */}
      <div className={styles.linksBox}>
        <h2 className={styles.sectionTitle}>External Resources</h2>
        <a
          href={gseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalButton}
        >
          View on GEO
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
