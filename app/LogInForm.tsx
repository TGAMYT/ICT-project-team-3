"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// import image from "@/public/bro.svg";
import google from "@/public/google-svgrepo-com.svg";
import apple from "@/public/apple-logo.svg";
import { db, app } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useName } from "./context/NameContext";

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

function LogInForm() {
  // const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [matric, setMatric] = useState<string>("");
  const [userData, setUserData] = useState<Array<user>>([]);
  const router = useRouter();
  // console.log(name);

  const { setUserName } = useName();

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
  const auth = getAuth(app);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
      // setName(data
    }

    fetchData();
  }, []);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleMatric = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatric(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matric !== "" && password !== "") {
      let foundEmail = "";
      for (const i in userData) {
        if (matric === userData[i].matric) {
          foundEmail = userData[i].email;
          // setName(userData[i].name);
          // console.log(userData[i].name);

          setUserName(userData[i].name);
          // console.log(foundEmail);

          break;
        }
      }

      if (foundEmail === "" || foundEmail === null) {
        alert("Matric number not found.");
        // setLoading(false);
        return;
      }

      signInWithEmailAndPassword(auth, foundEmail, password)
        .then(() => {
          //  setLoading(false);
          // setMatricExport(matric);
          router.push("./Home");
        })
        .catch((err) => {
          alert(err);
          //  setLoading(false);
        });
    } else {
      alert("input all necessary fields");
    }
  };
  return (
    <form
      action=""
      className="my-10 min-w-[350px] flex flex-col text-black justify-between gap-[2em] "
      onSubmit={(e) => handleSubmit(e)}
    >
      <section className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="matriculation" className="">
            Matric Number
          </label>
          <input
            type="text"
            name="name"
            placeholder="enter your matric number"
            id="matriculation"
            onChange={(e) => handleMatric(e)}
            className="border px-2 py-1 rounded-md border-[#D9D9D9] "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            name="name"
            placeholder="enter your Password"
            id="name"
            onChange={(e) => handlePassword(e)}
            className="border px-2 py-1 rounded-md border-[#D9D9D9] "
          />
        </div>
        <button
          type="submit"
          className=" rounded-lg py-1 bg-[#222725] text-white font-semibold"
        >
          Login
        </button>
      </section>
      <section className="flex items-center gap-3">
        <div className="w-[100%] border"></div>
        <p className="translate-y-[-2px]">or</p>
        <div className="w-[100%] border"></div>
      </section>
    </form>
  );
}

export default LogInForm;
