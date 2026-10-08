import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const emailNormalized = email.trim().toLowerCase();

    if (!emailNormalized || !password) {
      setError('Por favor, preencha o e-mail e a senha.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // A API já possui o domínio como baseURL.
      // Por isso, o /api precisa estar nesta rota.
      const response = await api.post('/api/users/register', {
        email: emailNormalized,
        password,
      });

      setSuccess(
        response.data?.message ||
        'Utilizador criado com sucesso! Redirecionando...'
      );

      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      if (error.response) {
        setError(
          error.response.data?.error ||
          error.response.data?.message ||
          `Erro ao cadastrar utilizador. Código: ${error.response.status}`
        );
      } else if (error.request) {
        setError(
          'Não foi possível conectar ao servidor. Verifique se a API está online.'
        );
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full space-y-6">

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Criar Conta Admin
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Cadastre um novo utilizador administrador.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-3 rounded-xl text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              required
              disabled={loading}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Senha
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
              disabled={loading}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold py-3 rounded-xl shadow transition cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Registar Admin'}
          </button>

        </form>
      </div>
    </div>
  );
}