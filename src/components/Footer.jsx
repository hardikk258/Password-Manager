import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-600 text-white flex flex-col justify-center items-center bottom-0 w-full'>
      <div className="logo font-bold text-white text-2xl ">
            <span className='text-blue-950'>&lt;</span>
            Pass
            <span className='text-blue-950'>Op/&gt;</span>
      </div>
      <div className='flex justify-center items-center'>
        Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by CodeWithHardik
      </div>
    </div>
  )
}

export default Footer