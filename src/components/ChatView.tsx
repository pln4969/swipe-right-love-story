import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Heart, MoreVertical } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  age: number;
  image: string;
  bio: string;
  location: string;
  interests: string[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'match';
  timestamp: Date;
}

interface ChatViewProps {
  profile: Profile;
  onBack: () => void;
}

export const ChatView = ({ profile, onBack }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey! I saw we both love Garba dancing. Can't wait for the upcoming Navratri season! 💃`,
      sender: 'match',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: '2',
      text: `Hi! Yes, I'm so excited too! Which garba ground do you usually go to? 🪩`,
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000) // 50 min ago
    },
    {
      id: '3',
      text: `I love the atmosphere at Ahmedabad Club! The live music and energy is incredible. What about you?`,
      sender: 'match',
      timestamp: new Date(Date.now() - 2400000) // 40 min ago
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "That sounds amazing! I'd love to dance together sometime 💃",
        "Yes! We should definitely meet up at the next garba event 🎉",
        "I'm getting so excited just thinking about Navratri! ✨",
        "We should practice some new steps together! 🕺",
        "I have tickets to the grand garba at GMDC ground, want to join? 🎫"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'match',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center p-4 space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3 flex-1">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-card-foreground">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">Active now</p>
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Match Notification */}
      <div className="p-4">
        <Card className="p-4 bg-gradient-primary text-center">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <p className="text-white font-medium">
            You and {profile.name} liked each other!
          </p>
          <p className="text-white/80 text-sm mt-1">
            Start your conversation and plan your next Garba night together
          </p>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-card border border-border text-card-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p 
                  className={`text-xs mt-1 ${
                    message.sender === 'user' 
                      ? 'text-white/70' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-card/90 backdrop-blur-md border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="rounded-full bg-muted border-none"
              maxLength={500}
            />
          </div>
          <Button 
            type="submit" 
            variant="gradient" 
            size="icon"
            className="rounded-full w-10 h-10 shrink-0"
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};