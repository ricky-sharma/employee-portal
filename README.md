---

[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![GitHub forks](https://img.shields.io/github/forks/ricky-sharma/employee-portal?style=social)](https://github.com/ricky-sharma/employee-portal/network/members)
[![GitHub stars](https://img.shields.io/github/stars/ricky-sharma/employee-portal?style=social)](https://github.com/ricky-sharma/employee-portal/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/ricky-sharma/employee-portal)](https://github.com/ricky-sharma/employee-portal/issues)
[![GitHub downloads](https://img.shields.io/github/downloads/ricky-sharma/employee-portal/total)](https://github.com/ricky-sharma/employee-portal/releases)

# Employee Portal

A comprehensive web application designed to streamline employee management within organizations. This portal provides functionalities such as employee onboarding, profile management and more.

---

## 📸 Preview

> ![image](https://user-images.githubusercontent.com/61348196/177049581-3194542e-bf8e-409b-8d98-4adea0fef60f.png)

---

## 🛠️ Technologies Used

* **Frontend**: React, Bootstrap
* **Backend**: ASP.NET Core, Web API
* **Database**: SQL Server
* **ORM**: Entity Framework Core

---

## 🚀 Features

* **Employee Onboarding**: Facilitate the process of adding new employees to the system.
* **Profile Management**: Allow employees to view and update their personal information.
* **Role-Based Access Control**: Ensure secure and appropriate access to various sections of the portal.


---


## 📦 Installation

### Prerequisites

* .NET 5.0 or later
* Node.js (for frontend development)
* SQL Server

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ricky-sharma/employee-portal.git
   ```



2. **Set up the backend**:

   * Navigate to the backend directory:

     ```bash
     cd employee-portal/EmployeePortal
     ```

   * Restore the NuGet packages:

     ```bash
     dotnet restore
     ```

   * Apply the database migrations:

     ```bash
     dotnet ef database update
     ```

   * Run the backend application:

     ```bash
     dotnet run
     ```

3. **Set up the frontend**:

   * Navigate to the frontend directory:

     ```bash
     cd ClientApp
     ```

   * Install the necessary npm packages:

     ```bash
     npm install
     ```

   * Start the development server:

     ```bash
     npm start
     ```

---

## 📁 Project Structure

```
employee-portal/
├── ClientApp/                # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Route-based views (e.g. Dashboard, Profile)
│   │   ├── App.js            # Root React component
│   │   ├── index.js          # React entry point
│   │   └── styles/           # Optional CSS or Tailwind setup
│   └── package.json          # React dependencies and scripts
│
├── EmployeePortal/           # ASP.NET Core backend
│   ├── Controllers/          # API Controllers (e.g. EmployeeController.cs)
│   ├── Models/               # Entity/Data models
│   ├── Data/                 # DB context and migrations
│   ├── Services/             # Business logic/services layer
│   ├── Program.cs            # Entry point
│   ├── Startup.cs            # Middleware and services config
│   └── appsettings.json      # Configuration (connection strings, etc.)
│
├── EmployeePortal.sln        # Solution file
├── README.md
└── .gitignore
```

---


## 🔐 License

This project is licensed under the BSD-3-Clause License.

---



### Employee-portal
Employee Portal is build using React Native and bootstrap as front end technologies.
Dotnet core and WebApi is used as backend technologies along with entity framework. SQL server is used for database.

#### EmployeePortal Project
This is the main website project in the solution. The project is configured to be hosted in IIS. There is a folder "ClientApp" which contains React JS files. The project is build using dotnet core and React JS. The project uses Bootstrap for front end design.

#### EmployeeService Project
This project is the backend WebAPI in C# and dotnet core. This API uses Entity framework to communicate with SQL server database.
The WebAPI uses Microsoft Owin Security OAuth to Authorize users to access the Restful APIs. 

#### SQLDataEntity Project
This project is the Entity framework project which fetches data from SQL Server.

#### Packages Folder 
This folder contain all supporting packages required to run the solution.



Please note: The main website project is configured for IIS hosting, so please install [Microsoft URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite).

---

