"use client";
import HeaderAuth from "./headerAuth";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function AuthenticatedLayout({ children }) {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  // Fetch user on component mount using useEffect
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, [supabase]); // Only re-run if supabase changes (although it's stable, can be omitted in this case)

  // If user is not found, redirect to sign-in page
  useEffect(() => {
    if (!user) {
      redirect("/sign-in");
    }
  }, [user]); // Run only when user state changes

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Reset user state
    redirect("/sign-in"); // Redirect to sign-in
  };

  return (
    <>
      <HeaderAuth handleSignOut={handleSignOut} user={user} setUser={setUser} />
      {children}
    </>
  );
}
