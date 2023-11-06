<h1>Backend config</h1>
Após fazer os passos inseridos na pasta principal do projeto, entre na pasta back-end com o seguinte comando:

`cd backend`

Ao entrar, instale todas as dependencias com o comando:

`npm i`

Feito a instalação dos arquivos necessaríos, vamos a configuração do DATABASE. Crie um arquivo `.env` dentro da pasta backend, baseado no arquivo `.env.example` e insira suas credenciais de conexão PostgreSQL. Deve ficar assim:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/0fa81b1a-9db6-4552-aceb-63ee6cfc3d08)

Após configurar as variaveis de ambiente, execute o comando `npx prisma migrate dev` para realizar as migrações no banco de dados. Você deve receber uma mensagem assim:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/c3ecb975-fe33-4ee4-ac3b-836aaf6c972f)

Ao execute as migrações, execute o comando `npx prisma generate` para atualizar o Prisma Client:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/05b218f8-16db-4202-98c6-1e8b93407276)

<hr>

<h2>Running backend</h2>
O back-end está rodando na porta 3333, portanto certifique-se de não possuir outra aplicação rodando nessa mesma porta.
Agora que você possui o ambiente configurado, execute-o com o comando:

`npm run dev`

Você deve ver a seguinte mensagem:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/e96be6c1-e7f5-4329-9d3d-0cb775dc2a7e)

<hr>

<h2>Project structure</h2>
A estrutura do projeto:

1. 📦 prisma folder:<br>

   - 📦 migrations folder: Pasta de migrações criada pelo prisma;<br>
   - 📄 prisma-test-environment.js file: Aqui é feito a configuração para o Banco de Dados de TESTE, onde a URL de conexão é a mesma, com um shema diferente a cada teste;<br>
   - 📄 schema.prisma file: Aqui é o feito os Model's do Bando de Dados;<br>

2. 📦 src folder:<br>

   - 📦 database:<br>
     - 📄 prismaClient.js file: Arquivo de inicialização do prismaClient;<br>
   - 📦 modules folder:<br>
     - 📦 schedules folder:<br>
       - 📦 repositories folder:<br>
         - 📄 in-memory/InMemorySchedulesRepository.js file: Implementação em memória do repositório de **agendamentos** com diferentes funcionalidades, para utilização em ambiente de testes;<br>
         - 📄 prismaSchedulesRepository.js file: Implementação do repositório, utilizando o Prisma, de **agendamentos** com diferentes funcionalidades;<br>
       - 📦 useCases folder:<br>
         - 📦 cancelSchedule folder: Arquivos responsáveis pelo cancelamento dos agendamentos, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 createSchedule folder: Arquivos responsáveis pela criação dos agendamentos, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 deleteSchedule folder: Arquivos responsáveis pela remoção dos agendamentos, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 getAvailableSchedules foder: Arquivos responsáveis por apresentar ao usuário os agendamentos disponiveis, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 insertUserSchedules folder: Arquivos responsáveis por atribuir um usuário à um agendamento, contendo controlador, caso de uso e arquivos de testes;<br>
     - 📦 services folder:<br>
       - 📦 repositories folder:<br>
         - 📄 in-memory/InMemoryServicesRepository.js file: Implementação em memória do repositório de **serviços** com diferentes funcionalidades, para utilização em ambiente de testes;<br>
         - 📄 prismaServicesRepository.js file: Implementação do repositório, utilizando o Prisma, de **serviços** com diferentes funcionalidades;<br>
       - 📦 useCases folder:<br>
         - 📦 cancelServices folder: Arquivos responsáveis pelo cancelamento dos serviços, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 createServices folder: Arquivos responsáveis pela criação dos serviços, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 deleteServices folder: Arquivos responsáveis pela remoção dos serviços, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 getAvailableServices foder: Arquivos responsáveis por apresentar ao usuário os serviços disponiveis, contendo controlador, caso de uso e arquivos de testes;<br>
         - 📦 insertUserServices folder: Arquivos responsáveis por atribuir um usuário à um serviço, contendo controlador, caso de uso e arquivos de testes;<br>
     - 📦 users folder:<br>
       - 📦 repositories folder:<br>
         - 📄 in-memory/InMemoryUsersRepository.js file: Implementação em memória do repositório de **usuários** com diferentes funcionalidades, para utilização em ambiente de testes;<br>
         - 📄 prismaUsersRepository.js file: Implementação do repositório, utilizando o Prisma, de **usuários** com diferentes funcionalidades;<br>
       - 📦 useCases folder:<br>
         - 📦 authenticateUser folder: Arquivos responsáveis pela autenticação do usuário, contendo controlador, caso de uso e testes;<br>
         - 📦 createUser folder: Arquivos responsáveis pela criação do usuário, contendo controlador, caso de uso e testes;<br>
         - 📦 showUser folder: Arquivos responsáveis por mostrar o usuário, contendo controlador, caso de uso e testes;<br>
   - 📦 shared/infra/http:<br>
     - 📦 middlewares:<br>
       - 📄 ensureAdminUser.js file: Middleware que verifica se o usuário é admin;<br>
       - 📄 ensureAuthUser.js file: Middleware que verifica se o token é valido e se pertence a um usuário válido;<br>
     - 📦 routes folder:<br>
       - 📄 index.js file: Arquivo onde é importado módulos de rotas específicos, configurado essas rotas no objeto 'routes' e exportado;<br>
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
       - 📄 setup-jest-env.js file: Inicialização do módulo `dotenv` para ser usado no arquivo jest.config.js;<br>

3. 📄 .env.example file: Arquvio de exemplo de como ser o arquivo `.env`;<br>
4. 📄 .env.testing file: Arquivo que define as variaveis de ambiente do Banco de Dados de teste;<br>
5. 📄 jest-e2e-config.js: Arquivo de configuração dos teste de **ponta a ponta**;<br>
6. 📄 jest.config.js: Arquivo de configuração dos testes;<br>

<hr>

<h2>Routes</h2>
Com toda a estrutura explicada, vamos às rotas. Com um API Client como o Postman ou Insomnia, você pode testar as rotas:

1. Users routes:

   ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/3f9b4bcf-fd2a-4723-86c3-1aef5355f403)

   - Create User - POST

     `URL http://localhost:port/users/`

     JSON body example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/a3432428-d1f3-40b9-ba8a-3f146211cab5)

     Rota para criação de usuários;

   - Auth User - POST

     `URL http://localhost:port/users/auth/`

     JSON body example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/95ad6156-2c9c-473c-b46b-abe1a7db6b48)

     Rota para autenticação do usuário;<br>
     **Essa rota retorna um JSON Web Token, necessário para a autenticação em outras rotas**

     Response example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/0fb6a75d-bef0-40a7-b913-41a822d2f364)

   - Get User - GET

     `URL http://localhost:port/users/`

     Bearer token example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/4ffba59e-09d6-4f2f-ae2c-885b784a364d)

     Rota para obter informações do usuário, como ID, Nome, Email, seus serviços e agendamentos já atribuidos;

2. Services routes:

   ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/24091811-00fd-475b-9cb3-e09bab7ebae1)

   - Create service - POST

     `URL http://localhost:port/services/`

     JSON body example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/1bdffa6b-87f4-4ca4-9743-91a7a7d463dc)

     Rota para criação de serviços;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN, de um usuário ADMIN**

   - Get available - GET

     `URL http://localhost:port/services/`

     Rota para obter os serviços disponiveis;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN**

   - Insert user - PUT

     `URL http://localhost:port/services/id_service`

     Rota para atribuir um usuário à um serviço;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN**

   - Cancel - PUT

     `URL http://localhost:port/services/cancel/id_service`

     Rota para desatribuir um serviço de um usuário, em caso de cancelamento;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN**

   - Delete - DELETE

     `URL http://localhost:port/services/id_service`

     Rota para remover um serviço do banco de dados;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN, de um usuário ADMIN**

3. Schedules rotes:

   ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/72692c2d-8e5f-4163-ae6f-e719725dcc45)

   - Create schedule - POST

     `URL http://localhost:port/schedules/`

     JSON body example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/3d10b2a6-b8d0-4dc8-98dd-0bfe0f7859d3)

     Rota para criação de agendamentos;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN, de um usuário ADMIN**

   - Get available - GET

     `URL http://localhost:port/schedules/`

     Rota para obter os agendamentos disponiveis;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN**

   - Insert user - PUT

     `URL http://localhost:port/schedules/id_schedule`

     Rota para atribuir um usuário à um agendamento;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN**

   - Cancel - PUT

     `URL http://localhost:port/schedules/cancel/id_schedule`

     Rota para desatribuir um agendamento de um usuário, em caso de cancelamento;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN**

   - Delete - DELETE

     `URL http://localhost:port/schedules/id_schedule`

     Rota para remover um agendamento do banco de dados;<br>
     **Essa rota necessita de uma autentificação via BEARER TOKEN, de um usuário ADMIN**

<hr>

<h2>Test's</h2>
Os teste foram dividos em dois grupo: testes unitários e teste de ponta a ponta. Decidi agrupar os testes junto aos arquivos em que estou testando, me fez mais sentido.

<h3>Unit test's</h3>

Toda a configuração destes testes, estão no arquivo _jest.config.js_, portanto não é necessário configurar nada.<br>
Para executar os testes, rode o comando `npm run test` (certifique de estar dentro da pasta backend no terminal).<br>
Você deve ver algo assim:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/cc233882-baee-4d3f-95b5-79c65713ce3b)

<h3>E2E test's</h3>

A configuração destes teste se encontra dentro do arquvio _jest-e2e.config.js_, que copia tudo que está dentro de _jest.config.js_ e sobrescreve algumas informações. O jest então executa o arquivo _prisma-test-environment.js_, dentro da pasta Prisma e procura pelos arquivos com o final _\*\*.e2e-spec.js_ e então executa-os. A cada arquivo, um schema aleatório é criado dentro do banco de dados, executado os testes e então o schema é deletado. Assim tendo um banco de dados zerado a cada teste.<br>
Para rodar os testes, execute o comando `npm run test:e2e` (novamente, certifique-se de estar dentro da pasta backend no terminal).<br>
Você deve ver algo assim:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/d54663bf-4fd2-40d2-8499-ea1dff18c8ea)
