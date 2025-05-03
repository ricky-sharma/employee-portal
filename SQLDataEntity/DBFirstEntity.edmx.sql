
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Generated from EDMX file: \employee-portal\SQLDataEntity\DBFirstEntity.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'EmployeeDB')
  BEGIN
    CREATE DATABASE [EmployeeDB]
  END
GO
USE [EmployeeDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_AspNetUserInfo_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserInfo] DROP CONSTRAINT [FK_AspNetUserInfo_AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetRole]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRole];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_tblAddress_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblAddress] DROP CONSTRAINT [FK_tblAddress_AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[FK_tblAddress_AspNetUsers1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblAddress] DROP CONSTRAINT [FK_tblAddress_AspNetUsers1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblDepartments_tblAddress_DepartmentAddress]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblDepartments] DROP CONSTRAINT [FK_tblDepartments_tblAddress_DepartmentAddress];
GO
IF OBJECT_ID(N'[dbo].[FK_tblDepartments_tblAddress_PostalAddress]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblDepartments] DROP CONSTRAINT [FK_tblDepartments_tblAddress_PostalAddress];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployeeImageMap_tblEmployees]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployeeImageMap] DROP CONSTRAINT [FK_tblEmployeeImageMap_tblEmployees];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployeeImageMap_tblImages]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployeeImageMap] DROP CONSTRAINT [FK_tblEmployeeImageMap_tblImages];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployees_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployees] DROP CONSTRAINT [FK_tblEmployees_AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployees_AspNetUsers1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployees] DROP CONSTRAINT [FK_tblEmployees_AspNetUsers1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployees_tblAddress]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployees] DROP CONSTRAINT [FK_tblEmployees_tblAddress];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployees_tblAddress1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployees] DROP CONSTRAINT [FK_tblEmployees_tblAddress1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployees_tblDepartments]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployees] DROP CONSTRAINT [FK_tblEmployees_tblDepartments];
GO
IF OBJECT_ID(N'[dbo].[FK_tblEmployees_tblEmployees]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblEmployees] DROP CONSTRAINT [FK_tblEmployees_tblEmployees];
GO
IF OBJECT_ID(N'[dbo].[FK_tblErrors_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblErrors] DROP CONSTRAINT [FK_tblErrors_AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[FK_tblImages_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblImages] DROP CONSTRAINT [FK_tblImages_AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[FK_tblLogs_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblLogs] DROP CONSTRAINT [FK_tblLogs_AspNetUsers];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[AspNetRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserClaims];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserInfo]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserInfo];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserLogins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserLogins];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUsers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[C__MigrationHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[C__MigrationHistory];
GO
IF OBJECT_ID(N'[dbo].[tblAddress]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblAddress];
GO
IF OBJECT_ID(N'[dbo].[tblDepartments]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblDepartments];
GO
IF OBJECT_ID(N'[dbo].[tblEmployeeImageMap]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblEmployeeImageMap];
GO
IF OBJECT_ID(N'[dbo].[tblEmployees]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblEmployees];
GO
IF OBJECT_ID(N'[dbo].[tblErrors]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblErrors];
GO
IF OBJECT_ID(N'[dbo].[tblImages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblImages];
GO
IF OBJECT_ID(N'[dbo].[tblLogs]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblLogs];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'AspNetRoles'
CREATE TABLE [dbo].[AspNetRoles] (
    [Id] nvarchar(128)  NOT NULL,
    [Name] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'AspNetUserClaims'
CREATE TABLE [dbo].[AspNetUserClaims] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [ClaimType] nvarchar(max)  NULL,
    [ClaimValue] nvarchar(max)  NULL
);
GO

-- Creating table 'AspNetUserInfo'
CREATE TABLE [dbo].[AspNetUserInfo] (
    [Id] nvarchar(128)  NOT NULL,
    [FirstName] nvarchar(50)  NOT NULL,
    [LastName] nvarchar(50)  NOT NULL,
    [Gender] nvarchar(10)  NOT NULL,
    [DOB] datetime  NULL,
    [UsersId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'AspNetUserLogins'
CREATE TABLE [dbo].[AspNetUserLogins] (
    [LoginProvider] nvarchar(128)  NOT NULL,
    [ProviderKey] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'AspNetUsers'
CREATE TABLE [dbo].[AspNetUsers] (
    [Id] nvarchar(128)  NOT NULL,
    [Email] nvarchar(256)  NULL,
    [EmailConfirmed] bit  NOT NULL,
    [PasswordHash] nvarchar(max)  NULL,
    [SecurityStamp] nvarchar(max)  NULL,
    [PhoneNumber] nvarchar(max)  NULL,
    [PhoneNumberConfirmed] bit  NOT NULL,
    [TwoFactorEnabled] bit  NOT NULL,
    [LockoutEndDateUtc] datetime  NULL,
    [LockoutEnabled] bit  NOT NULL,
    [AccessFailedCount] int  NOT NULL,
    [UserName] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'C__MigrationHistory'
CREATE TABLE [dbo].[C__MigrationHistory] (
    [MigrationId] nvarchar(150)  NOT NULL,
    [ContextKey] nvarchar(300)  NOT NULL,
    [Model] varbinary(max)  NOT NULL,
    [ProductVersion] nvarchar(32)  NOT NULL
);
GO

-- Creating table 'tblAddress'
CREATE TABLE [dbo].[tblAddress] (
    [AddressId] uniqueidentifier  NOT NULL,
    [HouseNumber] nvarchar(max)  NULL,
    [StreetAddress] nvarchar(max)  NULL,
    [SuburbCity] nvarchar(max)  NULL,
    [State] nvarchar(max)  NULL,
    [PostalCode] nvarchar(50)  NULL,
    [CreatedOn] datetime  NULL,
    [CreatedBy] nvarchar(128)  NULL,
    [UpdatedOn] datetime  NULL,
    [UpdateBy] nvarchar(128)  NULL,
    [IsActive] bit  NULL,
    [IsPostalAddress] bit  NULL
);
GO

-- Creating table 'tblDepartments'
CREATE TABLE [dbo].[tblDepartments] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NULL,
    [Location] nvarchar(max)  NULL,
    [PostalAddress] uniqueidentifier  NULL,
    [DepartmentAddress] uniqueidentifier  NULL
);
GO

-- Creating table 'tblErrors'
CREATE TABLE [dbo].[tblErrors] (
    [ID] uniqueidentifier  NOT NULL,
    [Error] nvarchar(max)  NULL,
    [ErrorInfo] nvarchar(max)  NULL,
    [CreatedOn] datetime  NULL,
    [UserId] nvarchar(128)  NULL,
    [ErrorCode] nvarchar(max)  NULL
);
GO

-- Creating table 'tblLogs'
CREATE TABLE [dbo].[tblLogs] (
    [ID] uniqueidentifier  NOT NULL,
    [Type] nvarchar(max)  NULL,
    [UserId] nvarchar(128)  NULL,
    [CreatedOn] datetime  NULL,
    [LogMessage] nvarchar(max)  NULL
);
GO

-- Creating table 'tblEmployeeImageMap'
CREATE TABLE [dbo].[tblEmployeeImageMap] (
    [EmployeeId] int  NOT NULL,
    [ImageId] uniqueidentifier  NOT NULL,
    [Active] bit  NOT NULL,
    [ID] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'tblImages'
CREATE TABLE [dbo].[tblImages] (
    [ID] uniqueidentifier  NOT NULL,
    [Name] nvarchar(max)  NULL,
    [Path] nvarchar(max)  NULL,
    [Type] nvarchar(max)  NULL,
    [CreatedOn] datetime  NULL,
    [CreatedBy] nvarchar(128)  NULL,
    [UploadedName] nvarchar(max)  NULL
);
GO

-- Creating table 'tblEmployees'
CREATE TABLE [dbo].[tblEmployees] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [FirstName] nvarchar(max)  NOT NULL,
    [LastName] nvarchar(max)  NOT NULL,
    [Gender] nvarchar(max)  NOT NULL,
    [Salary] int  NOT NULL,
    [Department] int  NOT NULL,
    [JobTitle] nvarchar(max)  NOT NULL,
    [JoiningDate] datetime  NOT NULL,
    [LeavingDate] datetime  NULL,
    [DateofBirth] nvarchar(10)  NULL,
    [Mobile] nvarchar(max)  NULL,
    [HomePhone] nvarchar(max)  NULL,
    [Email] nvarchar(max)  NULL,
    [ProfessionalProfile] nvarchar(max)  NULL,
    [EmploymentType] nvarchar(max)  NULL,
    [EducationQualification] nvarchar(max)  NULL,
    [IdentificationDocument] nvarchar(max)  NULL,
    [IdentificationNumber] nvarchar(max)  NULL,
    [IsActive] bit  NULL,
    [InService] bit  NULL,
    [CreatedOn] datetime  NULL,
    [CreatedBy] nvarchar(128)  NULL,
    [UpdatedOn] datetime  NULL,
    [UpdatedBy] nvarchar(128)  NULL,
    [ResidentialAddress] uniqueidentifier  NULL,
    [PostalAddress] uniqueidentifier  NULL,
    [EmployeeID] nvarchar(max)  NOT NULL,
    [SupervisorID] int  NULL
);
GO

-- Creating table 'AspNetUserRoles'
CREATE TABLE [dbo].[AspNetUserRoles] (
    [RoleId] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'AspNetRoles'
ALTER TABLE [dbo].[AspNetRoles]
ADD CONSTRAINT [PK_AspNetRoles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [PK_AspNetUserClaims]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUserInfo'
ALTER TABLE [dbo].[AspNetUserInfo]
ADD CONSTRAINT [PK_AspNetUserInfo]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [LoginProvider], [ProviderKey], [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [PK_AspNetUserLogins]
    PRIMARY KEY CLUSTERED ([LoginProvider], [ProviderKey], [UserId] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUsers'
ALTER TABLE [dbo].[AspNetUsers]
ADD CONSTRAINT [PK_AspNetUsers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [MigrationId], [ContextKey] in table 'C__MigrationHistory'
ALTER TABLE [dbo].[C__MigrationHistory]
ADD CONSTRAINT [PK_C__MigrationHistory]
    PRIMARY KEY CLUSTERED ([MigrationId], [ContextKey] ASC);
GO

-- Creating primary key on [AddressId] in table 'tblAddress'
ALTER TABLE [dbo].[tblAddress]
ADD CONSTRAINT [PK_tblAddress]
    PRIMARY KEY CLUSTERED ([AddressId] ASC);
GO

-- Creating primary key on [ID] in table 'tblDepartments'
ALTER TABLE [dbo].[tblDepartments]
ADD CONSTRAINT [PK_tblDepartments]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'tblErrors'
ALTER TABLE [dbo].[tblErrors]
ADD CONSTRAINT [PK_tblErrors]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'tblLogs'
ALTER TABLE [dbo].[tblLogs]
ADD CONSTRAINT [PK_tblLogs]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'tblEmployeeImageMap'
ALTER TABLE [dbo].[tblEmployeeImageMap]
ADD CONSTRAINT [PK_tblEmployeeImageMap]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'tblImages'
ALTER TABLE [dbo].[tblImages]
ADD CONSTRAINT [PK_tblImages]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'tblEmployees'
ALTER TABLE [dbo].[tblEmployees]
ADD CONSTRAINT [PK_tblEmployees]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [RoleId], [UserId] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [PK_AspNetUserRoles]
    PRIMARY KEY CLUSTERED ([RoleId], [UserId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UserId] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserClaims]
    ([UserId]);
GO

-- Creating foreign key on [UsersId] in table 'AspNetUserInfo'
ALTER TABLE [dbo].[AspNetUserInfo]
ADD CONSTRAINT [FK_AspNetUserInfo_AspNetUsers]
    FOREIGN KEY ([UsersId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserInfo_AspNetUsers'
CREATE INDEX [IX_FK_AspNetUserInfo_AspNetUsers]
ON [dbo].[AspNetUserInfo]
    ([UsersId]);
GO

-- Creating foreign key on [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserLogins]
    ([UserId]);
GO

-- Creating foreign key on [CreatedBy] in table 'tblAddress'
ALTER TABLE [dbo].[tblAddress]
ADD CONSTRAINT [FK_tblAddress_AspNetUsers]
    FOREIGN KEY ([CreatedBy])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblAddress_AspNetUsers'
CREATE INDEX [IX_FK_tblAddress_AspNetUsers]
ON [dbo].[tblAddress]
    ([CreatedBy]);
GO

-- Creating foreign key on [UpdateBy] in table 'tblAddress'
ALTER TABLE [dbo].[tblAddress]
ADD CONSTRAINT [FK_tblAddress_AspNetUsers1]
    FOREIGN KEY ([UpdateBy])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblAddress_AspNetUsers1'
CREATE INDEX [IX_FK_tblAddress_AspNetUsers1]
ON [dbo].[tblAddress]
    ([UpdateBy]);
GO

-- Creating foreign key on [UserId] in table 'tblErrors'
ALTER TABLE [dbo].[tblErrors]
ADD CONSTRAINT [FK_tblErrors_AspNetUsers]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblErrors_AspNetUsers'
CREATE INDEX [IX_FK_tblErrors_AspNetUsers]
ON [dbo].[tblErrors]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'tblLogs'
ALTER TABLE [dbo].[tblLogs]
ADD CONSTRAINT [FK_tblLogs_AspNetUsers]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblLogs_AspNetUsers'
CREATE INDEX [IX_FK_tblLogs_AspNetUsers]
ON [dbo].[tblLogs]
    ([UserId]);
GO

-- Creating foreign key on [RoleId] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRoles]
    FOREIGN KEY ([RoleId])
    REFERENCES [dbo].[AspNetRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [UserId] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetUsers]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserRoles_AspNetUsers'
CREATE INDEX [IX_FK_AspNetUserRoles_AspNetUsers]
ON [dbo].[AspNetUserRoles]
    ([UserId]);
GO

-- Creating foreign key on [CreatedBy] in table 'tblImages'
ALTER TABLE [dbo].[tblImages]
ADD CONSTRAINT [FK_tblImages_AspNetUsers]
    FOREIGN KEY ([CreatedBy])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblImages_AspNetUsers'
CREATE INDEX [IX_FK_tblImages_AspNetUsers]
ON [dbo].[tblImages]
    ([CreatedBy]);
GO

-- Creating foreign key on [ImageId] in table 'tblEmployeeImageMap'
ALTER TABLE [dbo].[tblEmployeeImageMap]
ADD CONSTRAINT [FK_tblEmployeeImageMap_tblImages]
    FOREIGN KEY ([ImageId])
    REFERENCES [dbo].[tblImages]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployeeImageMap_tblImages'
CREATE INDEX [IX_FK_tblEmployeeImageMap_tblImages]
ON [dbo].[tblEmployeeImageMap]
    ([ImageId]);
GO

-- Creating foreign key on [UpdatedBy] in table 'tblEmployees'
ALTER TABLE [dbo].[tblEmployees]
ADD CONSTRAINT [FK_tblEmployees_AspNetUsers]
    FOREIGN KEY ([UpdatedBy])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployees_AspNetUsers'
CREATE INDEX [IX_FK_tblEmployees_AspNetUsers]
ON [dbo].[tblEmployees]
    ([UpdatedBy]);
GO

-- Creating foreign key on [CreatedBy] in table 'tblEmployees'
ALTER TABLE [dbo].[tblEmployees]
ADD CONSTRAINT [FK_tblEmployees_AspNetUsers1]
    FOREIGN KEY ([CreatedBy])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployees_AspNetUsers1'
CREATE INDEX [IX_FK_tblEmployees_AspNetUsers1]
ON [dbo].[tblEmployees]
    ([CreatedBy]);
GO

-- Creating foreign key on [ResidentialAddress] in table 'tblEmployees'
ALTER TABLE [dbo].[tblEmployees]
ADD CONSTRAINT [FK_tblEmployees_tblAddress]
    FOREIGN KEY ([ResidentialAddress])
    REFERENCES [dbo].[tblAddress]
        ([AddressId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployees_tblAddress'
CREATE INDEX [IX_FK_tblEmployees_tblAddress]
ON [dbo].[tblEmployees]
    ([ResidentialAddress]);
GO

-- Creating foreign key on [PostalAddress] in table 'tblEmployees'
ALTER TABLE [dbo].[tblEmployees]
ADD CONSTRAINT [FK_tblEmployees_tblAddress1]
    FOREIGN KEY ([PostalAddress])
    REFERENCES [dbo].[tblAddress]
        ([AddressId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployees_tblAddress1'
CREATE INDEX [IX_FK_tblEmployees_tblAddress1]
ON [dbo].[tblEmployees]
    ([PostalAddress]);
GO

-- Creating foreign key on [Department] in table 'tblEmployees'
ALTER TABLE [dbo].[tblEmployees]
ADD CONSTRAINT [FK_tblEmployees_tblDepartments]
    FOREIGN KEY ([Department])
    REFERENCES [dbo].[tblDepartments]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployees_tblDepartments'
CREATE INDEX [IX_FK_tblEmployees_tblDepartments]
ON [dbo].[tblEmployees]
    ([Department]);
GO

-- Creating foreign key on [EmployeeId] in table 'tblEmployeeImageMap'
ALTER TABLE [dbo].[tblEmployeeImageMap]
ADD CONSTRAINT [FK_tblEmployeeImageMap_tblEmployees]
    FOREIGN KEY ([EmployeeId])
    REFERENCES [dbo].[tblEmployees]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployeeImageMap_tblEmployees'
CREATE INDEX [IX_FK_tblEmployeeImageMap_tblEmployees]
ON [dbo].[tblEmployeeImageMap]
    ([EmployeeId]);
GO

-- Creating foreign key on [SupervisorID] in table 'tblEmployees'
ALTER TABLE [dbo].[tblEmployees]
ADD CONSTRAINT [FK_tblEmployees_tblEmployees]
    FOREIGN KEY ([SupervisorID])
    REFERENCES [dbo].[tblEmployees]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblEmployees_tblEmployees'
CREATE INDEX [IX_FK_tblEmployees_tblEmployees]
ON [dbo].[tblEmployees]
    ([SupervisorID]);
GO

-- Creating foreign key on [PostalAddress] in table 'tblDepartments'
ALTER TABLE [dbo].[tblDepartments]
ADD CONSTRAINT [FK_tblDepartments_tblAddress_PostalAddress]
    FOREIGN KEY ([PostalAddress])
    REFERENCES [dbo].[tblAddresses]
        ([AddressId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblDepartments_tblAddress_PostalAddress'
CREATE INDEX [IX_FK_tblDepartments_tblAddress_PostalAddress]
ON [dbo].[tblDepartments]
    ([PostalAddress]);
GO

-- Creating foreign key on [DepartmentAddress] in table 'tblDepartments'
ALTER TABLE [dbo].[tblDepartments]
ADD CONSTRAINT [FK_tblDepartments_tblAddress_DepartmentAddress]
    FOREIGN KEY ([DepartmentAddress])
    REFERENCES [dbo].[tblAddresses]
        ([AddressId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblDepartments_tblAddress_DepartmentAddress'
CREATE INDEX [IX_FK_tblDepartments_tblAddress_DepartmentAddress]
ON [dbo].[tblDepartments]
    ([DepartmentAddress]);
GO

-- Object:  User [NT AUTHORITY\SYSTEM]
CREATE USER [NT AUTHORITY\SYSTEM] FOR LOGIN [NT AUTHORITY\SYSTEM] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [NT AUTHORITY\SYSTEM]
GO

-- Adding default admin user
INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'fa556710-4ecd-4a9a-a3d0-6b91cedbce96', N'admin@admin.com', 1, N'ADUrlnCjHu8o/uhBbEmvLMW1JITwL9FgG+855qUAzyQ4yrAnPoWcKCrSbizJoC4pEA==', N'518d5e67-ad4a-4b01-81ce-72fd1f47d6e6', N'0000000000', 1, 0, NULL, 0, 0, N'admin')
GO
INSERT [dbo].[AspNetUserInfo] ([Id], [FirstName], [LastName], [Gender], [DOB], [UsersId]) VALUES (N'3282674d-98da-47d3-afb5-9d578bb827ad', N'Admin', N'User', N'Male', CAST(N'1970-01-01T00:00:00.000' AS DateTime), N'fa556710-4ecd-4a9a-a3d0-6b91cedbce96')
GO

-- Adding default Department
INSERT INTO [dbo].[tblDepartments] ([Name], [Location]) VALUES ('None', 'Not Applicable')
GO

-- Adding default Employee
INSERT INTO [dbo].[tblEmployees] ([FirstName], [LastName], [Gender], [Salary], [Department], [JobTitle], [JoiningDate], [LeavingDate], [DateofBirth], [Mobile], [HomePhone], [Email], [ProfessionalProfile], [EmploymentType], [EducationQualification], [IdentificationDocument], [IdentificationNumber], [IsActive], [InService], [CreatedOn], [CreatedBy], [UpdatedOn], [UpdatedBy], [ResidentialAddress], [PostalAddress], [EmployeeID], [SupervisorID]) VALUES ('None', '', 'Not Applicable', 0, 1, '', '01-01-1901', Null, Null, Null, Null, Null, Null, Null, Null, Null, Null, 1, 1, Null, Null, Null, Null, Null, Null, '0', Null)
GO
-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------