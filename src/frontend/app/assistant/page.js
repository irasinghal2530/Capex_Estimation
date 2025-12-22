

// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function AssistantPage() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((m) => [...m, userMsg]);

//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:8000/chat", {
//         message: userMsg.text,
//       });

//       const botMsg = { sender: "assistant", text: res.data.response };
//       setMessages((m) => [...m, botMsg]);
//     } catch {
//       setMessages((m) => [
//         ...m,
//         { sender: "assistant", text: "⚠️ Error: Could not reach server." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
//       <div className="w-full max-w-3xl">
//         {/* Header */}
//         <div className="mb-6 flex items-center gap-3">
//           <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">
//             AI
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
//         </div>

//         {/* Chat Window */}
//         <div className="bg-white rounded-2xl shadow-lg h-[500px] p-5 overflow-y-auto border border-gray-200">
//           {messages.length === 0 && (
//             <div className="text-center text-gray-400 mt-20">
//               👋 Start the conversation…
//             </div>
//           )}

//           {messages.map((m, idx) => (
//             <div key={idx} className={`my-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
//               <div
//                 className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm whitespace-pre-wrap ${
//                   m.sender === "user"
//                     ? "bg-blue-600 text-white rounded-br-none"
//                     : "bg-gray-100 text-gray-900 rounded-bl-none"
//                 }`}
//               >
//                 {m.text}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input Box */}
//         <div className="mt-4 flex gap-3">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type your message..."
//             className="flex-1 p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? "..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:8000/llm/chat?query=${encodeURIComponent(userMsg.text)}`
      );

      const botMsg = { sender: "assistant", text: res.data.response_text || res.data.response || "No response" };
      setMessages((m) => [...m, botMsg]);
    } catch {
      setMessages((m) => [
        ...m,
        { sender: "assistant", text: "⚠️ Error: Could not reach server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">AI</div>
          <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg h-[500px] p-5 overflow-y-auto border border-gray-200">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-20">👋 Start the conversation…</div>
          )}

          {messages.map((m, idx) => (
            <div key={idx} className={`my-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm whitespace-pre-wrap ${
                m.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="my-3 flex justify-start">
              <div className="max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm bg-gray-100 text-gray-900 animate-pulse">
                Typing...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
