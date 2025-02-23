import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import PropTypes from 'prop-types'
import { encodeUUID } from '@/lib/utils'

const PaperCard = ({ data }) => {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const pRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (pRef.current) {
      setIsOverflowing(pRef.current.clientHeight === 160)
    }
  }, [])

  return (
    <div className='m-8 py-2 rounded-md bg-white shadow' onClick={() => navigate(`/${encodeUUID(data.id)}`)}>
      <div className='px-6 py-4 flex justify-between'>
        <div className='w-0 flex-1'>
          <Link>
            <h1 className='text-lg font-semibold leading-6 text-gray-900'>{data.title}</h1>
          </Link>

          <div className='max-h-40 pb-2 text-xs text-gray-500'>Authors: {data.authors.join(', ')}</div>

          <div className='relative text-sm max-h-40 w-full overflow-clip' ref={pRef}>
            <b>Abstract: </b>
            {isOverflowing ? <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' /> : null}
            {data.abstract}
          </div>
          <div className='flex pt-4 text-sm space-x-2 flex-wrap'>
            <div className='m-1'>Related keywords:</div>
            {data.keywords.map((keyword, idx) => {
              return (
                <Badge key={idx} variant='secondary' className='m-1'>
                  {keyword}
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

PaperCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    abstract: PropTypes.string.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    strand: PropTypes.string.isRequired,
    grade_level: PropTypes.number.isRequired,
    research_type: PropTypes.string.isRequired
  }).isRequired
}

export default PaperCard
