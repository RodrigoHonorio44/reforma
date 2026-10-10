import React from 'react';
import { Zap } from 'lucide-react';
// 1. IMPORTAÇÃO DO SEU COMPONENTE WHATSAPP:
import WhatsappButton from '../components/WatsappButton'; // Ajuste o caminho se necessário (ex: '../components/WhatsappButton')

export default function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 py-6 text-slate-950 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 text-center md:text-left">
          <div className="p-3 bg-slate-950 text-yellow-400 rounded-full animate-bounce">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg md:text-xl">Precisa de Socorro ou Emergência Elétrica em Maricá?</h3>
            <p className="text-slate-900 text-sm font-medium">Atendimento rápido para curto-circuitos, tomadas danificadas e quedas de energia.</p>
          </div>
        </div>

        {/* 2. COMPONENTE REUTILIZADO COM MENSAGEM DE URGÊNCIA */}
        <WhatsappButton 
          text="Chamar Urgência no WhatsApp"
          message="Olá! Preciso de atendimento urgente/emergencial para um problema elétrico em Maricá."
          className="!bg-slate-950 hover:!bg-slate-900 !text-white !font-bold !px-6 !py-3 !rounded-xl shadow-lg transition-transform hover:scale-105 whitespace-nowrap"
        />
      </div>
    </div>
  );
}