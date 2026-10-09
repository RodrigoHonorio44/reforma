import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes Globais
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';
import ProtectedRoute from './ProtectedRoute'; // Importa a proteção de rota

// Páginas
import Home from '../pages/Home';
import About from '../pages/About';
import ServiceDetail from '../pages/ServiceDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Barra de Navegação Global */}
        <Navbar />

        {/* Corpo Dinâmico das Rotas */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/servicos/:id" element={<ServiceDetail />} />
            <Route path="/login" element={<Login />} />

            {/* Rota Protegida do Register (Apenas usuários logados podem acessar) */}
            <Route 
              path="/register" 
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              } 
            />

            {/* Rota Protegida do Admin / Painel */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        {/* Assistente Virtual Global / ChatWidget */}
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}