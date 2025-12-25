import { notFound } from 'next/navigation';
import { modelsData } from '@/data/models';
import { ModelDetailView } from '@/components/ModelDetailView';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return modelsData.map((model) => ({
    id: model.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const model = modelsData.find((m) => m.id === id);

  if (!model) {
    return {
      title: 'Model Not Found',
    };
  }

  return {
    title: `${model.name} - ${model.displayName} | LAIOR Benchmark`,
    description: model.description,
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const model = modelsData.find((m) => m.id === id);

  if (!model) {
    notFound();
  }

  return <ModelDetailView model={model} />;
}