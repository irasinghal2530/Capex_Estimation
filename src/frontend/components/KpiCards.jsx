// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://localhost:8000";

// export default function KpiCards() {
//   const [kpis, setKpis] = useState({
//     totalPredictions: 0,
//     averageCapex: 0,
//     lastPrediction: 0,
//     costReductionPotential: 0,
//   });
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setLoaded(true); // Trigger animations

//     async function fetchKpis() {
//       try {
//         const res = await axios.get(`${API_BASE}/recent_predictions`);
//         const recent = res.data ?? [];

//         if (recent.length === 0) return;

//         const values = recent.map(r => r.predicted_capex);

//         const totalPredictions = recent.length;
//         const averageCapex = (
//           values.reduce((a, b) => a + b, 0) / totalPredictions
//         ).toFixed(2);

//         const lastPrediction = values[values.length - 1];

//         const costReductionPotential = (
//           ((Math.max(...values) - Math.min(...values)) /
//             Math.max(...values)) *
//           100
//         ).toFixed(1);

//         setKpis({
//           totalPredictions,
//           averageCapex,
//           lastPrediction,
//           costReductionPotential,
//         });
//       } catch (err) {
//         console.error("Failed to fetch KPIs", err);
//       }
//     }

//     fetchKpis();
//   }, []);

//   return (
//     <div>
//       <div className={`transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//         <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
//           CAPEX Overview
//         </h1>
//         <p className="text-sm text-slate-500">
//           High-level cost signals derived from recent predictions
//         </p>
//       </div>
//       <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 transition-all duration-700 ease-out delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       <KpiCard
//         title="Total Predictions"
//         value={kpis.totalPredictions}
//         sub="All time"
//       />

//       <KpiCard
//         title="Average CAPEX"
//         value={`₹ ${kpis.averageCapex}M`}
//         accent="indigo"
//         sub="Mean estimate"
//       />

//       <KpiCard
//         title="Last Prediction"
//         value={`₹ ${kpis.lastPrediction}M`}
//         accent="slate"
//         sub="Most recent run"
//       />

//       <KpiCard
//         title="Cost Reduction Potential"
//         value={`${kpis.costReductionPotential}%`}
//         accent="emerald"
//         sub="Optimization window"
//       />
//     </div>
//     </div>
//   );
// }

// /* ---------- Reusable KPI Card ---------- */

// function KpiCard({ title, value, sub, accent = "slate" }) {
//   const accentMap = {
//     slate: "from-slate-900 to-slate-800",
//     indigo: "from-indigo-600 to-indigo-500",
//     emerald: "from-emerald-600 to-emerald-500",
//   };

//   return (
//     <div
//       className="
//         relative overflow-hidden rounded-2xl
//         bg-white/70 backdrop-blur
//         shadow-sm hover:shadow-xl
//         transition-all duration-200
//         hover:-translate-y-1
//         p-6
//       "
//     >
//       {/* Accent bar */}
//       <div
//         className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
//           accentMap[accent]
//         }`}
//       />

//       <p className="text-sm text-gray-500">{title}</p>

//       <p className="mt-4 text-4xl font-semibold text-gray-900 tracking-tight">
//         {value}
//       </p>

//       <p className="mt-2 text-xs text-gray-400">{sub}</p>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart3,
  Activity,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const API_BASE = "http://localhost:8000";

/* ---------------- Animated Number ---------------- */

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (end === 0) return;

    const step = end / 40;

    const tick = () => {
      start += step;
      if (start >= end) {
        setDisplay(end);
      } else {
        setDisplay(Math.round(start));
        requestAnimationFrame(tick);
      }
    };

    tick();
  }, [value]);

  return <>{display}</>;
}

/* ---------------- KPI CARD ---------------- */

function KpiCard({ title, value, sub, icon: Icon, accent }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white/80 backdrop-blur border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${accent}`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{title}</p>
          <Icon className="w-5 h-5 text-slate-400" />
        </div>

        <div className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
          <AnimatedNumber value={value} />
        </div>

        <p className="mt-2 text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

/* ---------------- KPI CARDS ---------------- */

export default function KpiCards() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`${API_BASE}/recent_predictions`);
      const data = res.data ?? [];

      if (!data.length) return;

      const values = data.map(d => d.predicted_capex);
      const max = Math.max(...values);
      const min = Math.min(...values);

      setKpis({
        total: data.length,
        avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
        last: values.at(-1).toFixed(1),
        reduction: (((max - min) / max) * 100).toFixed(1),
      });
    }

    fetch();
  }, []);

  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <KpiCard
        title="Total Predictions"
        value={kpis.total}
        sub="All runs"
        icon={BarChart3}
        accent="from-slate-200/0 to-slate-200/40"
      />
      <KpiCard
        title="Average CAPEX (₹M)"
        value={kpis.avg}
        sub="Mean estimate"
        icon={Activity}
        accent="from-indigo-400/0 to-indigo-400/30"
      />
      <KpiCard
        title="Last Prediction (₹M)"
        value={kpis.last}
        sub="Most recent"
        icon={TrendingUp}
        accent="from-sky-400/0 to-sky-400/30"
      />
      <KpiCard
        title="Cost Reduction Potential"
        value={kpis.reduction}
        sub="% optimization window"
        icon={Sparkles}
        accent="from-emerald-400/0 to-emerald-400/30"
      />
    </div>
  );
}


