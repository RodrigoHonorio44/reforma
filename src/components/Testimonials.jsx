import React from 'react';
import { Star, Quote } from 'lucide-react';

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
      name: "Roberto Mendes",
      neighborhood: "Inoã",
      text: "Precisava fixar suportes de TV, cortinas e ajustar umas portas que raspavam. Resolveu tudo numa única manhã com muita eficiência.",
      service: "Pequenos Reparos"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-yellow-600 font-semibold text-sm tracking-wide uppercase">Avaliações Reais</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">O que dizem os nossos clientes</h2>
          <p className="text-slate-600">A satisfação de quem já contratou nossos serviços em Maricá.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200" />
              <div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-bold text-slate-900">{review.name}</p>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                  <span>{review.neighborhood}</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-medium">{review.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}