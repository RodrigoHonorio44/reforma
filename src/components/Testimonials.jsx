import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Carlos Eduardo",
      neighborhood: "Itaipuaçu",
      text: "Serviço de elétrica impecável! Trocou o quadro de disjuntores aqui de casa com muita organização, limpeza e pontualidade. Recomendo demais!",
      service: "Instalação Elétrica"
    },
    {
      name: "Mariana Souza",
      neighborhood: "Centro de Maricá",
      text: "Contratei para pintura da sala e fachada. O acabamento ficou perfeito e o preço foi super justo. Profissional de total confiança.",
      service: "Pintura Residencial"
    },
    {
      name: "Luciana Alencar",
      neighborhood: "Ponta Negra",
      text: "Fez a instalação da bancada e cuba de mármore no meu banheiro. O corte e o acabamento ficaram perfeitos. Atendimento nota 10!",
      service: "Mármores e Granitos"
    },
    {
      name: "Roberto Mendes",
      neighborhood: "Inoã",
      text: "Precisava fixar suportes de TV, cortinas e ajustar umas portas que raspavam. Resolveu tudo numa única manhã com muita eficiência.",
      service: "Pequenos Reparos"
    }
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-yellow-600 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full inline-block">
            Avaliações Reais
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            O que dizem os nossos clientes
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            A satisfação e confiança de quem já contratou os nossos serviços em Maricá e região.
          </p>
        </div>

        {/* GRID DE DEPOIMENTOS RESPONSIVO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/90 hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-slate-200 group-hover:text-yellow-400/40 transition-colors" />
              
              <div>
                {/* ESTRELAS */}
                <div className="flex space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* TEXTO DO CLIENTE */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              {/* AUTOR E DETALHES */}
              <div className="border-t border-slate-100 pt-3 mt-auto">
                <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-1.5 gap-1">
                  <span className="flex items-center text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-red-500 mr-1 flex-shrink-0" />
                    {review.neighborhood}
                  </span>
                  <span className="bg-slate-100 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200 whitespace-nowrap">
                    {review.service}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}