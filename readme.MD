```markdown
# Bookshelf API Documentation

## I. Introduction

The Bookshelf API is a RESTful service designed to manage a collection of books. To get started, follow these steps:

1. Install dependencies: `npm install`
2. Create a `.env` file based on `.env.example`.

## II. Tech Stack

- **Node.js**: JavaScript runtime
- **HapiJS**: Framework for building APIs
- **IBM Granite Instruct**: For generating API documentation

## III. IBM Granite Instruct

### 3.1 What is IBM Granite

IBM Granite is an advanced AI model capable of understanding and generating human-like text based on given prompts.

### 3.2 Usage for Documentation

To generate the documentation, run the command: `npm run snap`

### 3.3 Prompt Command

"Create an API documentation file for the Bookshelf API, detailing endpoints, request methods, parameters, headers, and response formats. Use Markdown syntax for clarity and structure." (...)

## IV. API Reference

### 1. Create Book

**POST** `http://{host}/api/v1/books`

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
  - **onfail**
    - `status code`: 400
    ```json
    {
      "status": "fail",
      "message": string
    }
    ```
  - **onsuccess**
    - `status code`: 201
    ```json
    {
      "status": "success",
      "message": string,
      "data": {
        "bookId": string
      }
    }
    ```

### 2. Get All Books

**GET** `http://{host}/api/v1/books`

- **Response**
  - **onsuccess**
    - `status code`: 200
    ```json
    {
      "status": "success",
      "data": {
        "books": []
      }
    }
    ```
    - or
    - `status code`: 200
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

### 3. Get Book Detail

**GET** `http://{host}/api/v1/books/{bookId}`

- **Response**
  - **onfail**
    - `status code`: 404
    ```json
    {
      "status": "fail",
      "message": "not found"
    }
    ```
  - **onsuccess**
    - `status code`: 200
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

### 4. Update Book Data

**PUT** `http://{host}/api/v1/books/{bookId}`

- **Header**
  - `Accept`: `"application/json"`

- **Body**
  ```json
  {
    "name": string,
    "year":