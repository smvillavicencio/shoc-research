import { Skeleton } from './ui/skeleton'

const PaperPageSkeleton = () => {
  return (
    <div className='min-w-screen flex-col flex justify-center items-center p-8 mx-auto'>
      <div className='flex flex-col min-w-screen lg:flex-row gap-4 p-8'>
        {/* Left Column */}
        <div className='flex-1 md:p-4'>
          <Skeleton className='h-6 w-2/3 mb-4' /> {/* Title Skeleton */}
          <Skeleton className='h-4 w-1/2 mb-4' /> {/* Authors Skeleton */}
          <br />
          <Skeleton className='h-4 w-full mb-4' /> {/* Abstract Skeleton */}
          <Skeleton className='h-4 w-full mb-4' /> {/* Abstract Skeleton */}
          <Skeleton className='h-4 w-full mb-4' /> {/* Abstract Skeleton */}
          <Skeleton className='h-4 w-full mb-4' /> {/* Abstract Skeleton */}
          <Skeleton className='h-4 w-full mb-4' /> {/* Abstract Skeleton */}
          <div className='md:p-2'>
            <Skeleton className='h-4 w-1/3 mb-2' /> {/* Keywords Skeleton */}
            <Skeleton className='h-4 w-1/4' /> {/* Keywords Skeleton */}
          </div>
        </div>

        {/* Right Column */}
        <div className='flex-1 md:p-4'>
          <div className='h-120 md:h-200 bg-gray-300 text-center'>
            <Skeleton className='h-full w-full' /> {/* Skeleton for PDF viewer */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperPageSkeleton
