import React from 'react'

function Loader({message=''}) {
  return (
    <div className='popup-container'>
         
         <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4  rounded-full animate-spin border-green-500 border-l-transparent"></div>
          <p className="mt-4 text-lg text-green-500 font-semibold">{message}</p>
        </div> 

    </div>
  )
}

export default Loader