import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed  top-[20%] left-[15%] h-[35rem] w-[80%] flex flex-col items-center justify-center  z-50'>
        <div className='w-10 h-10 border-8 border-dashed  border-t-8 border-yellow-400 animate-spin rounded-full p-8'></div>
        <h1 className=' text-2xl my-2 animate-bounce'>Loading...</h1>
    </div>
  )
}

export default Spinner