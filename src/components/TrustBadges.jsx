import React from 'react';
import { ShieldCheck, Award, FileText, Clock } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />,
      title: "Garantia em Escrito",
      description: "Até 90 dias de garantia em todos os serviços executados com total transparência."
    },
    {
      icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />,
      title: "Profissional Qualificado",
      description: "Mão de obra especializada com rigor técnico e respeito às normas de segurança."
    },
    {
      icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />,
      title: "Orçamento Transparente",
      description: "Preço justo, detalhado e sem surpresas no valor final da sua obra ou reparo."
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />,
      title: "Pontualidade Rigorosa",
      description: "Respeito absoluto pelos horários e prazos combinados para o seu projeto."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase tracking-widest text-yellow-400 font-bold">Por que nos escolher</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Compromisso e Qualidade Garantida</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Trabalhamos com seriedade para oferecer a melhor experiência em manutenção e reformas em Maricá.
          </p>
        </div>

        {/* Grid de Diferenciais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="bg-slate-800/60 border border-slate-700/80 hover:border-yellow-500/50 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/80 inline-block mb-4 group-hover:border-yellow-500/40 transition">
                  {badge.icon}
                </div>
                <h4 className="font-bold text-base text-white group-hover:text-yellow-400 transition mb-1.5">
                  {badge.title}
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}