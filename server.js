const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR');
  console.log(`[${data} ${hora}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'sobre.html'));
});

app.get('/seu_problema', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'seu_problema.html'));
});

app.post('/resposta_problema', (req, res) => {
  const { nome, nota1, nota2 } = req.body;

  const n1 = parseFloat(nota1);
  const n2 = parseFloat(nota2);

  if (!nome || isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erro nos Dados - Desenvolvimento Web III</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <main style="max-width: 600px; margin: 3rem auto; padding: 0 1rem;">
          <div class="card">
            <h1 style="color: var(--danger);">Dados Inválidos</h1>
            <p>Por favor, preencha o nome e informe notas válidas entre 0 e 10.</p>
            <a href="/seu_problema" class="btn">Voltar ao Formulário</a>
          </div>
        </main>
      </body>
      </html>
    `);
  }

  const media = (n1 + n2) / 2;
  const situacao = media > 6 ? 'Aprovado' : 'Reprovado';
  const badgeClass = situacao === 'Aprovado' ? 'badge-aprovado' : 'badge-reprovado';

  const templatePath = path.join(__dirname, 'views', 'resposta_problema.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  html = html
    .replace('{{nome}}', nome.trim())
    .replace('{{nota1}}', n1.toFixed(1))
    .replace('{{nota2}}', n2.toFixed(1))
    .replace('{{media}}', media.toFixed(1))
    .replace('{{situacao}}', situacao)
    .replace('{{badgeClass}}', badgeClass);

  res.send(html);
});

app.get('/resposta_problema', (req, res) => {
  res.redirect('/seu_problema');
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('<h1>Erro 500 - Erro interno do servidor</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
