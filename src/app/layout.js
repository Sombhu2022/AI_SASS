
import "./globals.css";


import Header from "@/components/Header";

export const metadata = {
  title: "Ai - SASS project",
  description: "this is my first Ai generation app...",
};


export default function RootLayout({ children }) {


  return (
    
  
    <html lang="en">
      <body>
        
          <Header/>

        
          <div className="hidden ml-64 md:flex justify-between border bg-gray-700/10 border-gray-700 rounded-md p-5">

         <h2 className="px-3 py-1 bg-yellow-600/15 border border-yellow-600 rounded-md "> BETA version lanched</h2>
        
          {/* profile section */}

          </div>
        
           <main className="main-content p-4" >
          {children}
          </main>

      </body>
    </html>

  );
}
