import React, { useState, useEffect } from 'react';
import { apiRequest } from '../api/client.js';
import {
  BarChart3,
  Users,
  FileText,
  CheckCircle2,
  Layers,
  FolderGit2,
  Award,
  Cpu,
  TrendingUp,
  MapPin,
  Building2,
  Clock,
  ShieldAlert
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest('/admin/dashboard').then((res) => {
      if (res.success && res.metrics) {
        setMetrics(res.metrics);
      }
      setLoading(false);
    });
  }, []);

  if (loading || !metrics) {
    return <div className="text-center py-20 text-slate-500 font-medium">Loading state administration analytics...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Jharkhand State Administration & Civic Analytics Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Executive Impact & System Operations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Real-time telemetry on civic issues, university project conversions, and AI pipeline performance.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reports</span>
          <div className="text-3xl font-black text-slate-900">{metrics.totalReports}</div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {metrics.verifiedReports} verified on-ground
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Projects</span>
          <div className="text-3xl font-black text-blue-600">{metrics.projectsInProgress}</div>
          <span className="text-[11px] text-blue-700 font-medium">Engineering teams mobilized</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consolidated Clusters</span>
          <div className="text-3xl font-black text-amber-600">{metrics.duplicateClusters}</div>
          <span className="text-[11px] text-amber-700 font-medium">Semantic duplicate groups</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Impact Points Awarded</span>
          <div className="text-3xl font-black text-emerald-600">{metrics.totalImpactPoints}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Citizens & student solvers</span>
        </div>
      </div>

      {/* AI Pipeline Health Card (Section 15) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">AI Orchestration Engine Status</h3>
              <p className="text-xs text-slate-400">
                {metrics.aiProcessingStatus?.provider} ({metrics.aiProcessingStatus?.mode})
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Operational • {metrics.aiProcessingStatus?.averageProcessingTimeMs}ms latency
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 font-medium block">Vector Engine:</span>
            <span className="font-bold text-white mt-0.5 block">{metrics.aiProcessingStatus?.vectorSearchStatus}</span>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 font-medium block">Deduplication Threshold:</span>
            <span className="font-bold text-amber-400 mt-0.5 block">{metrics.aiProcessingStatus?.similarityThreshold}</span>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 font-medium block">Multilingual Gateways:</span>
            <span className="font-bold text-blue-300 mt-0.5 block">EN, HI, TE, Santhali, Mundari, Ho</span>
          </div>
        </div>
      </div>

      {/* District & Category Breakdown Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problems by District */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Civic Problem Distribution by District</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">{metrics.problemsByDistrict?.length} Active Districts</span>
          </div>

          <div className="space-y-2.5">
            {metrics.problemsByDistrict?.slice(0, 7).map((d: any, i: number) => {
              const pct = Math.round((d.count / (metrics.totalReports || 1)) * 100);
              return (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-700 font-semibold">{d.district}</span>
                    <span className="text-slate-500">{d.count} reports ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(10, pct)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Problems by Category */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Problems by Category</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Top Priority Sectors</span>
          </div>

          <div className="space-y-2.5">
            {metrics.problemsByCategory?.slice(0, 7).map((c: any, i: number) => {
              const pct = Math.round((c.count / (metrics.totalReports || 1)) * 100);
              return (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-700 font-semibold">{c.category}</span>
                    <span className="text-slate-500">{c.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(10, pct)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
