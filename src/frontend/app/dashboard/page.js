// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import KpiCards from "@/components/KpiCards";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   LineChart,
//   Line,
// } from "recharts";

// const API_BASE = "http://127.0.0.1:8000";

// export default function Dashboard() {
//   const [featureImp, setFeatureImp] = useState([]);
//   const [metrics, setMetrics] = useState(null);
//   const [recentPreds, setRecentPreds] = useState([]);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setLoaded(true); // Trigger animations on mount

//     axios
//       .get(`${API_BASE}/feature_importance?n=10`)
//       .then(res => setFeatureImp(res.data.top_features))
//       .catch(console.error);

//     axios
//       .get(`${API_BASE}/metrics`)
//       .then(res => setMetrics(res.data))
//       .catch(console.error);

//     axios
//       .get(`${API_BASE}/recent_predictions`)
//       .then(res => setRecentPreds(res.data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-10 py-8 space-y-12">

//       {/* ================= DASHBOARD HEADER ================= */}
//       <div className={`text-center space-y-4 transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//         <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
//           CAPEX Analytics Dashboard
//         </h1>
//         <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//           Monitor model performance, key cost drivers, and prediction trends for informed decision-making.
//         </p>
//       </div>

//       {/* ================= KPI SUMMARY (BUSINESS) ================= */}
//       <div className={`transition-all duration-700 ease-out delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//         <KpiCards />
//       </div>

//       {/* ================= MODEL QUALITY METRICS ================= */}
//       {metrics && (
//         <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-700 ease-out delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//           <Metric title="R² Score" value={metrics.r2.toFixed(4)} />
//           <Metric title="RMSE" value={`₹ ${metrics.rmse}M`} />
//           <Metric title="MAE" value={`₹ ${metrics.mae}M`} />
//           <Metric title="MAPE" value={`${metrics.mape}%`} />
//         </div>
//       )}

//       {/* ================= FEATURE IMPORTANCE ================= */}
//       <div className={`transition-all duration-700 ease-out delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//         <Section title="TOP COST DRIVERS" subtitle="Key factors influencing CAPEX predictions">
//           <ChartContainer height={420}>
//             <ResponsiveContainer>
//               <BarChart data={featureImp} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="feature" type="category" width={160} />
//                 <Tooltip />
//                 <Bar dataKey="importance" fill="#3b82f6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </Section>
//       </div>

//       {/* ================= RECENT PREDICTIONS ================= */}
//       <div className={`transition-all duration-700 ease-out delay-800 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//         <Section title="Recent Predictions Trend" subtitle="CAPEX estimates over time">
//           <ChartContainer height={300}>
//             <ResponsiveContainer>
//               <LineChart data={recentPreds}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="timestamp" />
//                 <YAxis />
//                 <Tooltip />
//                 {/* <Line dataKey="predicted_capex" strokeWidth={2} /> */}
//                 <Line
//     dataKey="predicted_capex"
//     stroke="#2563eb"
//     strokeWidth={3}
//     dot={{ r: 4 }}
//     activeDot={{ r: 6 }}
//   />

//               </LineChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </Section>
//       </div>

//     </div>
//   );
// }

// /* ================= REUSABLE COMPONENTS ================= */

// function Metric({ title, value }) {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-slate-200">
//       <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</div>
//       <div className="text-3xl font-bold text-slate-800 mt-3">
//         {value}
//       </div>
//     </div>
//   );
// }

// // function Section({ title, children }) {
// //   return (
// //     <div className="bg-white rounded-xl p-6 shadow border">
// //       <h2 className="text-lg font-semibold text-gray-700 mb-4">
// //         {title}
// //       </h2>
// //       {children}
// //     </div>
// //   );
// // }


// function Section({ title, subtitle, children }) {
//   return (
//     <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-200 border border-slate-200">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
//           {title}
//         </h2>
//         {subtitle && (
//           <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
//         )}
//       </div>
//       {children}
//     </div>
//   );
// }


// function ChartContainer({ height, children }) {
//   return <div style={{ height }}>{children}</div>;
// }



"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import KpiCards from "@/components/KpiCards";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Legend
} from "recharts";

const API_BASE = "http://127.0.0.1:8000";

export default function Dashboard() {
  const [featureImp, setFeatureImp] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [recentPreds, setRecentPreds] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState({
    features: true,
    metrics: true,
    predictions: true
  });

  useEffect(() => {
    setLoaded(true);

    // Load feature importance
    axios
      .get(`${API_BASE}/feature_importance?n=10`)
      .then(res => setFeatureImp(res.data.top_features))
      .catch(console.error)
      .finally(() => setLoading(prev => ({ ...prev, features: false })));

    // Load metrics
    axios
      .get(`${API_BASE}/metrics`)
      .then(res => setMetrics(res.data))
      .catch(console.error)
      .finally(() => setLoading(prev => ({ ...prev, metrics: false })));

    // Load predictions
    axios
      .get(`${API_BASE}/recent_predictions`)
      .then(res => setRecentPreds(res.data))
      .catch(console.error)
      .finally(() => setLoading(prev => ({ ...prev, predictions: false })));
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(value);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const featureImpColors = [
    '#3b82f6', '#1d4ed8', '#60a5fa', '#93c5fd', '#bfdbfe',
    '#2563eb', '#1e40af', '#3730a3', '#4f46e5', '#6366f1'
  ];

  const getPerformanceColor = (value, type) => {
    if (type === 'r2') {
      if (value >= 0.9) return 'text-emerald-600';
      if (value >= 0.8) return 'text-amber-600';
      return 'text-rose-600';
    }
    return 'text-slate-700';
  };

  const getPerformanceBg = (value, type) => {
    if (type === 'r2') {
      if (value >= 0.9) return 'bg-emerald-50';
      if (value >= 0.8) return 'bg-amber-50';
      return 'bg-rose-50';
    }
    return 'bg-slate-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* ================= DASHBOARD HEADER ================= */}
      <div className={`transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              CAPEX Analytics Dashboard
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl">
              Real-time monitoring of predictive model performance, cost drivers, and investment trends
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Live Data</span>
            </div>
            <div className="text-sm text-slate-500">
              Updated just now
            </div>
          </div>
        </div>
      </div>

      {/* ================= KPI SUMMARY ================= */}
      <div className={`transition-all duration-700 ease-out delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <KpiCards />
      </div>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Model Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* ================= MODEL QUALITY METRICS ================= */}
          <div className={`transition-all duration-700 ease-out delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Section 
              title="Model Performance" 
              subtitle="Accuracy and error metrics"
              headerAction={
                <div className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Production v2.1
                </div>
              }
            >
              {loading.metrics ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <MetricCard 
                    title="R² Score" 
                    value={metrics.r2.toFixed(4)}
                    description="Explained variance"
                    trend="up"
                    color={getPerformanceColor(metrics.r2, 'r2')}
                    bgColor={getPerformanceBg(metrics.r2, 'r2')}
                  />
                  <MetricCard 
                    title="RMSE" 
                    value={formatCurrency(metrics.rmse * 1000000)}
                    description="Root Mean Square Error"
                    trend="down"
                    color="text-slate-700"
                    bgColor="bg-slate-50"
                  />
                  <MetricCard 
                    title="MAE" 
                    value={formatCurrency(metrics.mae * 1000000)}
                    description="Mean Absolute Error"
                    trend="down"
                    color="text-slate-700"
                    bgColor="bg-slate-50"
                  />
                  <MetricCard 
                    title="MAPE" 
                    value={`${metrics.mape.toFixed(2)}%`}
                    description="Mean Absolute % Error"
                    trend="down"
                    color="text-slate-700"
                    bgColor="bg-slate-50"
                  />
                </div>
              )}
            </Section>
          </div>

          {/* ================= RECENT PREDICTIONS TREND ================= */}
          <div className={`transition-all duration-700 ease-out delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Section 
              title="Predictions Trend" 
              subtitle="CAPEX estimates over time"
              headerAction={
                <div className="text-sm text-slate-500">
                  Last 30 predictions
                </div>
              }
            >
              {loading.predictions ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <ChartContainer height={300}>
                  <ResponsiveContainer>
                    <AreaChart data={recentPreds}>
                      <defs>
                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={formatDate}
                        stroke="#64748b"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#64748b"
                        fontSize={12}
                        tickFormatter={(value) => formatCurrency(value)}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Predicted CAPEX']}
                        labelFormatter={formatDate}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="predicted_capex"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#colorPredicted)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </Section>
          </div>
        </div>

        {/* Right Column - Feature Importance */}
        <div className="space-y-6">
          {/* ================= FEATURE IMPORTANCE ================= */}
          <div className={`transition-all duration-700 ease-out delay-800 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Section 
              title="Top Cost Drivers" 
              subtitle="Key factors influencing predictions"
              headerAction={
                <div className="text-sm text-slate-500">
                  Impact Score
                </div>
              }
            >
              {loading.features ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <ChartContainer height={220}>
                    <ResponsiveContainer>
                      <BarChart data={featureImp} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          type="number" 
                          axisLine={false}
                          tickLine={false}
                          stroke="#64748b"
                          fontSize={12}
                        />
                        <YAxis 
                          dataKey="feature" 
                          type="category" 
                          width={120}
                          axisLine={false}
                          tickLine={false}
                          stroke="#64748b"
                          fontSize={12}
                        />
                        <Tooltip 
                          formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Bar 
                          dataKey="importance" 
                          radius={[0, 4, 4, 0]}
                        >
                          {featureImp.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={featureImpColors[index % featureImpColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  
                  {/* Feature importance summary */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-600">Top Driver</div>
                        <div className="text-lg font-semibold text-slate-900 mt-1 truncate">
                          {featureImp[0]?.feature || 'N/A'}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          {featureImp[0] ? `${(featureImp[0].importance * 100).toFixed(1)}%` : '0%'}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-600">Avg Impact</div>
                        <div className="text-lg font-semibold text-slate-900 mt-1">
                          {featureImp.length > 0 
                            ? `${((featureImp.reduce((a, b) => a + b.importance, 0) / featureImp.length) * 100).toFixed(1)}%`
                            : '0%'
                          }
                        </div>
                        <div className="text-sm text-slate-500">per factor</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Section>
          </div>

          {/* ================= QUICK STATS ================= */}
          <div className={`transition-all duration-700 ease-out delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Section title="Quick Stats" subtitle="Model insights at a glance">
              <div className="space-y-4">
                <StatItem 
                  label="Avg Prediction" 
                  value={recentPreds.length > 0 
                    ? formatCurrency(recentPreds.reduce((a, b) => a + b.predicted_capex, 0) / recentPreds.length)
                    : '₹0'
                  }
                  color="text-blue-600"
                />
                <StatItem 
                  label="Prediction Volume" 
                  value={recentPreds.length}
                  color="text-emerald-600"
                />
                <StatItem 
                  label="Model Version" 
                  value="v2.1.0"
                  color="text-violet-600"
                />
                <StatItem 
                  label="Last Updated" 
                  value="Today, 14:30"
                  color="text-amber-600"
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function MetricCard({ title, value, description, trend, color, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 hover:shadow-md transition-all duration-200 border border-transparent hover:border-slate-200`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {title}
          </div>
          <div className={`text-2xl font-bold ${color} mt-2`}>
            {value}
          </div>
          {description && (
            <div className="text-xs text-slate-500 mt-1">
              {description}
            </div>
          )}
        </div>
        {trend && (
          <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {trend === 'up' ? '↗' : '↘'}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, subtitle, children, headerAction }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-200 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        {headerAction && (
          <div>{headerAction}</div>
        )}
      </div>
      {children}
    </div>
  );
}

function ChartContainer({ height, children }) {
  return (
    <div style={{ height }} className="relative">
      {children}
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className={`text-base font-semibold ${color}`}>{value}</span>
    </div>
  );
}