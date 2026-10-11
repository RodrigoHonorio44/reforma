import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        
        {/* GRID PRINCIPAL DO RODAPÉ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* COLUNA 1: LOGO E SOBRE */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="h-9 w-9 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  src="/solufix.jpg" 
                  alt="Solufix Reformas Logo" 
                  className="h-full w-full object-cover scale-110" 
                />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Solufix <span className="text-yellow-400">Reformas</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Soluções completas e profissionais em manutenção residencial e comercial. Mármores, instalações elétricas, pintura e reparos rápidos com garantia.
            </p>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO RÁPIDA */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => handleScrollTo('inicio')} 
                  className="hover:text-yellow-400 transition bg-transparent border-none p-0 cursor-pointer text-slate-400"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('servicos')} 
                  className="hover:text-yellow-400 transition bg-transparent border-none p-0 cursor-pointer text-slate-400"
                >
                  Nossos Serviços
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('galeria')} 
                  className="hover:text-yellow-400 transition bg-transparent border-none p-0 cursor-pointer text-slate-400"
                >
                  Trabalhos Realizados
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('regiao')} 
                  className="hover:text-yellow-400 transition bg-transparent border-none p-0 cursor-pointer text-slate-400"
                >
                  Área de Atuação
                </button>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: SERVIÇOS PRESTADOS */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Especialidades</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Mármores e Granitos sob Medida</li>
              <li>Instalações e Reparos Elétricos</li>
              <li>Pintura Residencial e Comercial</li>
              <li>Pequenos Reparos Gerais</li>
            </ul>
          </div>

          {/* COLUNA 4: ATENDIMENTO LOCAL */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Atendimento</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Maricá, Itaipuaçu, Inoã, Ponta Negra e regiões vizinhas.</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Serviço rápido, limpo e com garantia.</span>
              </div>
            </div>
          </div>

        </div>

        {/* DIVISÓRIA E DIREITOS AUTORAIS */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-center sm:text-left">
          <p>© 2026 Solufix Reformas & Serviços. Todos os direitos reservados.</p>
          <p className="text-[11px] text-slate-500">
            Especialista em Mármores, Elétrica, Pintura e Manutenção Residencial em Maricá.
          </p>
        </div>

      </div>
    </footer>
  );
}