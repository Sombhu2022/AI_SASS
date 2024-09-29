
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
      <body>
        
          <Header/>

        
          <div className="mt-3 flex justify-end mr-8">

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
        
           <main className="main-content p-4" >
          {children}
          </main>

      </body>
    </html>
  </ClerkProvider>
  );
}
