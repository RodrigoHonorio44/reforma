import React from 'react';
import { Wrench, CheckCircle } from 'lucide-react';

export default function Gallery() {
  const works = [
    {
      title: "Organização de Quadro Elétrico",
      category: "Elétrica • Itaipuaçu",
      description: "Substituição de disjuntores antigos e identificação completa dos circuitos para maior segurança residencial."
    },
    {
      title: "Pintura de Fachada e Muro",
      category: "Pintura • Centro",
      description: "Aplicação de selador, impermeabilização e pintura externa com acabamento de alto padrão."
    },
    {
      title: "Instalação de Acessórios e Suportes",
      category: "Pequenos Reparos • Inoã",
      description: "Fixação segura de painel de TV, cortinas, prateleiras e ajustes de portas."
    }
  ];

  return (
    <section id="galeria" className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-yellow-600 font-semibold text-sm tracking-wide uppercase">Prova Visual</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Trabalhos Realizados</h2>
          <p className="text-slate-600">Compromisso com o capricho, limpeza e organização em cada serviço.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="h-48 bg-slate-800 flex items-center justify-center text-slate-400 relative">
                {/* Espaço reservado para colocar fotos reais no futuro */}
                <div className="text-center p-4">
                  <Wrench className="w-10 h-10 text-yellow-400 mx-auto mb-2 opacity-80" />
                  <span className="text-xs tracking-wider uppercase text-slate-300 font-medium">Foto do Serviço</span>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">{work.category}</span>
                <h3 className="text-xl font-bold text-slate-900">{work.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}