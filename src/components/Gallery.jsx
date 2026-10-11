import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://api-reforma.rodhonsystem.com.br';

export default function Gallery() {
  const [worksByCategory, setWorksByCategory] = useState({
    marmore: [
      {
        title: "Fabricação e Instalação de Pia de Mármore",
        location: "Maricá",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        description: "Confecção de peça sob medida, corte de cuba e instalação completa com acabamento profissional e impermeabilização."
      }
    ],
    eletrica: [
      {
        title: "Organização de Quadro Elétrico",
        location: "Itaipuaçu",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        description: "Substituição de disjuntores antigos e identificação completa dos circuitos para maior segurança residencial."
      }
    ],
    pintura: [
      {
        title: "Pintura de Fachada e Muro",
        location: "Centro",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        description: "Aplicação de selador, impermeabilização e pintura externa com acabamento de alto padrão."
      }
    ],
    reparos: [
      {
        title: "Instalação de Acessórios e Suportes",
        location: "Inoã",
        imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
        description: "Fixação segura de painel de TV, cortinas, prateleiras e ajustes de portas."
      }
    ]
  });

  // Índices para controlar a foto atual em cada mini-carrossel
  const [activeIndexes, setActiveIndexes] = useState({
    marmore: 0,
    eletrica: 0,
    pintura: 0,
    reparos: 0
  });

  const categoryConfigs = [
    { key: 'marmore', label: 'MÁRMORES E GRANITOS' },
    { key: 'eletrica', label: 'ELÉTRICA' },
    { key: 'pintura', label: 'PINTURA' },
    { key: 'reparos', label: 'PEQUENOS REPAROS' }
  ];

  useEffect(() => {
    fetch(`${API_URL.replace(/\/$/, '')}/api/works`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const grouped = {
            marmore: [],
            eletrica: [],
            pintura: [],
            reparos: []
          };

          data.forEach((item) => {
            const cat = item.category?.toLowerCase() || '';
            if (cat.includes('marmore') || cat.includes('mármore')) grouped.marmore.push(item);
            else if (cat.includes('eletrica') || cat.includes('elétrica')) grouped.eletrica.push(item);
            else if (cat.includes('pintura')) grouped.pintura.push(item);
            else if (cat.includes('reparo')) grouped.reparos.push(item);
          });

          setWorksByCategory((prev) => ({
            marmore: grouped.marmore.length > 0 ? grouped.marmore : prev.marmore,
            eletrica: grouped.eletrica.length > 0 ? grouped.eletrica : prev.eletrica,
            pintura: grouped.pintura.length > 0 ? grouped.pintura : prev.pintura,
            reparos: grouped.reparos.length > 0 ? grouped.reparos : prev.reparos
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleNext = (catKey, total) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [catKey]: (prev[catKey] + 1) % total
    }));
  };

  const handlePrev = (catKey, total) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [catKey]: (prev[catKey] - 1 + total) % total
    }));
  };

  return (
    <section id="galeria" className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-yellow-600 font-semibold text-sm tracking-wide uppercase">Prova Visual</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Trabalhos Realizados</h2>
          <p className="text-slate-600">Compromisso com o capricho, limpeza e organização em cada serviço.</p>
        </div>

        {/* GRID FIXO DE 4 CARDS (CADA UM COM SEU PRÓPRIO MINI-CARROSSEL) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryConfigs.map(({ key, label }) => {
            const items = worksByCategory[key] || [];
            const currentIndex = activeIndexes[key] || 0;
            const currentItem = items[currentIndex] || {};
            const total = items.length;

            return (
              <div key={key} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col justify-between">
                
                {/* FOTO COM SETAS DO MINI-CARROSSEL */}
                <div className="h-48 bg-slate-900 relative flex items-center justify-center text-slate-400 overflow-hidden group">
                  {currentItem.imageUrl || currentItem.image ? (
                    <img 
                      src={currentItem.imageUrl || currentItem.image} 
                      alt={currentItem.title} 
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Wrench className="w-10 h-10 text-yellow-400 mx-auto mb-2 opacity-80" />
                      <span className="text-xs uppercase text-slate-300 font-medium">Foto do Serviço</span>
                    </div>
                  )}

                  {/* SETAS DE NAVEGAÇÃO INTERNA DO CARD (SÓ APARECEM SE HOUVER MAIS DE 1 FOTO CADASTRADA) */}
                  {total > 1 && (
                    <>
                      <button 
                        onClick={() => handlePrev(key, total)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-yellow-400 p-1.5 rounded-full shadow transition cursor-pointer"
                        aria-label="Anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleNext(key, total)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-yellow-400 p-1.5 rounded-full shadow transition cursor-pointer"
                        aria-label="Próximo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* INDICADOR DE FOTOS (EX: 1/3) */}
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                        {currentIndex + 1} / {total}
                      </span>
                    </>
                  )}
                </div>

                {/* CONTEÚDO DO CARD DO TEMA */}
                <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide block mb-1">
                      {label} {currentItem.location ? `• ${currentItem.location}` : ''}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {currentItem.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}