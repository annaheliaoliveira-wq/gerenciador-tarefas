# Gerenciador de Tarefas - Desenvolvimento Web III

Projeto web Gerenciador de Tarefas desenvolvido com Node.js e Express para demonstrar o funcionamento de frameworks no lado do servidor (Unidade 1 - Tarefa 1).

## Tema Escolhido: Acadêmico
- **Enunciado:** Calcule a média de um estudante. Se for maior que 6 é aprovado, senão reprovado.
- **Fórmula:** `(nota1 + nota2) / 2`
- **Casos de Teste:**
  - Estudante A: Notas 7.0 e 8.0 -> Média 7.5 (Aprovado)
  - Estudante B: Notas 5.0 e 6.0 -> Média 5.5 (Reprovado)

## Rotas Implementadas
- `GET /` : Página inicial com a apresentação da aplicação e do tema.
- `GET /sobre` : Informações sobre o projeto, objetivos e tecnologias.
- `GET /seu_problema` : Formulário HTML para entrada dos dados (nome e duas notas).
- `POST /resposta_problema` : Processamento das notas, cálculo da média e exibição do resultado.
- `GET /resposta_problema` : Redirecionamento amigável para o formulário.

## Middlewares Implementados
- **Middleware de Log:** Registra data, hora e rota de cada solicitação no console.
- **Middleware de Erro 404:** Intercepta rotas não encontradas e exibe uma página 404 personalizada.
- **Middleware de Erro 500:** Trata exceções e falhas internas do servidor.

## Como Executar o Projeto

1. Instalar as dependências:
```bash
npm install
```

2. Iniciar o servidor:
```bash
npm start
```

3. Acessar a aplicação no navegador:
```
http://localhost:3000
```
