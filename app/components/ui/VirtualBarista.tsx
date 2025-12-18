"use client";

import { useEffect, useRef, useState } from "react";
import { Coffee, MessageCircle, Send, X } from "lucide-react";
import { getLocalBaristaReply } from "@/app/lib/virtualBaristaResponder";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export default function VirtualBarista() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "model", text: "Hey there. Welcome to The Notebook Café. Need a recommendation or just vibing?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const update = () => setIsBlocked(body.dataset.modalOpen === "true" || body.dataset.cartOpen === "true");
    update();
    const observer = new MutationObserver(update);
    observer.observe(body, { attributes: true, attributeFilter: ["data-modal-open", "data-cart-open"] });
    return () => observer.disconnect();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const started = Date.now();
    const replyText = await getLocalBaristaReply(messages, input);
    const elapsed = Date.now() - started;
    const minDelay = 600;
    if (elapsed < minDelay) {
      await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
    }

    setMessages((prev) => [...prev, { role: "model", text: replyText }]);
    setLoading(false);
  };

  if (isBlocked) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          className="mb-4 w-80 sm:w-96 h-96 bg-cafe-white rounded-lg shadow-xl border border-cafe-tan/30 flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="bg-cafe-black text-cafe-mist p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-cafe-tan rounded-full">
                <Coffee size={16} className="text-cafe-white" />
              </div>
              <div>
                <h3 className="font-serif text-lg leading-none">Roxanna</h3>
                <span className="text-xs text-cafe-beige opacity-80">Virtual Barista</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cafe-beige hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-cafe-mist/30"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-cafe-brown text-cafe-white rounded-br-none"
                      : "bg-white text-cafe-black border border-cafe-tan/20 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg rounded-bl-none border border-cafe-tan/20 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-cafe-tan rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-cafe-tan rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-cafe-tan rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="p-3 bg-white border-t border-cafe-tan/20 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about our coffee..."
              className="flex-1 bg-cafe-mist/50 border-none rounded-md px-3 py-2 text-base focus:ring-1 focus:ring-cafe-tan outline-none placeholder:text-cafe-brown/50 text-cafe-black"
              style={{ fontSize: "16px" }} // prevent iOS zoom
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 bg-cafe-black text-cafe-tan rounded-md hover:bg-cafe-brown transition-colors disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-cafe-black hover:bg-cafe-brown text-cafe-tan px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 border border-cafe-tan/20"
        aria-label="Toggle virtual barista chat"
      >
        <span className="font-medium hidden sm:block overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          Ask the Barista
        </span>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
