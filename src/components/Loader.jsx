import React from 'react'

function Loader({message=''}) {
  return (
    <div className='popup-container'>
         
         <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
          <p className="mt-4 text-lg text-green-500 font-semibold">{message}</p>
        </div> 

    </div>
  )
}

export default Loader