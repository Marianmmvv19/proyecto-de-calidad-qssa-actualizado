import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { processAssistantQuery } from '../data/assistantEngine';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AiAssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: '¡Hola! Soy el Asistente Técnico Especializado de QSSA. Conozco detalladamente los 29 servicios de nuestro catálogo (capacitaciones, diagnósticos, auditorías internas, ISO 9001, 14001, 45001, 17020, 17025 y programa OEA). ¿En qué puedo orientarte hoy?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      if (response.ok) {
        const data = await response.json();
        const botText = data.text || processAssistantQuery(userMsg);
        setMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: botText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        const fallbackText = processAssistantQuery(userMsg);
        setMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: fallbackText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      // Motor autónomo local directo sin dependencias externas
      const localResponse = processAssistantQuery(userMsg);
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: localResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    '¿Qué servicio necesito para capacitar a mis auditores internos en ISO 9001?',
    '¿Cuáles servicios se pueden ejecutar sin necesidad de alquilar equipos de medición?',
    '¿Qué servicios ofrecen para el Corredor Bioceánico (Bolivia, Chile, Perú)?',
    '¿Cuál es la diferencia entre un diagnóstico e implementación de ISO 17020?'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md flex items-center justify-between border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-600/30 border border-indigo-400/30 rounded-xl">
            <Sparkles className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Asistente Técnico de Calidad QSSA</h2>
            <p className="text-xs text-indigo-200">
              Consultas en tiempo real sobre la Matriz de 29 Servicios, Normas ISO y Recomendaciones Técnicas.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="flex flex-wrap gap-2">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setInput(q)}
            className="text-xs bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition text-left cursor-pointer hover:border-indigo-400"
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[500px] overflow-hidden">
        
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-2 text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 italic">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span>Analizando matriz QSSA y generando respuesta técnica...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-slate-50 border-t border-slate-200 flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunte sobre los servicios, normas ISO o viabilidad..."
            className="flex-1 bg-white border border-slate-300 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow transition disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
