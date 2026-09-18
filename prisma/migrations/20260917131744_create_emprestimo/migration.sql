/*
  Warnings:

  - You are about to drop the `emprestimos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "emprestimos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "obraId" INTEGER NOT NULL,
    "dataRetirada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPrevistaDevolucao" DATETIME NOT NULL,
    "dataDevolucaoReal" DATETIME,
    "valorTotal" REAL NOT NULL,
    "statusContrato" TEXT NOT NULL DEFAULT 'Ativo',
    CONSTRAINT "emprestimo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "emprestimo_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
