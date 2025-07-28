# Usecase to Single Agent

## Sistema de Chatbot e Assistente Virtual

Este é um sistema baseado na arquitetura **Single Agent** que implementa dois casos de uso comerciais:
- **Chatbot de atendimento ao cliente para e-commerce**, integrado com ferramentas de CRM.
- **Assistente virtual para agendamento de consultas médicas em clínicas privadas**.

## Tecnologias Utilizadas

### Frontend
- **React 19.1.0**: Biblioteca para construção da interface.
- **Socket.IO Client 4.8.1**: Comunicação em tempo real com o backend.
- **TailwindCSS 4.1.11**: Estilização responsiva.
- **Vite**: Ferramenta de build e desenvolvimento.

### Backend
- **FastAPI**: Framework para APIs assíncronas.
- **Uvicorn**: Servidor ASGI para rodar o FastAPI.
- **python-socketio[asgi_client] 5.8.0**: Suporte a Socket.IO no backend.
- **python-engineio 4.8.0**: Engine para Socket.IO.
- **SQLAlchemy**: ORM para integração com banco de dados (ex.: PostgreSQL).

## Estrutura do Projeto
```
project/
├── frontend/           # Código do frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/            # Código do backend
│   ├── main.py         # Arquivo principal do FastAPI
│   ├── requirements.txt
│   └── db/             # Configurações do banco de dados
└── README.md
```

## Instalação

### Frontend
1. Navegue até o diretório `frontend/`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o desenvolvimento:
   ```bash
   npm run dev
   ```

### Backend
1. Navegue até o diretório `backend/`.
2. Crie um ambiente virtual e ative:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Inicie o servidor:
   ```bash
   uvicorn main:app --reload
   ```

## Configuração
- Configure as credenciais do CRM e do banco de dados em variáveis de ambiente (ex.: `.env`).
- Adicione a URL do backend no frontend (ex.: em `src/config.js`).

## Uso
- Acesse o frontend em `http://localhost:5173` (padrão do Vite).
- O chatbot responde a consultas de e-commerce e o assistente gerencia agendamentos médicos.
- Troca de messagem em tempo real via Socket.IO para resolver pendencias com Agentes LLM utilizando langgraph.