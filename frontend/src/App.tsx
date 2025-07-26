import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:8000"); // ou backend em produção

// Componente de uma única mensagem
const ChatBubble = ({ role, text }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 text-sm max-w-xs rounded-2xl shadow ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

// Campo de entrada + botão
const ChatInput = ({ value, onChange, onSend }) => (
  <footer className="border-t bg-white dark:bg-gray-800 px-4 py-3">
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
      >
        Enviar
      </button>
    </div>
  </footer>
);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Efeito de conexão e recepção
  useEffect(() => {
    socket.on("bot_response", (data) => {
      addMessage("bot", data.reply);
    });
    return () => socket.disconnect();
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role, text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role, text },
    ]);
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    addMessage("user", trimmed);
    socket.emit("user_message", { message: trimmed });
    setInput("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-black p-4">
      <div className="w-full max-w-2xl h-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl flex flex-col overflow-hidden">
        {/* Cabeçalho */}
        <header className="px-6 py-4 bg-blue-600 text-white text-xl font-semibold">
          💬 Agente LLM Interativo
        </header>

        {/* Mensagens */}
        <main className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} role={msg.role} text={msg.text} />
          ))}
          <div ref={bottomRef} />
        </main>

        {/* Entrada */}
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}
