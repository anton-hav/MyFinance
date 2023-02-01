# MyFinance

The project is a tracker of income and expenses.

Table of contents

- [About](#1-about)
- [How to configure](#2-how-to-configure)
- [How to run](#3-how-to-run)
- [Description of the project architecture](#4-description-of-the-project-architecture)
  - [Summary](#41-summary)
  - [Web API project](#42-web-api-project)
    - [Database scheme](#422-database-scheme)
  - [React application](#43-react-application)

## 1. About

This project implements an application that allows users to track their expenses and income. The application is based on using ASP.NET Core WebAPI for the back-end and React application for the front-end.

### 1.1. Main application features

- authorization system (more info [here](#111-authorization-system-features)),
- home page with welcome information,
- about page with tiny project information,
- global error handling,
- user dashboard with several sections:
  - summary section with analitical information (more info [here](#112-user-dashboard-summary-section))
  - records section (more info [here](#113-user-dashboard-records-section))
  - schedule section (more info [here](#114-user-dashboard-schedule-section))
  - categories section (more info [here](#115-user-dashboard-categories-section))

### 1.1.1. Authorization system features

- login page,
- registration page,
- logout option,
- authorization with JWT bearer,
- role based authentication,
- separation of site functions depending on whether the user is logged in,
- server-side token validation,
- a token with a limited lifetime and a system for reissuing a token using a refresh token (more info [here](#432-about-refresh-token)),
- authentication guard (more info [here](#435-about-authentication-guard)),

### 1.1.2. User dashboard summary section

This section provides analytical information in the form of clear diagrams.

The panel shows the following diagrams:

- number of income records that shows how much records created for each income category;
- number of expense records that shows how much records created for each expense category;
- amount of income records that shows total income for each category;
- amount of expense records which shows the total expenditure of money in each expenditure category;
- transaction chart which shows daily income and expenses for the selected period.

### 1.1.3. User dashboard records section

This section provides the following features:

- create a new transaction records;
- view and manage existing records;
- approval form for regular transactions;

### 1.1.4. User dashboard schedule section

This section provides the following features:

- create a new rule to generate regular transactions;
- view and manage existing rules for generating regular transactions.

### 1.1.5. User dashboard categories section

This section provides all the features user needs to manage the list of expense and income categories.

The user can:

- browse through lists of categories;
- add new categories;
- change the names of existing categories;
- delete unnecessary categories.

For user convenience, the table summarizes the number of transaction records for each category. When the user tries to delete a category that has transaction records, a modal window will appear asking the user to confirm the action.

### 1.2. Application preview

## 2. How to configure

### 2.1. Configure WebAPI application

### 2.1.1. Change database connection string

You should change connection string in `appsettings.json`

```json
"ConnectionStrings": {
    "Default": "Server=myServer;Database=myDataBase;User Id=myUsername;Password=myPassword;TrustServerCertificate=True"
  },
```

If you run application in dev environment, change connection string in `appsettings.Development.json`

```json
  "ConnectionStrings": {
    "Default": "Server=YOUR-SERVER-NAME;Database=MyFinance;Trusted_Connection=True;TrustServerCertificate=True"
  },
```

> **Note**
> The project uses the GUID type as the primary and therefore using other database providers requires additional changes and adjustments.

#### 2.1.2. Initiate database

Open the Package Manager Console in Visual Studio (View -> Other Windows -> Package Manager Console). Choose `MyFinance.DataBase` in Default project.

Use the following command to create or update the database schema.

```console
PM> update-database
```

> **Note**
> In this step, you will create a new database and fill it with the starting dataset. The starter set contains two records for Role table.

#### 2.1.3. Change path to documentation file for WebAPI

You need to specify the path to the file in which the documentation will be saved when building the solution. To do this, change the following code block in the MyFinance.WebAPI project settings:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    ...
    <DocumentationFile>C:\Users\user\source\repos\MyFinance\WebApi\MyFinance.WebApi\doc.xml</DocumentationFile>
  </PropertyGroup>
  ...
</Project>
```

> **Note**
> Make sure that the `doc.xml` file exists in the path you specify.

You must specify the same path in the `appsettings.json` file after that.

```json
"APIXmlDocumentation": "C:\\Users\\user\\source\\repos\\MyFinance\\WebApi\\MyFinance.WebApi\\doc.xml",
```

You need to set the path to the `doc.xml` file, which is in the root of the WebAPI solution. You can also create (or copy) the `doc.xml` file to any convenient location. In this case, specify the path to the new location of the doc file. The `doc.xml` file can be empty. Documentation is generated automatically each time the solution is built.

> **Note**
> This documentation file is an important part of the solution. It allows API users to understand what the system expects from them and what they can get from the server. The solution will generate an error when building without the correct path to the documentation file.

#### 2.1.4. About CORS policy

By default, WebAPI accepts requests from any client. If you need a stricter policy, you can change this in `Program.cs` (`MyFinance.WebAPI` project):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy(myCorsPolicyName, policyBuilder =>
    {
        policyBuilder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});
```

#### 2.1.5. Change the salt

Be sure to change the salt value before running the application. This will increase the ralibility of created passwords.

Enter any phrase or character set in `appsettings.json`:

```json
"Secrets": {
    "PasswordSalt": "WRITE YOUR SECRET PHRASE HERE"
  },
```

#### 2.1.6. Change Token configuration

The application uses Bearer JWT authorization.

You need to change the value of JWT Secret in `appsettings.json`:

```json
"Token": {
    "JwtSecret": "YOUR API SECRET",
```

In addition, you should change the expiration date of the generated tokens. It is 1 minute by default, but it is acceptable to use a value between 15 minutes and several hours.

To override the default value change `appsettings.json`:

```json
  "Token": {
    "ExpiryMinutes": 1
  }
```

You can leave the value unchanged. It won't affect the user experience, but it will reduce the load on the server and user security. The application uses RefreshToken to automatically generate new tokens to replace expired ones.

#### 2.1.7. Change default category list

The app creates an initial list of categories for each new user. You can change the number and name of categories in the starter kit.

To override the default names change `appsettings.json`:

```json
"DefaultIncomeCategories": [ "Salary", "Scholarship" ],
"DefaultExpendituresCategories": [ "Food", "Transport", "Mobile", "Internet", "Entertainment" ],
```

### 2.2. Configure React application

#### 2.2.1. Install NPM

You need to install Node.js to run your React application. For more information on installing Node.js, see the following [Link](https://nodejs.org/en/download/).

#### 2.2.2. Install Dependency Packages

You need to update all packages. Open a terminal, go to the folder with the React application. The relative path should look like this: `~\ElectronicsStore\ReactApp\electronics-store`.

Type the following command:

```powershell
npm update
```

#### 2.2.3. Change environment variables

You need to specify the WebAPI application address in the environment file. The environment file is accessible via the following relative path: `~\my-finance-app\src\environment\environment.js`.

Check and, if necessary, make changes to the following block of code:

```javascript
apiUrl: "https://localhost:7099/api/",
```

If you have changed the names of the API endpoints in the WebApi project you can adjust the required paths in the following code block:

```javascript
userEndpoint: "User",
tokenEndpoints: {
  createToken: "Token",
  refreshToken: "Token/Refresh",
  revokeToken: "Token/Revoke",
  validateToken: "Token/Validate",
},
categoriesEndpoint: "Categories",
recordsEndpoint: "Records",
recordsCountEndpoint: "RecordsCount",
plannedTransactionsEndpoint: "PlannedTransactions",
recordsAmountEndpoint: "RecordsAmount",
```

## 3. How to run

### 3.1. How to run WebAPI application

Run the project using the standard Visual Studio tools or the dotnet CLI.

### 3.2. How to run React application

Open the folder with the application in the terminal. The relative path should look like this: `~\MyFinance\ReactApp\my-finance-app`.

To start the application, enter the following command:

```powershell
npm run
```

> **Note**
> To stop the application press `CTRL+C` or `CMD+C` in the terminal window.

## 4. Description of the project architecture.

### 4.1. Summary

The application consists of two independent projects - the Web API project and the React project.

### 4.2. Web API project

The application is based on ASP.NET Core Web API and Microsoft SQL Server. Entity Framework Core is used to work with the database. The interaction between the application and the database is done using the Generic Repository and Unit of Work.

The application writes logs to a new file for each run. Logging is based on the Serilog library.

Hangfire is used to create, process and manage background tasks. More information about the scheduler can be found [here](#425-about-scheduler).

Key functions of the server part:

- generic repository,
- unit of work,
- API (may be redesigned in the future to be RESTful),
- Swagger,
- Hangfire Scheduler,
- API documentation (not all OpenAPI Specification requirements are met),
- custom Authorization Policy (more info [here](#426-about-custom-authorization-policy-in-WebAPI)),
- general exception handling based on type exception filters (more info [here](#427-about-exception-type-filters)).

Although the API specification does not follow the RESTful, it still strives to work with the notion of resources wherever it does not conflict with the logic and architecture of the solution.

#### 4.2.1. Database model

Database contains six entities:

- Role: keeps information about user roles
- User: keeps information about users (email, password hash, role id, full name)
- RefreshToken: keeps information about user refresh token (token, user id)
- Record: represents a transaction records (price, comment, date of creation, status, category id)
- PlannedTransaction: keeps information about scheduled transactions (category id, price, crone\*, job id\*\*)
- Category: keeps information about categories (name, type, user id)

\* - Crone property contains the crone expression as a string (more info [here](#428-about-crone-expression)).
\*\* - JobId property contains the unique identifier of the schedule job (more info about scheduler [here](#425-about-scheduler)).

#### 4.2.2. Database scheme

<details>
  <summary>Database structure</summary>

![image](https://drive.google.com/uc?export=view&id=1FzC2T82-jWcmjDUapp03471Qv-Ym2r9G)

</details>

The scheme is conventionally divided into two parts: the WebApi application tables and the scheduler service tables (more info [here](#425-about-scheduler)). If necessary, you can configure the scheduler to use its own separate database.

#### 4.2.3. Composition of the Web API solution

The solution contains the main project and several libraries:

- **MyFinance.WebAPI:** main API project
- **MyFinance.Business:** contains the basic business logic of the application not directly related to API (services implementations and etc.)
- **MyFinance.Core:** contains entities that do not depend on the implementation of other parts of the application (interfaces of services, data transfer objects, patch model, custom types, interfaces of search parameters and search models and etc.)
- **MyFinance.Data.Abstractions:** contains interfaces for database logic utils
- **MyFinance.Data.Repositories:** contains implementation of Data.Abstractions
- **MyFinance.DataBase:** contains entities and DBContext class

#### 4.2.4. Controllers

The **MyFinance.WebAPI** contains seven controllers:

- **UserController:** controller providing two endpoints (new user registration) and get user by id (allowed for admin).
- **TokenController:** controller that provides multiple endpoints for interacting with the access token:
  - _CreateJwtToken:_ endpoint for user login.
  - _RefreshToken:_ generate a new access token based on the refresh token.
  - _RevokeToken:_ revoke refresh token in the database. Use this endpoint every time the user logs out.
- **RecordsCountController:** controller provides access to the `RecordsCount` resource.
- **RecordsController:** controller provides access to the `Records` resource.
- **RecordsAmountController:** controller provides access to the `RecordsAmount` resource.
- **PlannedTransactionsController:** controller provides access to the `PlannedTransactions` resource.
- **CategoriesController:** controller provides access to the `Categories` resource.

#### 4.2.5. About scheduler

Hangfire is used as a scheduler (more information [Link](https://www.hangfire.io/)). Hangfire is deployed alongside the WebApi application. In this implementation, the WebAPI application is both a client and a server. The application database server is also used as storage for Hagfire (more info [here](#422-database-scheme)).

<details>
  <summary>Scheme of interaction with the scheduler</summary>

![image](https://drive.google.com/uc?export=view&id=1knS2-4tLEU-bt8ZRvfulRfCaHLYrk5b-)

</details>

#### 4.2.6. About custom authorization policy in the WebAPI part.

Role names are stored in the database and are configured when the application is deployed. This means that the application does not know the names of the roles before it starts. For this reason, using the standard Authorize attribute with the role name is a non-trivial task. To solve this problem, the application uses a policy-based authorization scheme. The application implements a custom AuthorizeAttribute and a set of utilities for granting access based on policies. This attribute can be assigned to individual actions or the whole controller:

Two implementations are currently in use:

```csharp
 [Permission("AdminOnly")]
```

```csharp
 [Permission("UserOnly")]
```

> **Note:**
> The string parameter can be replaced by Enum to improve the possibility of further expansion.

#### 4.2.7. About exception type filters

Centralized error handling is an important part of the application. Common approaches to error handling using middleware and action filters have a number of disadvantages in addition to the well-known advantages. For example, the main advantage of middleware is that all requests go through it. But this is also their disadvantage. They do not provide the flexibility that filters do. On the other hand action filters assigned to individual endpoints are also not without disadvantages. One of the main drawbacks is that they create an instance even when there were no errors. This is why the logical solution is to use exception filters.

The following types of filters are implemented in the application:

- **BadRequestExceptionFilter:** It handles `ArgumentException` or `ArgumentNullException` and send response with `400` status code.
- **ConflictOnCreationExceptionFilter:** It handles `ConflictWithExistingRecordException` (custom Exception type) and send response with `409` status code.
- **InternalServerErrorFilter:** Root Exception filter. It handles all unhandled exceptions and send response with `500` status code. Used as a controller attribute.
- **NotFoundExceptionFilter:** It handles `ArgumentException` and send response with `404` status code. Used as an action attribute. It should be set after `BadRequestExceptionFilter` and closer to the action if it is used together with `BadRequestExceptionFilter`.

#### 4.2.8. About Crone expression

Cron expressions are used to configure instances of the job trigger. In general, this is a string in a certain format that stores information about the frequency of the job. MYou can find more information about cron expressions at the following [Link](https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm) or [Link](https://crontab.guru/).

### 4.3. React application

The application uses "client side routing". The [React Router](https://reactrouter.com/en/main) library provides this feature.

[Material UI](https://mui.com/) is used as a component library.

The [Formik](https://formik.org/) library is used to work with forms. The [Yup](https://github.com/jquense/yup) library is used to validate user data in a form.

The [Ant Design Chart](https://charts.ant.design/en) library is used to generate charts with analitical data.

#### 4.3.1. Composition of React Application

The solution is a single package.

The package is divided into the following logical parts:

- **components:** files that contain the UI components logic
- **environments:** file that contains environment variables
- **guards:** files that contain guard components logic (more info [here](#435-about-authentication-guard))
- **imports:** files that contain third party libraries imports (more info [here](#436-about-third-party-imports))
- **interceptors:** files that contain interceptors (more info [here](#437-about-interceptors))
- **pages:** files containing UI components that represents pages. In addition to its main role as a container, it acts as a mediator for page components logic.
- **services:** files that contain business logic (such as api service, user service, etc)
- **storage:** files that contain store logic (such local storage, session storage, Redux store, etc)
- **types:** files that contain custom object types (like dto, custom errors, request models, etc.)
- **utils:** files that contain useful items (such as 'fake logger', formater, custom React hooks, enums, etc)

In addition, the **components** folder is divided into **topLevel** and **partLevel**. The top-level components resemble can be used in the page components and perform similar functions, but do not participate directly in the routing system. Part-level components are used as building blocks for top-level components. For convenience, each of these folders contains the `index.js` file as a single point for re-export.

#### 4.3.2. About Refresh Tokens

The user receives an access token from the server every time he logs in or registers. The access token expiration is limited. The app puts the access token into the request header every time the user performs an action requiring authorization. If the token has expired, the application sends a request to renew the access token. The application puts the refresh token value in the body of the request and waits for the API server to give the new access token. The API server compares the value of the received refresh token with the existing value of the token in the database and generates a new access token. The old refresh token value in the database is overwritten by the newly generated one. This makes it harder for attackers to take advantage of an intercepted access token.

#### 4.3.5. About authentication guard.

This tool is designed to handle page routing. It redirects to the login page if the user does not have sufficient rights to access it. This prevents the user from accessing the page from the URL. The guard is a wrapper over the React component and has a flexible parametrization system:

```javascript
{
  path: "/dashboard",
  element: (
    <RootGuard component=<CabinetPage /> authorised={["User"]} />
  ),
},
```

It is part of the defender pipeline within the root guard.

#### 4.3.6. About third-party libraries imports

Using an middle file to import third-party libraries provides a single point for managing and, if necessary, changing dependencies for the entire project.

#### 4.3.7. About interceptors

Interceptors are used to modify the HTTP requests by adding several functionalities. The application implements two custom interceptors: `jwt.interceptor` and `authError.interceptor`.

The `jwt.interceptor` adds a JWT bearer to the header of each request.

The `authError.interceptor` intercepts `401`, `403` responses from the server, makes a request to refresh the token and repeats the original request with a new access token.

The application attempted to implement interceptors for `fetch()`. The implementation is based on the ability to wrap a basic `fetch()`.
