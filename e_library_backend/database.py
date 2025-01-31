from pymongo import MongoClient
from typing import List, Optional
import os

connection_string = os.environ.get('PASSWORD')


# MongoDB connection (using localhost for prototype)
client = MongoClient('mongodb+srv://osesojehssp:cloudshelfpassword@cloudshelf.05kcj.mongodb.net/?retryWrites=true&w=majority&appName=CloudShelf')
db = client['elibrary']

