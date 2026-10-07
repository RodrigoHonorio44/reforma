import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import EmergencyBanner from '../components/EmergencyBanner';
import TrustBadges from '../components/TrustBadges';
import FaqSection from '../components/FaqSection';
import { Zap, Paintbrush, Wrench, ShieldCheck, Clock, ThumbsUp, MapPin, MessageCircle } from 'lucide-react';

export default function Home() {
  const whatsappNumber = "5521999999999";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para serviços em Maricá.");

  const services = [
    {
      slug: "eletrica",
      title: "Instalações e Reparos Elétricos",
      description: "Manutenção preventiva e corretiva, troca de disjuntores, tomadas, chuveiros, ventiladores de teto e instalações residenciais.",
      icon: <Zap className="w-8 h-8 text-yellow-500" />
    },
    {
      slug: "pintura",
      title: "Pintura Residencial e Comercial",
      description: "Pintura de paredes, tetos, portões, aplicação de massa corrida, texturas e acabamentos de alta qualidade.",
      icon: <Paintbrush className="w-8 h-8 text-blue-500" />
    },
    {
      slug: "reparos",
      title: "Pequenos Reparos e Consertos",
      description: "Fixação de prateleiras, varões de cortina, troca de fechaduras, pequenos reparos hidráulicos e manutenções gerais.",
      icon: <Wrench className="w-8 h-8 text-orange-500" />
    }
  ];

  const neighborhoods = ["Centro de Maricá", "Itaipuaçu", "Inoã", "Ponta Negra", "Barra de Maricá", "Cordeirinho"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <main>
        {/* HERO */}
        <section id="inicio" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-sm font-semibold inline-block">
              Atendimento Especializado em Maricá e Região
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Soluções Profissionais em <span className="text-yellow-400">Elétrica, Pintura e Reparos</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Serviço rápido, limpo e com garantia. Cuido da manutenção da sua casa com total segurança e profissionalismo.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Pedir Orçamento no WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* BANNER DE EMERGÊNCIA ELÉTRICA */}
        <EmergencyBanner />

        {/* DIFERENCIAIS */}
        <section className="bg-white py-10 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4">
              <ShieldCheck className="w-10 h-10 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900">Serviço Garantido</h3>
                <p className="text-sm text-slate-600">Qualidade e segurança em cada detalhe.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <Clock className="w-10 h-10 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900">Pontualidade</h3>
                <p className="text-sm text-slate-600">Respeito total aos prazos combinados.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <ThumbsUp className="w-10 h-10 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900">Preço Justo</h3>
                <p className="text-sm text-slate-600">Orçamento transparente sem surpresas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Nossos Serviços</h2>
            <p className="text-slate-600">O que você precisa para manter sua residência em perfeito estado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="bg-slate-100 p-4 rounded-xl inline-block mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>
                </div>
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <Link 
                    to={`/servico/${service.slug}`}
                    className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-lg transition"
                  >
                    Ver detalhes do serviço
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SELOS DE CONFIANÇA / GARANTIA */}
        <TrustBadges />

        {/* PROVA SOCIAL / DEPOIMENTOS */}
        <Testimonials />

        {/* GALERIA DE TRABALHOS */}
        <Gallery />

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <FaqSection />

        {/* ÁREA DE ATUAÇÃO */}
        <section id="regiao" className="bg-slate-100 py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Área de Atuação em Maricá</h2>
            <p className="text-slate-600">Atendimento residencial presencial nos principais bairros:</p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {neighborhoods.map((bairro, idx) => (
                <div key={idx} className="bg-white border border-slate-200 px-4 py-2 rounded-full text-slate-700 font-medium text-sm flex items-center space-x-2 shadow-sm">
                  <MapPin className="w-4 h-4 text-red-500" />
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
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110 z-50"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <Footer />
    </div>
  );
}