
# Bookshelf API Documentation

## I. Introduction

The Bookshelf API is a RESTful service designed for managing a collection of books. To get started, run `npm install` to install dependencies. Create a `.env` file based on `.env.example` to configure environment variables.

## II. Tech Stack

- Node.js: A JavaScript runtime built on Chrome's V8 engine for backend development.
- HapiJS: A backend framework for building secure and modular APIs.
- IBM Granite Instruct: An AI model for generating text or documentation automatically.
- nvm: A tool to manage and switch between multiple Node.js versions easily.
- pm2: A process manager to run and monitor Node.js applications in the background.
- IDCloudhost: An Indonesian-based cloud and hosting service provider.

## III. IBM Granite Instruct

### 3.1 What is IBM Granite

IBM Granite is an advanced AI model capable of understanding and generating human-like text based on given prompts.

### 3.2 Usage for Documentation

To generate this documentation, run `npm run snap`.

### 3.3 Prompt Command

"Create comprehensive API documentation for the Bookshelf API, including endpoint descriptions, request/response formats, and status codes. Ensure to cover all available endpoints: Create Book, Get All Books, Get Book Detail, Update Book Data, and Remove Book Data." (...)

## IV. API Reference

### Host and Parameter Definitions

- `{host}`: A hostname consisting of an IP address and port number 
  (the production host is `103.186.0.229:9000`).
- `{bookId}`: A parameter representing the unique ID of a book used in certain endpoints.

### API Endpoints

#### 1. Create Book

**POST** `http://{host}/books`

- **Header**
  - `Accept`: `"application/json"`
- **Body (json)**
  ```json
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
  ```

- **Response**
  - **onfail** (status code: 400)
    ```json
    {
      "status": "fail",
      "message": string
    }
    ```
  - **onsuccess** (status code: 201)
    ```json
    {
      "status": "success",
      "message": string,
      "data": {
        "bookId": string
      }
    }
    ```

#### 2. Get All Books

**GET** `http://{host}/books`

- **Response**
  - **onsuccess** (status code: 200)
    ```json
    {
      "status": "success",
      "data": {
        "books": []
      }
    }
    ```
  - **onsuccess** (status code: 200)
    ```json
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
    ```

#### 3. Get Book Detail

**GET** `http://{host}/books/{bookId}`

- **Response**
  - **onfail** (status code: 404)
    ```json
    {
      "status": "fail",
      "message": "not found"
    }
    ```
  - **onsuccess** (status code: 200)
    ```json
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
    ```

#### 4. Update Book Data

**PUT** `http://{host}/books/{bookId}`

- **Header**
  - `Accept`: `"application/json"`
- **Body (raw json)**
  ```json
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
  ```

- **Response**
  - **onfail** (status code: 400)
    ```json
    {
      "status": "fail",
      "message": string
    }
    ```
  - **onfail** (status code: 404)
    ```json
    {
      "status": "fail",
      "message": string
    }
    ```
  - **onsuccess** (status code: 200)
    ```json
    {
      "status": "success",
      "message": "Buku berhasil diperbarui"
    }
    ```

#### 5. Remove Book Data

**DELETE** `http://{host}/books/{bookId}`

- **Response**
  - **onfail** (status code: 404)
    ```json
    {
      "status": "fail",
      "message": string
    }
    ```
  - **onsuccess** (status code: 200)
    ```json
    {
      "status": "success",
      "message": string
    }
    ```
