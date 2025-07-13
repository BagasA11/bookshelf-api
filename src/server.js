'use strict';
// const Hapi = require('@hapi/hapi');
import Hapi from '@hapi/hapi';
import { insert, getList, list } from './api/database/repository.js';

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


    await server.start();
    console.log('Server running on %s', server.info.uri);
}

const dummyBook = {
  name: 'The Pragmatic Programmer',
  year: 1999,
  author: 'Andrew Hunt & David Thomas',
  summary: 'Tips and techniques for effective software development.',
  publisher: 'Addison-Wesley',
  pageCount: 352,
  readPage: 120,
  finished: false,
  reading: true
};

insert(dummyBook);

console.log(list());
console.log(getList());

init();