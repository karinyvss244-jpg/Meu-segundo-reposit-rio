-- CreateTable
CREATE TABLE "categorias_obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "anoPublicacao" INTEGER,
    "isbn" TEXT,
    "statusDisponibilidade" TEXT NOT NULL DEFAULT 'Disponivel',
    CONSTRAINT "obras_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "obras_isbn_key" ON "obras"("isbn");
