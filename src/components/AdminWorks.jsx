import React, { useState } from 'react';
import API_URL from '../services/api';
import { PlusCircle, Check } from 'lucide-react';

export default function AdminWorks() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('marmore');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successWork, setSuccessWork] = useState(false);

  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    const workData = { 
      title, 
      category, 
      location: location || 'Maricá', 
      description, 
      imageUrl 
    };

    try {
      const response = await fetch(`${API_URL}/api/works`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        credentials: 'include',
        body: JSON.stringify(workData),
      });

      if (response.ok) {
        setSuccessWork(true);
        setTitle('');
        setCategory('marmore');
        setLocation('');
        setDescription('');
        setImageUrl('');
        setTimeout(() => setSuccessWork(false), 4000);
      } else {
        alert('Erro ao salvar no servidor.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
      <div className="space-y-2">
        <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-3.5 py-1 rounded-full text-sm font-semibold inline-block">
          Painel de Controle
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900">Adicionar Novo Trabalho</h1>
        <p className="text-sm text-slate-600">Cadastre fotos e descrições organizadas por tipo de serviço.</p>
      </div>

      {successWork && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center space-x-2 text-sm font-medium">
          <Check className="w-5 h-5" />
          <span>Trabalho cadastrado com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleWorkSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Selecione a Categoria / Tema</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
          >
            <option value="marmore">Serviços de Mármore e Granito</option>
            <option value="eletrica">Instalações e Reparos Elétricos</option>
            <option value="pintura">Pintura Residencial e Comercial</option>
            <option value="reparos">Pequenos Reparos e Consertos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Título do Serviço</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Ex: Instalação de Pia de Mármore" 
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Bairro / Localidade</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Ex: Itaipuaçu, Centro, Inoã" 
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">URL da Foto</label>
          <input 
            type="text" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="Cole a URL da foto do serviço" 
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição do Serviço</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Resumo do trabalho realizado..." 
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
  );
}