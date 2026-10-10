import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Verifica se o token existe no sessionStorage ou no localStorage
  const isAuthenticated = !!sessionStorage.getItem('token') || !!localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}