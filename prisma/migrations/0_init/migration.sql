-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_obras" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "categorias_obras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obras" (
    "id" SERIAL NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "anoPublicacao" INTEGER,
    "isbn" TEXT,
    "statusDisponibilidade" TEXT NOT NULL DEFAULT 'Disponivel',

    CONSTRAINT "obras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emprestimo" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "obraId" INTEGER NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPrevistaDevolucao" TIMESTAMP(3) NOT NULL,
    "dataDevolucaoReal" TIMESTAMP(3),
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "statusContrato" TEXT NOT NULL DEFAULT 'Ativo',

    CONSTRAINT "emprestimo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manutencao" (
    "id" SERIAL NOT NULL,
    "obraId" INTEGER NOT NULL,
    "descricaoServico" TEXT NOT NULL,
    "dataManutencao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorCusto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "obras_isbn_key" ON "obras"("isbn");

-- AddForeignKey
ALTER TABLE "obras" ADD CONSTRAINT "obras_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emprestimo" ADD CONSTRAINT "emprestimo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emprestimo" ADD CONSTRAINT "emprestimo_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencao" ADD CONSTRAINT "manutencao_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "obras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

