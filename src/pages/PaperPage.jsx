import { decodeUUID } from '@/lib/utils'
import { supabase } from '@/supabaseClient'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import H2 from '@/components/typo/H2'
import Paragraph from '@/components/typo/Paragraph'
import { Badge } from '@/components/ui/badge'
import PaperPageSkeleton from '@/components/PaperPageSkeleton'
import { FileIcon } from 'lucide-react'

const PaperPage = () => {
  const [paper, setPaper] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  const fetchPaper = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('papers').select('*', { count: 'exact' }).eq('id', decodeUUID(id))

    if (error) {
      console.error('Error fetching papers:', error)
    } else if (data) {
      setPaper(data[0])
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchPaper()
  }, [])

  if (isLoading) {
    return <PaperPageSkeleton />
  }

  if (paper === null) {
    return <NotFoundPage />
  }

  return (
    <div className='min-w-screen flex-col flex justify-center items-center p-4 md:p-8 mx-auto'>
      <div className='flex flex-col min-w-[95%] lg:flex-row gap-4 p-4 md:p-8'>
        {/* Left Column */}
        <div className='flex-1 md:p-4'>
          <H2 className='md:p-2'>{paper.title}</H2>
          <span className='md:p-2'>Authors: {paper.authors.join(', ')}</span>
          <br />
          <span className='md:p-2'>Adviser: {paper.adviser}</span>
          <br />
          <Paragraph className='md:p-2'>
            <strong>
              Abstract:
              <br />
            </strong>
            {paper.abstract}
          </Paragraph>
          <div className='md:p-2'>
            <strong>Keywords: </strong>
            {paper.keywords.map((keyword, idx) => {
              return (
                <Badge key={idx} className='m-1'>
                  {keyword}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className='flex-1 h-250 md:p-4'>
          {paper.url ? (
            <iframe src={paper.url} className='flex flex-col h-200 w-full justify-center items-center p-4' allowFullScreen></iframe>
          ) : (
            <div className='flex flex-col h-200 justify-center items-center p-4 bg-gray-300'>
              <FileIcon className='w-8 h-8 mr-2' />
              <p>No PDF file found for the paper</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaperPage
