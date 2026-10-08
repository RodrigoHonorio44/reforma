import React, { useState, useRef, useEffect } from 'react';
import API_URL from '../services/api';
import { MessageSquare, X, Send, Bot, PhoneCall } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Olá! Sou o assistente virtual da Maricá Reparos. Como posso ajudar com o seu imóvel hoje?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState('');

  const chatEndRef = useRef(null);
  // Gera um ID único para a sessão do usuário no chat
  const sessionIdRef = useRef('session_' + Math.random().toString(36).substring(2, 9));
  const WHATSAPP_NUMBER = '5521999999999';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setLastUserMessage(userMessage);
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          sessionId: sessionIdRef.current 
        }),
      });

      const data = await res.json();

      const messageList = data.messages && data.messages.length > 0 
        ? data.messages 
        : data.reply 
          ? [data.reply] 
          : null;

      if (messageList) {
        messageList.forEach((msgText, index) => {
          setTimeout(() => {
            setMessages((prev) => [...prev, { sender: 'bot', text: msgText }]);

            const lowerReply = msgText.toLowerCase();
            if (
              lowerReply.includes('whatsapp') ||
              lowerReply.includes('orçamento') ||
              lowerReply.includes('orcamento') ||
              lowerReply.includes('contato')
            ) {
              setShowWhatsAppButton(true);
            }

            if (index === messageList.length - 1) {
              setLoading(false);
            }
          }, index * 1000);
        });
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Ocorreu um erro ao processar a resposta.' }
        ]);
        setLoading(false);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Não foi possível ligar ao servidor de atendimento.' }
      ]);
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Olá! Vim pelo site da Maricá Reparos. Estava falando com o assistente sobre um orçamento e gostaria de continuar o atendimento.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
          aria-label="Abrir Chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[480px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-yellow-400" />
              <div>
                <h3 className="font-bold text-sm">Maricá Reparos</h3>
                <span className="text-xs text-emerald-400 flex items-center">● Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-yellow-500 text-slate-950 rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 border border-slate-200 p-3 rounded-2xl rounded-bl-none text-xs italic shadow-sm animate-pulse">
                  A escrever resposta...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Banner do WhatsApp */}
          {(showWhatsAppButton || messages.length > 3) && (
            <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs text-emerald-800 font-medium">Prefere falar diretamente?</span>
              <button
                onClick={handleWhatsAppRedirect}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Chamar no WhatsApp</span>
              </button>
            </div>
          )}

          {/* Campo de Entrada */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite a sua dúvida..."
              className="flex-1 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full text-sm focus:outline-none focus:border-yellow-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 p-2.5 rounded-full transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}