import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { useState } from 'react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(null)
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery) {
      navigate('/?search=' + searchQuery)
    }
  }

  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2 border'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-around gap-2'>
        {/* Add a hamburger on small screens */}
        <Link to='/' className='flex gap-2 items-center'>
          <img src='/vite.svg' className='h-10 sm:h-8' />
          <p className='hidden text-zinc-700 text-3xl font-bold md:block'>SHOC</p>
        </Link>
        <div className='hidden md:flex relative w-80'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <form onSubmit={handleSearchSubmit}>
            <Input
              type='text'
              placeholder='Search...'
              className='pl-12 pr-4'
              value={searchQuery ? searchQuery : ''}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Header
