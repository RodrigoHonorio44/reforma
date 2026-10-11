import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Lock, Settings, UserPlus, LogOut } from 'lucide-react';
import WhatsappButton from './WatsappButton'; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Reavalia a autenticação toda vez que a rota muda ou a página recarrega
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    setMenuOpen(false);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleScrollTo = (sectionId) => {
    setMenuOpen(false);
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToSection, 150);
    } else {
      scrollToSection();
    }
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex justify-between items-center">
        
        {/* LOGO DA MARCA */}
        <Link to="/" onClick={handleHomeClick} className="flex items-center space-x-2.5 sm:space-x-3 group">
          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center overflow-hidden shadow-md flex-shrink-0 group-hover:scale-105 transition">
            <img 
              src="/solufix.jpg" 
              alt="Solufix Reformas Logo" 
              className="h-full w-full object-cover scale-110" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-black tracking-tight leading-none text-white">
              Solufix <span className="text-yellow-400">Reformas</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
              Maricá e Região
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <button 
            onClick={handleHomeClick} 
            className="text-slate-200 hover:text-yellow-400 font-medium text-sm transition bg-transparent border-none cursor-pointer"
          >
            Início
          </button>
          <button 
            onClick={() => handleScrollTo('servicos')} 
            className="text-slate-200 hover:text-yellow-400 font-medium text-sm transition bg-transparent border-none cursor-pointer"
          >
            Serviços
          </button>
          <button 
            onClick={() => handleScrollTo('galeria')} 
            className="text-slate-200 hover:text-yellow-400 font-medium text-sm transition bg-transparent border-none cursor-pointer"
          >
            Galeria
          </button>
          <button 
            onClick={() => handleScrollTo('regiao')} 
            className="text-slate-200 hover:text-yellow-400 font-medium text-sm transition bg-transparent border-none cursor-pointer"
          >
            Atendimento
          </button>
          
          {/* PAINEL / LOGIN ADMIN */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3 border-l border-slate-700 pl-4">
              <Link 
                to="/admin" 
                className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-1.5 text-xs font-bold bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20 transition"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Painel</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-red-400 hover:text-red-300 flex items-center space-x-1 text-xs bg-transparent border-none cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-slate-400 hover:text-yellow-400 flex items-center space-x-1 text-xs border-l border-slate-800 pl-4"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          )}

          {/* BOTÃO WHATSAPP DESKTOP */}
          <WhatsappButton 
            text="Solicitar Orçamento" 
            className="!px-4 !py-2 !text-xs !font-bold shadow-md rounded-xl" 
          />
        </nav>

        {/* BOTÃO DE MENU HAMBÚRGUER MOBILE */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="lg:hidden text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl border border-slate-700 focus:outline-none transition cursor-pointer"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X className="w-6 h-6 text-yellow-400" /> : <Menu className="w-6 h-6 text-yellow-400" />}
        </button>
      </div>

      {/* MENU MOBILE DESLIZANTE */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-900/98 border-t border-slate-800 px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button 
              onClick={handleHomeClick} 
              className="block w-full text-left text-slate-200 hover:text-yellow-400 py-2.5 font-semibold text-base border-b border-slate-800/60 bg-transparent cursor-pointer"
            >
              Início
            </button>
            <button 
              onClick={() => handleScrollTo('servicos')} 
              className="block w-full text-left text-slate-200 hover:text-yellow-400 py-2.5 font-semibold text-base border-b border-slate-800/60 bg-transparent cursor-pointer"
            >
              Nossos Serviços
            </button>
            <button 
              onClick={() => handleScrollTo('galeria')} 
              className="block w-full text-left text-slate-200 hover:text-yellow-400 py-2.5 font-semibold text-base border-b border-slate-800/60 bg-transparent cursor-pointer"
            >
              Trabalhos Realizados
            </button>
            <button 
              onClick={() => handleScrollTo('regiao')} 
              className="block w-full text-left text-slate-200 hover:text-yellow-400 py-2.5 font-semibold text-base border-b border-slate-800/60 bg-transparent cursor-pointer"
            >
              Área de Atuação
            </button>
          </div>

          {/* SESSÃO ADMIN MOBILE */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/admin" 
                  onClick={() => setMenuOpen(false)} 
                  className="flex items-center space-x-2 text-yellow-400 py-2 font-bold text-sm bg-yellow-500/10 px-3 rounded-xl border border-yellow-500/20"
                >
                  <Settings className="w-4 h-4" />
                  <span>Painel Administrativo</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 text-red-400 py-2 text-sm bg-transparent border-none w-full text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Encerrar Sessão</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setMenuOpen(false)} 
                className="flex items-center space-x-2 text-slate-400 hover:text-yellow-400 py-2 text-sm"
              >
                <Lock className="w-4 h-4" />
                <span>Área Restrita (Login)</span>
              </Link>
            )}
          </div>

          {/* BOTÃO WHATSAPP DESTACADO MOBILE */}
          <div className="pt-2">
            <WhatsappButton 
              text="Falar no WhatsApp Agora" 
              className="w-full !py-3.5 !text-sm !font-extrabold shadow-lg rounded-xl flex justify-center" 
            />
          </div>
        </div>
      )}
    </header>
  );
}