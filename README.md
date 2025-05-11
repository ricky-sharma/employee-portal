[![Employee Dashboard UI Design by Pentaclay on Dribbble](https://tse1.mm.bing.net/th?id=OIP.7pDkavsFt9gMHUkSETXloQHaFj\&pid=Api)](https://dribbble.com/shots/18867447-Employee-Dashboard-UI-Design)

Certainly! Here's an updated README for the [employee-portal](https://github.com/ricky-sharma/employee-portal) project:

---

# Employee Portal

A comprehensive web application designed to streamline employee management within organizations. This portal provides functionalities such as employee onboarding, profile management, attendance tracking, and more.([GitHub][1])

---

## 🛠️ Technologies Used

* **Frontend**: React, Bootstrap
* **Backend**: ASP.NET Core, Web API
* **Database**: SQL Server
* **ORM**: Entity Framework Core([GitHub][2], [GitHub][3])

---

## 🚀 Features

* **Employee Onboarding**: Facilitate the process of adding new employees to the system.
* **Profile Management**: Allow employees to view and update their personal information.
* **Role-Based Access Control**: Ensure secure and appropriate access to various sections of the portal.([GitHub][4])

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

   * Navigate to the backend directory:([GitHub][5])

     ```bash
     cd employee-portal/EmployeePortal
     ```

   * Restore the NuGet packages:

     ```bash
     dotnet restore
     ```

   * Apply the database migrations:([GitHub][2])

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

   * Install the necessary npm packages:([Pinterest][6])

     ```bash
     npm install
     ```

   * Start the development server:

     ```bash
     npm start
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




![image](https://user-images.githubusercontent.com/61348196/177049581-3194542e-bf8e-409b-8d98-4adea0fef60f.png)
