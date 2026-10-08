import React, { useState } from 'react';
import  API_URL  from '../services/api';
import { PlusCircle, Check } from 'lucide-react';

export default function AdminWorks() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successWork, setSuccessWork] = useState(false);

  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    const workData = { title, category, description, imageUrl };

    try {
      const response = await fetch(`${API_URL}/api/works`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workData),
      });

      if (response.ok) {
        setSuccessWork(true);
        setTitle('');
        setCategory('');
        setDescription('');
        setImageUrl('');
        setTimeout(() => setSuccessWork(false), 4000);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao conectar com o servidor no Debian.');
    }
  };

  return (
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
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl shadow transition flex items-center justify-center space-x-2"
        >
          <PlusCircle className="w-5 h-5 text-yellow-400" />
          <span>Salvar no Servidor</span>
        </button>
      </form>
    </div>
  );
}