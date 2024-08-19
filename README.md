
## Scripts Disponíveis

Os seguintes scripts estão disponíveis no `package.json`:

- `dev`: Executa o servidor em modo de desenvolvimento usando TSX.
- `build`: Compila o projeto TypeScript usando TSUP.
- `db:migrate`: Executa as migrações do Prisma.
- `db:studio`: Abre o Prisma Studio para gerenciar o banco de dados.

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_secret_key
```

Substitua `USER`, `PASSWORD`, `HOST`, `PORT` e `DATABASE` com as credenciais do seu banco de dados.

## Rodando o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/mikael326/projeto_backend.git
   cd projeto_backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute as migrações do banco de dados:

   ```bash
   npm run db:migrate
   ```

4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

   ## importante
   todas as rotas estão com endereço que foi pedido no projeto, rotas protegidas exigem bearer token que é gerado quando usuário faz o login, o banco de dados do projeto é o postgresql. 




