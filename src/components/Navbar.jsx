import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X, MessageCircle, Lock, Settings, UserPlus } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const whatsappNumber = "5521999999999"; 
  const whatsappMessage = encodeURIComponent("Olá! Vim pelo site e gostaria de um orçamento.");

  const handleScrollTo = (sectionId) => {
    setMenuOpen(false);
    
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -100;
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
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" onClick={handleHomeClick} className="flex items-center space-x-2">
          <Home className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold tracking-tight">Maricá <span className="text-yellow-400">Reparos</span></span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex space-x-6 items-center">
          <button onClick={handleHomeClick} className="hover:text-yellow-400 transition text-left cursor-pointer bg-transparent border-none text-white font-normal text-base">Início</button>
          <button onClick={() => handleScrollTo('servicos')} className="hover:text-yellow-400 transition text-left cursor-pointer bg-transparent border-none text-white font-normal text-base">Serviços</button>
          <Link to="/sobre" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400 transition">Sobre</Link>
          <button onClick={() => handleScrollTo('regiao')} className="hover:text-yellow-400 transition text-left cursor-pointer bg-transparent border-none text-white font-normal text-base">Atendimento</button>
          
          {/* Atalho para o Painel Admin */}
          <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition flex items-center space-x-1 text-sm font-semibold bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20">
            <Settings className="w-4 h-4" />
            <span>Painel</span>
          </Link>

          <Link to="/login" className="text-slate-400 hover:text-yellow-400 transition flex items-center space-x-1 text-sm">
            <Lock className="w-4 h-4" />
            <span>Login</span>
          </Link>

          <Link to="/register" className="text-slate-400 hover:text-yellow-400 transition flex items-center space-x-1 text-sm">
            <UserPlus className="w-4 h-4" />
            <span>Registar</span>
          </Link>

          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition shadow"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-3">
          <button onClick={handleHomeClick} className="block w-full text-left hover:text-yellow-400 py-1 bg-transparent border-none text-white">Início</button>
          <button onClick={() => handleScrollTo('servicos')} className="block w-full text-left hover:text-yellow-400 py-1 bg-transparent border-none text-white">Serviços</button>
          <Link to="/sobre" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-400">Sobre</Link>
          <button onClick={() => handleScrollTo('regiao')} className="block w-full text-left hover:text-yellow-400 py-1 bg-transparent border-none text-white">Atendimento</button>
          
          <div className="pt-2 border-t border-slate-700 space-y-2">
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 font-semibold py-1">
              <Settings className="w-4 h-4" />
              <span>Painel Administrativo</span>
            </Link>

            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 text-slate-400 hover:text-yellow-400 py-1">
              <Lock className="w-4 h-4" />
              <span>Login Admin</span>
            </Link>

            <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 text-slate-400 hover:text-yellow-400 py-1">
              <UserPlus className="w-4 h-4" />
              <span>Registar Admin</span>
            </Link>
          </div>

          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 text-white w-full py-2 rounded-lg flex items-center justify-center space-x-2 font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}