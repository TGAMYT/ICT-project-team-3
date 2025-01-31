from fastapi import APIRouter, HTTPException
from database import db
from models import Book, check_book_exists

router = APIRouter()

@router.get("/explore-resources")
async def explore_resources():
    """Get all books in the library"""
    books = list(db.books.find({}, {'_id': 0}))
    return books

@router.get("/borrowed-books/{user_id}")
async def get_borrowed_books(user_id: str):
    """Get borrowed books for a specific user"""
    borrowed_books = []
    borrowed_records = list(db.borrowed.find({'user_id': user_id}, {'_id': 0}))
    
    for record in borrowed_records:
        book = db.books.find_one({'id': record['book_id']}, {'_id': 0})
        if book:
            borrowed_books.append(book)
    return borrowed_books

@router.get("/favorites/{user_id}")
async def get_favorites(user_id: str):
    """Get favorite books for a specific user"""
    favorite_books = []
    favorite_records = list(db.favorites.find({'user_id': user_id}, {'_id': 0}))
    
    for record in favorite_records:
        book = db.books.find_one({'id': record['book_id']}, {'_id': 0})
        if book:
            favorite_books.append(book)
    return favorite_books

@router.get("/history/{user_id}")
async def get_history(user_id: str):
    """Get reading history for a specific user"""
    history_books = []
    history_records = list(db.history.find({'user_id': user_id}, {'_id': 0}))
    
    for record in history_records:
        book = db.books.find_one({'id': record['book_id']}, {'_id': 0})
        if book:
            history_books.append(book)
    return history_books

# Action endpoints
@router.post("/borrow-book/{user_id}/{book_id}")
async def borrow_book(user_id: str, book_id: int):
    """Borrow a book for a specific user"""
    # Check if book exists
    if not await check_book_exists(book_id):
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Check if already borrowed by this user
    existing_borrow = db.borrowed.find_one({
        'user_id': user_id,
        'book_id': book_id
    })
    if existing_borrow:
        raise HTTPException(status_code=400, detail="Book already borrowed by this user")

    db.borrowed.insert_one({'user_id': user_id, 'book_id': book_id})
    return {"message": "Book borrowed successfully"}


@router.post("/add-favorite/{user_id}/{book_id}")
async def add_favorite(user_id: str, book_id: int):
    """Add a book to user's favorites"""
    # Check if book exists
    if not await check_book_exists(book_id):
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Check if already in user's favorites
    existing_favorite = db.favorites.find_one({
        'user_id': user_id,
        'book_id': book_id
    })
    if existing_favorite:
        raise HTTPException(status_code=400, detail="Book already in user's favorites")

    db.favorites.insert_one({'user_id': user_id, 'book_id': book_id})
    return {"message": "Book added to favorites"}


@router.post("/add-to-history/{user_id}/{book_id}")
async def add_to_history(user_id: str, book_id: int):
    """Add a book to user's history"""
    # Check if book exists
    if not await check_book_exists(book_id):
        raise HTTPException(status_code=404, detail="Book not found")

    db.history.insert_one({'user_id': user_id, 'book_id': book_id})
    return {"message": "Book added to history"}

@router.post("/add-book")
async def add_book(book: Book):
    """Add a new book to the library"""
    # Check if book already exists
    existing_book = db.books.find_one({'id': book.id})
    if existing_book:
        raise HTTPException(status_code=400, detail="Book with this ID already exists")
        
    db.books.insert_one(book.dict())
    return {"message": "Book added successfully"}