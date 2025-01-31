"use client";
import SearchBar from "@/app/SearchBar";
import { app, db } from "@/app/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMatric } from "@/app/context/MatricContext";
import addToFavorites from "@/public/fav.svg";
import addedToFav from "@/public/fav-heart.svg";
import Image from "next/image";
import Link from "next/link";

interface book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  link: string;
}

interface messages {
  email: string;
  id: string;
  matric: string;
  password: string;
  name: string;
}

type user = {
  matric: string;
  email: string;
  password: string;
  name: string;
};

async function fetchDataFromFirestore(): Promise<messages[]> {
  const query = await getDocs(collection(db, "credentials"));
  const data: messages[] = [];
  query.forEach((doc) => {
    const docData = doc.data();
    if (
      typeof docData.email === "string" &&
      typeof docData.matric === "string" &&
      typeof docData.password === "string"
    ) {
      data.push({
        id: doc.id,
        email: docData.email,
        matric: docData.matric,
        password: docData.password,
        name: docData.name,
      });
    } else {
      console.warn(`Invalid data format in document ID: ${doc.id}`, docData);
    }
  });
  // console.log(data);
  return data;
}

function page() {
  const router = useRouter();
  // const [resources, setResources] = useState<Array<book> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<user[]>();
  const [oldlibrary, setOldLibrary] = useState<Array<book>>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Array<book>>([]);
  const [library, setLibrary] = useState<Array<number>>([]);
  const [updatedFavoriteBooks, setUpdatedFavoriteBooks] = useState<book[]>([]);
  const [history, setHistory] = useState<book[]>([]);
  const [bookID, setBookID] = useState<number>();
  const [historyBookID, sethistoryBookID] = useState<number>();
  const { matricNumber, setMatricNumber } = useMatric();
  const auth = getAuth(app);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }

    fetchData();
  }, []);

  onAuthStateChanged(auth, (user: User | null) => {
    if (!user) {
      router.push("../");
    } else {
      if (userData) {
        for (let i: number = 0; i <= userData?.length; i++) {
          if (user.email === userData[i]?.email) {
            setMatricNumber(userData[i].matric);
          }
        }
        setChecking(false);
      }
    }
  });

  useEffect(() => {
    const fetchLibrary = async () => {
      if (matricNumber) {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/borrowed-books/${matricNumber}`
          );
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          const data: book[] = await res.json(); // Assuming the API returns an array of books
          console.log("Fetched library data:", data); // Debug log
          setOldLibrary(data); // Ensure `setLibrary` expects this type
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch library data:", error);
        }
      } else {
        console.warn("matricNumber is not set");
      }
    };

    fetchLibrary();
  }, [matricNumber]); // Ensure matricNumber is in dependencies

  // !handling fav
  useEffect(() => {
    const handleFavoriteBooks = async (user_id: string, book_id: number) => {
      await fetch(
        `http://localhost:8000/add-favorite/${user_id}/${book_id}
`,
        { method: "POST" } // Ensure you're using the correct HTTP method
      )
        .then(() => {
          // alert("success in adding book, ");
          setLibrary((prevID) => [...prevID, book_id]);
          const newBook = favoriteBooks?.find((book) => book.id === book_id);
          if (newBook) {
            setFavoriteBooks((prev) => [...prev, newBook]);
            console.log("Updated favoriteBooks:", [...favoriteBooks, newBook]); // Debugging
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (bookID) {
      handleFavoriteBooks(String(matricNumber), bookID);
    }
  }, [bookID]);

  // !handling history
  useEffect(() => {
    const handleHistoryBooks = async (user_id: string, book_id: number) => {
      await fetch(
        `http://localhost:8000/add-to-history/${user_id}/${book_id}
`,
        { method: "POST" } // Ensure you're using the correct HTTP method
      )
        .then(() => {
          // alert("success in adding book, ");
          // setHistory((prevID) => [...prevID, book_id]);
          const newHistoryBook = history?.find((book) => book.id === book_id);
          if (newHistoryBook) {
            setHistory((prev) => [...prev, newHistoryBook]);
            // console.log("Updated favoriteBooks:", [...favorit, newBook]); // Debugging
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (historyBookID) {
      handleHistoryBooks(String(matricNumber), historyBookID);
    }
  }, [historyBookID]);

  // !fetching the favorites
  useEffect(() => {
    const fetchFavoriteLibrary = async () => {
      if (matricNumber) {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/favorites/${matricNumber}`
          );
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          const data: book[] = await res.json(); // Assuming the API returns an array of books
          console.log("Fetched library data:", data); // Debug log
          setUpdatedFavoriteBooks(data); // Ensure `setLibrary` expects this type
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch library data:", error);
        }
      } else {
        console.warn("matricNumber is not set");
      }
    };

    fetchFavoriteLibrary();
  }, [matricNumber, updatedFavoriteBooks]); // Ensure matricNumber is in dependencies

  // !Function to

  const isPreviouslyFavorited = (book_id: number): boolean => {
    // alert(favoriteBooks?.some((book: book) => book.id === book_id));

    // if(updatedFavoriteBooks)
    return updatedFavoriteBooks.some((book: book) => book.id === book_id);
  };
  const handleFavoriteBookToggle = (book: book) => {
    const isFavorite = isPreviouslyFavorited(book.id);

    if (!isFavorite) {
      // Add to favorites
      setBookID(book.id); // Trigger API call in useEffect
      setFavoriteBooks((prev) => [...prev, book]); // Update local state
    } else {
      // Remove from favorites (if this functionality is desired)
      setFavoriteBooks((prev) =>
        prev.filter((favBook) => favBook.id !== book.id)
      );
      setLibrary((prevID) => prevID.filter((id) => id !== book.id)); // Update library
    }
  };

  const handleHistoryBook = (id: number) => {
    sethistoryBookID(id);
  };

  const skeleton: Array<number> = [1, 2, 3, 4, 5, 6];
  const skeletonPlaceholder = skeleton.map((number: number) => {
    return (
      <section key={number} className="flex w-[400px] gap-4 ">
        <section className="bg-gray-400 h-[150px] w-[] rounded-md">
          <section
            className="h-[150px] min-w-[120px] rounded-md"
            style={{
              //  background: `url(${book.image})`,
              backgroundSize: "cover",
            }}
          ></section>
        </section>
        <section className="flex flex-col justify-between py-4">
          <section className="flex flex-col gap-2">
            <p className="font-semibold bg-gray-400 w-[200px] h-[10px] text-[1.3em]"></p>
            <p className="w-[150px] h-[20px] "></p>
          </section>
          <section className="flex items-center gap-2 h-[10px] w-[10px] bg-gray-400"></section>
        </section>
      </section>
    );
  });

  const libraryElement = oldlibrary.map((book: book, index: number) => {
    return (
      <section
        key={index}
        className="flex w-[400px] text-[#222725]  p-2 rounded-xl gap-4 "
      >
        <section className="bg-gray-400 rounded-md">
          <section
            className="min-h-[180px] min-w-[120px] rounded-md"
            style={{
              backgroundImage: `url(${book.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></section>
        </section>
        <section className="flex flex-col justify-between">
          <section>
            <p className="font-semibold text-[1.3em]">{book.title}</p>
            <p>{book.description}</p>
          </section>
          <section>
            <Link
              href={
                "https://drive.google.com/file/d/1zZt3dvHwle9N5k67R0LWIftnGzm6zbeo/view?usp=sharing"
              }
            >
              <p
                className="cursor-pointer text-[#3772ff]"
                onClick={() => {
                  handleHistoryBook(book.id);
                }}
              >
                Read here
              </p>
            </Link>
          </section>
        </section>
      </section>
    );
  });

  if (checking) {
    return (
      /* From Uiverse.io by vinodjangid07 */
      <div className="loader">
        <div className="book">
          <div className="page"></div>
          <div className="page page2"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <section>
        {/* <SearchBar /> */}
        <section className="flex flex-wrap gap-4 my-3 max-h-[92vh] overflow-auto ">
          {loading ? skeletonPlaceholder : libraryElement}
        </section>
      </section>
    </div>
  );
}

export default page;
