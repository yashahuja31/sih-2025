import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot, User } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    type: "bot",
    message: "Welcome to the Internal Ministry Chat. How can I assist with your microplastic analysis today?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "user",
    message: "What are the latest findings on microplastic contamination levels?",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    type: "bot",
    message: "Based on our recent analysis, we've detected an average of 85 particles/L in the latest water samples, which exceeds WHO recommendations by 750%. Would you like me to generate a detailed report?",
    timestamp: "10:32 AM",
  },
];

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        message: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-dashboard-bg min-h-screen">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Internal Ministry Chat</h1>
      </div>
      
      <Card className="shadow-card h-[calc(100vh-200px)]">
        <CardHeader className="bg-gradient-primary text-white">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>Official Discussion Channel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === "bot" ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {msg.type === "bot" ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.type === "bot"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message to the ministry..."
                className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} className="bg-primary">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;