'use strict';
// const Hapi = require('@hapi/hapi');
import Hapi from '@hapi/hapi';
import { bookRouters } from './routers/book.routers.js';

const port = process.env.PORT;
const mode = process.env.ENVIRONMENT;

console.log(`${mode}:${port}`)
const init = async () => {
    const server = Hapi.server({
        port: port,
        host: mode === 'development'? 'localhost' : '0.0.0.0',
         routes: {
            cors: {
                origin: ['*'],
            },
        },

    });

    server.route(bookRouters);

    await server.start();
    console.log('Server is running on %s', server.info.uri);
}

init();