'use strict';
// const Hapi = require('@hapi/hapi');
import Hapi from '@hapi/hapi';
import { bookRouters } from './routers/book.routers.js';

const port = process.env.SERVICE_PORT;
const mode = process.env.SERVICE_ENV;

console.log(`${mode}:${port}`)
const createListener = async () => {
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

    try {
        await server.start();
        console.log('Server is running on %s', server.info.uri);
        
    } catch (error) {
        console.error(error);
        process.exit(1); //exit when errors occurs
    }
}

createListener();