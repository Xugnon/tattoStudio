# <span style="font-size:larger;">Backend Configuration</span>

After following the steps in the project's main directory, navigate to the backend folder with the following command:

`cd backend`

Once inside, install all dependencies with the command:

`npm i`

After installing the necessary files, let's configure the DATABASE. Create a `.env` file within the backend folder based on the `.env.example` file and insert your PostgreSQL connection credentials. It should look like this:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/0fa81b1a-9db6-4552-aceb-63ee6cfc3d08)

After configuring the environment variables, run the `npx prisma migrate dev` command to perform migrations on the database. You should receive a message like this:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/c3ecb975-fe33-4ee4-ac3b-836aaf6c972f)

After running the migrations, execute the `npx prisma generate` command to update the Prisma Client:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/05b218f8-16db-4202-98c6-1e8b93407276)

<hr>

<h2>Running Backend</h2>

The backend is running on port 3333, so make sure you don't have another application running on the same port. Now that you have the environment configured, run it with the command:

`npm run dev`

You should see the following message:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/e96be6c1-e7f5-4329-9d3d-0cb775dc2a7e)

<hr>

<h2>Project Structure</h2>

The project structure:

1. 📦 prisma folder:

   - 📦 migrations folder: Migrations folder created by Prisma;
   - 📄 prisma-test-environment.js file: Configuration for the TEST Database, where the connection URL is the same with a different schema for each test;
   - 📄 schema.prisma file: Defines the Database Models;

2. 📦 src folder:

   - 📦 database:
     - 📄 prismaClient.js file: Prisma Client initialization file;
   - 📦 modules folder:
     - 📦 schedules folder:
       - 📦 repositories folder:
         - 📄 in-memory/InMemorySchedulesRepository.js file: In-memory implementation of the **schedules** repository with various functionalities for use in testing environments;
         - 📄 prismaSchedulesRepository.js file: Implementation of the repository using Prisma for **schedules** with different functionalities;
       - 📦 useCases folder:
         - 📦 cancelSchedule folder: Files responsible for scheduling cancellations, including controller, use case, and test files;
         - 📦 createSchedule folder: Files responsible for creating schedules, including controller, use case, and test files;
         - 📦 deleteSchedule folder: Files responsible for removing schedules, including controller, use case, and test files;
         - 📦 getAvailableSchedules folder: Files responsible for presenting available schedules to the user, including controller, use case, and test files;
         - 📦 insertUserSchedules folder: Files responsible for assigning a user to a schedule, including controller, use case, and test files;
     - 📦 services folder:
       - 📦 repositories folder:
         - 📄 in-memory/InMemoryServicesRepository.js file: In-memory implementation of the **services** repository with different functionalities for use in testing environments;
         - 📄 prismaServicesRepository.js file: Implementation of the repository using Prisma for **services** with different functionalities;
       - 📦 useCases folder:
         - 📦 cancelServices folder: Files responsible for service cancellations, including controller, use case, and test files;
         - 📦 createServices folder: Files responsible for creating services, including controller, use case, and test files;
         - 📦 deleteServices folder: Files responsible for removing services, including controller, use case, and test files;
         - 📦 getAvailableServices folder: Files responsible for presenting available services to the user, including controller, use case, and test files;
         - 📦 insertUserServices folder: Files responsible for assigning a user to a service, including controller, use case, and test files;
     - 📦 users folder:
       - 📦 repositories folder:
         - 📄 in-memory/InMemoryUsersRepository.js file: In-memory implementation of the **users** repository with different functionalities for use in testing environments;
         - 📄 prismaUsersRepository.js file: Implementation of the repository using Prisma for **users** with different functionalities;
       - 📦 useCases folder:
         - 📦 authenticateUser folder: Files responsible for user authentication, including controller, use case, and test files;
         - 📦 createUser folder: Files responsible for user creation, including controller, use case, and test files;
         - 📦 showUser folder: Files responsible for displaying user information, including controller, use case, and test files;
   - 📦 shared/infra/http:
     - 📦 middlewares:
       - 📄 ensureAdminUser.js file: Middleware that checks if the user is an admin;
       - 📄 ensureAuthUser.js file: Middleware that checks if the token is valid and belongs to a valid user;
     - 📦 routes folder:
       - 📄 index.js file: File where specific route modules are imported, these routes are configured in the 'routes' object and exported;
       - 📄 schedules.routes.js file: Defines routes related to **schedules**, using middlewares for user authentication and authorization. Route functionalities are implemented by different controllers;
       - 📄 services.routes.js file: Defines routes related to **services**, using middlewares for user authentication and authorization. Route functionalities are implemented by different controllers;
       - 📄 users.routes.js file: Defines routes related to **users**, using middlewares for user authentication and authorization. Route functionalities are implemented by different controllers;
     - 📄 app.js file: Initializes Express, configures a middleware to parse JSON objects from requests, adds the route module, and exports it for use in other files;
     - 📄 server.js file: Imports app.js and calls the `.listen()` function to start the server;
   - 📦 utils folder:
     - 📦 errors folder:
       - 📄 appError.js file: Basic structure for creating errors;
     - 📦 seed folder:
       - 📄 isAdminUser.js file: File for creating admin users, used in certain creation routes;
     - 📦 tests folder:
       - 📄 setup-jest-env.js file: Initialization of the `dotenv` module for use in the jest.config.js file;

3. 📄 .env.example file: Example file for the `.env` file;
4. 📄 .env.testing file: Defines the environment variables for the test database;
5. 📄 jest-e2e-config.js: Configuration file for end-to-end tests;
6. 📄 jest.config.js: Configuration file for tests;

<hr>

<h2>Routes</h2>

With the entire structure explained, let's look at the routes. Using an API client like Postman or Insomnia, you can test the routes:

1. Users routes:

   ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/3f9b4bcf-fd2a-4723-86c3-1aef5355f403)

   - Create User - POST

     `URL http://localhost:port/users/`

     JSON body example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/a3432428-d1f3-40b9-ba8a-3f146211cab5)

     Route for creating users;

   - Auth User - POST

     `URL http://localhost:port/users/auth/`

     JSON body example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/95ad6156-2c9c-473c-b46b-abe1a7db6b48)

     Route for user authentication;  
     **This route returns a JSON Web Token, which is required for authentication in other routes**

     Response example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/0fb6a75d-bef0-40a7-b913-41a822d2f364)

   - Get User - GET

     `URL http://localhost:port/users/`

     Bearer token example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/4ffba59e-09d6-4f2f-ae2c-885b784a364d)

     Route for getting user information, such as ID, Name, Email, and their assigned services and schedules;

2. Services routes:

   ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/24091811-00fd-475b-9cb3-e09bab7ebae1)

   - Create service - POST

     `URL http://localhost:port/services/`

     JSON body example:

     ![image](https://github.com/Xugnon/tatto_studio/assets/85856491/1bdffa6b-87f4-4ca4-9743-91a7a7d463dc)

     Route for creating services;  
     **This route requires authentication via BEARER TOKEN from an ADMIN user**

   - Get available - GET

     `URL http://localhost:port/services/`

     Route for retrieving available services;  
     **This route requires authentication via BEARER TOKEN**

   - Insert user - PUT

     `URL http://localhost:port/services/id_service`

     Route for assigning a user to a service;  
     **This route requires authentication via BEARER TOKEN**

   - Cancel - PUT

     `URL http://localhost:port/schedules/cancel/id_schedule`

     Route to unassign a schedule from a user in case of cancellation;<br>
     **This route requires authentication via a BEARER TOKEN.**

   - Delete - DELETE

     `URL http://localhost:port/schedules/id_schedule`

     Route to remove a schedule from the database;<br>
     **This route requires authentication via a BEARER TOKEN from an ADMIN user.**

<hr>

# <span style="font-size:larger;">Tests</span>

The tests are divided into two groups: unit tests and end-to-end tests. I decided to group the tests with the files I am testing, which made more sense to me.

## <span style="font-size:larger;">Unit Tests</span>

All the configuration for these tests is in the _jest.config.js_ file, so there's no need to configure anything. To run the tests, use the command `npm run test` (make sure you are inside the "backend" folder in the terminal). You should see something like this:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/cc233882-baee-4d3f-95b5-79c65713ce3b)

## <span style="font-size:larger;">End-to-End Tests (E2E)</span>

The configuration for these tests is in the _jest-e2e.config.js_ file, which copies everything from the _jest.config.js_ file and overrides some settings. Jest then runs the _prisma-test-environment.js_ file within the Prisma folder and looks for files with the _\*\*.e2e-spec.js_ suffix to execute them. For each file, a random schema is created within the database, tests are executed, and then the schema is deleted. This ensures a clean database for each test. To run the tests, use the command `npm run test:e2e` (again, make sure you are inside the "backend" folder in the terminal). You should see something like this:

![image](https://github.com/Xugnon/tatto_studio/assets/85856491/d54663bf-4fd2-40d2-8499-ea1dff18c8ea)
