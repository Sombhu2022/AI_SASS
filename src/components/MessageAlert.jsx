"use client"
import Notify from "@/utils/NotificationManager";
import { useEffect, useState } from "react";

function MessageAlert() {

  const [customBgColor, setCustomBgColor] = useState("bg-green-500 hover:bg-green-700");
  const [customColor, setCustomColor] = useState("text-green-600");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [progress, setProgress] = useState(0); // Initially at 0%, will increase

  
  useEffect(() => {
    // Register the function to show notification
      Notify.register((msg, alertType) => {
      setMessage(msg);
      setType(alertType);
      setIsShow(true);

      setProgress(0)
    });
  }, []);



  useEffect(() => {
    if (type === "error") {
      setCustomBgColor("bg-red-500 hover:bg-red-700");
      setCustomColor("text-red-600");
    } else if (type === "info") {
      setCustomBgColor("bg-orange-500 hover:bg-orange-700");
      setCustomColor("text-orange-600");
    }

    // Start countdown to increase progress bar over 10 seconds
    const duration = 7; // 10 seconds for demo
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop when progress reaches 100%
          setIsShow(false); // Hide popup when progress is complete
        }
        return prev + (100 / duration); // Increase by 1/10th every second
      });
    }, 1000); // Increment every second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [type , message , isShow]);

  // console.log(type , isShow , message);


  return (
    <>
      {isShow ? (
        <div className="fixed bottom-2 right-2 z-50">
          <div className="bg-white rounded-md shadow-lg p-2 max-w-md text-center relative">
            <div className="flex gap-3 justify-center items-center mb-3">
              {/* Outer div with responsive size */}
              <div className="border-x-2 animate-boredr-spin border-x-pink-600 rounded-full  flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32">
                {/* Inner div with fixed border */}
                <div className="border-8 border-gray-600/10 rounded-full flex items-center justify-center">
                  {/* Image with responsive size */}
                  <img
                    src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1728065731/thik-ai/i0litri1ulckbyqgq44b.png"
                    alt="Logo"
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-6 border-gray-800"
                  />
                </div>
              </div>

              <div className="flex-1">
                {/* Close button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsShow(false);
                    }}
                  >
                    <span className="text-3xl text-black mt-3">&times;</span>
                  </button>
                </div>
                {/* Custom message */}
                <p className={`${customColor} text-gray-600 mb-6`}>{message}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-white">
              <div
                className={`h-full ${customBgColor} transition-all duration-1000`}
                style={{ width: `${progress}%` }} // Adjust width based on progress
              ></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MessageAlert;
