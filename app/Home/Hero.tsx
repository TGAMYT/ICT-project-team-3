"use client";
import Image from "next/image";
import BookOne from "@/public/BookOne.svg";
import stack from "@/public/stack.svg";
import addToLibrary from "@/public/Plus.svg";
import addToFavourites from "@/public/fav.svg";
import noImage from "@/public/no-image.jpg";
import seeMore from "@/public/right-arrow-backup-2-svgrepo-com.svg";
import Link from "next/link";
import books from "@/public/undraw_read-notes_7itt.svg";
import done from "@/public/done-mini-1484-svgrepo-com.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useName } from "../context/NameContext";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { app, db } from "../firebase";
import { useMatric } from "../context/MatricContext";
import { link } from "fs";

interface book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
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

const auth = getAuth(app);

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

function Hero() {
  const [resources, setResources] = useState<Array<book> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<Array<user>>([]);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [bookID, setBookID] = useState<number>();
  const [library, setLibrary] = useState<Array<number>>([]);
  const [oldlibrary, setOldLibrary] = useState<Array<book>>([]);
  const [added, setAdded] = useState<boolean>(false);
  const { matricNumber, setMatricNumber } = useMatric();
  const [test, setTest] = useState<boolean>(false);
  // alert(matricNumber);
  const router = useRouter();

  const { name, setUserName } = useName();
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

  useEffect(() => {
    const handleBorowedBooks = async (user_id: string, book_id: number) => {
      await fetch(
        `http://localhost:8000/borrow-book/${user_id}/${book_id}`,
        { method: "POST" } // Ensure you're using the correct HTTP method
      )
        .then(() => {
          // alert("success in adding book, ");
          setLibrary((prevID) => [...prevID, book_id]);
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
      handleBorowedBooks(String(matricNumber), bookID);
    }
  }, [test]);

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

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
      // setName(data
    }

    fetchData();
  }, []);

  const isAdded = (book_id: number) => {
    if (library) {
      for (let i: number = 0; i <= library?.length; i++) {
        return library[i] === book_id;
      }
    }
  };
  const isPreviouslyAdded = (book_id: number): boolean => {
    return oldlibrary?.some((book) => book.id === book_id);
  };

  const displayBooks = resources?.slice(0, 10);
  if (resources) {
    console.table(displayBooks);
  }

  const handleLibrary = (value: number) => {
    setBookID(value);
    if (test) {
      setTest(false);
    } else {
      setTest(true);
    }
  };

  const placeHolderArray = [1, 2, 3, 4, 5];
  const placeHolder = placeHolderArray.map((value: number) => {
    return (
      <section key={value} className="flex min-w-[400px] gap-4 min-h-[150px]">
        <section className="bg-gray-400 rounded-md">
          <section className="h-[150px] w-[120px] rounded-md"></section>
        </section>
        <section className="flex flex-col justify-between py-2">
          <section className="flex flex-col gap-2">
            <p className="font-semibold text-[1.3em] bg-gray-500 w-[150px] h-[10px] rounded-full "></p>
            <p className="bg-gray-500 w-[200px] h-[20px] rounded-full"></p>
          </section>
          <section className="bg-gray-500 w-[200px] h-[10px] rounded-full"></section>
        </section>
      </section>
    );
  });
  const displayBooksElement = displayBooks?.map((book: book, index: number) => {
    return (
      <section
        key={index}
        className="flex bg-[#FFCF99] rounded-md p-2 min-w-[400px] gap-4"
      >
        <section
          className="card__skeleton rounded-md"
          style={{ background: `url(${noImage})`, backgroundSize: "cover" }}
        >
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
          <section className="flex items-center gap-4">
            <section
              className="flex gap-2"
              onClick={() => handleLibrary(book.id)}
            >
              <Image
                src={isPreviouslyAdded(book.id) ? done : addToLibrary}
                width={30}
                height={30}
                alt="add to library"
              />
              <p className="font-semibold">Add to library</p>
            </section>
          </section>
        </section>
      </section>
    );
  });

  onAuthStateChanged(auth, (user: User | null) => {
    if (user && userData) {
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === user.email) {
          setUserName(userData[i].name);
          setMatricNumber(userData[i].matric);
          setCheckingAuth(false);
          break;
        }
      }
    } else {
      router.push("../");
    }
  });

  if (checkingAuth) {
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
    <div className="my-2 flex flex-col gap-[10em] z-10 my-6 ">
      <section className="bg-[#899878] rounded-[32px] p-[2em]  flex justify-between ">
        <section className="flex flex-col justify-between">
          <section className="flex flex-col justify-between">
            <h1 className="font-bold">Hi, {name ? name : "Reader"}</h1>
            <p className="font-extrabold text-[3em] text-[black]  ">
              Welcome to bells E-library
            </p>
            <p className="font-semibold py-2 ">
              Get multiple books from various departments:
            </p>

            <section className="flex gap-10 py-6">
              <p>COLENVS</p>
              <p>COLFAST</p>
              <p>COLENG</p>
              <p>COLMANS</p>
              <p>COLFAST</p>
            </section>
          </section>
        </section>
        {/* <section>
          <Image src={books} alt="" width={600} height={200} />
        </section> */}
      </section>
    </div>
  );
}

export default Hero;
