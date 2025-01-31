"use client";
import { useState } from "react";
import Image from "next/image";
import google from "@/public/google-svgrepo-com.svg";
import apple from "@/public/apple-logo.svg";
import { app, db } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useName } from "./context/NameContext";
import { useMatric } from "./context/MatricContext";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [matric, setMatric] = useState<string>("");
  const { setMatricNumber } = useMatric();
  const auth = getAuth(app);
  const { setUserName } = useName();

  async function addData(
    email: string,
    password: string,
    matric: string,
    name: string
  ) {
    try {
      await addDoc(collection(db, "credentials"), {
        password: password,
        email: email,
        matric: matric,
        name: name,
      });
    } catch (error) {
      alert(error);
      return false;
    }
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleMatric = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatric(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const matricRegex = /^\d{4}\-\d{5}$/;
    if (
      email !== "" &&
      password !== "" &&
      name !== "" &&
      matric !== "" &&
      matricRegex.test(matric)
    ) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          addData(email, password, matric, name);
          setUserName(name);
          setMatricNumber(matric);
          router.push("./Home");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("email/password must not be empty");
    }
    if (!matricRegex.test(matric)) {
      alert("error");
    }
  };
  return (
    <form
      action=""
      className="my-2 min-w-[350px] text-[black] flex flex-col justify-between gap-[2em] "
      onSubmit={(e) => handleSubmit(e)}
    >
      <section className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            id="name"
            onChange={(e) => handleName(e)}
            className="border px-2 py-1 rounded-md border-[#D9D9D9] text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="matriculation" className="">
            Matric Number
          </label>
          <input
            type="text"
            name="name"
            placeholder="enter your matric number eg (2022-11094)"
            id="matriculation"
            onChange={(e) => handleMatric(e)}
            className="border px-2 py-1 rounded-md border-[#D9D9D9] text-black "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="enter your email address"
            id="email"
            onChange={(e) => handleEmail(e)}
            className="border px-2 py-1 rounded-md border-[#D9D9D9] text-black "
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
            className="border px-2 py-1 rounded-md border-[#D9D9D9] text-black "
          />
        </div>
        <button
          type="submit"
          className=" rounded-lg py-1 bg-[#222725] text-white font-semibold"
        >
          Signup
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

export default SignUpForm;
