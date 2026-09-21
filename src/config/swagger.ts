import swaggerJSDoc from 'swagger-jsdoc';


export const swaggerSpec = swaggerJSDoc({
    definition: {

        openapi: '3.0.3',

        info: {
            title: 'DriveRent API',
            version: '1.0.0',
            description:
                'API RESTful do sistema de emprestimo de livros online ' +
                'Fluxo típico: cadastre um cliente, faça login para obter um token JWT ' +
                'e use o botão **Authorize** acima para testar as rotas protegidas.',
        },

        servers: [
            { url: 'http://localhost:3333', description: 'Ambiente de desenvolvimento' },
        ],


        tags: [
            { name: 'Autenticação', description: 'Login e emissão de token JWT' },
            { name: 'Clientes', description: 'Cadastro e consulta de clientes' },
            { name: 'Obra', description: 'Catálogo e gestão das obras literarias' },
            { name: 'Emprestimo', description: 'Abertura, devolução e cancelamento (RN01/RN02)' },
            { name: 'Manutenções', description: 'Registro e conclusão de manutenções (RN03)' },
        ],

        components: {

            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjbGllbnRlQHRlc3RlLmNvbSIsImlhdCI6MTc4OTczMzk3NCwiZXhwIjoxNzg5ODIwMzc0fQ.pqN6BITH57d-Ig_-jjf0kQbwWM_KkFc3H3Rt29Xn-2k',
                },
            },


            schemas: {
                RespostaErro: {
                    type: 'object',
                    properties: {
                        erro: { type: 'string', example: 'Mensagem explicando o que deu errado.' },
                    },
                },

                Cliente: {
                    type: 'object',
                    description: 'Cliente SEM o campo senha (a senha nunca sai do banco).',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'Cliente Teste' },
                        email: { type: 'string', format: 'email', example: 'cliente@teste.com' },
                        telefone: { type: 'string', example: '11999999999' },
                        criadoEm: { type: 'string', format: 'date-time' },
                    },
                },

                Categoriaobra: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nomeCategoria: { type: 'string', example: 'Romance' },
                        descricao: { type: 'string', example: ' Histórias centradas em relacionamentos, sentimentos e conflitos amorosos.' },
                    },
                },

                Obra: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        categoriaId: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Amor na Estrada' },
                        autor: { type: 'string', example: 'ana souza' },
                        isbn: { type: 'integer', example: '123-4-567-8900-1' },
                        anodePublicacao: { type: 'integer', example: 2020 },
                        statusDisponibilidade: {
                            type: 'string',
                            enum: ['Disponivel', 'Emprestado', 'Manutencao'],
                            example: 'Disponivel',
                        },
                        categoria: { $ref: '#/components/schemas/Categoriaobra' },
                    },
                },

                Emprestimo: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        clienteId: { type: 'integer', example: 1 },
                        obraId: { type: 'integer', example: 1 },
                        dataRetirada: { type: 'string', format: 'date-time' },
                        dataPrevistaDevolucao: { type: 'string', format: 'date-time' },
                        dataDevolucaoReal: { type: 'string', format: 'date-time', nullable: true },
                        valorTotal: { type: 'number', example: 360 },
                        statusContrato: {
                            type: 'string',
                            enum: ['Ativo', 'Finalizado', 'Cancelado'],
                            example: 'Ativo',
                        },
                        obra: { $ref: '#/components/schemas/Obra' },
                    },
                },

                Manutenção: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        obraId: { type: 'integer', example: 3 },
                        descricaoServico: { type: 'string', example: 'Troca de óleo' },
                        dataManutencao: { type: 'string', format: 'date-time' },
                        valorCusto: { type: 'number', example: 150 },
                        obra: { $ref: '#/components/schemas/Obra' },
                    },
                },
            },
        },
    },


    apis: ['./src/routes/*.ts', './dist/routes/*.js'],
});