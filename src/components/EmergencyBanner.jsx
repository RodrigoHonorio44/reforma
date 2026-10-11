import React from 'react';
import { Zap } from 'lucide-react';
import WhatsappButton from './WatsappButton'; // Ajuste o caminho conforme a estrutura da pasta

export default function EmergencyBanner() {
  return (
    <section className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 py-5 sm:py-6 text-slate-950 shadow-md relative z-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        
        {/* BLOCO DE TEXTO E ÍCONE DE EMERGÊNCIA */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="p-3 bg-slate-950 text-yellow-400 rounded-2xl shadow-md animate-bounce flex-shrink-0">
            <Zap className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest bg-slate-950/10 text-slate-950 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Atendimento Imediato
            </span>
            <h3 className="font-extrabold text-base sm:text-lg md:text-xl text-slate-950 leading-tight">
              Precisa de Socorro ou Emergência Elétrica em Maricá?
            </h3>
            <p className="text-slate-900 text-xs sm:text-sm font-medium mt-0.5">
              Atendimento rápido para curto-circuitos, disjuntores caindo, tomadas queimadas e quedas de energia.
            </p>
          </div>
        </div>

        {/* BOTÃO REUTILIZÁVEL DO WHATSAPP DE URGÊNCIA */}
        <div className="w-full md:w-auto flex justify-center">
          <WhatsappButton 
            text="Chamar Urgência no WhatsApp"
            message="Olá! Preciso de atendimento urgente/emergencial para um problema elétrico em Maricá."
            className="w-full sm:w-auto !bg-slate-950 hover:!bg-slate-900 !text-white !font-black !px-6 !py-3.5 !rounded-xl shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap !text-xs sm:!text-sm flex justify-center items-center"
          />
        </div>

      </div>
    </section>
  );
}