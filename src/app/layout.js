'use client';

import MessageAlert from "@/components/MessageAlert";
import "./globals.css";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Link from 'next/link';
import StoreProvider from "./StoreProvider";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserProfile } from "@/store/user/userController";

function Content({ children }) {
  
  const dispatch = useDispatch();
  const { user , isAuthenticated } = useSelector((state)=> state.user)

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, [dispatch]);

  return (
    <>
      <MessageAlert />
      <Header />
      <div className="hidden ml-64 md:flex justify-between border bg-gray-700/10 border-gray-700 rounded-md p-5 mb-8">
        <h2 className="px-3 py-1 bg-yellow-300/10 rounded-full text-yellow-300 "> Beta Version </h2>
        <div className="flex items-center gap-2 text-white ">
          {/* profile section */}
          {isAuthenticated ? (
              <Link href={"/profile"}>
                <img
                  src={user?.profile_pic?.url}
                  className="h-6 w-6 rounded-full"
                />
              </Link>
            ) : (
              <Link
                href={"/sign-in"}
                className="rounded-md hover:text-white hover:bg-slate-600 bg-white text-black py-2 px-5"
              >
                Login
              </Link>
            )}
        </div>
      </div>
      <main className="main-content p-0">
        {children}
      </main>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Content>{children}</Content>
        </StoreProvider>
      </body>
    </html>
  );
}
