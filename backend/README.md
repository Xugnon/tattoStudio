<h1>Backend config</h1>
Após fazer os passos inseridos na pasta principal do projeto, entre na pasta back-end com o seguinte comando:

```cd backend```

Após entrar, instale todas as dependencias com o comando:

```npm i```

1 - Run 'npm install' to download all the dependencies listed on the PACKAGE.JSON
2 - Make sure to insert the configs of yor database on .env file
3 - Run 'npx prisma migrate dev' to run the migrations
4 - Run 'npx prisma generate' to update the Prisma Client
5 - Insert your data on the 'isAdminUser.js' to create a Admin User and the run the command

<hr>

<h2>Running backend</h2>
O back-end está rodando na porta `3333`, portanto certifique-se de não possuir outra aplicação rodando nessa mesma porta.
Agora que você possui o ambiente configurado, execute-o com o comando:

```npm run dev```

Você deve ver a seguinte mensagem: 

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/e96be6c1-e7f5-4329-9d3d-0cb775dc2a7e)

<hr>

<h2>project structure</h2>


Agora a estrutura do projeto:

1 - 📦 prisma folder:<br>
📄
