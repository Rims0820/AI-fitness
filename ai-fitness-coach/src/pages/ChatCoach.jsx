import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ChatCoach = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Welcome to the future of training. I am your AI Coach. How can I push you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMsg = { role: "assistant", text: data.reply || data.message || "I'm having trouble connecting to the network." };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-6 px-6 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        <header className="mb-8">
          <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs">Direct Link</span>
          <h1 className="text-4xl font-black text-white italic tracking-tighter mt-2">
            AI <span className="text-cyan-400">COMMAND</span>
          </h1>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 overflow-y-auto mb-6 scrollbar-hide"
          style={{ maxHeight: 'calc(100vh - 350px)' }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-6 flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-cyan-400 text-black" : "bg-white/10 text-cyan-400"
                }`}>
                  {msg.role === "user" ? <FaUser size={12} /> : <FaRobot size={14} />}
                </div>

                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-400 text-black font-bold"
                    : "bg-white/10 text-gray-300"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex gap-2 p-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        <div className="relative group">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 pr-20 text-white placeholder-gray-600 focus:border-cyan-400 transition-all outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your command..."
          />

          <button
            onClick={sendMessage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-400 text-black w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white transition-colors"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCoach;