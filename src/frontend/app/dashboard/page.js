
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function Dashboard() {
//   const [featureImp, setFeatureImp] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/feature_importance?n=10")
//       .then((res) => setFeatureImp(res.data.top_features))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
//           Feature Importance
//         </h1>

//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">
//             Top Features (Model Explanation)
//           </h2>

//           <div className="w-full h-[420px]">
//             <ResponsiveContainer>
//               <BarChart data={featureImp}>
//                 <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
//                 <XAxis dataKey="feature" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip />
//                 <Bar dataKey="importance" className="fill-blue-500" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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
} from "recharts";

export default function Dashboard() {
  const [featureImp, setFeatureImp] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [recentPreds, setRecentPreds] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8000/feature_importance?n=10")
  //     .then(res => setFeatureImp(res.data.top_features))
  //     .catch(console.error);

  //   axios.get("http://localhost:8000/metrics")
  //     .then(res => setMetrics(res.data))
  //     .catch(console.error);

  //   axios.get("http://localhost:8000/recent_predictions")
  //     .then(res => setRecentPreds(res.data))
  //     .catch(console.error);
  // }, []);

useEffect(() => {
  const API_BASE = "http://127.0.0.1:8000";

  axios.get(`${API_BASE}/feature_importance?n=10`)
    .then(res => setFeatureImp(res.data.top_features))
    .catch(console.error);

  axios.get(`${API_BASE}/metrics`)
    .then(res => setMetrics(res.data))
    .catch(console.error);

  axios.get(`${API_BASE}/recent_predictions`)
    .then(res => setRecentPreds(res.data))
    .catch(console.error);
}, []);


  return (
    <div className="min-h-screen p-6 space-y-10 bg-gray-100">
      
      {/* KPI METRICS */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Metric title="R² Score" value={metrics.r2.toFixed(4)} />
          <Metric title="RMSE" value={`$${metrics.rmse}M`} />
          <Metric title="MAE" value={`$${metrics.mae}M`} />
          <Metric title="MAPE" value={`${metrics.mape}%`} />
        </div>
      )}

      {/* FEATURE IMPORTANCE */}
      <Section title="Top Feature Importance">
        <ChartContainer height={420}>
          <ResponsiveContainer>
            <BarChart data={featureImp} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="feature" type="category" width={160} />
              <Tooltip />
              <Bar dataKey="importance" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Section>

      {/* RECENT PREDICTIONS */}
      <Section title="Recent Predictions">
        <ChartContainer height={300}>
          <ResponsiveContainer>
            <LineChart data={recentPreds}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line dataKey="predicted_capex" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Section>

    </div>
  );
}

/* ---------------- Reusable pieces ---------------- */

function Metric({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold text-gray-800 mt-2">{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function ChartContainer({ height, children }) {
  return <div style={{ height }}>{children}</div>;
}
