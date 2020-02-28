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



Please note: The main website project is configured for IIS hosting, so please install [Microsoft URL Rewrite Module](https://www.microsoft.com/en-us/download/details.aspx?id=47337).
