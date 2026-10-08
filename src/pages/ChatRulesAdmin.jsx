import React, { useState, useEffect } from 'react';
import API_URL from '../services/api';
import { Trash2, PlusCircle, MessageSquareText } from 'lucide-react';

export default function ChatRulesAdmin() {
  const [rules, setRules] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchRules = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/chat-rules`);
      const data = await res.json();
      if (res.ok) setRules(data);
    } catch (err) {
      setError('Erro ao carregar regras do chat.');
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleCreateRule = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_URL}/api/admin/chat-rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, reply })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Regra adicionada com sucesso!');
        setKeyword('');
        setReply('');
        fetchRules();
      } else {
        setError(data.error || 'Erro ao guardar regra.');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor.');
    }
  };

  const handleDeleteRule = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar esta regra?')) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/chat-rules/${id}`, {
        method: 'DELETE'
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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquareText className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-slate-900">Gerir Respostas Automáticas do Chat</h1>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-sm">{success}</div>}

      <form onSubmit={handleCreateRule} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-semibold text-slate-800">Adicionar Nova Palavra-Chave</h2>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Palavra-chave (Ex: preço, horário, localização)</label>
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            required 
            placeholder="ex: preço"
            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Resposta Automática do Bot</label>
          <textarea 
            value={reply} 
            onChange={(e) => setReply(e.target.value)} 
            required 
            placeholder="Digite a resposta que o bot deve enviar..."
            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            rows="3"
          />
        </div>
        <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center space-x-2">
          <PlusCircle className="w-4 h-4" />
          <span>Salvar Regra</span>
        </button>
      </form>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-semibold text-slate-800">Regras Cadastradas</h2>
        {rules.length === 0 ? (
          <p className="text-sm text-slate-500">Nenhuma regra cadastrada ainda.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {rules.map((rule) => (
              <div key={rule._id} className="py-3 flex justify-between items-center">
                <div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-lg uppercase">
                    {rule.keyword}
                  </span>
                  <p className="text-sm text-slate-700 mt-1">{rule.reply}</p>
                </div>
                <button 
                  onClick={() => handleDeleteRule(rule._id)} 
                  className="text-red-500 hover:text-red-700 p-2"
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
  );
}