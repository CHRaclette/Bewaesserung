/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysdiagrams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Subscription];

-- DropTable
DROP TABLE [dbo].[sysdiagrams];

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'User'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(20) NOT NULL,
    [passwordHash] VARCHAR(255) NOT NULL,
    [role] VARCHAR(10) NOT NULL,
    [plan] VARCHAR(10) NOT NULL CONSTRAINT [User_plan_df] DEFAULT 'BASIC',
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_User] ON;
IF EXISTS(SELECT * FROM [dbo].[User])
    EXEC('INSERT INTO [dbo].[_prisma_new_User] ([id],[username]) SELECT [id],[username] FROM [dbo].[User] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_User] OFF;
DROP TABLE [dbo].[User];
EXEC SP_RENAME N'dbo._prisma_new_User', N'User';
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
