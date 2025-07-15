// console.log('test');
import fs from 'fs';
import readline from 'node:readline';
import { IBMInstruct, Input } from './src/replicate/IBMGranite.js';


const endpoint = `
API endpoint

1. Create Book
POST http://{host}/api/v1/books
- Header 
 - Accept: "application/json"
- body (json): 
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}

- response:
 - onfail:
    status code: 400
   {
    "status": "fail",
    "message": string
   }
 - onsuccess:
   status code: 201
   {
    "status": "success",
    "message": string,
    "data": {
        "bookId": string
    }
   }

2. Get All Book
GET http://{host}/api/v1/books
 
- response:
 - onsuccess:
    - status code: 200
    {
        "status": "success",
        "data": {
            "books": []
        }
    }
    - status code: 200 
    {
        "status": "success",
        "data": {
            "books": [
                {
                    "id": "Qbax5Oy7L8WKf74l",
                    "name": "Buku A",
                    "publisher": "Dicoding Indonesia"
                },
                {
                    "id": "1L7ZtDUFeGs7VlEt",
                    "name": "Buku B",
                    "publisher": "Dicoding Indonesia"
                },
                {
                    "id": "K8DZbfI-t3LrY7lD",
                    "name": "Buku C",
                    "publisher": "Dicoding Indonesia"
                }
            ]
        }
    }
    
3. Get Book Detail
GET http://{host}/api/v1/books{bookId}

- response:
 - onfail
  - status code: 404
    {
        "status": "fail",
        "message": "not found"
    }
 - onsuccess
  - status code: 200
  {
        "status": "success",
        "data": {
            "book": {
                "id": string,
                "name": string,
                "year": number,
                "author": string,
                "summary": string,
                "publisher": string,
                "pageCount": number,
                "readPage": number,
                "finished": boolean,
                "reading": boolean,
                "insertedAt": string,
                "updatedAt": string
            }
        }
    }

4. Update Book Data
PUT http://{host}/api/v1/books/{bookId}
- Header: 
 - Accept: "application/json"
- body: raw (json):
    {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
    }
- response: 
 - onfail: 
  - status code: 400
    {
        "status": "fail",
        "message": string
    }
  - status code: 404
    {
        "status": "fail",
        "message": string
    }
 - onsuccess:
  - status code: 200
  {
    "status": "success",
    "message": "Buku berhasil diperbarui"
   }
`;

var prompt = `Generate an API documentation file in Markdown format with the following structure:

I. Introduction: Provide a general explanation of an API called "Bookshelf API" and describe the configuration steps, including running <npm install>, and creating a <.env> file with content based on <.env.example>.

II. Tech Stack: List the technologies used, including Node.js, HapiJS, and IBM Granite Instruct.

III. IBM Granite Instruct:
  3.1 What is IBM Granite: Describe what IBM Granite is.
  3.2 Usage for Documentation: Explain how to use the model to generate documentation, specifically by running the command <npm run snap>.
  3.3 Prompt Command: Write down the first 50 words of the prompt used to run the model, then end it with ellipsis (...). For example: "create an image of the man sitting in the garden with a cup of coffee, wearing a brown jacket and looking at the sky while birds fly over..."

IV. API Reference: List the available API endpoints, where the APIs are described using the parameter [param].
[param]
${endpoint}

Return only a valid Markdown file structure with appropriate headings and content. Do not include any code comments or extra explanation outside of the Markdown structure.
`;

// console.log(prompt);
const top_k = 45;
const top_p = 0.7;
const max_tokens = 950;
const model = new IBMInstruct();

const promptObject = Input({top_k: top_k, top_p, prompt, max_tokens})
// console.log(promptObject);

const writeStream = fs.createWriteStream('readme.MD', { flags: 'a'});
for await (const {id, data} of model.streamOutput(promptObject)){
  console.log(`write chunk id:${id}: ${data}`);
  writeStream.write(data);
  
}
writeStream.end()


// ==========================
function writeFile(data){
    fs.writeFile('readme.MD',  data, (err) => {
        if (err) {
            console.error('Gagal membuat file:', err);
        } else {
            console.log('File dokumentasi.md berhasil dibuat.');
        }
    })
}

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });



// rl.question(`input prompt?`, input => {
//   prompt += input;
//   rl.close();
// });

function readFile(fileUrl) {
  fileUrl = `${fileUrl}`;
  var result = '';
  console.log(`reading file at ${fileUrl}`);
  fs.readFile(fileUrl, (err, data) => {
    if (err){
      console.log(err);
      return
    } else {
      result += data;
    }
  })
  return result
}

