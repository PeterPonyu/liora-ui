'use client';

import { useState } from 'react';
import { allDatasets } from '@/data/datasets';
import { modelsData } from '@/data/models';
import { metricsData } from '@/data/metrics';
import { benchmarkResults, getDatasetBenchmarks, getMetricValues } from '@/data/benchmarks';
import { formatMetricValue, normalizeMetricValue, getRankColor } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';

export default function BenchmarksPage() {
  const [selectedDataset, setSelectedDataset] = useState(allDatasets[0]?.id || '');
  const [selectedMetric, setSelectedMetric] = useState('nmi');
  const [viewType, setViewType] = useState<'chart' | 'table' | 'heatmap'>('chart');

  const dataset = allDatasets.find(d => d.id === selectedDataset);
  const metric = metricsData.find(m => m.id === selectedMetric);
  const datasetBenchmarks = getDatasetBenchmarks(selectedDataset);
  const metricValues = getMetricValues(selectedDataset, selectedMetric);

  // Prepare chart data
  const chartData = metricValues
    .map(mv => {
      const model = modelsData.find(m => m.id === mv.modelId);
      return {
        name: model?.displayName || mv.modelId,
        value: mv.value,
        normalized: metric ? normalizeMetricValue(mv.value, metric) : 0,
        color: metric ? getRankColor(normalizeMetricValue(mv.value, metric)) : '#6366f1',
      };
    })
    .sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Benchmarking Results
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Explore model performance across datasets and metrics
        </p>
      </section>

      {/* Controls */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dataset Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Dataset
          </label>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {allDatasets.map(d => (
              <option key={d.id} value={d.id}>
                {d.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Metric Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Metric
          </label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {metricsData.map(m => (
              <option key={m.id} value={m.id}>
                {m.shortName} - {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* View Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            View
          </label>
          <div className="flex gap-2">
            {(['chart', 'table', 'heatmap'] as const).map(type => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                  viewType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Info */}
      <section className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <span className="font-semibold">{dataset?.displayName}</span> - 
          <span className="font-semibold ml-2">{metric?.name}</span>
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
          {dataset?.stats.benchmarkCellCount} benchmark cells • {dataset?.stats.geneCount} features • {datasetBenchmarks.length} models evaluated
        </p>
      </section>

      {/* Chart View */}
      {viewType === 'chart' && chartData.length > 0 && (
        <section className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Model Performance Ranking
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                formatter={(value: any) => formatMetricValue(value, metric)}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="value" fill="#6366f1">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* Table View */}
      {viewType === 'table' && chartData.length > 0 && (
        <section className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-x-auto">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Detailed Results
          </h3>
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-slate-900 dark:text-white">Rank</th>
                <th className="text-left px-4 py-2 font-semibold text-slate-900 dark:text-white">Model</th>
                <th className="text-right px-4 py-2 font-semibold text-slate-900 dark:text-white">Value</th>
                <th className="text-left px-4 py-2 font-semibold text-slate-900 dark:text-white">Score</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((entry, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">#{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{entry.name}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600 dark:text-slate-400">
                    {formatMetricValue(entry.value, metric)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${entry.normalized * 100}%`,
                            backgroundColor: entry.color,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: entry.color }}>
                        {(entry.normalized * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Heatmap View */}
      {viewType === 'heatmap' && (
        <section className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Performance Heatmap (All Models - Clustering Metrics)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-slate-900 dark:text-white">Model</th>
                  {['nmi', 'ari', 'asw'].map(metId => {
                    const m = metricsData.find(mm => mm.id === metId);
                    return (
                      <th key={metId} className="px-4 py-2 font-semibold text-slate-900 dark:text-white text-right">
                        {m?.shortName}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {modelsData.slice(0, 5).map(model => (
                  <tr key={model.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {model.displayName}
                    </td>
                    {['nmi', 'ari', 'asw'].map(metId => {
                      const val = getMetricValues(selectedDataset, metId).find(
                        v => v.modelId === model.id
                      );
                      const m = metricsData.find(mm => mm.id === metId);
                      const normalized = val && m ? normalizeMetricValue(val.value, m) : 0;
                      return (
                        <td
                          key={metId}
                          className="px-4 py-3 text-right font-mono text-sm"
                          style={{
                            backgroundColor: getRankColor(normalized) + '20',
                            color: getRankColor(normalized),
                            fontWeight: 'bold',
                          }}
                        >
                          {val ? formatMetricValue(val.value, m) : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* No Data Message */}
      {chartData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No benchmark results available for this combination
          </p>
        </div>
      )}
    </div>
  );
}
