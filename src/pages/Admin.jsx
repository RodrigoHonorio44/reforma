import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import API_URL from '../services/api';
import { PlusCircle, Check, MessageSquareText, Briefcase, Trash2 } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('works');

  // Estados para Adicionar Trabalhos
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successWork, setSuccessWork] = useState(false);

  // Estados para Gestão de Regras do Chat
  const [rules, setRules] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [reply, setReply] = useState('');
  const [errorChat, setErrorChat] = useState('');
  const [successChat, setSuccessChat] = useState('');

  // Obter o token salvo no localStorage
  const getToken = () => localStorage.getItem('token');

  // Buscar regras do chat
  const fetchRules = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/chat-rules`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) setRules(data);
      else if (res.status === 401) {
        setErrorChat('Sessão expirada. Por favor, faça login novamente.');
      }
    } catch (err) {
      setErrorChat('Erro ao carregar regras do chat.');
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // Submeter novo Trabalho
  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    const workData = { title, category, description, imageUrl };
    const token = getToken();

    try {
      const response = await fetch(`${API_URL}/api/works`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(workData),
      });

      if (response.ok) {
        setSuccessWork(true);
        setTitle('');
        setCategory('');
        setDescription('');
        setImageUrl('');
        setTimeout(() => setSuccessWork(false), 4000);
      } else {
        alert('Erro ao guardar o trabalho. Verifique a autenticação.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao conectar com o servidor no Debian.');
    }
  };

  // Criar Regra de Chat
  const handleCreateRule = async (e) => {
    e.preventDefault();
    setErrorChat('');
    setSuccessChat('');
    const token = getToken();

    try {
      const res = await fetch(`${API_URL}/api/admin/chat-rules`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ keyword, reply })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessChat('Regra adicionada com sucesso!');
        setKeyword('');
        setReply('');
        fetchRules();
      } else {
        setErrorChat(data.error || 'Erro ao guardar regra.');
      }
    } catch (err) {
      setErrorChat('Erro de conexão com o servidor.');
    }
  };

  // Apagar Regra de Chat
  const handleDeleteRule = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar esta regra?')) return;
    const token = getToken();

    try {
      const res = await fetch(`${API_URL}/api/admin/chat-rules/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchRules();
      } else {
        alert('Erro ao apagar regra.');
      }
    } catch (err) {
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <main className="py-12 px-4 max-w-3xl mx-auto w-full space-y-6">
        
        {/* Abas de Navegação Interna */}
        <div className="flex space-x-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('works')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center space-x-2 transition ${
              activeTab === 'works'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4 text-yellow-400" />
            <span>Adicionar Trabalhos</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center space-x-2 transition ${
              activeTab === 'chat'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquareText className="w-4 h-4 text-yellow-400" />
            <span>Respostas do Chat</span>
          </button>
        </div>

        {/* ABA 1: ADICIONAR TRABALHOS */}
        {activeTab === 'works' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="space-y-2">
              <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-3.5 py-1 rounded-full text-sm font-semibold inline-block">
                Painel de Controle
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">Adicionar Novo Trabalho</h1>
              <p className="text-sm text-slate-600">Cadastre fotos e descrições para atualizar automaticamente a galeria do site.</p>
            </div>

            {successWork && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center space-x-2 text-sm font-medium">
                <Check className="w-5 h-5" />
                <span>Trabalho cadastrado e enviado para o servidor com sucesso!</span>
              </div>
            )}

            <form onSubmit={handleWorkSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Título do Serviço</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Ex: Instalação de Quadro Elétrico" 
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Categoria e Bairro</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="Ex: Elétrica • Itaipuaçu" 
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">URL da Imagem ou Foto</label>
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  placeholder="Cole o link da imagem hospedada" 
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição do Serviço</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Breve resumo do que foi feito..." 
                  rows="3"
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl shadow transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-yellow-400" />
                <span>Salvar no Servidor</span>
              </button>
            </form>
          </div>
        )}

        {/* ABA 2: REGRAS DO CHAT */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="space-y-2">
                <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-3.5 py-1 rounded-full text-sm font-semibold inline-block">
                  Automação
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900">Gerir Respostas Automáticas do Chat</h1>
                <p className="text-sm text-slate-600">Configure palavras-chave e as respetivas respostas do assistente virtual.</p>
              </div>

              {errorChat && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{errorChat}</div>}
              {successChat && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-sm">{successChat}</div>}

              <form onSubmit={handleCreateRule} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Palavra-chave (Ex: preço, horário, localização)</label>
                  <input 
                    type="text" 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                    required 
                    placeholder="ex: preço"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Resposta Automática do Bot</label>
                  <textarea 
                    value={reply} 
                    onChange={(e) => setReply(e.target.value)} 
                    required 
                    placeholder="Digite a resposta que o bot deve enviar..."
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows="3"
                  />
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl shadow transition flex items-center justify-center space-x-2 cursor-pointer">
                  <PlusCircle className="w-5 h-5 text-yellow-400" />
                  <span>Salvar Regra</span>
                </button>
              </form>
            </div>

            {/* Lista de Regras Cadastradas */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-4">
              <h2 className="font-semibold text-slate-800 text-lg">Regras Cadastradas</h2>
              {rules.length === 0 ? (
                <p className="text-sm text-slate-500">Nenhuma regra cadastrada ainda.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {rules.map((rule) => (
                    <div key={rule._id} className="py-4 flex justify-between items-center">
                      <div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-lg uppercase">
                          {rule.keyword}
                        </span>
                        <p className="text-sm text-slate-700 mt-1">{rule.reply}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteRule(rule._id)} 
                        className="text-red-500 hover:text-red-700 p-2 transition cursor-pointer"
                        title="Apagar regra"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}