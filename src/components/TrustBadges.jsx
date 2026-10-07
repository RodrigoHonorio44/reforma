import React from 'react';
import { ShieldCheck, Award, FileText, Clock } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      title: "Garantia em Escrito",
      description: "Até 90 dias de garantia em todos os serviços executados."
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Profissional Qualificado",
      description: "Técnico especializado com rigor em normas de segurança."
    },
    {
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
      title: "Orçamento Transparente",
      description: "Preço justo e sem surpresas no final da obra ou reparo."
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      title: "Pontualidade",
      description: "Respeito absoluto pelos prazos e horários combinados."
    }
  ];

  return (
    <section className="py-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700/60 p-6 rounded-2xl flex items-start space-x-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-base text-yellow-400">{badge.title}</h4>
                <p className="text-slate-300 text-sm mt-1">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}