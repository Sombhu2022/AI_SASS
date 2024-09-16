
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Header from "@/components/Header";

export const metadata = {
  title: "Ai - SASS project",
  description: "this is my first Ai generation app...",
};


export default function RootLayout({ children }) {


  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans`}>
         <Header/>
       
          <main className="main-content p-4">
            <div className="w-full mr-5 hidden justify-end md:flex">
              {/* Authentication Section */}
              <div className="mt-4 px-6">
                <SignedOut>
                  <SignInButton className="py-2 px-5 border rounded-xl text-gray-800 bg-gray-200" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
