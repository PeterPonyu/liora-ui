import { getAllDatasetIds } from '@/lib/dataLoader';
import DatasetDetailClient from './client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const ids = await getAllDatasetIds();
  return ids.map((id) => ({
    id,
  }));
}

export default async function DatasetDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <DatasetDetailClient id={id} />;
}