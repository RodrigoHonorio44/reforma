import React, { forwardRef } from 'react';
import { Wrench, CheckCircle, Package, Clock, ShieldCheck, Calendar, User, MapPin } from 'lucide-react';

const ImpressaoOrcamento = forwardRef(({ cliente, endereco, dataOrcamento, validade, valorObra, tipoMaterial, prazo, garantia, servicos, materiais }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white p-8 max-w-[210mm] mx-auto text-slate-800 print:w-full print:max-w-none print:p-0 print:m-0"
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-slate-300 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="text-blue-600" size={24} /> Solufix Reformas
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Maricá - RJ • Serviços e Manutenção Especializada</p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded text-xs uppercase tracking-wider border border-blue-200 mb-1">
            Orçamento de Serviços
          </span>
          <p className="text-xs text-slate-500">Data: {dataOrcamento}</p>
          <p className="text-xs text-slate-500">Validade: {validade}</p>
        </div>
      </div>

      {/* Informações do Cliente */}
      <div className="bg-slate-50 print:bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 space-y-1">
        <p className="text-xs text-slate-700 flex items-center gap-2">
          <User size={14} className="text-slate-400" />
          <strong className="text-slate-900">Cliente:</strong> {cliente}
        </p>
        <p className="text-xs text-slate-700 flex items-center gap-2">
          <MapPin size={14} className="text-slate-400" />
          <strong className="text-slate-900">Endereço:</strong> {endereco}
        </p>
      </div>

      {/* Descrição dos Serviços */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5 border-b border-slate-200 pb-1">
          <CheckCircle className="text-blue-600" size={16} /> Descrição dos Serviços
        </h2>
        <div className="space-y-2">
          {servicos.map((servico, index) => (
            <div key={index} className="border border-slate-200 rounded p-2.5 bg-white">
              <h3 className="font-semibold text-slate-800 text-xs">
                {index + 1}. {servico.titulo}
              </h3>
              {servico.descricao && (
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  {servico.descricao}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Relação de Materiais */}
      <div className="mb-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Package className="text-amber-600" size={16} /> Relação de Materiais
          </h2>
          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${tipoMaterial === 'cliente' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
            {tipoMaterial === 'cliente' ? 'Por conta do Cliente' : 'Incluso no Orçamento'}
          </span>
        </div>
        <div className={`border rounded p-2.5 ${tipoMaterial === 'cliente' ? 'bg-amber-50/40 border-amber-200' : 'bg-green-50/40 border-green-200'}`}>
          <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-700">
            {materiais.map((mat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className={tipoMaterial === 'cliente' ? 'text-amber-600 font-bold' : 'text-green-600 font-bold'}>•</span>
                <span>{mat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="mb-6 bg-slate-900 text-white rounded-lg p-4 print:bg-slate-900 print:text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Valor Total do Orçamento</p>
            <h3 className="text-xl font-extrabold mt-0.5">
              {valorObra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h3>
          </div>
          <div className="border-l border-slate-700 pl-4 text-[11px] space-y-0.5 text-slate-200">
            <p className="flex items-center gap-1">
              <Clock size={12} className="text-blue-400" /> <strong>Prazo:</strong> {prazo}
            </p>
            <p className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-blue-400" /> <strong>Garantia:</strong> {garantia}
            </p>
            <p className="flex items-center gap-1">
              <Calendar size={12} className="text-blue-400" /> <strong>Validade:</strong> {validade}
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé / Assinatura */}
      <div className="pt-6 border-t border-slate-300 mt-6">
        <div className="flex justify-between items-center text-left">
          <div>
            <p className="text-xs font-bold text-slate-900">Solufix Reformas</p>
            <p className="text-[10px] text-slate-500">Maricá e Região • Soluções em Manutenção</p>
          </div>
          <div className="w-52 border-t border-slate-400 pt-1 text-center">
            <p className="text-[10px] text-slate-500">Assinatura do Responsável</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ImpressaoOrcamento;