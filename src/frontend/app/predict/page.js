

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8000";

// // Numeric fields (everything else becomes dropdown or text)
// const NUMERIC_FIELDS = new Set([
//   "Plant_Age", "Lifetime_Volume", "Target_Annual_Volume",
//   "Variants", "Number_of_Parts", "Avg_Part_Complexity",
//   "BIW_Weight", "Stamping_Dies", "Injection_Molds",
//   "Casting_Tools", "Jigs_and_Fixtures", "Assembly_Line_Equipment",
//   "Robotics", "Paint_Shop_Mods"
// ]);

// // All fields in correct order
// const ALL_FIELDS = [
//   "Vehicle_Type", "Material_Type", "Drivetrain", "Automation_Level",
//   "Plant_Age", "Line_Reuse", "Lifetime_Volume", "Target_Annual_Volume",
//   "Variants", "Number_of_Parts", "Avg_Part_Complexity", "BIW_Weight",
//   "Stamping_Dies", "Injection_Molds", "Casting_Tools", "Jigs_and_Fixtures",
//   "Assembly_Line_Equipment", "Robotics", "Paint_Shop_Mods"
// ];

// export default function PredictPage() {
//   // Initialize form with empty values
//   const initialForm = ALL_FIELDS.reduce((acc, f) => {
//     acc[f] = "";
//     return acc;
//   }, {});

//   const [form, setForm] = useState(initialForm);
//   const [categories, setCategories] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   // Load dropdown categories
//   useEffect(() => {
//     axios
//       .get(`${API}/categories`)
//       .then(res => setCategories(res.data))
//       .catch(() => setError("Failed to load categories"));
//   }, []);

//   // Update field in form
//   const updateField = (field, value) => {
//     setForm(prev => ({
//       ...prev,
//       [field]: NUMERIC_FIELDS.has(field)
//         ? (value === "" ? undefined : Number(value))
//         : value,
//     }));
//   };

//   // Determine if a field should be dropdown
//   const isDropdown = (field) => {
//     const key = field.toLowerCase();
//     return categories[key] !== undefined;
//   };

//   // Predict CAPEX
//   const predict = async () => {
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     console.log("Frontend sending:", form); // debug

//     try {
//       const res = await axios.post(`${API}/predict`, form);
//       setResult(res.data.predicted_CAPEX);
//     } catch (err) {
//       setError(err?.response?.data?.detail || "Prediction failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
//       <div className="w-full max-w-4xl">
        
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           CAPEX Prediction
//         </h1>

//         <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">

//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             Enter Project Parameters
//           </h2>

//           {/* FORM GRID */}
//           <div className="grid grid-cols-2 gap-6">
//             {ALL_FIELDS.map((field) => {
//               const key = field.toLowerCase();
//               const options = categories[key];

//               return (
//                 <div key={field} className="flex flex-col">
//                   <label className="text-sm font-medium text-gray-600 mb-1">
//                     {field.replace(/_/g, " ")}
//                   </label>

//                   {/* DROPDOWN FIELDS */}
//                   {isDropdown(field) ? (
//                     <select
//                       value={form[field] || ""}
//                       onChange={(e) => updateField(field, e.target.value)}
//                       className="p-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition"
//                     >
//                       <option value="">Select {field}</option>
//                       {options?.map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     // NUMERIC/TEXT FIELDS
//                     <input
//                       type={NUMERIC_FIELDS.has(field) ? "number" : "text"}
//                       value={form[field] || ""}
//                       placeholder={field}
//                       onChange={(e) => updateField(field, e.target.value)}
//                       className="p-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition"
//                     />
//                   )}

//                 </div>
//               );
//             })}
//           </div>

//           {/* PREDICT BUTTON */}
//           <button
//             onClick={predict}
//             disabled={loading}
//             className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60"
//           >
//             {loading ? "Predicting..." : "Predict CAPEX"}
//           </button>

//           {/* ERROR */}
//           {error && (
//             <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
//               {String(error)}
//             </div>
//           )}

//           {/* RESULT */}
//           {result !== null && (
//             <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-xl text-lg shadow">
//               <span className="font-semibold text-green-700">
//                 Predicted CAPEX:{" "}
//               </span>
//               <span className="font-bold text-green-800 text-xl">
//                 {result}
//               </span>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:8000";



// // Numeric fields
// const NUMERIC_FIELDS = new Set([
//   "Plant_Age", "Lifetime_Volume", "Target_Annual_Volume",
//   "Variants", "Number_of_Parts", "Avg_Part_Complexity",
//   "BIW_Weight", "Stamping_Dies", "Injection_Molds",
//   "Casting_Tools", "Jigs_and_Fixtures", "Assembly_Line_Equipment",
//   "Robotics", "Paint_Shop_Mods"
// ]);

// // All fields
// const ALL_FIELDS = [
//   "Vehicle_Type", "Material_Type", "Drivetrain", "Automation_Level",
//   "Plant_Age", "Line_Reuse", "Lifetime_Volume", "Target_Annual_Volume",
//   "Variants", "Number_of_Parts", "Avg_Part_Complexity", "BIW_Weight",
//   "Stamping_Dies", "Injection_Molds", "Casting_Tools", "Jigs_and_Fixtures",
//   "Assembly_Line_Equipment", "Robotics", "Paint_Shop_Mods"
// ];

// export default function PredictPage() {

//   // Initial empty form
//   const initialForm = ALL_FIELDS.reduce((acc, f) => {
//     acc[f] = "";
//     return acc;
//   }, {});

//   const [form, setForm] = useState(initialForm);
//   const [categories, setCategories] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   // Load dropdown categories
//   useEffect(() => {
//     axios
//       .get(`${API}/categories`)
//       .then(res => setCategories(res.data))
//       .catch(() => setError("Failed to load categories"));
//   }, []);

//   // Update form field
//   const updateField = (field, value) => {
//     setForm(prev => ({
//       ...prev,
//       [field]: NUMERIC_FIELDS.has(field)
//         ? (value === "" ? undefined : Number(value))
//         : value,
//     }));
//   };

//   // Check dropdown
//   const isDropdown = (field) => {
//     const key = field.toLowerCase();
//     return categories[key] !== undefined;
//   };

//   // Predict
//   const predict = async () => {
//     if (loading) return;

//     setLoading(true);
//     setError(null);

//     console.log("Frontend sending:", form);

//     try {
//       const res = await axios.post(`${API}/predict`, form);

//       // ✅ FIXED KEY NAME
//       setResult(res.data.predicted_capex);

//     } catch (err) {
//       setError(err?.response?.data?.detail || "Prediction failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
//       <div className="w-full max-w-4xl">

//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           CAPEX Prediction
//         </h1>

//         <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">

//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             Enter Project Parameters
//           </h2>

//           {/* FORM GRID */}
//           <div className="grid grid-cols-2 gap-6">
//             {ALL_FIELDS.map((field) => {
//               const key = field.toLowerCase();
//               const options = categories[key];

//               return (
//                 <div key={field} className="flex flex-col">
//                   <label className="text-sm font-medium text-gray-600 mb-1">
//                     {field.replace(/_/g, " ")}
//                   </label>

//                   {isDropdown(field) ? (
//                     <select
//                       value={form[field] || ""}
//                       onChange={(e) => updateField(field, e.target.value)}
//                       className="p-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition"
//                     >
//                       <option value="">Select {field}</option>
//                       {options?.map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       type={NUMERIC_FIELDS.has(field) ? "number" : "text"}
//                       value={form[field] || ""}
//                       placeholder={field}
//                       onChange={(e) => updateField(field, e.target.value)}
//                       className="p-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition"
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={predict}
//             disabled={loading}
//             className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60"
//           >
//             {loading ? "Predicting..." : "Predict CAPEX"}
//           </button>

//           {/* ERROR */}
//           {error && (
//             <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
//               {String(error)}
//             </div>
//           )}

//           {/* RESULT */}
//           {result !== null && (
//             <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-xl text-lg shadow">
//               <span className="font-semibold text-green-700">
//                 Predicted CAPEX:{" "}
//               </span>
//               <span className="font-bold text-green-800 text-xl">
//                 {result}
//               </span>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = "http://localhost:8000";

// Numeric fields with units (no min/max limits)
const NUMERIC_FIELDS = {
  "Plant_Age": { unit: "years", step: 1 },
  "Lifetime_Volume": { unit: "units", format: "compact" },
  "Target_Annual_Volume": { unit: "units/year", format: "compact" },
  "Variants": { unit: "variants", step: 1 },
  "Number_of_Parts": { unit: "parts", step: 1 },
  "Avg_Part_Complexity": { unit: "1-10 scale", step: 0.1 },
  "BIW_Weight": { unit: "kg", step: 1 },
  "Stamping_Dies": { unit: "dies", step: 1 },
  "Injection_Molds": { unit: "molds", step: 1 },
  "Casting_Tools": { unit: "tools", step: 1 },
  "Jigs_and_Fixtures": { unit: "units", step: 1 },
  "Assembly_Line_Equipment": { unit: "units", step: 1 },
  "Robotics": { unit: "robots", step: 1 },
  "Paint_Shop_Mods": { unit: "stations", step: 1 }
};

// Categorical fields with descriptions
const CATEGORICAL_FIELDS = {
  "Vehicle_Type": { description: "Type of vehicle being manufactured" },
  "Material_Type": { description: "Primary material used in construction" },
  "Drivetrain": { description: "Powertrain configuration" },
  "Automation_Level": { description: "Degree of automation in production" },
  "Line_Reuse": { description: "Reuse of existing production lines" }
};

// All fields grouped by category
const FIELD_GROUPS = [
  {
    title: "Project Overview",
    fields: ["Vehicle_Type", "Material_Type", "Drivetrain", "Automation_Level"]
  },
  {
    title: "Production Metrics",
    fields: ["Plant_Age", "Line_Reuse", "Lifetime_Volume", "Target_Annual_Volume", "Variants"]
  },
  {
    title: "Product Complexity",
    fields: ["Number_of_Parts", "Avg_Part_Complexity", "BIW_Weight"]
  },
  {
    title: "Tooling & Equipment",
    fields: ["Stamping_Dies", "Injection_Molds", "Casting_Tools", "Jigs_and_Fixtures", "Assembly_Line_Equipment", "Robotics", "Paint_Shop_Mods"]
  }
];

export default function PredictPage() {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [predictionHistory, setPredictionHistory] = useState([]);

  // Load dropdown categories and prediction history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, historyRes] = await Promise.all([
          axios.get(`${API}/categories`),
          axios.get(`${API}/prediction_history`).catch(() => ({ data: [] }))
        ]);
        setCategories(categoriesRes.data);
        setPredictionHistory(historyRes.data.slice(0, 5));
      } catch {
        setError("Failed to load initial data");
      }
    };
    fetchData();
  }, []);

  // Update form field with validation
  const updateField = useCallback((field, value) => {
    setForm(prev => {
      const newForm = { ...prev, [field]: value };
      
      // Clear validation error for this field
      if (validationErrors[field]) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }

      return newForm;
    });
  }, [validationErrors]);

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Check required categorical fields
    Object.keys(CATEGORICAL_FIELDS).forEach(field => {
      if (!form[field]) {
        errors[field] = "This field is required";
      }
    });

    // Validate numeric fields (only check if they're numbers, not limits)
    Object.keys(NUMERIC_FIELDS).forEach(field => {
      const value = form[field];
      
      if (value === "" || value === undefined) {
        errors[field] = "This field is required";
      } else {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          errors[field] = "Must be a valid number";
        } else if (numValue < 0) {
          errors[field] = "Value cannot be negative";
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Format number with commas
  const formatNumber = (num) => {
    const numValue = Number(num);
    if (isNaN(numValue)) return num;
    if (numValue >= 1000000000) return `${(numValue / 1000000000).toFixed(1)}B`;
    if (numValue >= 1000000) return `${(numValue / 1000000).toFixed(1)}M`;
    if (numValue >= 1000) return `${(numValue / 1000).toFixed(1)}K`;
    return numValue.toString();
  };

  // Predict function
  const predict = async () => {
    if (!validateForm()) {
      setError("Please fix validation errors before submitting");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API}/predict`, form);
      const predictedValue = res.data.predicted_capex;
      setResult(predictedValue);
      
      // Add to history
      const historyItem = {
        timestamp: new Date().toISOString(),
        parameters: { ...form },
        prediction: predictedValue
      };
      setPredictionHistory(prev => [historyItem, ...prev.slice(0, 4)]);
      
      // Reset to step 3 to show results
      setActiveStep(3);
    } catch (err) {
      setError(err?.response?.data?.detail || "Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({});
    setResult(null);
    setError(null);
    setValidationErrors({});
    setActiveStep(0);
  };

  // Navigate between steps
  const nextStep = () => {
    if (activeStep < 3) setActiveStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  // Render field input
  const renderField = (field) => {
    const key = field.toLowerCase();
    const options = categories[key];
    const isNumeric = NUMERIC_FIELDS[field];
    const error = validationErrors[field];
    const value = form[field] || "";

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">
            {field.replace(/_/g, " ")}
          </label>
          {isNumeric?.unit && (
            <span className="text-xs text-gray-500">{isNumeric.unit}</span>
          )}
        </div>

        {options ? (
          <select
            value={value}
            onChange={(e) => updateField(field, e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              error ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          >
            <option value="">Select an option</option>
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : isNumeric ? (
          <div className="relative">
            <input
              type="number"
              value={value}
              step={isNumeric.step || 1}
              onChange={(e) => updateField(field, e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                error ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              placeholder="Enter value"
              min="0"
            />
            {isNumeric.format === "compact" && value && !isNaN(Number(value)) && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                ≈ {formatNumber(value)}
              </div>
            )}
          </div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => updateField(field, e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              error ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
        )}

        {error && (
          <div className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center">⚠</span>
            {error}
          </div>
        )}

        {CATEGORICAL_FIELDS[field]?.description && !options && (
          <p className="text-xs text-gray-500 italic">
            {CATEGORICAL_FIELDS[field].description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            CAPEX Predictor
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Estimate capital expenditure for manufacturing projects using AI-powered predictions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Step Indicator */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  {["Project Setup", "Parameters", "Review", "Results"].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                          activeStep === index
                            ? "bg-blue-600 text-white"
                            : activeStep > index
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {activeStep > index ? "✓" : index + 1}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        activeStep === index ? "text-blue-600" : "text-gray-500"
                      }`}>
                        {step}
                      </span>
                      {index < 3 && (
                        <div className={`w-12 h-0.5 mx-2 ${
                          activeStep > index ? "bg-green-200" : "bg-gray-200"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {activeStep === 0 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">Project Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {FIELD_GROUPS[0].fields.map(field => renderField(field))}
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">Production & Complexity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {FIELD_GROUPS[1].fields.concat(FIELD_GROUPS[2].fields).map(field => renderField(field))}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">Tooling & Equipment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {FIELD_GROUPS[3].fields.map(field => renderField(field))}
                    </div>
                    
                    {/* Form Summary */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">Form Summary</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Fields completed: {Object.keys(form).length} / {Object.keys(NUMERIC_FIELDS).length + Object.keys(CATEGORICAL_FIELDS).length}</p>
                        <p>Validation errors: {Object.keys(validationErrors).length}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && result && (
                  <div className="space-y-6 text-center py-8">
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                      <div className="text-4xl">📊</div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Prediction Complete!</h2>
                    <div className="p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-100">
                      <p className="text-gray-600 mb-4">Estimated Capital Expenditure</p>
                      <div className="text-5xl font-bold text-blue-700 mb-2">
                        ₹{typeof result === 'number' ? result.toLocaleString('en-IN') : result}
                      </div>
                      <p className="text-gray-500 text-sm">
                        {typeof result === 'number' && result > 1000000000 
                          ? `Large-scale project (₹${(result / 1000000000).toFixed(1)}B)`
                          : typeof result === 'number' && result > 10000000
                          ? `Medium-scale project (₹${(result / 10000000).toFixed(1)}Cr)`
                          : "Project prediction"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-gray-600">Confidence</p>
                        <p className="text-lg font-semibold text-blue-700">High</p>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <p className="text-sm text-gray-600">Recommendation</p>
                        <p className="text-lg font-semibold text-emerald-700">Detailed Review</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700">
                      <span className="text-lg">⚠</span>
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                  {activeStep > 0 && activeStep < 3 && (
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                  
                  {activeStep < 2 ? (
                    <button
                      onClick={nextStep}
                      className="ml-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Continue →
                    </button>
                  ) : activeStep === 2 ? (
                    <button
                      onClick={predict}
                      disabled={loading}
                      className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Predicting...
                        </>
                      ) : (
                        "Generate Prediction"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={resetForm}
                      className="ml-auto px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Start New Prediction
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Recent Predictions & Tips */}
          <div className="space-y-6">
            {/* Recent Predictions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">📋</span>
                Recent Predictions
              </h3>
              <div className="space-y-4">
                {predictionHistory.length > 0 ? (
                  predictionHistory.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            ₹{typeof item.prediction === 'number' 
                              ? item.prediction.toLocaleString('en-IN', { maximumFractionDigits: 0 })
                              : item.prediction}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          typeof item.prediction === 'number' && item.prediction > 1000000000 
                            ? "bg-purple-100 text-purple-700"
                            : typeof item.prediction === 'number' && item.prediction > 10000000
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {typeof item.prediction === 'number' 
                            ? item.prediction > 1000000000 
                              ? "Large" 
                              : item.prediction > 10000000
                              ? "Medium"
                              : "Small"
                            : "Project"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No prediction history yet</p>
                )}
              </div>
            </div>

            {/* Tips & Guidelines */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">💡</span>
                Tips for Accurate Predictions
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  Use realistic production volumes based on market research
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  Consider tooling complexity when entering equipment counts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  Account for automation level based on labor cost targets
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  Review similar past projects for reference values
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    // Load sample data
                    const sampleData = {
                      Vehicle_Type: "SUV",
                      Material_Type: "Steel",
                      Drivetrain: "Electric",
                      Automation_Level: "High",
                      Plant_Age: 5,
                      Line_Reuse: "Partial",
                      Lifetime_Volume: 500000,
                      Target_Annual_Volume: 100000,
                      Variants: 3,
                      Number_of_Parts: 5000,
                      Avg_Part_Complexity: 6.5,
                      BIW_Weight: 350,
                      Stamping_Dies: 120,
                      Injection_Molds: 80,
                      Casting_Tools: 15,
                      Jigs_and_Fixtures: 200,
                      Assembly_Line_Equipment: 45,
                      Robotics: 60,
                      Paint_Shop_Mods: 8
                    };
                    setForm(sampleData);
                    setActiveStep(2);
                  }}
                  className="w-full px-4 py-3 bg-white border border-blue-200 text-blue-700 font-medium rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Load Sample Data
                </button>
                <button
                  onClick={resetForm}
                  className="w-full px-4 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 transition-colors"
                >
                  Reset All Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}