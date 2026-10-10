import React from 'react';

const WhatsappButton = ({ 
  phone = '5521975966330', // Coloque seu número com DDD aqui (apenas números)
  message = 'Olá! Gostaria de solicitar um orçamento.',
  text = 'Pedir Orçamento no WhatsApp',
  className = ''
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ${className}`}
    >
      <svg 
        className="w-5 h-5 fill-current" 
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.097-4.238l.38.22c1.472.873 3.162 1.334 4.887 1.335 5.234 0 9.493-4.259 9.495-9.493.001-2.536-.987-4.92-2.784-6.718-1.797-1.797-4.181-2.785-6.719-2.785-5.234 0-9.493 4.259-9.495 9.493-.001 1.787.48 3.532 1.391 5.053l.242.4-.92 3.36 3.432-.901z"/>
      </svg>
      {text}
    </a>
  );
};

export default WhatsappButton;