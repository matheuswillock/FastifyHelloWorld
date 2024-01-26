import fastify, {RouteShorthandOptions} from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const server = fastify({logger: true});

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

server.get('/', async (request, reply) => {
    return {
        message: 'hello world!'
    };
});

server.get('/ping', opts, async (request, reply) => {
    return {
        pong: 'it worked!'
    }
})

const start = async () => {
    try {
        await server.listen(3000);
        server.log.info('Servidor iniciado em http://localhost:3000');

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

    } catch (exception) {
        server.log.error(exception);
        process.exit(1);
    }
};

start()