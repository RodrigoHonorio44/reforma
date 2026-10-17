import React, { useState, useRef } from 'react';
import { Wrench, CheckCircle, Package, DollarSign, Calendar, ShieldCheck, Printer, Plus, Trash2, MapPin, User, Clock } from 'lucide-react';

export default function GeradorOrcamentoSolufix() {
  const printRef = useRef();

  // Estados dos campos do cliente e orçamento
  const [cliente, setCliente] = useState('Nome do Cliente');
  const [endereco, setEndereco] = useState('Rua Exemplo, 123 - Maricá - RJ');
  const [dataOrcamento, setDataOrcamento] = useState('16 de Outubro de 2026');
  const [validade, setValidade] = useState('15 dias');
  const [valorObra, setValorObra] = useState(4500.00);
  const [tipoMaterial, setTipoMaterial] = useState('cliente'); // 'cliente' ou 'incluso'
  const [prazo, setPrazo] = useState('3 a 4 dias úteis');
  const [garantia, setGarantia] = useState('1 (um) ano nas áreas tratadas');

  // Estado para lista de serviços
  const [servicos, setServicos] = useState([
    {
      titulo: 'Recuperação, Caimento e Impermeabilização da Calha de Cimento',
      descricao: 'Limpeza, acerto de queda/caimento com argamassa e Sika-1, aplicação de primer e manta asfáltica.'
    },
    {
      titulo: 'Vedação do Encontro do Telhado de Amianto com a Mureta',
      descricao: 'Fechamento de frestas com massa, aplicação de primer e colagem de manta asfáltica aluminizada.'
    },
    {
      titulo: 'Casa da Caixa d\'Água (Batente e Porta de Alumínio)',
      descricao: 'Confecção de batente de alvenaria, chumbamento e instalação completa da porta de alumínio.'
    }
  ]);

  // Estado para a lista de materiais
  const [materiais, setMateriais] = useState([
    '0,5 m³ (Meio metro) — Areia Lavada Média',
    '2 sacos — Cimento CP II ou CP III (50 kg) (Mauá, CSN ou Holcim)',
    '1 galão — Sika-1 Aditivo Impermeabilizante Cimento Concreto (3,6 L)',
    '2 latas — Primer Asfáltico para Manta (3,6 L)',
    '3 unidades — Brocha Retangular Pequena para Pintura',
    '1 rolo — Fita Asfáltica Autoadesiva Aluminizada 50 cm x 10 m',
    '3 rolos — Fita Asfáltica Autoadesiva Aluminizada 30 cm x 10 m',
    '2 rolos — Fita Asfáltica Autoadesiva Aluminizada 40 cm x 10 m',
    '2 unidades — Maçarico Portátil a Gás para Manta Asfáltica'
  ]);

  // Inputs temporários
  const [novoServicoTitulo, setNovoServicoTitulo] = useState('');
  const [novoServicoDesc, setNovoServicoDesc] = useState('');
  const [novoMaterial, setNovoMaterial] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const adicionarServico = () => {
    if (!novoServicoTitulo.trim()) return;
    setServicos([...servicos, { titulo: novoServicoTitulo, descricao: novoServicoDesc }]);
    setNovoServicoTitulo('');
    setNovoServicoDesc('');
  };

  const removerServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  const adicionarMaterial = () => {
    if (!novoMaterial.trim()) return;
    setMateriais([...materiais, novoMaterial]);
    setNovoMaterial('');
  };

  const removerMaterial = (index) => {
    setMateriais(materiais.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-800">
      
      {/* PAINEL DE CONTROLE / FORMULÁRIO (Some na hora da impressão) */}
      <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-xl shadow-md border border-slate-200 print:hidden">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Wrench className="text-blue-600" /> Painel de Edição do Orçamento - Solufix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Cliente:</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Endereço do Cliente:</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Valor Total da Obra (R$):</label>
            <input
              type="number"
              value={valorObra}
              onChange={(e) => setValorObra(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Validade do Orçamento:</label>
            <input
              type="text"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Prazo de Execução:</label>
            <input
              type="text"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Garantia:</label>
            <input
              type="text"
              value={garantia}
              onChange={(e) => setGarantia(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Responsabilidade dos Materiais */}
        <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <label className="block text-xs font-semibold text-slate-700 mb-2">Responsabilidade dos Materiais:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="tipoMaterial"
                value="cliente"
                checked={tipoMaterial === 'cliente'}
                onChange={() => setTipoMaterial('cliente')}
                className="text-blue-600"
              />
              Material por conta do Cliente
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="tipoMaterial"
                value="incluso"
                checked={tipoMaterial === 'incluso'}
                onChange={() => setTipoMaterial('incluso')}
                className="text-blue-600"
              />
              Material Incluso no Orçamento
            </label>
          </div>
        </div>

        {/* Adicionar Serviço */}
        <div className="border-t border-slate-200 pt-4 mb-4">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Adicionar Descrição de Serviço</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            <input
              type="text"
              placeholder="Título do Serviço"
              value={novoServicoTitulo}
              onChange={(e) => setNovoServicoTitulo(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 text-sm outline-none"
            />
            <input
              type="text"
              placeholder="Descrição do que será feito"
              value={novoServicoDesc}
              onChange={(e) => setNovoServicoDesc(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 text-sm outline-none"
            />
            <button
              onClick={adicionarServico}
              className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={16} /> Adicionar Serviço
            </button>
          </div>
        </div>

        {/* Adicionar Material */}
        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Adicionar Material à Lista</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: 1 rolo de fita asfáltica..."
              value={novoMaterial}
              onChange={(e) => setNovoMaterial(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg p-2 text-sm outline-none"
            />
            <button
              onClick={adicionarMaterial}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> Adicionar Material
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition-colors"
          >
            <Printer size={18} />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>


      {/* DOCUMENTO FINAL DO ORÇAMENTO (Visualização e Impressão) */}
      <div
        ref={printRef}
        className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-md border border-slate-200 print:shadow-none print:border-none print:p-0"
      >
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="text-blue-600" /> Solufix Reformas
            </h1>
            <p className="text-sm text-slate-500 mt-1">Maricá - RJ • Serviços e Manutenção Especializada</p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <span className="inline-block bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-blue-200 mb-1">
              Orçamento de Serviços
            </span>
            <p className="text-xs text-slate-500">Data: {dataOrcamento}</p>
            <p className="text-xs text-slate-500">Validade: {validade}</p>
          </div>
        </div>

        {/* Informações do Cliente */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 space-y-1">
          <p className="text-sm text-slate-700 flex items-center gap-2">
            <User size={16} className="text-slate-400" />
            <strong className="text-slate-900">Cliente:</strong> {cliente}
          </p>
          <p className="text-sm text-slate-700 flex items-center gap-2">
            <MapPin size={16} className="text-slate-400" />
            <strong className="text-slate-900">Endereço:</strong> {endereco}
          </p>
        </div>

        {/* Descrição dos Serviços */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            <CheckCircle className="text-blue-600" size={20} /> Descrição dos Serviços
          </h2>

          <div className="space-y-4">
            {servicos.map((servico, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-start group">
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                    {index + 1}. {servico.titulo}
                  </h3>
                  {servico.descricao && (
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      {servico.descricao}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removerServico(index)}
                  className="text-red-500 hover:text-red-700 p-1 print:hidden opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remover serviço"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Materiais */}
        <div className="mb-8">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package className="text-amber-600" size={20} /> Relação de Materiais
            </h2>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${tipoMaterial === 'cliente' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
              {tipoMaterial === 'cliente' ? 'Por conta do Cliente' : 'Incluso no Orçamento'}
            </span>
          </div>

          <div className={`border rounded-lg p-4 ${tipoMaterial === 'cliente' ? 'bg-amber-50/50 border-amber-200' : 'bg-green-50/50 border-green-200'}`}>
            <ul className="space-y-2 text-xs md:text-sm text-slate-700">
              {materiais.map((mat, idx) => (
                <li key={idx} className="flex justify-between items-center group">
                  <div className="flex items-start gap-2">
                    <span className={tipoMaterial === 'cliente' ? 'text-amber-600 font-bold' : 'text-green-600 font-bold'}>•</span>
                    <span>{mat}</span>
                  </div>
                  <button
                    onClick={() => removerMaterial(idx)}
                    className="text-red-500 hover:text-red-700 p-1 print:hidden opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remover material"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="mb-8 bg-blue-900 text-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Valor Total do Orçamento</p>
              <h3 className="text-3xl font-extrabold mt-1">
                {valorObra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h3>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-blue-700/60 pt-4 md:pt-0 md:pl-6 text-xs space-y-1 text-blue-100">
              <p className="flex items-center gap-1.5">
                <Clock size={14} className="text-blue-300" /> <strong>Prazo:</strong> {prazo}
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-blue-300" /> <strong>Garantia:</strong> {garantia}
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-300" /> <strong>Validade:</strong> {validade}
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé / Assinatura */}
        <div className="pt-8 border-t border-slate-200 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <p className="text-sm font-bold text-slate-900">Solufix Reformas</p>
              <p className="text-xs text-slate-500">Maricá e Região • Soluções em Manutenção</p>
            </div>
            <div className="w-full md:w-64 border-t border-slate-400 pt-2 text-center">
              <p className="text-xs text-slate-500">Assinatura do Responsável</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}