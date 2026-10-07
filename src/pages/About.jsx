import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Clock, ThumbsUp, MapPin } from 'lucide-react';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const neighborhoods = ["Centro de Maricá", "Itaipuaçu", "Inoã", "Ponta Negra", "Barra de Maricá", "Cordeirinho"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="py-12 px-4 max-w-4xl mx-auto space-y-12 w-full">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-6">
          <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-3.5 py-1 rounded-full text-sm font-semibold inline-block">
            Sobre Nós
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Profissionalismo e Confiança em Maricá
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Somos especializados em prestar serviços de alta qualidade em manutenções, instalações elétricas, pinturas e pequenos reparos residenciais e comerciais. Nosso compromisso é entregar soluções definitivas com organização, limpeza e total segurança para o seu imóvel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="space-y-2">
              <ShieldCheck className="w-8 h-8 text-yellow-500" />
              <h3 className="font-bold text-slate-900">Garantia de Qualidade</h3>
              <p className="text-sm text-slate-600">Serviços executados dentro das normas técnicas e com acabamento impecável.</p>
            </div>
            <div className="space-y-2">
              <Clock className="w-8 h-8 text-yellow-500" />
              <h3 className="font-bold text-slate-900">Pontualidade</h3>
              <p className="text-sm text-slate-600">Respeito rigoroso aos horários agendados e prazos de entrega.</p>
            </div>
            <div className="space-y-2">
              <ThumbsUp className="w-8 h-8 text-yellow-500" />
              <h3 className="font-bold text-slate-900">Preço Justo</h3>
              <p className="text-sm text-slate-600">Orçamentos transparentes, sem taxas ocultas ou surpresas no final.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Onde Atuamos</h2>
          <p className="text-slate-600">Atendimento presencial em todos os principais bairros e regiões de Maricá:</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {neighborhoods.map((bairro, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-slate-700 font-medium text-sm flex items-center space-x-2 shadow-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{bairro}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}