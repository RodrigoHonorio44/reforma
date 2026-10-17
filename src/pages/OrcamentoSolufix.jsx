import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Printer, Plus, Trash2, Save, History, FolderOpen, RotateCcw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ImpressaoOrcamento from '../components/ImpressaoOrcamento';
import { api } from '../services/api';

export default function GeradorOrcamentoSolufix() {
  const printRef = useRef();

  // ID do orçamento atual (null para novo orçamento)
  const [orcamentoId, setOrcamentoId] = useState(null);

  // Estados dos campos do cliente e orçamento (Iniciados ZERADOS/VAZIOS)
  const [cliente, setCliente] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataOrcamento, setDataOrcamento] = useState(new Date().toLocaleDateString('pt-BR'));
  const [validade, setValidade] = useState('');
  const [valorObra, setValorObra] = useState('');
  const [tipoMaterial, setTipoMaterial] = useState('cliente');
  const [prazo, setPrazo] = useState('');
  const [garantia, setGarantia] = useState('');

  // Lista de serviços e materiais iniciados VAZIOS
  const [servicos, setServicos] = useState([]);
  const [materiais, setMateriais] = useState([]);

  // Histórico de orçamentos do banco
  const [historico, setHistorico] = useState([]);
  const [exibirHistorico, setExibirHistorico] = useState(false);

  // Inputs temporários
  const [novoServicoTitulo, setNovoServicoTitulo] = useState('');
  const [novoServicoDesc, setNovoServicoDesc] = useState('');
  const [novoMaterial, setNovoMaterial] = useState('');

  // Função para limpar todos os campos
  const zerarCampos = () => {
    setOrcamentoId(null);
    setCliente('');
    setEndereco('');
    setDataOrcamento(new Date().toLocaleDateString('pt-BR'));
    setValidade('');
    setValorObra('');
    setTipoMaterial('cliente');
    setPrazo('');
    setGarantia('');
    setServicos([]);
    setMateriais([]);
  };

  // Carregar histórico ao carregar a tela
  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const res = await api.get('/api/orcamentos');
      setHistorico(res.data);
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
    }
  };

  // Salvar ou atualizar no banco de dados
  const salvarNoBanco = async () => {
    if (!cliente.trim()) {
      toast.error('Por favor, informe pelo menos o nome do cliente!');
      return false;
    }

    const payload = {
      cliente,
      endereco,
      dataOrcamento,
      validade,
      valorObra: Number(valorObra) || 0,
      tipoMaterial,
      prazo,
      garantia,
      servicos,
      materiais
    };

    try {
      let res;
      if (orcamentoId) {
        res = await api.put(`/api/orcamentos/${orcamentoId}`, payload);
      } else {
        res = await api.post('/api/orcamentos', payload);
      }

      if (res.data && res.data._id) {
        toast.success('Orçamento salvo com sucesso!');
        await carregarHistorico();
        return true;
      } else {
        toast.error('Erro ao salvar o orçamento.');
        return false;
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Falha de comunicação com o servidor.');
      return false;
    }
  };

  // Ação de Imprimir/Salvar PDF (Salva, dispara janela de impressão e ZERA)
  const handlePrint = async () => {
    const salvou = await salvarNoBanco();
    if (salvou) {
      window.print();
      zerarCampos();
    }
  };

  // Ação do botão "Apenas Salvar" (Salva no banco e ZERA)
  const handleSalvarApenas = async () => {
    const salvou = await salvarNoBanco();
    if (salvou) {
      zerarCampos();
    }
  };

  // Carregar dados de um orçamento selecionado do histórico
  const selecionarOrcamento = (item) => {
    setOrcamentoId(item._id);
    setCliente(item.cliente || '');
    setEndereco(item.endereco || '');
    setDataOrcamento(item.dataOrcamento || '');
    setValidade(item.validade || '');
    setValorObra(item.valorObra || '');
    setTipoMaterial(item.tipoMaterial || 'cliente');
    setPrazo(item.prazo || '');
    setGarantia(item.garantia || '');
    setServicos(item.servicos || []);
    setMateriais(item.materiais || []);
    setExibirHistorico(false);
    toast.success('Orçamento carregado!');
  };

  const adicionarServico = () => {
    if (!novoServicoTitulo.trim()) {
      toast.error('Informe o título do serviço!');
      return;
    }
    setServicos([...servicos, { titulo: novoServicoTitulo, descricao: novoServicoDesc }]);
    setNovoServicoTitulo('');
    setNovoServicoDesc('');
  };

  const removerServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  const adicionarMaterial = () => {
    if (!novoMaterial.trim()) {
      toast.error('Informe a descrição do material!');
      return;
    }
    setMateriais([...materiais, novoMaterial]);
    setNovoMaterial('');
  };

  const removerMaterial = (index) => {
    setMateriais(materiais.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-800">
      {/* Componente Toaster para exibir os avisos flutuantes */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Estilos globais para Impressão */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #secao-impressao, #secao-impressao * {
            visibility: visible;
          }
          #secao-impressao {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 10mm !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}} />

      {/* PAINEL DE CONTROLE / FORMULÁRIO */}
      <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-xl shadow-md border border-slate-200 print:hidden">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="text-blue-600" /> Painel de Edição do Orçamento - Solufix
          </h2>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setExibirHistorico(!exibirHistorico)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors border border-slate-300"
            >
              <History size={15} /> Histórico de Orçamentos
            </button>

            <button
              type="button"
              onClick={zerarCampos}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors border border-emerald-300"
            >
              <RotateCcw size={15} /> Novo / Limpar Campos
            </button>
          </div>
        </div>

        {/* HISTÓRICO DE ORÇAMENTOS */}
        {exibirHistorico && (
          <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-300">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1">
              <FolderOpen size={14} /> Orçamentos Salvos no Banco
            </h3>
            {historico.length === 0 ? (
              <p className="text-xs text-slate-500">Nenhum orçamento encontrado.</p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {historico.map((item) => (
                  <div key={item._id} className="flex justify-between items-center bg-white p-2.5 rounded border border-slate-200 hover:border-blue-300 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.cliente}</p>
                      <p className="text-[11px] text-slate-500">
                        {item.dataOrcamento} • R$ {item.valorObra?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => selecionarOrcamento(item)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-xs font-medium"
                    >
                      Carregar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INPUTS COM PLACEHOLDERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Cliente:</label>
            <input
              type="text"
              placeholder="Ex: Nome do Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Endereço do Cliente:</label>
            <input
              type="text"
              placeholder="Ex: Rua Exemplo, 123 - Maricá - RJ"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Valor Total da Obra (R$):</label>
            <input
              type="number"
              placeholder="Ex: 4500.00"
              value={valorObra}
              onChange={(e) => setValorObra(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Validade do Orçamento:</label>
            <input
              type="text"
              placeholder="Ex: 15 dias"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Prazo de Execução:</label>
            <input
              type="text"
              placeholder="Ex: 3 a 4 dias úteis"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Garantia:</label>
            <input
              type="text"
              placeholder="Ex: 1 (um) ano nas áreas tratadas"
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
              type="button"
              onClick={adicionarServico}
              className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={16} /> Adicionar Serviço
            </button>
          </div>

          <div className="space-y-2 mt-3">
            {servicos.map((s, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                <span><strong>{idx + 1}. {s.titulo}</strong></span>
                <button type="button" onClick={() => removerServico(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
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
              type="button"
              onClick={adicionarMaterial}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> Adicionar Material
            </button>
          </div>

          <div className="space-y-1 mt-3 max-h-40 overflow-y-auto">
            {materiais.map((m, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                <span>{m}</span>
                <button type="button" onClick={() => removerMaterial(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AÇÕES DE SALVAR E IMPRIMIR */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleSalvarApenas}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-colors"
          >
            <Save size={18} />
            Apenas Salvar
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition-colors"
          >
            <Printer size={18} />
            Salvar e Imprimir / PDF
          </button>
        </div>
      </div>

      {/* ÁREA DE VISUALIZAÇÃO E IMPRESSÃO ISOLADA */}
      <div id="secao-impressao" className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <ImpressaoOrcamento
          ref={printRef}
          cliente={cliente || 'Nome do Cliente'}
          endereco={endereco || 'Endereço do Cliente'}
          dataOrcamento={dataOrcamento}
          validade={validade || '15 dias'}
          valorObra={Number(valorObra) || 0}
          tipoMaterial={tipoMaterial}
          prazo={prazo || 'A combinar'}
          garantia={garantia || '1 ano'}
          servicos={servicos}
          materiais={materiais}
        />
      </div>
    </div>
  );
}