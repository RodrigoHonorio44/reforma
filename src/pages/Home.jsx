import React, { useState } from 'react';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import EmergencyBanner from '../components/EmergencyBanner';
import TrustBadges from '../components/TrustBadges';
import FaqSection from '../components/FaqSection';
import WhatsappButton from '../components/WatsappButton'; 
import { Zap, Paintbrush, Wrench, Hammer, ShieldCheck, Clock, ThumbsUp, MapPin, X, CheckCircle2 } from 'lucide-react';

export default function Home() {
  // Estado para armazenar o serviço selecionado no Modal
  const [selectedService, setSelectedService] = useState(null);

  // Lista de serviços com os detalhes completos para o Modal
  const services = [
    {
      slug: "marmore",
      title: "Serviços de Mármore e Granito",
      description: "Confecção de peças sob medida, pias, bancadas, soleiras, lavatórios e instalação completa com acabamento profissional.",
      fullTitle: "Especialistas em Mármores, Granitos e Pedras Decorativas",
      detailedDescription: "Executamos projetos personalizados sob medida para transformar os ambientes da sua casa ou comércio com acabamento impecável e pedras de alta durabilidade.",
      icon: <Hammer className="w-7 h-7 text-amber-600" />,
      features: [
        "Confecção e instalação de pias e bancadas para cozinhas e áreas gourmet.",
        "Soleiras, peitoris, lavabos esculpidos e nichos embutidos para banheiros.",
        "Polimento, ajustes e impermeabilização profissional de pedras naturais.",
        "Medição técnica no local e instalação rápida em Maricá e região."
      ]
    },
    {
      slug: "eletrica",
      title: "Instalações e Reparos Elétricos",
      description: "Manutenção preventiva e corretiva, troca de disjuntores, tomadas, chuveiros, ventiladores de teto e instalações residenciais.",
      fullTitle: "Manutenção e Instalações Elétricas Residenciais e Comerciais",
      detailedDescription: "Segurança e eficiência em primeiro lugar. Realizamos desde pequenas manutenções preventivas até reestruturações elétricas completas com total conformidade técnica.",
      icon: <Zap className="w-7 h-7 text-yellow-500" />,
      features: [
        "Troca e instalação de disjuntores, quadros elétricos e diferenciais (DR).",
        "Instalação de tomadas, interruptores, ventiladores de teto e lustres.",
        "Passagem de fios, chuveiros elétricos, cooktops e reparações de curto-circuitos.",
        "Atendimento rápido e seguro para emergências elétricas na região."
      ]
    },
    {
      slug: "pintura",
      title: "Pintura Residencial e Comercial",
      description: "Pintura de paredes, tetos, portões, aplicação de massa corrida, texturas e acabamentos de alta qualidade.",
      fullTitle: "Pintura Profissional e Acabamentos Decorativos",
      detailedDescription: "Renove o visual do seu imóvel com uma pintura limpa, duradoura e de altíssimo padrão, utilizando os melhores materiais do mercado e preparação adequada das superfícies.",
      icon: <Paintbrush className="w-7 h-7 text-blue-500" />,
      features: [
        "Pintura de paredes, tetos, fachadas e portões metálicos.",
        "Aplicação de massa corrida, texturas, efeitos especiais e grafiato.",
        "Tratamento de infiltrações, umidade, lixamento e preparação de superfícies.",
        "Proteção total dos móveis e pisos durante a execução do serviço."
      ]
    },
    {
      slug: "reparos",
      title: "Pequenos Reparos e Consertos",
      description: "Fixação de prateleiras, varões de cortina, troca de fechaduras, pequenos reparos hidráulicos e manutenções gerais.",
      fullTitle: "Soluções Rápidas e Pequenos Reparos Gerais",
      detailedDescription: "Aqueles pequenos problemas do dia a dia que exigem precisão, ferramentas adequadas e rapidez, resolvidos sem dor de cabeça para o seu lar.",
      icon: <Wrench className="w-7 h-7 text-orange-500" />,
      features: [
        "Fixação de prateleiras, suportes de TV, quadros e varões de cortina.",
        "Troca de fechaduras, dobradiças, trincos e consertos de portas/janelas.",
        "Pequenos reparos hidráulicos (torneiras, sifões, vazamentos simples).",
        "Praticidade, pontualidade e garantia em cada pequeno serviço."
      ]
    }
  ];

  const neighborhoods = ["Centro de Maricá", "Itaipuaçu", "Inoã", "Ponta Negra", "Barra de Maricá", "Cordeirinho"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <main>
        {/* HERO OTIMIZADO MOBILE */}
        <section id="inicio" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-semibold inline-block shadow-sm">
              Atendimento Especializado em Maricá e Região
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Soluções Profissionais em <span className="text-yellow-400">Mármores, Elétrica e Reformas</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Serviço rápido, limpo e com garantia. Cuido da manutenção e acabamento da sua casa com total segurança e profissionalismo.
            </p>
            <div className="pt-2">
              <WhatsappButton 
                text="Pedir Orçamento no WhatsApp"
                message="Olá! Gostaria de solicitar um orçamento para serviços em Maricá."
                className="!text-sm sm:!text-base !px-6 !py-3 !rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* BANNER DE EMERGÊNCIA ELÉTRICA */}
        <EmergencyBanner />

        {/* DIFERENCIAIS */}
        <section className="bg-white py-8 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Serviço Garantido</h3>
                <p className="text-xs text-slate-600">Qualidade e segurança.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
              <Clock className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Pontualidade</h3>
                <p className="text-xs text-slate-600">Respeito aos prazos.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
              <ThumbsUp className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Preço Justo</h3>
                <p className="text-xs text-slate-600">Orçamento transparente.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE SERVIÇOS COM MODAL */}
        <section id="servicos" className="py-12 px-4 max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Nossos Serviços</h2>
            <p className="text-slate-600 text-sm">O que você precisa para manter sua residência em perfeito estado.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="bg-slate-100 p-3 rounded-xl inline-block mb-3">{service.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">{service.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{service.description}</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="w-full text-center bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 font-semibold text-xs sm:text-sm py-2 rounded-lg transition cursor-pointer"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <TrustBadges />
        <Testimonials />
        <Gallery />
        <FaqSection />

        {/* ÁREA DE ATUAÇÃO */}
        <section id="regiao" className="bg-slate-100 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">Área de Atuação em Maricá</h2>
            <p className="text-slate-600 text-sm">Atendimento residencial presencial nos principais bairros:</p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {neighborhoods.map((bairro, idx) => (
                <div key={idx} className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-700 font-medium text-xs flex items-center space-x-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{bairro}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* MODAL DE DETALHES DO SERVIÇO */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Cabeçalho do Modal */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-yellow-400 text-slate-900 rounded-xl">
                  {selectedService.icon}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-yellow-400 font-bold">Detalhes do Serviço</span>
                  <h3 className="text-xl font-extrabold text-white leading-tight">{selectedService.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto space-y-6 text-left">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{selectedService.fullTitle}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedService.detailedDescription}</p>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">O que está incluído / Diferenciais:</h5>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rodapé integrando o WhatsappButton reutilizável */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-1/2 py-3 px-4 border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-xl text-sm transition cursor-pointer"
              >
                Fechar
              </button>

              <WhatsappButton 
                text="Solicitar Orçamento"
                message={`Olá! Gostaria de solicitar um orçamento para o serviço de: ${selectedService.title}.`}
                className="w-full sm:w-1/2 !py-3 !text-sm !font-bold !rounded-xl"
              />
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}