/*
  Warnings:

  - You are about to drop the column `autor` on the `obras` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `obras` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "manutencoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "obraId" INTEGER NOT NULL,
    "descricaoServico" TEXT NOT NULL,
    "dataManutencao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorCusto" REAL NOT NULL,
    CONSTRAINT "manutencoes_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "anoPublicacao" INTEGER,
    "isbn" TEXT,
    "statusDisponibilidade" TEXT NOT NULL DEFAULT 'Disponivel',
    CONSTRAINT "obras_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_obras" ("anoPublicacao", "categoriaId", "id", "isbn", "statusDisponibilidade") SELECT "anoPublicacao", "categoriaId", "id", "isbn", "statusDisponibilidade" FROM "obras";
DROP TABLE "obras";
ALTER TABLE "new_obras" RENAME TO "obras";
CREATE UNIQUE INDEX "obras_isbn_key" ON "obras"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
