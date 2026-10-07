// Exemplo de rota de autenticação na API do Debian
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Defina aqui as credenciais do seu painel
  if (email === "admin@maricareparos.com" && password === "sua_senha_segura") {
    res.json({ success: true, token: "token_temporario_autorizado" });
  } else {
    res.status(401).json({ error: "E-mail ou senha incorretos" });
  }
});