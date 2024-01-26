import fastify from 'fastify';
import {PrismaClient} from "@prisma/client";
import {z} from 'zod'

const server = fastify({logger: true});

// Criar a conexão com o BD
const prisma = new PrismaClient();

server.get('/', (response, reply) => {
    return 'Hello World!'
})

server.get('/users', async () =>{
    const users = await prisma.user.findMany()

    return {users}
})

server.post('/users', async (request, reply) => {

    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
    });

    const {name, email} = createUserSchema.parse(request.body);

    await prisma.user.create({
        data: {
            name,
            email
        }
    })

    return reply.status(201).send()
})

const start = async () => {
    try {
        const port = process.env.PORT ? Number(process.env.PORT) : 3000;

        await server.listen({
            host: '0.0.0.0',
            port: port
        });
        server.log.info(`Servidor iniciado em http://localhost:${port}`);

    } catch (exception) {
        server.log.error(exception);
        process.exit(1);
    }
};

start().then(() =>{
    console.log('Http Server Running')
})