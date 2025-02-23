import { Skeleton } from './ui/skeleton'

const PaperSkeleton = () => {
  return (
    <div className='m-8 py-2 rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>
        <div className='w-0 flex-1'>
          {/* Skeleton for Title */}
          <Skeleton className='h-6 w-2/3 mb-2' />

          {/* Skeleton for Authors */}
          <Skeleton className='h-4 w-1/2 mb-4' />

          {/* Skeleton for Abstract */}
          <div className='relative text-sm max-h-40 w-full overflow-clip'>
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-4/5' />
            <Skeleton className='h-4 w-3/4 mt-2' />
          </div>

          {/* Skeleton for Related Keywords */}
          <div className='flex pt-4 text-sm space-x-2'>
            <Skeleton className='h-4 w-1/4' />
            <Skeleton className='h-4 w-1/4' />
            <Skeleton className='h-4 w-1/4' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperSkeleton
