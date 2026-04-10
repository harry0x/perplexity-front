import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const chat = useChat();
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: "user", content: "What is quantum computing?" },
    {
      id: 2,
      role: "ai",
      content:
        "Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement to process information. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously. This allows quantum computers to solve certain complex problems exponentially faster than classical computers.",
    },
    {
      id: 3,
      role: "ai",
      content:
        "Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement to process information. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously. This allows quantum computers to solve certain complex problems exponentially faster than classical computers.",
    },
  ]);
  const [chats, setChats] = useState([
    { id: 1, title: "Quantum Computing" },
    { id: 2, title: "Machine Learning" },
    { id: 3, title: "React Patterns" },
    { id: 4, title: "Node.js APIs" },
    { id: 5, title: "System Design" },
    { id: 6, title: "Data Structures" },
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      role: "user",
      content: message.trim(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <main className="h-screen w-full bg-neutral-950 flex p-3 gap-3">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 border border-neutral-700 rounded-2xl flex flex-col p-4 overflow-hidden">
        {/* Logo */}
        <h1 className="text-lg font-semibold text-neutral-200 tracking-wide mb-5 px-1">
          Perplexity
        </h1>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {chats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 cursor-pointer
                ${
                  activeChat === c.id
                    ? "border-amber-500/60 bg-amber-500/10 text-amber-200"
                    : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/50"
                }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* User Info */}
        <div className="mt-4 pt-3 border-t border-neutral-800">
          <div className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-neutral-950">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="text-sm text-neutral-400 truncate">
              {user?.name || "User"}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="flex-1  rounded-2xl flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "user" ? (
                /* User Message Bubble */
                <div className="max-w-md px-4 py-2.5  rounded-xl text-sm text-neutral-200 bg-neutral-800/50">
                  {msg.content}
                </div>
              ) : (
                /* AI Message Box */
                <div className="w-full max-w-2xl bg-neutral-800/50 rounded-xl p-5">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-800">
          <form
            onSubmit={handleSend}
            className="flex items-center gap-3 border border-neutral-700 rounded-xl px-4 py-3 bg-neutral-900/50 focus-within:border-neutral-500 transition-colors"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />
            <button
              type="submit"
              className="shrink-0 px-4 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-sm rounded-lg transition-colors cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
