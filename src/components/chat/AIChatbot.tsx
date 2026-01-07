import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialMessages = [
  {
    id: 1,
    type: "bot",
    text: "Hello! I'm your AI academic assistant. I can help with:\n• Explaining concepts\n• Finding previous papers\n• Study schedules\n\nHow can I help you today?",
  },
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const text = input.toLowerCase();
      let reply = "I can help you with that! Could you be more specific?";
      
      if (text.includes("math") || text.includes("calc")) {
        reply = "For Calculus, I recommend focusing on Integration by Parts today. Would you like practice problems?";
      } else if (text.includes("exam")) {
        reply = "Your finals start next week. Check the Dashboard for the schedule! Want me to create a study plan?";
      } else if (text.includes("hello") || text.includes("hi")) {
        reply = "Hi there! Ready to study? What subject do you need help with?";
      } else if (text.includes("note") || text.includes("pdf")) {
        reply = "I found some great notes on that topic! Check the Learn section for Materials.";
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, type: "bot", text: reply }]);
    }, 800);
  };

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center z-40"
            onClick={() => setIsOpen(true)}
          >
            <Bot className="w-7 h-7 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 md:w-[380px] md:h-[500px] bg-card md:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-primary p-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
              <div className="flex-1">
                <p className="font-bold text-primary-foreground">AI Mentor</p>
                <p className="text-xs text-primary-foreground/80">Online • Ask anything</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/20 h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm whitespace-pre-line ${
                      msg.type === "user"
                        ? "gradient-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex gap-2">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-full"
              />
              <Button
                size="icon"
                className="gradient-primary text-primary-foreground rounded-full h-10 w-10"
                onClick={handleSend}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
