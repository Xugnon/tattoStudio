<h1>Backend config</h1>
Após fazer os passos inseridos na pasta principal do projeto, entre na pasta back-end com o seguinte comando:

`cd backend`

Ao entrar, instale todas as dependencias com o comando:

`npm i`

Feito a instalação dos arquivos necessaríos, vamos a configuração do DATABASE. Crie um arquivo `.env` dentro da pasta backend, baseado no arquivo `.env.example` e insira suas credenciais de conexão PostgreSQL. Deve ficar assim:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/0fa81b1a-9db6-4552-aceb-63ee6cfc3d08)

3 - Run 'npx prisma migrate dev' to run the migrations
4 - Run 'npx prisma generate' to update the Prisma Client

<hr>

<h2>Running backend</h2>
O back-end está rodando na porta 3333, portanto certifique-se de não possuir outra aplicação rodando nessa mesma porta.
Agora que você possui o ambiente configurado, execute-o com o comando:

`npm run dev`

Você deve ver a seguinte mensagem:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/e96be6c1-e7f5-4329-9d3d-0cb775dc2a7e)

<hr>

<h2>Project structure</h2>
Agora a estrutura do projeto:

1. 📦 prisma folder:<br>

   - 📦 migrations folder: Pasta de migrações criada pelo prisma;<br>
   - 📄 prisma-test-environment.js file: Aqui é feito a configuração para o Banco de Dados de TESTE, onde a URL de conexão é a mesma, com um shema diferente a cada teste;<br>
   - 📄 schema.prisma file: Aqui é o feito os Model's do Bando de Dados;<br>

2. 📦 src folder:<br>
   - 📦 database:<br>
     - 📄 prismaClient.js file: Arquivo de inicialização do prismaClient;<br>
   - 📦 modules folder:<br>
     - 📦 schedules folder:<br>
     - 📦 services folder:<br>
     - 📦 users folder:<br>
   - 📦 shared/infra/http:<br>
     - 📦 middlewares:<br>
       - 📄 ensureAdminUser.js file: Middleware que verifica se o usuário é admin;<br>
       - 📄 ensureAuthUser.js file: Middleware que verifica se o token é valido e se pertence a um usuário válido;<br>
     - 📦 routes folder:<br>
       - 📄 index.js file: Arquivo onde é importado módulos de rotas específicos, configurado essas rotas no objeto 'routes' e exportado<br>
       - 📄 schedules.routes.js file: Define as rotas relacionadas aos **agendamentos**, utilizando middlewares para autenticação e autorização do usuário. As funcionalidades das rotas são feitas pelos diferentes controladores;<br>
       - 📄 services.routes.js file: Define as rotas relacionadas aos **serviços**, utilizando middlewares para autenticação e autorização do usuário. As funcionalidades das rotas são feitas pelos diferentes controladores;<br>
       - 📄 users.routes.js file: Define as rotas relacionadas aos **usuários**, utilizando middlewares para autenticação e autorização do usuário. As funcionalidades das rotas são feitas pelos diferentes controladores;<br>
     - 📄 app.js file: Aqui é inicializado o Express, configurado um middleware para receber objetos JSON das solitações, adicionado o módulo de rotas e exportado para ser usado em outros arquivos;<br>
     - 📄 server.js file: Importado o app.js e a chamada da função `.listen()` para inicializar o servidor;<br>
   - 📦 utils folder:<br>
     - 📦 errors folder:<br>
       - 📄 appError.js file: Estrutura básica para criação de erros;<br>
     - 📦 seed folder:<br>
       - 📄 isAdminUser.js file: Arquivo de criação de usuário admin, usado em determinadas rotas de criação;<br>
     - 📦 tests folder:<br>
       - 📄 setup-jest-env.js file: Inicialização do módulo 'dotenv' para ser usado no arquivo jest.config.js;<br>
