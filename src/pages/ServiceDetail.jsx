import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, ArrowLeft, MessageCircle, ShieldCheck, Clock } from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const whatsappNumber = "5521999999999";

  // Dados simulados para cada serviço com base no slug da URL
  const servicesData = {
    "eletrica": {
      title: "Instalações e Manutenção Elétrica Residencial",
      description: "Serviços especializados em elétrica residencial com foco absoluto em segurança, prevenção de curtos-circuitos e normas técnicas.",
      items: [
        "Troca e instalação de disjuntores e quadros elétricos",
        "Instalação de tomadas, interruptores e luminárias",
        "Instalação de chuveiros, ventiladores de teto e ar-condicionado",
        "Identificação e correção de quedas de energia e curtos"
      ]
    },
    "pintura": {
      title: "Pintura Residencial e Comercial de Alto Padrão",
      description: "Renove os ambientes da sua casa ou comércio com acabamento impecável, proteção contra umidade e pintura limpa.",
      items: [
        "Pintura de paredes, tetos e fachadas",
        "Aplicação de massa corrida e correção de fissuras",
        "Pintura de portões, grades e esquadrias de ferro/madeira",
        "Texturas decorativas e efeitos especiais"
      ]
    },
    "reparos": {
      title: "Pequenos Reparos e Manutenção Geral (Marido de Aluguel)",
      description: "A solução prática para resolver aqueles detalhes pendentes na sua casa sem dor de cabeça.",
      items: [
        "Fixação de prateleiras, quadros, varões de cortina e TVs",
        "Troca de fechaduras, maçanetas e dobradiças",
        "Pequenos reparos hidráulicos (torneiras, sifões, vazamentos)",
        "Montagem e ajuste de móveis"
      ]
    }
  };

  const currentService = servicesData[slug] || {
    title: "Serviço Profissional em Maricá",
    description: "Atendimento especializado para manutenções e reformas residenciais.",
    items: ["Serviço garantido", "Atendimento pontual", "Orçamento transparente"]
  };

  const whatsappMessage = encodeURIComponent(`Olá! Vi a página sobre "${currentService.title}" e gostaria de solicitar um orçamento.`);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="py-12 px-4 max-w-4xl mx-auto space-y-8 w-full">
        <Link to="/" className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para a página inicial</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-6">
          <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-3.5 py-1 rounded-full text-sm font-semibold inline-block">
            Especializado em Maricá e Região
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentService.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {currentService.description}
          </p>

          <div className="border-t border-slate-200 pt-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">O que está incluído neste serviço:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentService.items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900">Precisa deste serviço na sua casa?</h4>
              <p className="text-sm text-slate-600">Orçamento rápido e direto pelo WhatsApp.</p>
            </div>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md flex items-center space-x-2 transition whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}