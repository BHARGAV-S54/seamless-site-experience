import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreVertical, Paperclip, Send, ArrowLeft, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const tabs = ["Chats", "Groups", "Requests"];

const chats = [
  { id: 1, name: "Rahul Kumar", status: "Senior • Physics Helper", lastMsg: "Sure, I can help with that derivative problem.", color: "bg-orange-100 text-orange-600" },
  { id: 2, name: "Alice Lee", status: "Classmate • CS Dept", lastMsg: "Did you finish the assignment?", color: "bg-teal-100 text-teal-600" },
  { id: 3, name: "Maya Patel", status: "Junior • Asking for help", lastMsg: "Thanks for the notes!", color: "bg-purple-100 text-purple-600" },
];

const groups = [
  { id: 1, name: "MCA Class", status: "142 Members", lastMsg: "Admin: Exam schedule updated.", color: "bg-indigo-100 text-indigo-600" },
  { id: 2, name: "Coding Club", status: "45 Members", lastMsg: "Hackathon this weekend?", color: "bg-red-100 text-red-600" },
];

const requests = [
  { id: 1, name: "John Doe", info: "2nd Year • Electrical" },
  { id: 2, name: "Sarah Jenkins", info: "1st Year • CS" },
];

const initialMessages = [
  { id: 1, type: "received", text: "Hey, did you understand the last lecture?" },
  { id: 2, type: "sent", text: "Not really, the part about angular momentum was tricky." },
  { id: 3, type: "received", text: "I have some notes on that. Let me share." },
  { id: 4, type: "received", text: "Physics_Ch4_Notes.pdf", isFile: true },
  { id: 5, type: "sent", text: "That's a lifesaver! Thanks Rahul." },
];

export function SocialPage() {
  const [activeTab, setActiveTab] = useState("Chats");
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), type: "sent", text: newMessage }]);
    setNewMessage("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, type: "received", text: "Got it! Let me check." }]);
    }, 1000);
  };

  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const currentList = activeTab === "Chats" ? chats : activeTab === "Groups" ? groups : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-6"
      >
        💬 Social Hub
      </motion.h2>

      <div className="grid lg:grid-cols-[300px,1fr] gap-4 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Sidebar */}
        <Card className={`border-0 shadow-card flex flex-col overflow-hidden ${showChat ? "hidden lg:flex" : "flex"}`}>
          <CardContent className="p-0 flex flex-col h-full">
            {/* Tabs */}
            <div className="p-3 flex gap-1 bg-muted/50">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  size="sm"
                  variant={activeTab === tab ? "secondary" : "ghost"}
                  className={`flex-1 text-xs ${activeTab === tab ? "text-primary font-semibold" : "text-muted-foreground"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {tab === "Requests" && requests.length > 0 && (
                    <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-[10px] justify-center">
                      {requests.length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 h-9 text-sm" />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "Requests" ? (
                requests.map((req) => (
                  <div key={req.id} className="p-3 border-b border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-muted">{getInitials(req.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{req.name}</p>
                        <p className="text-xs text-muted-foreground">{req.info}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gradient-primary text-primary-foreground h-8">Accept</Button>
                      <Button size="sm" variant="outline" className="flex-1 h-8">Delete</Button>
                    </div>
                  </div>
                ))
              ) : (
                currentList.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`p-3 flex items-center gap-3 cursor-pointer border-l-4 transition-colors ${
                      selectedChat?.id === item.id
                        ? "bg-muted/50 border-l-primary"
                        : "border-l-transparent hover:bg-muted/30"
                    }`}
                    onClick={() => {
                      setSelectedChat(item);
                      setShowChat(true);
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={item.color}>{getInitials(item.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.lastMsg}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat View */}
        <Card className={`border-0 shadow-card flex flex-col overflow-hidden ${!showChat ? "hidden lg:flex" : "flex"}`}>
          <CardContent className="p-0 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 flex items-center gap-3 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8"
                onClick={() => setShowChat(false)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarFallback className={selectedChat?.color}>{getInitials(selectedChat?.name || "")}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{selectedChat?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedChat?.status}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
              <p className="text-center text-xs text-muted-foreground mb-4">Today</p>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                        msg.type === "sent"
                          ? "gradient-primary text-primary-foreground rounded-br-sm"
                          : "bg-card rounded-bl-sm"
                      }`}
                    >
                      {msg.isFile ? (
                        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="text-xs font-medium">{msg.text}</span>
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 flex items-center gap-2 border-t border-border">
              <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 rounded-full"
              />
              <Button
                size="icon"
                className="gradient-primary text-primary-foreground h-9 w-9 rounded-full flex-shrink-0"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
