import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  return (
    <main className="min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5">
      <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border   p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none">
        <aside className="hidden h-full w-72 shrink-0 flex-col rounded-3xl border border-white/10 bg-[#080b12] p-4 md:flex">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Perplexity
            </h1>
            <button
              onClick={chat.handleNewChat}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-white/40 hover:bg-white/5"
              title="New Chat"
            >
              <span className="text-xl font-light text-white/70 group-hover:text-white">
                +
              </span>
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-thin">
            {Object.values(chats)
              .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
              .map((chatItem) => (
                <div
                  key={chatItem.id}
                  className={`group flex items-center gap-2 rounded-xl border transition-all duration-200 ${
                    currentChatId === chatItem.id
                      ? "border-white/30 bg-white/10"
                      : "border-transparent text-white/60 hover:bg-white/5"
                  }`}
                >
                  <button
                    onClick={() => openChat(chatItem.id)}
                    className="flex-1 px-3 py-2.5 text-left text-sm font-medium transition-colors"
                  >
                    <span className="line-clamp-1">{chatItem.title}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      chat.handleDeleteChat(chatItem.id);
                    }}
                    className="mr-2 hidden rounded-md p-1 transition-colors hover:bg-red-500/20 hover:text-red-400 group-hover:block"
                    title="Delete Chat"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </aside>

        <section className="relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4">
          <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
                  message.role === "user"
                    ? "ml-auto rounded-br-none bg-white/12 text-white"
                    : "mr-auto border-none text-white/90"
                }`}
              >
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-2 list-disc pl-5">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-2 list-decimal pl-5">{children}</ol>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-white/10 px-1 py-0.5">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                          {children}
                        </pre>
                      ),
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>

          <footer className="rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 md:p-5">
            <form
              onSubmit={handleSubmitMessage}
              className="flex flex-col gap-3 md:flex-row"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
