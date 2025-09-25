"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ImageIcon, Mic, Calendar, Smile, CheckCheck, Sun, Moon, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"

interface Message {
  id: number
  text: string
  sender: "me" | "match"
  timestamp: string
  read?: boolean
  reactions?: string[]
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! How's your week going?",
      sender: "match",
      timestamp: "10:00 AM",
      read: true,
    },
    {
      id: 2,
      text: "Hi! It's going great, thanks! Just finished a big project at work.",
      sender: "me",
      timestamp: "10:05 AM",
      read: true,
    },
    {
      id: 3,
      text: "That's awesome! What kind of project was it?",
      sender: "match",
      timestamp: "10:07 AM",
      read: false,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage.trim(),
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
      setIsTyping(false)
      // Simulate match typing and response
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          const matchResponse: Message = {
            id: messages.length + 2,
            text: "Sounds interesting! I'd love to hear more about it sometime.",
            sender: "match",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            read: false,
          }
          setMessages((prev) => [...prev, matchResponse])
          setIsTyping(false)
        }, 2000)
      }, 1000)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={`flex flex-col h-screen w-full max-w-md mx-auto border rounded-lg shadow-lg ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Match Name</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-5 w-5" />
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} aria-label="Toggle dark mode" />
          <Moon className="h-5 w-5" />
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl ${
                  message.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`flex items-center text-xs mt-1 ${
                    message.sender === "me" ? "justify-end" : "justify-start"
                  } gap-1`}
                >
                  <span>{message.timestamp}</span>
                  {message.sender === "me" && message.read && <CheckCheck className="h-3 w-3 text-blue-400" />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-xl bg-muted text-muted-foreground rounded-bl-none">
              <p className="animate-pulse">Typing...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t space-y-2">
        <div className="flex justify-around items-center">
          <Button variant="ghost" size="icon" aria-label="AI Conversation Starters">
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Share Photo/GIF">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Record Voice Message">
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Schedule Message">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Message Reactions">
            <Smile className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Type a message..."
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage} aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
