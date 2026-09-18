/*
  Warnings:

  - You are about to drop the `manutencoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "manutencoes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "manutencao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "obraId" INTEGER NOT NULL,
    "descricaoServico" TEXT NOT NULL,
    "dataManutencao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorCusto" REAL NOT NULL,
    CONSTRAINT "manutencao_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
