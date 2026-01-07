import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Sparkles, Send, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

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

      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, type: "bot", text: reply }]);
    }, 1200);
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

      {/* Full Screen Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-50 flex flex-col"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="gradient-primary p-4 md:p-6 flex items-center gap-4 shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-xl text-primary-foreground">AI Mentor</h1>
                <p className="text-sm text-primary-foreground/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Online • Ready to help
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/20 h-10 w-10"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.type === "bot" && (
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarFallback className="gradient-primary text-primary-foreground">
                          <Bot className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[75%] p-4 rounded-2xl text-sm md:text-base shadow-md whitespace-pre-line ${
                        msg.type === "user"
                          ? "gradient-primary text-primary-foreground rounded-br-md"
                          : "bg-card border border-border rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.type === "user" && (
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          U
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <Avatar className="w-10 h-10 shrink-0">
                      <AvatarFallback className="gradient-primary text-primary-foreground">
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-card border border-border rounded-2xl rounded-bl-md p-4 flex items-center gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-t border-border bg-card/80 backdrop-blur-lg p-4 md:p-6"
            >
              <div className="max-w-3xl mx-auto flex gap-3">
                <Input
                  placeholder="Type your question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 h-12 md:h-14 rounded-xl text-base px-5"
                />
                <Button
                  size="icon"
                  className="gradient-primary text-primary-foreground rounded-xl h-12 w-12 md:h-14 md:w-14 shadow-glow"
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-3">
                AI Mentor can make mistakes. Verify important information.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
