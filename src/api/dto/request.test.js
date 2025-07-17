import { BookCreateDto } from "./request.js";

/* create unit testing
 schema 1: completed data
 schema 2: name is null
 schema 3: readPage > pageCount
 schema 4: name is null AND readPage > pageCount
 schema 5: all field are null except required field
*/

const schema1 = new BookCreateDto({
    name: 'Dasar Pemograman', year: 2004, author: 'Hamba Allah', 
    summary:'Mempelajari dasar-dasar pemograman',
    publisher: 'Erlangga', pageCount: 150, readPage: 20, reading: false 
});

const schema2 = new BookCreateDto({
    year: 2004, author: 'Hamba Tuhan', 
    summary:'Belajar dasar js', publisher: 'Erlangga', 
    pageCount: 150, readPage: 20, reading: false 
});

const schema3 = new BookCreateDto({
    name: 'Belajar RabbitMQ',year: 2004, author: 'Hamba Tuhan', 
    summary:'Belajar teori dan praktek RabbitMQ', publisher: 'Programmer Handal', 
    pageCount: 150, readPage: 150, reading: false 
});

const schema4 = new BookCreateDto({
    name: 'Belajar RabbitMQ',year: 2004, author: 'Hamba Tuhan', 
    summary:'Belajar teori dan praktek RabbitMQ', publisher: 'Programmer Handal', 
    pageCount: 150, readPage: 151, reading: false 
});

const schema5 = new BookCreateDto({
    year: 2004, author: 'Hamba Tuhan', 
    summary:'Belajar teori dan praktek RabbitMQ', publisher: 'Programmer Handal', 
    pageCount: 150, readPage: 151, reading: false 
});

const schema6 = new BookCreateDto({
    name: 'Belajar Datasains',  
    pageCount: 150, readPage: 120, 
});

const schema7 = new BookCreateDto({
    name: 'Belajar Datasains',   
});

const conditions = [ schema1, schema2, schema3, 
        schema4, schema5, schema6,schema7 ];

// test.describe('request', ()=> {
//     const conditions = [ schema1, schema2, schema3, 
//         schema4, schema5, schema6,schema7 ];
    
//     test.each(conditions)(
//         "passes for request object %v",
//         (fixture) => expect(fixture.validate()).toBe(true)
//     );
// });
var id = 0;
conditions.forEach((object) => {
    
    try {
        // const book = new BookCreateDto({input})
        if(object.validate()){
            console.log(`case-${id}:success`)
        }

    } catch (error) {
        console.log(`error case-${id}:${error}`)
    }finally{
        id+=1;
    }
});