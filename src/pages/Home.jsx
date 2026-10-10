import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import EmergencyBanner from '../components/EmergencyBanner';
import TrustBadges from '../components/TrustBadges';
import FaqSection from '../components/FaqSection';
import { Zap, Paintbrush, Wrench, Hammer, ShieldCheck, Clock, ThumbsUp, MapPin, MessageCircle } from 'lucide-react';

export default function Home() {
  const whatsappNumber = "5521999999999";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para serviços em Maricá.");

  const services = [
    {
      slug: "marmore",
      title: "Serviços de Mármore e Granito",
      description: "Confecção de peças sob medida, pias, bancadas, soleiras, lavatórios e instalação completa com acabamento profissional.",
      icon: <Hammer className="w-7 h-7 text-amber-600" />
    },
    {
      slug: "eletrica",
      title: "Instalações e Reparos Elétricos",
      description: "Manutenção preventiva e corretiva, troca de disjuntores, tomadas, chuveiros, ventiladores de teto e instalações residenciais.",
      icon: <Zap className="w-7 h-7 text-yellow-500" />
    },
    {
      slug: "pintura",
      title: "Pintura Residencial e Comercial",
      description: "Pintura de paredes, tetos, portões, aplicação de massa corrida, texturas e acabamentos de alta qualidade.",
      icon: <Paintbrush className="w-7 h-7 text-blue-500" />
    },
    {
      slug: "reparos",
      title: "Pequenos Reparos e Consertos",
      description: "Fixação de prateleiras, varões de cortina, troca de fechaduras, pequenos reparos hidráulicos e manutenções gerais.",
      icon: <Wrench className="w-7 h-7 text-orange-500" />
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
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-xl shadow-lg inline-flex items-center justify-center space-x-2 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Pedir Orçamento no WhatsApp</span>
              </a>
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

        {/* SERVIÇOS */}
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
                  <Link 
                    to={`/servico/${service.slug}`}
                    className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm py-2 rounded-lg transition"
                  >
                    Ver detalhes
                  </Link>
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

      {/* WHATSAPP FLUTUANTE */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <Footer />
    </div>
  );
}