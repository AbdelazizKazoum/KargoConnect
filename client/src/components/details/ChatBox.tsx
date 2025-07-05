"use client";
import { tripDetails } from "@/db/data";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import Input from "../ui/input";
import { Button } from "../ui";
import { useTranslations } from "next-intl";

const ChatBox = ({
  initialChat,
}: {
  initialChat: typeof tripDetails.initialChat;
}) => {
  const [messages, setMessages] = useState(initialChat);
  const [newMessage, setNewMessage] = useState("");
  const t = useTranslations("details.transporter");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      author: "You",
      message: newMessage.trim(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        {t("chatWithTransporter")}
      </h2>
      <div className="bg-card border rounded-xl shadow-sm h-96 flex flex-col">
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.author === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.author === "You"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-secondary rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="p-2 border-t bg-background"
        >
          <div className="relative">
            <Input
              placeholder={t("typeMessage")}
              className="pr-12"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute top-1/2 -translate-y-1/2 right-1 h-8 w-8"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
