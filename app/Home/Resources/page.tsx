"use client";
import SearchBar from "@/app/SearchBar";
import { useState, useEffect } from "react";
import Image from "next/image";
import addToLibrary from "@/public/plus-square-svgrepo-com.svg";
import done from "@/public/tick-box-delivery-check-approved-confirm-accept-svgrepo-com.svg";
import addToFavorites from "@/public/fav.svg";
import { app, db } from "@/app/firebase";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMatric } from "@/app/context/MatricContext";

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
  console.log(data);
  return data;
}

function page() {
  const [resources, setResources] = useState<Array<book> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<user[]>();
  const [oldlibrary, setOldLibrary] = useState<Array<book>>([]);
  const [added, setAdded] = useState<boolean>(false);
  const [bookID, setBookID] = useState<number>();
  const [library, setLibrary] = useState<Array<number>>([]);
  const { matricNumber, setMatricNumber } = useMatric();
  // alert(matricNumber);
  const [test, setTest] = useState<boolean>(false);
  const router = useRouter();
  const auth = getAuth(app);
  useEffect(() => {
    async function fetchData() {
      const data: user[] = await fetchDataFromFirestore();
      setUserData(data);
      // setName(data
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
      }
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:8000/explore-resources")
        .then((res) => res.json())
        .then((data: book[]) => {
          setResources(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  // !adding data to library
  useEffect(() => {
    const handleBorowedBooks = async (book_id: number) => {
      await fetch(
        `http://localhost:8000/borrow-book/${matricNumber}/${book_id}`,
        { method: "POST" } // Ensure you're using the correct HTTP method
      )
        .then(() => {
          // alert("success in adding book, ");
          setLibrary((prevID) => [...prevID, book_id]);
          // const newBook = resources?.find((book) => book.id === book_id);
          const newBook = resources?.find((book) => book.id === book_id);
          if (newBook) {
            setOldLibrary((prev) => [...prev, newBook]);
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
    if (bookID) {
      handleBorowedBooks(bookID);
    }
  }, [test]);

  // !check library
  useEffect(() => {
    const checkLibrary = async () => {
      if (matricNumber) {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/borrowed-books/${matricNumber}`
          );
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          const data: book[] = await res.json(); // Assuming the API returns an array of books
          setOldLibrary(data); // Ensure `setLibrary` expects this type

          console.log(bookID);
        } catch (error) {
          console.error("Failed to fetch library data:", error);
        }
      }
    };

    checkLibrary(); // Replace 123 with the actual `user_id`
  }, [matricNumber, test]);
  const isPreviouslyAdded = (book_id: number): boolean => {
    return oldlibrary?.some((book: book) => book.id === book_id);
  };

  const resourcesElement = resources?.map((book: book, index: number) => {
    return (
      <section key={index} className="flex text-[#222725] w-[400px] gap-4 ">
        <section className="bg-gray-400 rounded-md">
          <section
            className="h-[150px] min-w-[120px] rounded-md"
            style={{
              background: `url(${book.image})`,
              backgroundSize: "cover",
            }}
          ></section>
        </section>
        <section className="flex flex-col justify-between">
          <section>
            <p className="font-semibold text-[1.3em]">{book.title}</p>
            <p>{book.description}</p>
          </section>
          <section className="flex items-center gap-2">
            <section
              className="flex gap-2"
              onClick={() => handleLibrary(book.id)}
            >
              <Image
                src={isPreviouslyAdded(book.id) ? done : addToLibrary}
                width={20}
                height={20}
                alt="add to library"
              />
              <p className="font-semibold">Add to library</p>
            </section>
          </section>
        </section>
      </section>
    );
  });

  const handleLibrary = (value: number) => {
    setBookID(value);
    if (test) {
      setTest(false);
    } else {
      setTest(true);
    }
  };

  if (loading) {
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
      <section>{/* <ssssSearchBar /> */}</section>
      <section className="flex my-7 flex-wrap gap-4 max-h-[90vh] overflow-y-auto">
        {resourcesElement}
      </section>
    </div>
  );
}

export default page;
