import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { setCurrentChatId } from "../chat.slice";

const Dashboard = () => {
  const chat = useChat();
  const dispatch = useDispatch();

  // Selectors
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  // Local state for UI
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Initialize connection
  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  // Safe data extraction
  // Handles case where chats might be an object (as initialized in slice) or array
  const chatList = Array.isArray(chats) 
    ? chats 
    : typeof chats === 'object' && chats !== null 
      ? Object.values(chats) 
      : [];

  const currentChat = currentChatId && typeof chats === 'object' ? chats[currentChatId] : null;
  const messages = currentChat?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Use the hook to send message to backend
    await chat.handleSendMessage({
      message: message.trim(),
      chatId: currentChatId,
    });
    
    setMessage("");
  };

  return (
    <main className="h-screen w-full bg-[#050505] text-neutral-200 flex p-4 gap-4 overflow-hidden font-sans">
      {/* Sidebar - Premium Minimalist Design */}
      <aside className="w-80 shrink-0 bg-[#0A0A0A] border border-neutral-800/50 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 px-1">
            <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-black font-black text-[10px]">P</div>
            <h1 className="text-lg font-bold tracking-tight text-white">Perplexity</h1>
          </div>

          <button 
            onClick={() => dispatch(setCurrentChatId(null))}
            className="w-full py-3 px-4 rounded-2xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-lg">+</span> New Thread
          </button>
        </div>

        {/* Chat List - Defensive Map */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
          {chatList.length > 0 ? (
            chatList.map((c) => (
              <button
                key={c._id || c.id}
                onClick={() => dispatch(setCurrentChatId(c._id || c.id))}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all duration-300 group
                ${
                  currentChatId === (c._id || c.id)
                    ? "bg-amber-500/10 text-amber-200 border border-amber-500/20"
                    : "text-neutral-500 hover:bg-neutral-800/30 hover:text-neutral-300 border border-transparent"
                }`}
              >
                <div className="truncate font-medium">{c.title || "Untitled Chat"}</div>
                {c.updatedAt && (
                  <div className="text-[10px] opacity-40 mt-1">
                    {new Date(c.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="px-5 py-10 text-center text-neutral-600 text-xs italic">
              Recent activity will appear here
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 mt-auto border-t border-neutral-800/50 bg-[#0D0D0D]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-sm font-bold text-black shadow-lg shadow-amber-500/10">
              {user?.username?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-neutral-200 truncate capitalize">
                {user?.username || user?.name || "Guest User"}
              </span>
              <span className="text-[10px] text-neutral-500 truncate">
                {user?.email || "Free Plan"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <section className="flex-1 flex flex-col bg-[#080808] border border-neutral-800/30 rounded-3xl overflow-hidden relative shadow-inner">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* Header */}
        <header className="h-16 border-b border-neutral-800/30 flex items-center px-8 justify-between relative z-10 backdrop-blur-md">
           <h2 className="text-sm font-medium text-neutral-400 capitalize">
            {currentChat?.title || "New Search"}
           </h2>
           <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
           </div>
        </header>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 relative z-10 custom-scrollbar scroll-smooth">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-6 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role !== "user" && (
                   <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                     <span className="text-[10px] font-bold text-amber-500">AI</span>
                   </div>
                )}
                
                <div className={`max-w-[75%] ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <div className={`text-sm leading-relaxed px-1 ${msg.role === "ai" ? "text-neutral-300" : "text-white"}`}>
                    {msg.role === "user" ? (
                      <span className="inline-block bg-neutral-800/60 px-5 py-3 rounded-2xl border border-neutral-700/50">
                        {msg.content}
                      </span>
                    ) : (
                      <div className="space-y-4">
                        {msg.content}
                      </div>
                    )}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-amber-500">YOU</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-6">
              <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-[40px] flex items-center justify-center text-3xl shadow-2xl">
                🔎
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">How can I help you?</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Ask me anything from quantum physics to writing code. I'm here to help you search and understand the world.
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Modern Floating Design */}
        <div className="px-8 pb-8 pt-4 relative z-10 max-w-4xl mx-auto w-full">
          <form
            onSubmit={handleSend}
            className="relative group transition-all duration-500"
          >
            <textarea
              rows="1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Ask anything..."
              className="w-full bg-[#121212]/50 border border-neutral-800 focus:border-amber-500/50 rounded-2xl px-6 py-5 pr-16 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all duration-300 resize-none shadow-2xl backdrop-blur-xl min-h-[64px]"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-600 text-black rounded-xl transition-all duration-300 font-bold transform hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H8M17 7V16"/>
              </svg>
            </button>
          </form>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-medium uppercase tracking-widest">
              <span className="w-1 h-1 bg-amber-500 rounded-full" />
              Real-time Search
            </div>
            <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-medium uppercase tracking-widest">
              <span className="w-1 h-1 bg-amber-500 rounded-full" />
              Cited Sources
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

