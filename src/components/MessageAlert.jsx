import { useEffect, useState } from "react";

function MessageAlert({
  message = "Your custom message here",
  type = "success",
}) {
  const [customBgColor, setCustomBgColor] = useState(
    "bg-green-500 hover:bg-green-700"
  );
  const [customColor, setCustomColor] = useState("text-green-600");
  const [isShow, setIsShow] = useState(true);
  const [progress, setProgress] = useState(0); // Initially at 0%, will increase

  useEffect(() => {
    if (type === "error") {
      setCustomBgColor("bg-red-500 hover:bg-red-700");
      setCustomColor("text-red-600");
    } else if (type === "info") {
      setCustomBgColor("bg-orange-500 hover:bg-orange-700");
      setCustomColor("text-orange-600");
    }

    // Start countdown to increase progress bar over 60 seconds
    const duration = 10; // 1 minute
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop when progress reaches 100%
          setIsShow(false); // Hide popup when progress is complete
        }
        return prev + (100 / duration); // Increase by 1/60th every second
      });
    }, 1000); // Increment every second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [type]);

  return (
    <>
      {isShow ? (
        <div className="popup-container-without-blur fixed bottom-0 right-2 z-50">
          <div className="bg-white rounded-md shadow-lg p-2 max-w-md text-center relative">
            <div className="flex gap-3 mb-3">
              {/* Logo with blinking border */}
              <div className="p-1 border-8 border-gray-200 rounded-full border-blinking w-24">
              <img
                src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1728065731/thik-ai/i0litri1ulckbyqgq44b.png"
                alt="Logo"
                className="w-20 mx-auto border-6 rounded-full mr-5 border-blinking shadow-[0_4px_6px_rgba(0,0,0,0.1),_0_2px_4px_rgba(0,0,0,0.06)]" // Custom shadow              />
                 />

              </div>
                 
              <div>
                {/* Close button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsShow(false);
                    }}
                    className=""
                  >
                    <span className="text-3xl text-black mt-3">&times;</span>
                  </button>
                </div>
                {/* Custom message */}
                <p className="text-gray-600 mb-6">{message}</p>
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
