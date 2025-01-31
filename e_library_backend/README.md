# E-Library API Documentation

A simple backend API for an e-library application built with FastAPI and MongoDB.

## Base URL
```
http://localhost:8000
```

## Endpoints

### Get All Books
```http
GET /explore-resources
```
Returns all books in the library.

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book Description",
    "image": "Image URL",
    "link": "Book Link"
  }
]
```

### Get Borrowed Books
```http
GET /borrowed-books
```
Returns all currently borrowed books.

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book Description",
    "image": "Image URL",
    "link": "Book Link"
  }
]
```

### Get Favorite Books
```http
GET /favorites
```
Returns all books marked as favorites.

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book Description",
    "image": "Image URL",
    "link": "Book Link"
  }
]
```

### Get History
```http
GET /history
```
Returns all books in reading history.

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book Description",
    "image": "Image URL",
    "link": "Book Link"
  }
]
```

### Borrow a Book
```http
POST /borrow-book/{book_id}
```
Marks a book as borrowed.

**Response** `200 OK`
```json
{
  "message": "Book borrowed successfully"
}
```

**Errors**
- `404` Book not found
- `400` Book already borrowed

### Add to Favorites
```http
POST /add-favorite/{book_id}
```
Adds a book to favorites.

**Response** `200 OK`
```json
{
  "message": "Book added to favorites"
}
```

**Errors**
- `404` Book not found
- `400` Book already in favorites

### Add to History
```http
POST /add-to-history/{book_id}
```
Adds a book to reading history.

**Response** `200 OK`
```json
{
  "message": "Book added to history"
}
```

**Errors**
- `404` Book not found

### Add New Book
```http
POST /add-book
```
Adds a new book to the library.

**Request Body**
```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book Description",
  "image": "Image URL",
  "link": "Book Link"
}
```

**Response** `200 OK`
```json
{
  "message": "Book added successfully"
}
```

**Errors**
- `400` Book with this ID already exists

## Quick Start

1. Make sure MongoDB is running locally or on the cloud
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn pymongo
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   uvicorn main:app --reload
   ```
4. API will be available at `http://localhost:8000`
5. Interactive API documentation available at `http://localhost:8000/docs`

## Note
This is a simple prototype implementation without authentication. All endpoints are public and don't require any authorization headers.
