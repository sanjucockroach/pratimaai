import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { queryKnowledgeBase, type ChatMessage } from "~/lib/rag-chat";

const INITIAL_SUGGESTIONS = [
  "What practices do you offer?",
  "Tell me about AI CRM & LMS",
  "Who is on the team?",
  "How do you work?",
  "How to start a project?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! I am the PRATIMA AI knowledge assistant. Ask me anything about our 4 practices, leadership team, architecture, or project kickoff.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate fast realistic RAG retrieval
    setTimeout(() => {
      const response = queryKnowledgeBase(text, messages);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionUrl: response.actionUrl,
        actionLabel: response.actionLabel,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 380);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] font-sans">
      {/* Floating Launcher Button with PRATIMA AI Mark (Icon Only) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 rounded-full bg-[#090909] text-white shadow-2xl hover:scale-105 transition-all duration-200 border border-white/20 flex items-center justify-center cursor-pointer"
          aria-label="Open PRATIMA AI Assistant"
        >
          <img src="/assets/pratima-mark.svg" alt="PRATIMA AI" className="w-7 h-7 object-contain group-hover:scale-105 transition-transform" />
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#9ae265] ring-2 ring-[#090909] animate-pulse" />
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[82vh] bg-white/95 backdrop-blur-xl border border-black/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#090909] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/15 p-1.5 flex items-center justify-center">
                <img src="/assets/pratima-mark.svg" alt="PRATIMA AI" className="w-5 h-5 object-contain" />
              </div>
              <div>
                <strong className="block text-sm font-semibold leading-tight">PRATIMA AI Assistant</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-line leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#090909] text-white rounded-br-none"
                      : "bg-[#f4f4f6] text-[#090909] border border-black/5 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}

                  {msg.actionUrl && msg.actionLabel && (
                    <div className="mt-3 pt-2.5 border-t border-black/10">
                      <a
                        href={msg.actionUrl}
                        target={msg.actionUrl.startsWith("http") ? "_blank" : undefined}
                        rel={msg.actionUrl.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffbe4a] text-[#090909] font-semibold text-xs hover:bg-[#ffbe4a]/90 transition-colors shadow-sm"
                      >
                        <span>{msg.actionLabel}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#888888] mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#666666] bg-[#f4f4f6] px-3.5 py-2 rounded-2xl w-fit">
                <Sparkles size={13} className="text-[#ffbe4a] animate-spin" />
                <span>Searching company knowledge...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 border-t border-black/5 bg-[#fafafa] overflow-x-auto no-scrollbar flex gap-2">
            {INITIAL_SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSend(sug)}
                className="shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white border border-black/10 hover:bg-neutral-100 text-[#333333] transition-colors cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-black/10 bg-white flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about services, team, or workflow..."
              className="flex-1 bg-[#f4f4f6] text-xs sm:text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-1 focus:ring-[#ffbe4a] text-[#090909]"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`p-2.5 rounded-full transition-all cursor-pointer ${
                input.trim()
                  ? "bg-[#090909] text-white hover:scale-105"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
