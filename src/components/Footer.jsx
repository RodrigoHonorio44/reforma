import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center text-sm border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; 2026 Maricá Reparos & Serviços. Todos os direitos reservados.</p>
        <p className="text-xs">Especialista em elétrica, pintura e pequenos reparos locais.</p>
      </div>
    </footer>
  );
}