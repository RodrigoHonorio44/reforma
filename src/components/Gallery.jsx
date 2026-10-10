import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';

export default function Gallery() {
  const [works, setWorks] = useState([]);

  // Fotos específicas e idênticas aos serviços descritos nos cards
  const defaultWorks = [
    {
      title: "Fabricação e Instalação de Pia de Mármore",
      category: "Mármores e Granitos • Maricá",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      description: "Confecção de peça sob medida, corte de cuba e instalação completa com acabamento profissional e impermeabilização."
    },
    {
      title: "Organização de Quadro Elétrico",
      category: "Elétrica • Itaipuaçu",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      description: "Substituição de disjuntores antigos e identificação completa dos circuitos para maior segurança residencial."
    },
    {
      title: "Pintura de Fachada e Muro",
      category: "Pintura • Centro",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      description: "Aplicação de selador, impermeabilização e pintura externa com acabamento de alto padrão."
    },
    {
      title: "Instalação de Acessórios e Suportes",
      category: "Pequenos Reparos • Inoã",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
      description: "Fixação segura de painel de TV, cortinas, prateleiras e ajustes de portas."
    }
  ];

  useEffect(() => {
    const savedWorks = localStorage.getItem('solufix_works');
    if (savedWorks) {
      try {
        const parsed = JSON.parse(savedWorks);
        // Garante que cada card exiba a foto salva no painel ou a foto padrão idêntica
        const merged = defaultWorks.map((defItem, idx) => {
          const savedItem = parsed[idx];
          if (savedItem && savedItem.image && savedItem.image.trim() !== '') {
            return { ...defItem, ...savedItem };
          }
          return defItem;
        });
        setWorks(merged);
      } catch (e) {
        setWorks(defaultWorks);
      }
    } else {
      setWorks(defaultWorks);
    }
  }, []);

  return (
    <section id="galeria" className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-yellow-600 font-semibold text-sm tracking-wide uppercase">Prova Visual</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Trabalhos Realizados</h2>
          <p className="text-slate-600">Compromisso com o capricho, limpeza e organização em cada serviço.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col justify-between">
              
              {/* BLOCO DA FOTO DA GALERIA */}
              <div className="h-48 bg-slate-900 flex items-center justify-center text-slate-400 relative overflow-hidden">
                {work.image ? (
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-center p-4">
                    <Wrench className="w-10 h-10 text-yellow-400 mx-auto mb-2 opacity-80" />
                    <span className="text-xs tracking-wider uppercase text-slate-300 font-medium">Foto do Serviço</span>
                  </div>
                )}
              </div>

              {/* DESCRIÇÃO E DETALHES DO TRABALHO */}
              <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide block mb-1">{work.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{work.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{work.description}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}