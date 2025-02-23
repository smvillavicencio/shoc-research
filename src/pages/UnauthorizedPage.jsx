import H1 from '@/components/typo/H1'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const UnauthorizedPage = () => {
  return (
    <div className='min-w-screen h-[calc(100vh-100px)] m-auto flex-col flex justify-center items-center space-y-6 px-4 py-6 max-w-screen-sm text-center'>
      <img src='src/assets/images/unauthorized.svg' className='w-120 p-8' />
      <H1>Sorry!</H1>
      <span className='text-zinc-500'>You are not authorized to access this page.</span>
      <Button className='mt-4 px-3 py-2' asChild>
        <Link to='/'>Go back to homepage</Link>
      </Button>
    </div>
  )
}

export default UnauthorizedPage
