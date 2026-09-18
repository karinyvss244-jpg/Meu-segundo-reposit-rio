-- CreateTable
CREATE TABLE "locacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "obraId" INTEGER NOT NULL,
    "dataRetirada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPrevistaDevolucao" DATETIME NOT NULL,
    "dataDevolucaoReal" DATETIME,
    "valorTotal" REAL NOT NULL,
    "statusContrato" TEXT NOT NULL DEFAULT 'Ativo',
    CONSTRAINT "locacoes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "locacoes_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "obras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
