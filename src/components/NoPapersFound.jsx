import { SearchIcon } from 'lucide-react'

const NoPapersFound = () => {
  return (
    <div className='flex flex-col items-center justify-center p-8'>
      <SearchIcon className='w-16 h-16 text-gray-400 mb-4' /> {/* Optional icon */}
      <h2 className='text-lg font-semibold text-gray-700 mb-2'>No Papers Found</h2>
      <p className='text-sm text-gray-500 mb-4 text-center'>
        We couldn’t find any papers matching your search. Please try again with different keywords.
      </p>
    </div>
  )
}

export default NoPapersFound
