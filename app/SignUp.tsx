"use client";
import Image from "next/image";
import image from "@/public/undraw_like-post_s3wo.svg";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import LogInForm from "./LogInForm";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "./firebase";
import { useRouter } from "next/navigation";

function SignUp() {
  const [prevUser, setPrevUser] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const router = useRouter();
  const auth = getAuth(app);
  const handlePrevUser = () => {
    if (prevUser) {
      setPrevUser(false);
    } else {
      setPrevUser(true);
    }
  };

  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      router.push("./Home");
      // setCheckingAuth(false);
    } else {
      setCheckingAuth(false);
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
  } else {
    return (
      <>
        <section className="flex justify-between px-[2.5em] py-[2em]">
          <section>
            {prevUser ? (
              <section></section>
            ) : (
              <h1 className="text-[1.5em]  font-bold"></h1>
            )}
            <section className="">
              {prevUser ? <LogInForm /> : <SignUpForm />}
            </section>
            <section className="text-center text-[black]">
              <p>
                {prevUser ? " Don't have an account?" : "Have an account?"}{" "}
                <span
                  onClick={handlePrevUser}
                  className="cursor-default text-[#0F3DDE]"
                >
                  {prevUser ? "sign up" : "sign in"}
                </span>
              </p>
            </section>
          </section>
          <section>
            <Image
              src={image}
              height={400}
              width={600}
              alt="sign up or log in"
            />
          </section>
        </section>
      </>
    );
  }
}

export default SignUp;
