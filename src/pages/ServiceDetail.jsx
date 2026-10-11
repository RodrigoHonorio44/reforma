import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappButton from '../components/WatsappButton';
import { CheckCircle, ArrowLeft, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();

  // Dados completos organizados pelos slugs das 4 especialidades
  const servicesData = {
    "marmore": {
      title: "Mármores e Granitos sob Medida",
      description: "Fabricação, corte, acabamento e instalação de peças em mármore e granito para cozinhas, banheiros e áreas gourmet em Maricá.",
      items: [
        "Confecção e instalação de bancadas, pias e balcões",
        "Instalação de soleiras, peitoris e nichos para banheiro",
        "Polimento, restauração e vedação de superfícies",
        "Projetos sob medida com acabamento de alto padrão"
      ]
    },
    "eletrica": {
      title: "Instalações e Manutenção Elétrica Residencial",
      description: "Serviços especializados em elétrica residencial com foco em segurança, prevenção de curtos-circuitos e padronização técnica.",
      items: [
        "Troca e montagem de quadros de disjuntores e fiação",
        "Instalação de tomadas, interruptores e luminárias LED",
        "Instalação de chuveiros, ventiladores de teto e sensores",
        "Atendimento emergencial para curtos e quedas de energia"
      ]
    },
    "pintura": {
      title: "Pintura Residencial e Comercial de Alto Padrão",
      description: "Renove os ambientes da sua casa ou comércio com acabamento impecável, proteção contra umidade e ambiente sempre limpo.",
      items: [
        "Pintura de paredes internas, tetos, muros e fachadas",
        "Aplicação de massa corrida, acrílica e emassamento",
        "Pintura de portões, grades e esquadrias de ferro/madeira",
        "Aplicação de seladores, texturas e efeitos especiais"
      ]
    },
    "reparos": {
      title: "Pequenos Reparos e Manutenção Geral",
      description: "A solução prática e rápida para resolver todas as pendências da sua residência em Maricá sem dor de cabeça.",
      items: [
        "Fixação de prateleiras, quadros, varões e suportes de TV",
        "Troca de fechaduras, dobradiças, maçanetas e torneiras",
        "Pequenos reparos hidráulicos e eliminação de vazamentos",
        "Ajuste de portas, janelas e montagem de móveis"
      ]
    }
  };

  const currentService = servicesData[slug] || {
    title: "Serviço Profissional Solufix",
    description: "Atendimento técnico e especializado em reformas e manutenções residenciais em Maricá e região.",
    items: [
      "Garantia em escrito de até 90 dias",
      "Atendimento pontual e organizado",
      "Orçamento transparente sem surpresas",
      "Mão de obra qualificada e limpa"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="py-8 sm:py-12 px-4 max-w-4xl mx-auto space-y-6 sm:space-y-8 w-full flex-grow">
        
        {/* BOTÃO VOLTAR */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition text-sm sm:text-base group"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para a página inicial</span>
        </Link>

        {/* CARTÃO PRINCIPAL DO SERVIÇO */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-yellow-500/10 text-yellow-700 border border-yellow-500/20 px-3.5 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600 mr-1" />
              Especializado em Maricá e Região
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentService.title}
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
              {currentService.description}
            </p>
          </div>

          {/* O QUE ESTÁ INCLUÍDO */}
          <div className="border-t border-slate-200/80 pt-6 space-y-4">
            <h3 className="text-base sm:text-xl font-bold text-slate-900">
              O que está incluído neste serviço:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentService.items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DIFERENCIAIS RÁPIDOS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              <ShieldCheck className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <span>Garantia de até 90 dias</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <span>Atendimento com pontualidade</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              <MapPin className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <span>Atendimento em toda Maricá</span>
            </div>
          </div>

          {/* CAIXA DE CHAMADA PARA O WHATSAPP */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg text-white">Precisa deste serviço na sua residência?</h4>
              <p className="text-xs sm:text-sm text-slate-300">Solicite um orçamento rápido e sem compromisso pelo WhatsApp.</p>
            </div>
            
            <WhatsappButton 
              text="Pedir Orçamento no WhatsApp"
              message={`Olá! Gostaria de um orçamento para o serviço de "${currentService.title}" em Maricá.`}
              className="w-full sm:w-auto !py-3 !px-5 !text-xs sm:!text-sm !font-bold flex justify-center whitespace-nowrap shadow-lg"
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}