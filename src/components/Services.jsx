import React, { useState } from 'react';
import { Hammer, Zap, Paintbrush, Wrench, X, CheckCircle2, ArrowRight } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    icon: <Hammer className="w-8 h-8 text-yellow-500" />,
    title: "Serviços de Mármore e Granito",
    shortDesc: "Confecção de peças sob medida, pias, bancadas, soleiras, lavatórios e instalação completa com acabamento profissional.",
    fullTitle: "Especialistas em Mármores, Granitos e Pedras Decorativas",
    description: "Executamos projetos personalizados sob medida para transformar os ambientes da sua casa ou comércio com acabamento impecável e materiais de alta qualidade.",
    features: [
      "Confecção e instalação de pias e bancadas para cozinhas e áreas gourmet.",
      "Soleiras, peitoris, lavabos esculpidos e nichos embutidos para banheiros.",
      "Polimento, ajustes e impermeabilização profissional de pedras naturais.",
      "Medição técnica no local e instalação rápida em Maricá e região."
    ]
  },
  {
    id: 2,
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Instalações e Reparos Elétricos",
    shortDesc: "Manutenção preventiva e corretiva, troca de disjuntores, tomadas, chuveiros, ventiladores de teto e instalações residenciais.",
    fullTitle: "Manutenção e Instalações Elétricas Residenciais e Comerciais",
    description: "Segurança em primeiro lugar. Realizamos desde pequenas manutenções preventivas até reestruturações elétricas completas com total conformidade com as normas técnicas.",
    features: [
      "Troca e instalação de disjuntores, quadros elétricos e diferenciais (DR).",
      "Instalação de tomadas, interruptores, ventiladores de teto e lustres.",
      "Passagem de fios, chuveiros elétricos, cooktops e reparações de curto-circuitos.",
      "Atendimento rápido e seguro para emergências elétricas na região."
    ]
  },
  {
    id: 3,
    icon: <Paintbrush className="w-8 h-8 text-yellow-500" />,
    title: "Pintura Residencial e Comercial",
    shortDesc: "Pintura de paredes, tetos, portões, aplicação de massa corrida, texturas e acabamentos de alta qualidade.",
    fullTitle: "Pintura Profissional e Acabamentos Decorativos",
    description: "Renove o visual do seu imóvel com uma pintura limpa, duradoura e de altíssimo padrão, utilizando os melhores materiais do mercado e preparação adequada das superfícies.",
    features: [
      "Pintura de paredes, tetos, fachadas e portões metálicos.",
      "Aplicação de massa corrida, texturas, efeitos especiais e grafiato.",
      "Tratamento de infiltrações, umidade, lixamento e preparação de superfícies.",
      "Proteção total dos móveis e pisos durante a execução do serviço."
    ]
  },
  {
    id: 4,
    icon: <Wrench className="w-8 h-8 text-yellow-500" />,
    title: "Pequenos Reparos e Consertos",
    shortDesc: "Fixação de prateleiras, varões de cortina, troca de fechaduras, pequenos reparos hidráulicos e manutenções gerais.",
    fullTitle: "Soluções Rápidas e Pequenos Reparos Gerais",
    description: "Aqueles pequenos problemas do dia a dia que exigem precisão, ferramentas adequadas e rapidez, resolvidos sem dor de cabeça para o seu lar.",
    features: [
      "Fixação de prateleiras, suportes de TV, quadros e varões de cortina.",
      "Troca de fechaduras, dobradiças, trincos e consertos de portas/janelas.",
      "Pequenos reparos hidráulicos (torneiras, sifões, vazamentos simples).",
      "Praticidade, pontualidade e garantia em cada pequeno serviço."
    ]
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const handleRequestQuote = (serviceTitle) => {
    const phoneNumber = "5521999999999"; // Substitua pelo número real do WhatsApp
    const message = encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para o serviço de: *${serviceTitle}*.`);
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, '_blank');
  };

  return (
    <section id="servicos" className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        
        {/* Cabeçalho */}
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Nossos Serviços</h2>
          <p className="text-slate-600 max-w-xl mx-auto">O que você precisa para manter sua residência em perfeito estado.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition duration-300"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto border border-yellow-100">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{service.shortDesc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-sm font-semibold rounded-xl transition duration-200 cursor-pointer"
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
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

            <div className="p-6 overflow-y-auto space-y-6 text-left">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{selectedService.fullTitle}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedService.description}</p>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">O que está incluído / Vantagens:</h5>
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

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-1/2 py-3 px-4 border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-xl text-sm transition cursor-pointer"
              >
                Voltar
              </button>
              <button 
                onClick={() => handleRequestQuote(selectedService.title)}
                className="w-full sm:w-1/2 py-3 px-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl text-sm shadow transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Solicitar Orçamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}