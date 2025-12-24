

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




// "use client";

// import { useState, useRef, useEffect } from "react";
// import axios from "axios";

// export default function AssistantPage() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((m) => [...m, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       // const res = await axios.post(
//       //   `http://localhost:8000/llm/chat?query=${encodeURIComponent(userMsg.text)}`
//       // );
//       const res = await axios.post(
//   "http://localhost:8000/llm/chat",
//   { query: userMsg.text }
// );


//       // const botMsg = { sender: "assistant", text: res.data.response_text || res.data.response || "No response" };
//       const botMsg = {
//   sender: "assistant",
//   text: res.data.response ?? "No response"
// };

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
//         <div className="mb-6 flex items-center gap-3">
//           <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">AI</div>
//           <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg h-[500px] p-5 overflow-y-auto border border-gray-200">
//           {messages.length === 0 && (
//             <div className="text-center text-gray-400 mt-20">👋 Start the conversation…</div>
//           )}

//           {messages.map((m, idx) => (
//             <div key={idx} className={`my-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
//               <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm whitespace-pre-wrap ${
//                 m.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none"
//               }`}>
//                 {m.text}
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="my-3 flex justify-start">
//               <div className="max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm bg-gray-100 text-gray-900 animate-pulse">
//                 Typing...
//               </div>
//             </div>
//           )}

//           <div ref={chatEndRef} />
//         </div>

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

import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Hello! I'm your CAPEX Assistant. I can help you with:\n\n• CAPEX predictions and insights\n• Model performance analysis\n• Cost driver explanations\n• Manufacturing investment guidance\n\nHow can I assist you today?",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What factors affect CAPEX the most?",
    "How can I reduce manufacturing costs?",
    "Explain the model's R² score",
    "What's the average CAPEX for an EV plant?"
  ]);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Generate unique ID for conversation
  useEffect(() => {
    setConversationId(`conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  // Simulate typing animation
  const simulateTyping = useCallback((text, callback) => {
    setIsTyping(true);
    let currentIndex = 0;
    const typingSpeed = 20; // ms per character

    const typeCharacter = () => {
      if (currentIndex <= text.length) {
        callback(text.substring(0, currentIndex));
        currentIndex++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    typeCharacter();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/llm/chat",
        { 
          query: userMsg.text,
          conversation_id: conversationId,
          context: "capex_prediction_analysis"
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Create assistant message with typing simulation
      const botResponse = res.data.response || res.data.response_text || "I couldn't generate a response. Please try again.";
      const botMsg = {
        id: Date.now() + 1,
        sender: "assistant",
        text: "",
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, botMsg]);
      
      // Simulate typing effect
      simulateTyping(botResponse, (partialText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === botMsg.id ? { ...msg, text: partialText } : msg
        ));
      });

    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: "assistant",
        text: "⚠️ Sorry, I'm having trouble connecting to the server. Please check your connection and try again.",
        timestamp: new Date(),
        type: "error"
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    // Auto-send after a brief delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([
        {
          id: Date.now(),
          sender: "assistant",
          text: "Conversation cleared. How can I help you with CAPEX analysis today?",
          timestamp: new Date(),
          type: "text"
        }
      ]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show temporary success message
      const button = document.activeElement;
      const originalText = button.textContent;
      button.textContent = "Copied!";
      button.classList.add("bg-green-600");
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("bg-green-600");
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  AI
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CAPEX AI Assistant</h1>
                <p className="text-gray-600">Your intelligent guide for manufacturing investment analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Online</span>
              </div>
              <button
                onClick={clearChat}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <span>🔄</span> Clear Chat
              </button>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-blue-600">💡</span> Quick Questions
            </h3>
            <div className="flex flex-wrap gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-4 py-2 bg-white text-sm text-gray-700 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 shadow-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h2 className="font-semibold text-gray-800">Active Conversation</h2>
              </div>
              <div className="text-sm text-gray-500">
                ID: <span className="font-mono text-xs">{conversationId?.slice(0, 8)}</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50"
          >
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-[85%] md:max-w-[75%]">
                    {/* Assistant Avatar */}
                    {msg.sender === "assistant" && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                          AI
                        </div>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className="flex-1">
                      <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                        msg.sender === "user" 
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none" 
                          : msg.type === "error"
                          ? "bg-red-50 text-red-800 border border-red-100 rounded-bl-none"
                          : "bg-gray-100 text-gray-900 border border-gray-100 rounded-bl-none"
                      }`}>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {msg.text}
                        </div>
                        
                        {/* Message Footer */}
                        <div className={`flex items-center justify-between mt-2 pt-2 ${
                          msg.sender === "user" 
                            ? "border-t border-blue-500/30" 
                            : "border-t border-gray-200"
                        }`}>
                          <span className={`text-xs ${msg.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                            {formatTime(msg.timestamp)}
                          </span>
                          {msg.sender === "assistant" && msg.type !== "error" && (
                            <button
                              onClick={() => copyToClipboard(msg.text)}
                              className="text-xs px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                            >
                              Copy
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* User Avatar */}
                    {msg.sender === "user" && (
                      <div className="flex-shrink-0 ml-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-sm">
                          U
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] md:max-w-[75%]">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        AI
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-4 bg-white">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask about CAPEX predictions, model insights, or manufacturing costs..."
                  className="w-full px-5 py-3 pr-12 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ⏎
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>📤</span>
                    Send
                  </>
                )}
              </button>
            </div>
            
            {/* Input Tips */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>💡</span>
                  <span>Press Enter to send</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✨</span>
                  <span>Shift + Enter for new line</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {messages.length} messages
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities Panel */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                📊
              </div>
              <h3 className="font-semibold text-gray-800">CAPEX Analysis</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                Cost driver explanations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                Investment trend analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                ROI estimation support
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                🤖
              </div>
              <h3 className="font-semibold text-gray-800">Model Insights</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                Performance metrics explanation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                Prediction accuracy analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                Feature importance queries
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                🏭
              </div>
              <h3 className="font-semibold text-gray-800">Manufacturing</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                Equipment cost guidance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                Production optimization tips
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                Industry best practices
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}