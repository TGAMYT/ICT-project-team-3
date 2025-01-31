from pymongo import MongoClient
import os

connection_string = os.environ.get('PASSWORD')

# MongoDB connection
client = MongoClient('mongodb+srv://osesojehssp:cloudshelfpassword@cloudshelf.05kcj.mongodb.net/?retryWrites=true&w=majority&appName=CloudShelf')
db = client['elibrary']

def seed_books():
    # Sample book data
    books = [
        {'id': 1,'title': 'Machine Learning: A Probabilistic Perspective', 'author': 'Kevin P. Murphy', 'description': 'An introduction to probabilistic machine learning.', 'image': 'https://placekitten.com/200/399'},
        {'id': 2, 'title': 'Clean Code', 'author': 'Robert C. Martin', 'description': 'A Handbook of Agile Software Craftsmanship.', 'image': 'https://spin.atomicobject.com/wp-content/uploads/Clean-Code.jpg','link': 'https://www.scribd.com/document/768715748/Clean-Code' },
        {'id': 3, 'title': 'The Pragmatic Programmer', 'author': 'Andrew Hunt and David Thomas', 'description': 'Tips and techniques for software development.', 'image': 'https://i.pinimg.com/736x/81/21/dc/8121dc48ec937ecf919bc2c54aa961a4.jpg', 'link': 'https://www.google.com.ng/books/edition/The_Pragmatic_Programmer/5wBQEp6ruIAC?hl=en&gbpv=0'},
        {'id': 4, 'title': 'Design Patterns: Elements of Reusable Object-Oriented Software', 'author': 'Erich Gamma et al.', 'description': 'A guide to software design patterns.', 'image': 'https://i.pinimg.com/736x/82/bf/dc/82bfdc2debbb46293e2c2444c4311c05.jpg','link':'chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf'},
        {'id': 5, 'title': 'Artificial Intelligence: A Modern Approach', 'author': 'Stuart Russell and Peter Norvig', 'description': 'Comprehensive introduction to AI.', 'image': 'https://placekitten.com/200/304'},
        {'id': 6, 'title': 'The Art of Computer Programming', 'author': 'Donald E. Knuth', 'description': 'A comprehensive monograph on algorithms.', 'image': 'https://placekitten.com/200/305'},
        {'id': 7, 'title': 'Code Complete', 'author': 'Steve McConnell', 'description': 'A practical guide to software construction.', 'image': 'https://placekitten.com/200/306'},
        {'id': 8, 'title': 'Introduction to Algorithms', 'author': 'Thomas H. Cormen et al.', 'description': 'Comprehensive textbook on algorithms.', 'image': 'https://placekitten.com/200/307'},
        {'id': 9, 'title': 'Computer Networking: A Top-Down Approach', 'author': 'James Kurose and Keith Ross', 'description': 'Introduction to computer networking.', 'image': 'https://placekitten.com/200/308'},
        {'id': 10, 'title': 'The Mythical Man-Month', 'author': 'Frederick P. Brooks Jr.', 'description': 'Reflections on software engineering management.', 'image': 'https://placekitten.com/200/309'},
        {'id': 11, 'title': 'You Don\'t Know JS', 'author': 'Kyle Simpson', 'description': 'A series on JavaScript programming.', 'image': 'https://placekitten.com/200/310'},
        {'id': 12, 'title': 'Deep Learning', 'author': 'Ian Goodfellow et al.', 'description': 'Comprehensive guide to deep learning.', 'image': 'https://placekitten.com/200/311'},
        {'id': 13, 'title': 'Computer Vision: Algorithms and Applications', 'author': 'Richard Szeliski', 'description': 'A comprehensive guide to computer vision.', 'image': 'https://placekitten.com/200/312'},
        {'id': 14, 'title': 'The Clean Coder', 'author': 'Robert C. Martin', 'description': 'A code of conduct for professional programmers.', 'image': 'https://placekitten.com/200/313'},
        {'id': 15, 'title': 'Introduction to Machine Learning', 'author': 'Ethem Alpaydin', 'description': 'An overview of machine learning concepts.', 'image': 'https://placekitten.com/200/314'},
        {'id': 16, 'title': 'Artificial Intelligence for Humans', 'author': 'Jeff Heaton', 'description': 'An introduction to AI concepts.', 'image': 'https://placekitten.com/200/315'},
        {'id': 17, 'title': 'Computer Architecture: A Quantitative Approach', 'author': 'John L. Hennessy and David A. Patterson', 'description': 'In-depth study of computer architecture.', 'image': 'https://placekitten.com/200/316'},
        {'id': 18, 'title': 'The Algorithm Design Manual', 'author' : 'Jeffrey S. Vitter', 'description': 'A comprehensive guide to algorithm design.', 'image': 'https://placekitten.com/200/317'},

        {'id': 19, 'title': 'Elements of Programming Interviews', 'author': 'Adnan Aziz et al.', 'description': 'A guide to programming interview questions.', 'image': 'https://placekitten.com/200/318'},

        {'id': 20, 'title': 'Introduction to the Theory of Computation', 'author': 'Michael Sipser', 'description': 'Fundamentals of computation theory.', 'image': 'https://placekitten.com/200/319'},

        {'id': 21, 'title': 'Artificial Intelligence: Foundations of Computational Agents', 'author': 'David L. Poole and Alan K. Mackworth', 'description': 'A comprehensive introduction to AI.', 'image': 'https://placekitten.com/200/320'},

        {'id': 22, 'title': 'Computer Graphics: Principles and Practice', 'author': 'John F. Hughes et al.', 'description': 'A foundational text on computer graphics.', 'image': 'https://placekitten.com/200/321'},

        {'id': 23, 'title': 'Operating System Concepts', 'author': 'Abraham Silberschatz et al.', 'description': 'A comprehensive guide to operating systems.', 'image': 'https://placekitten.com/200/322'},

        {'id': 24, 'title': 'Database System Concepts', 'author': 'Abraham Silberschatz et al.', 'description': 'An introduction to database systems.', 'image': 'https://placekitten.com/200/323'},

        {'id': 25, 'title': 'Computer Networks', 'author': 'Andrew S. Tanenbaum', 'description': 'A comprehensive introduction to networking.', 'image': 'https://placekitten.com/200/324'},

        {'id': 26, 'title': 'Introduction to the Theory of Computation', 'author': 'Michael Sipser', 'description': 'Fundamentals of computation theory.', 'image': 'https://placekitten.com/200/325'},

        {'id': 27, 'title': 'Software Engineering at Google', 'author': 'Titania McGrath et al.', 'description': 'Insights into software engineering practices at Google.', 'image': 'https://placekitten.com/200/326'},

        {'id': 28, 'title': 'The Art of Electronics', 'author': 'Paul Horowitz and Winfield Hill', 'description': 'A comprehensive guide to electronics.', 'image': 'https://placekitten.com/200/327'},

        {'id': 29, 'title': 'Introduction to Quantum Computing', 'author': 'Michael A. Nielsen and Isaac L. Chuang', 'description': 'An introduction to quantum computing concepts.', 'image': 'https://placekitten.com/200/328'},

        {'id': 30, 'title': 'Computer Security: Principles and Practice', 'author': 'William Stallings and Lawrie Brown', 'description': 'A comprehensive guide to computer security.', 'image': 'https://placekitten.com/200/329'},

        
    ]

    try:
        # Drop existing books collection to start fresh
        db.books.drop()
        
        # Insert the sample books
        result = db.books.insert_many(books)
        
        print(f"Successfully seeded {len(result.inserted_ids)} books")
        return True
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
        return False

if __name__ == "__main__":
    seed_books()