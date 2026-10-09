import React, { useState, useRef, useEffect } from 'react';
import API_URL from '../services/api';
import { MessageSquare, X, Send, Bot, PhoneCall, Zap, Wrench, ShieldCheck, ArrowRight, Paintbrush } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  // Saudação dinâmica por horário
  const getDynamicGreeting = () => {
    const hora = new Date().getHours();
    let saudacao = 'Olá';
    if (hora >= 5 && hora < 12) {
      saudacao = 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      saudacao = 'Boa tarde';
    } else {
      saudacao = 'Boa noite';
    }
return `${saudacao}! Seja bem-vindo à Solufix Reformas. Sou o seu assistente virtual. Escolha um dos tópicos abaixo ou digite sua dúvida:`;
  };

  const [messages, setMessages] = useState([
    { sender: 'bot', text: getDynamicGreeting() }
  ]);
  const [loading, setLoading] = useState(false);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  
  const [step, setStep] = useState('welcome'); // welcome, neighborhood, chatting
  const [formData, setFormData] = useState({
    service: '',
    neighborhood: ''
  });

  const chatEndRef = useRef(null);
  const sessionIdRef = useRef('session_' + Math.random().toString(36).substring(2, 9));
  const WHATSAPP_NUMBER = '5521975966330'; // Seu número do WhatsApp

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
  };

  const handleSendBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: 'bot', text }]);
  };

  // Envia a palavra-chave do tópico para o backend buscar a resposta cadastrada no Painel
  const handleTopicClick = async (topicKeyword, displayLabel) => {
    handleSendUserMessage(displayLabel);
    setFormData(prev => ({ ...prev, service: displayLabel }));
    await sendToBackend(topicKeyword);
  };

  // Comunicação com o backend (lê as regras do MongoDB/Painel)
  const sendToBackend = async (textToSend) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend,
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
            handleSendBotMessage(msgText);

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
              // Após responder o tópico, podemos pedir o bairro para fechar o lead
              if (step === 'welcome') {
                setTimeout(() => {
                  handleSendBotMessage('Para continuarmos o atendimento, em qual bairro de Maricá você está?');
                  setStep('neighborhood');
                }, 800);
              }
            }
          }, index * 800);
        });
      } else {
        handleSendBotMessage('Não encontrei uma resposta automática para isso, mas nossa equipe pode ajudar no WhatsApp!');
        setShowWhatsAppButton(true);
        setLoading(false);
      }
    } catch (err) {
      handleSendBotMessage('Não foi possível conectar ao servidor de atendimento.');
      setLoading(false);
    }
  };

  // Envio do Bairro digitado pelo cliente
  const handleNeighborhoodSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const neighborhood = input.trim();
    setFormData((prev) => ({ ...prev, neighborhood }));
    handleSendUserMessage(neighborhood);
    setInput('');

    handleSendBotMessage(`Perfeito! Registrei o seu atendimento para o bairro ${neighborhood}. Clique no botão abaixo para enviar os detalhes direto para o nosso WhatsApp corporativo:`);
    setShowWhatsAppButton(true);
    setStep('chatting');
  };

  // Envio de mensagem livre digitada pelo usuário
  const handleSendMessageSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    handleSendUserMessage(userMessage);

    if (step === 'neighborhood') {
      const neighborhood = userMessage.trim();
      setFormData((prev) => ({ ...prev, neighborhood }));
      handleSendBotMessage(`Perfeito! Registrei para o bairro ${neighborhood}. Clique no botão abaixo para concluir no WhatsApp:`);
      setShowWhatsAppButton(true);
      setStep('chatting');
      return;
    }

    await sendToBackend(userMessage);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Olá, Maricá Reparos! Vim pelo site e gostaria de solicitar um atendimento:\n\n` +
      `🛠️ *Tópico/Serviço:* ${formData.service || 'Não especificado'}\n` +
      `📍 *Bairro:* ${formData.neighborhood || 'Maricá'}\n` +
      `💬 Estava conversando com o assistente virtual e gostaria de continuar por aqui.`
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
        <div className="bg-white w-80 md:w-96 h-[540px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
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
                  className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-yellow-500 text-slate-950 rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Tópicos Principais (Clicáveis no início) */}
            {step === 'welcome' && (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => handleTopicClick('orçamento', '📋 Solicitar Orçamento')}
                  className="text-left bg-white hover:bg-yellow-50 text-slate-700 border border-gray-200 text-xs font-medium p-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <span>📋 Solicitar Orçamento</span>
                </button>
                <button
                  onClick={() => handleTopicClick('eletrica', '⚡ Elétrica e Curto-circuito')}
                  className="text-left bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium p-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>⚡ Elétrica e Curto-circuito</span>
                </button>
                <button
                  onClick={() => handleTopicClick('pintura', '🎨 Pintura Residencial')}
                  className="text-left bg-white hover:bg-yellow-50 text-slate-700 border border-gray-200 text-xs font-medium p-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Paintbrush className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>🎨 Pintura Residencial</span>
                </button>
                <button
                  onClick={() => handleTopicClick('reparos', '🛠️ Pequenos Reparos')}
                  className="text-left bg-white hover:bg-yellow-50 text-slate-700 border border-gray-200 text-xs font-medium p-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>🛠️ Pequenos Reparos</span>
                </button>
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 border border-slate-200 p-3 rounded-2xl rounded-bl-none text-xs italic shadow-sm animate-pulse">
                  A consultar assistente...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Botão de Redirecionamento para o WhatsApp com Resumo */}
          {showWhatsAppButton && (
            <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs text-emerald-800 font-medium">Falar com especialista:</span>
              <button
                onClick={handleWhatsAppRedirect}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Chamar no WhatsApp</span>
              </button>
            </div>
          )}

          {/* Campo de Entrada de Texto */}
          <form onSubmit={handleSendMessageSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step === 'neighborhood' ? "Digite o seu bairro..." : "Digite a sua dúvida..."}
              className="flex-1 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full text-sm focus:outline-none focus:border-yellow-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 p-2.5 rounded-full transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {step === 'neighborhood' ? <ArrowRight className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}