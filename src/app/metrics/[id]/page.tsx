import { notFound } from 'next/navigation';
import { metricsData } from '@/data/metrics';
import { MetricDetailView } from '@/components/MetricDetailView';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return metricsData.map((metric) => ({
    id: metric.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const metric = metricsData.find((m) => m.id === id);

  if (!metric) {
    return {
      title: 'Metric Not Found',
    };
  }

  return {
    title: metric.shortName,
    description: metric.description,
    alternates: {
      canonical: `/liora-ui/metrics/${metric.id}/`,
    },
    openGraph: {
      url: `https://peterponyu.github.io/liora-ui/metrics/${metric.id}/`,
    },
  };
}

export default async function MetricDetailPage({ params }: PageProps) {
  const { id } = await params;
  const metric = metricsData.find((m) => m.id === id);

  if (!metric) {
    notFound();
  }

  return <MetricDetailView metric={metric} />;
}
