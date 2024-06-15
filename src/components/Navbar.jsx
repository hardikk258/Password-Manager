import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white'>
      <div className="mycontainer flex justify-around items-center px-0 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
          <span className='text-blue-950'>&lt;</span>
          Pass
          <span className='text-blue-950'>Op/&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-4'>
              <a className='hover:font-bold' href="#">Home</a>
              <a className='hover:font-bold' href="#">About</a>
              <a className='hover:font-bold' href="#">Contact Us</a>
            </li>
        </ul> */}
        <button className='text-white bg-blue-950 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
          <img className='invert p-1 w-10' src="/icons/github-mark.svg" alt="github logo" />
          <span className='font-bold px-3 py-2'>GitHub</span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar