import H1 from '@/components/typo/H1'
import P from '@/components/typo/P'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='min-w-screen m-auto flex-col flex justify-center items-center space-y-6 p-8 max-w-screen-sm text-center'>
      <img src='src/assets/images/page_not_found.svg' className='w-120 p-8' />
      <H1>Oops! Page not found</H1>
      <P className='text-zinc-500'>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </P>
      <Button className='mt-4 px-3 py-2' asChild>
        <Link to='/'>Go back to homepage</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage
