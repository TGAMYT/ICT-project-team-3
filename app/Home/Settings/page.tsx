"use client";
import React from "react";
import { signOut, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const auth = getAuth(app);
  const router = useRouter();
  const [checking, setChecking] = useState<boolean>(true);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("../../");
    } catch (err) {
      console.log("error signing out:", err);
    }
  };
  onAuthStateChanged(auth, (user: User | null) => {
    if (!user) {
      router.push("../");
    } else {
      setChecking(false);
    }
  });

  if (checking) {
    return (
      /* From Uiverse.io by vk-uiux */
      <section className="w-[100%] h-[80vh] flex items-center justify-center">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    );
  }
  return (
    <div className="r">
      <button
        type="button"
        onClick={handleSignOut}
        className="bg-[#FFCF99] text-white px-2 rounded-md"
      >
        Log Out
      </button>
    </div>
  );
}

export default page;
