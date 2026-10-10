import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import API_URL from '../services/api';
import { PlusCircle, Check, MessageSquareText, Briefcase, Trash2, Upload } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('works');

  // Estados para Adicionar/Atualizar Trabalhos por Card
  const [selectedCardIndex, setSelectedCardIndex] = useState('0');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [successWork, setSuccessWork] = useState(false);
  const [compressing, setCompressing] = useState(false);

  // Lista local de trabalhos para carregar nos inputs ao mudar de card
  const defaultWorks = [
    { title: "Fabricação e Instalação de Pia de Mármore", category: "Mármores e Granitos • Maricá", image: "", description: "Confecção de peça sob medida, corte de cuba e instalação completa com acabamento profissional e impermeabilização." },
    { title: "Organização de Quadro Elétrico", category: "Elétrica • Itaipuaçu", image: "", description: "Substituição de disjuntores antigos e identificação completa dos circuitos para maior segurança residencial." },
    { title: "Pintura de Fachada e Muro", category: "Pintura • Centro", image: "", description: "Aplicação de selador, impermeabilização e pintura externa com acabamento de alto padrão." },
    { title: "Instalação de Acessórios e Suportes", category: "Pequenos Reparos • Inoã", image: "", description: "Fixação segura de painel de TV, cortinas, prateleiras e ajustes de portas." }
  ];

  // Carregar os dados atuais do card selecionado para os inputs do formulário
  useEffect(() => {
    const savedWorks = JSON.parse(localStorage.getItem('solufix_works')) || defaultWorks;
    const currentWork = savedWorks[parseInt(selectedCardIndex)] || defaultWorks[parseInt(selectedCardIndex)];
    
    setTitle(currentWork.title || '');
    setCategory(currentWork.category || '');
    setDescription(currentWork.description || '');
    setImageUrl(currentWork.image || '');
    setImagePreview(currentWork.image || '');
  }, [selectedCardIndex]);

  // Estados para Gestão de Regras do Chat
  const [rules, setRules] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [reply, setReply] = useState('');
  const [errorChat, setErrorChat] = useState('');
  const [successChat, setSuccessChat] = useState('');

  const getToken = () => localStorage.getItem('token');

  const fetchRules = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/chat-rules`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setRules(data);
    } catch (err) {
      setErrorChat('Erro ao carregar regras do chat.');
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCompressing(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setImageUrl(compressedDataUrl);
        setImagePreview(compressedDataUrl);
        setCompressing(false);
      };
    };
  };

  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    const workData = { 
      cardIndex: parseInt(selectedCardIndex), 
      title, 
      category, 
      description, 
      imageUrl 
    };
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
        setTimeout(() => setSuccessWork(false), 4000);
      } else {
        throw new Error('Erro na API');
      }
    } catch (error) {
      const existingWorks = JSON.parse(localStorage.getItem('solufix_works')) || defaultWorks;
      const index = parseInt(selectedCardIndex);
      
      existingWorks[index] = {
        title: title || existingWorks[index].title,
        category: category || existingWorks[index].category,
        image: imageUrl !== undefined ? imageUrl : existingWorks[index].image,
        description: description || existingWorks[index].description
      };
      
      localStorage.setItem('solufix_works', JSON.stringify(existingWorks));
      setSuccessWork(true);
      setTimeout(() => setSuccessWork(false), 4000);
    }
  };

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

  const handleDeleteRule = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar esta regra?')) return;
    const token = getToken();

    try {
      const res = await fetch(`${API_URL}/api/admin/chat-rules/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchRules();
    } catch (err) {
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <main className="py-12 px-4 max-w-3xl mx-auto w-full space-y-6">
        
        <div className="flex space-x-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('works')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center space-x-2 transition ${
              activeTab === 'works' ? 'bg-slate-900 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4 text-yellow-400" />
            <span>Gerir Trabalhos por Card</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center space-x-2 transition ${
              activeTab === 'chat' ? 'bg-slate-900 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquareText className="w-4 h-4 text-yellow-400" />
            <span>Respostas do Chat</span>
          </button>
        </div>

        {activeTab === 'works' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="space-y-2">
              <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-3.5 py-1 rounded-full text-sm font-semibold inline-block">
                Painel de Controle
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">Atualizar Trabalhos Realizados</h1>
              <p className="text-sm text-slate-600">Selecione o card, faça upload da foto (ou cole o link) e atualize os dizeres.</p>
            </div>

            {successWork && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center space-x-2 text-sm font-medium">
                <Check className="w-5 h-5" />
                <span>Card atualizado e salvo com sucesso!</span>
              </div>
            )}

            <form onSubmit={handleWorkSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Selecione o Card</label>
                <select 
                  value={selectedCardIndex}
                  onChange={(e) => setSelectedCardIndex(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                >
                  <option value="0">Card 1: Mármores e Granitos (Pias, etc.)</option>
                  <option value="1">Card 2: Instalações e Reparos Elétricos</option>
                  <option value="2">Card 3: Pintura Residencial e Comercial</option>
                  <option value="3">Card 4: Pequenos Reparos e Consertos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Título do Serviço</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Ex: Instalação de Pia de Mármore" 
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Categoria e Bairro</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="Ex: Mármores e Granitos • Maricá" 
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Foto do Serviço (Upload ou Link)</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center space-x-2 transition">
                    <Upload className="w-4 h-4 text-yellow-600" />
                    <span>{compressing ? 'A comprimir foto...' : 'Escolher do Computador/Celular'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>

                  <span className="text-xs text-slate-400 font-medium">OU</span>

                  <input 
                    type="text" 
                    value={imageUrl.startsWith('data:') ? '' : imageUrl} 
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }} 
                    placeholder="Cole o link direto da imagem" 
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {imagePreview && (
                  <div className="mt-3 relative w-32 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={imagePreview} alt="Pré-visualização" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição do Serviço</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Breve resumo do que foi feito..." 
                  rows="3"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl shadow transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-yellow-400" />
                <span>Salvar Alterações no Card</span>
              </button>
            </form>
          </div>
        )}

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