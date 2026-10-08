const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Utiliza a variável de ambiente ou uma chave de segurança robusta por predefinição
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

// Rota de Registo (Para criar o primeiro utilizador administrador ou novos utilizadores)
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validação de campos vazios
    if (!email || !password) {
      return res.status(400).json({ error: "Por favor, preencha o e-mail e a senha." });
    }

    // Validação do tamanho mínimo da senha
    if (password.length < 6) {
      return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres." });
    }
    
    // Normalizar o e-mail para minúsculas e limpar espaços
    const normalizedEmail = email.trim().toLowerCase();

    // Verificar se o utilizador já existe
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Este e-mail já está registado." });
    }

    // Encriptar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar na base de dados
    const newUser = new User({ email: normalizedEmail, password: hashedPassword });
    await newUser.save();

    console.log(`[REGISTO] Novo utilizador criado: ${normalizedEmail}`);
    res.status(201).json({ success: true, message: "Utilizador criado com sucesso!" });
  } catch (error) {
    console.error("[REGISTO ERROR]", error.message);
    res.status(500).json({ error: "Erro ao registar utilizador", details: error.message });
  }
});

// Rota de Login validada com MongoDB
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação de campos vazios
    if (!email || !password) {
      return res.status(400).json({ error: "Por favor, preencha o e-mail e a senha." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log(`[LOGIN TENTATIVA] A tentar autenticar o e-mail: ${normalizedEmail}`);

    // Procurar utilizador na base de dados
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log(`[LOGIN FALHA] Utilizador não encontrado na BD: ${normalizedEmail}`);
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    // Validar a senha encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`[LOGIN FALHA] Senha incorreta para o utilizador: ${normalizedEmail}`);
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    // Gerar token JWT válido por 24 horas utilizando a chave configurada
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    console.log(`[LOGIN SUCESSO] Utilizador autenticado com sucesso: ${normalizedEmail}`);
    res.json({ 
      success: true, 
      token, 
      message: "Login efetuado com sucesso!" 
    });

  } catch (error) {
    console.error("[LOGIN ERROR]", error.message);
    res.status(500).json({ error: "Erro interno no servidor", details: error.message });
  }
});