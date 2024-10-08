
import MessageAlert from "@/components/MessageAlert";
import "./globals.css";


import Header from "@/components/Header";

export const metadata = {
  title: "ThinkCraft-ai your Learning Helper ... ",
  description: "this is my first Ai generation app...",
};


export default function RootLayout({ children }) {


  return (
    
  
    <html lang="en">
      <body>

        {/* inisialize message alert component  */}

          <MessageAlert/>
          <Header/>

         {/* nav section */}
          <div className="hidden ml-64 md:flex justify-between border bg-gray-700/10 border-gray-700 rounded-md p-5 mb-8">

         <h2 className="px-3 py-1 bg-yellow-300/10 rounded-full text-yellow-300 "> Beta version</h2>
        
          {/* profile section */}

          </div>
        
           <main className="main-content p-0" >
            
          {children}
          </main>

      </body>
    </html>

  );
}
