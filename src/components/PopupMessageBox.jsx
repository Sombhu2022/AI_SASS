import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PopupMessageBox({
  message = "",
  topic = "",
  buttonName = "Continue",
  link = "/",
  type = "success",
  note='',
  onButtonClick ='',
  isButtonActive = true,
  onCallBackUrl = ''
}) {
  const [customBgColor, setCustomBgColor] = useState(
    "bg-green-500 hover:bg-green-700"
  );
  const [customColor, setCustomColor] = useState("text-green-600");
  const [ isShow , setIsShow]=useState(true)
  const router = useRouter();

  useEffect(() => {
    if (type == "error") {
      setCustomBgColor("bg-red-500 hover:bg-red-700");
      setCustomColor("text-red-600");
    } else if (type == "info") {
      setCustomBgColor("bg-orange-500 hover:bg-orange-700");
      setCustomColor("text-orange-600");
    }
  }, [type]);


  const handleClick = ()=>{
    if(isButtonActive){
        router.push(`${link}`) 
    }else {
      onButtonClick()
      
    }
  }

  const handleClose = ()=>{
    if(onCallBackUrl){
      console.log("on use call back");
      onCallBackUrl()
    }
    setIsShow(false)
  }

  return (
    <>
        {isShow ? (<div className="popup-container">
            <div className=" bg-white rounded-lg shadow-lg pt-3 pb-8 p-5 max-w-md text-center">
              {/* Close button */}
              <div className="flex justify-end ">
                <button
                  onClick={ handleClose}
                  className=""
                >
                  <span className="text-3xl text-black mt-3">&times;</span>
                </button>
              </div>
      
              <img
                src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1727896191/thik-ai/m4edgpbovwz7efpt9xxp.png"
                alt="Success"
                className="w-24 mx-auto mb-6"
              />
              <h2 className={`${customColor} text-2xl font-bold text-gray-800 mb-4`}>
                {" "}
                {topic}{" "}
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              {note &&( <p className="text-gray-500 mb-6">
                 {note}
               </p>)}

              <button
                onClick={handleClick}
                className={`${customBgColor} text-white font-semibold py-2 px-6 rounded-full transition duration-300`}
              >
                {buttonName}
              </button>
            </div>
          </div>):("")}
          </>
  );
}

export default PopupMessageBox;
