import React  from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <nav className='w-full sticky top-0 z-30 bg-white dark:bg-[#0b1120] border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-6 sm:px-10 py-3 flex items-center justify-between'>
        <Link to={"/"} className='flex items-center gap-2'>
          <div className='text-sky-500 text-xl'>🛒</div>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>Product Store</h1>
        </Link>

        <div className='flex gap-2 items-center'>
          <Link to={'/create'} className='hidden sm:inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-3 py-2 rounded-lg shadow transition'>
            ⊕ Add
          </Link>
          <Link to={'/create'} className='sm:hidden inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-semibold w-9 h-9 rounded-lg shadow transition' title='Add'>
            ⊕
          </Link>
         
        </div>
      </div>
    </nav>
  )
}

export default Navbar