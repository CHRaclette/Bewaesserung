BEGIN TRY

BEGIN TRAN;

-- CreateSchema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'dbo') EXEC sp_executesql N'CREATE SCHEMA [dbo];';

-- CreateTable
CREATE TABLE [dbo].[Subscription] (
    [id] INT NOT NULL,
    [name] VARCHAR(50) NOT NULL,
    CONSTRAINT [PK__Subscrip__3213E83F05011ADF] PRIMARY KEY CLUSTERED ([id] ASC)
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61DD2453BE] PRIMARY KEY CLUSTERED ([diagram_id] ASC),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id] ASC,[name] ASC)
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [password] VARCHAR(20) NOT NULL,
    CONSTRAINT [PK__User__3213E83FEE2EE86C] PRIMARY KEY CLUSTERED ([id] ASC)
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

