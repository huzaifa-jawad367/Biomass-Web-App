"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function HeaderAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, [supabase.auth]); // Add supabase.auth as a dependency to resolve the warning

  useEffect(() => {
    fetchSurveys()
  },[])
  
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      setUser(null); // update local state
      redirect("/sign-in");
    }
  };

  const fetchSurveys = async () => {
    try{
      const response = await fetch("/api/biomass");

      console.log("response", response);

    }catch (error) {
      console.error("Error fetching surveys:", error);
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Earth Engine", path: "/engine" },
    {label:"Surveys", path:"/survey"},
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900">
      <nav className="flex mx-auto px-4 sm:px-6 lg:px-auto justify-between items-center h-16 md:h-20 max-w-7xl">
        <Link href="/" className="text-2xl font-bold text-white">AI-ForCaST</Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="text-base text-white font-semibold hover:text-indigo-500"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button className="text-gray-700 text-base bg-white hover:bg-white-200" onClick={toggleProfileMenu}>
                Hey, {user.email?.split("@")[0]}!
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMenu}
        >
          <div
            className="absolute right-0 top-0 w-64 h-full bg-white shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            <ul className="flex flex-col gap-2 mt-10">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="block text-lg font-medium text-gray-700 hover:text-indigo-600"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {user ? (
                <>
                  <button  className="text-sm text-gray-700 mb-2 bg-white" onClick={toggleProfileMenu}>
                    Hey, {user.email?.split("@")[0]}!
                  </button>
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline">
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                  <Button asChild variant="default">
                    <Link href="/sign-up">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleProfileMenu}
        >
          <div
            className="absolute right-0 top-0 w-64 h-full bg-white shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
              onClick={toggleProfileMenu}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            <ul className="flex flex-col gap-2 mt-10">
              <li>
                <Link
                  href="/profile"
                  className="block text-lg font-medium text-gray-700 hover:text-indigo-600"
                  onClick={toggleProfileMenu}
                >
                  Profile
                </Link>
              </li>
              {}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
