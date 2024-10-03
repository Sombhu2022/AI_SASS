import React, { useEffect, useState } from "react";

function FormSection({ allFields , onPrompt , isContineu , res , isLoading}) {

    const [prompt , setPrompt] = useState("")
    const [contineu , setContineu] = useState(false)

    useEffect(()=>{
       if(res){
         setContineu(true)
         isContineu(true)
       }
    },[res])


    const submitHandle = (e)=>{
        e.preventDefault();
        onPrompt(prompt)
        setPrompt("")
        if(res){
            setContineu(true)
            isContineu(true)

        }

    }
  return (
    <form className=" p-6 rounded-lg shadow-md space-y-4 flex justify-center items-center flex-col">
      {allFields?.map((field, index) => 
        ( <textarea
          rows={3}
          key={index}
          type="text"
          name={field?.name}
          placeholder={field?.placeholder}
          required={field?.required}
          className="w-full p-3 text-white rounded-lg outline-none   bg-gray-800/10 border border-gray-800 placeholder:text-gray-600"
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
        />)
      )}

      <div className="w-full flex justify-start gap-5 flex-row-reverse">

      <button 
       className={`${isLoading? "bg-blue-600/5 text-blue-600 hover:bg-blue-600/10 hover:text-blue-600 ":" bg-blue-600 hover:bg-blue-700 text-white"} px-5 font-semibold py-3 rounded-lg transition-colors duration-300`}
       onClick={submitHandle}
      >
        {!isLoading? contineu?"Continue":"Generate" : "loading..."}
       
      </button>
      {
        contineu&&(
        <button 
        className="px-5 self-end  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        onClick={()=>{isContineu(false); setContineu(false)}}
        >New</button>)
      }
      </div>
    </form>
  );
}

export default FormSection;
