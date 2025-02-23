import PaperCard from '@/components/PaperCard'
import H1 from '@/components/typo/H1'
import { Button } from '@/components/ui/button'
import { GRADE_LEVELS, RESEARCH_TYPES, STRANDS } from '@/constants/filter_options'
import { useEffect, useState } from 'react'
import { supabase } from '@/supabaseClient'
import { useSearchParams } from 'react-router-dom'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink
} from '@/components/ui/pagination'
import PaperSkeleton from '@/components/PaperSkeleton'
import NoPapersFound from '@/components/NoPapersFound'
import SelectField from '@/components/SelectField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'

const formSchema = z.object({
  strand: z.string(),
  grade_level: z.string(),
  research_type: z.string()
})

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [papers, setPapers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [totalPages, setTotalPages] = useState(1)
  const currentPage = parseInt(searchParams.get('page') ?? '1')
  const papersPerPage = 5
  const search = searchParams.get('search') ?? ''

  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      research_type: '',
      grade_level: '',
      strand: ''
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form

  const fetchPapers = async () => {
    setIsLoading(true)
    let query = supabase.from('papers').select('*', { count: 'exact' })

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    if (form.getValues('strand')) {
      query = query.eq('strand', form.getValues('strand'))
    }

    if (form.getValues('research_type')) {
      query = query.eq('research_type', form.getValues('research_type'))
    }

    if (form.getValues('grade_level')) {
      query = query.eq('grade_level', form.getValues('grade_level'))
    }

    if (!(currentPage >= 1 && currentPage <= totalPages)) {
      setPapers([])
      setIsLoading(false)
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range((currentPage - 1) * papersPerPage, currentPage * papersPerPage - 1)

    setTotalPages(Math.ceil(count / papersPerPage))

    if (error) {
      console.error('Error fetching papers:', error)
    } else if (data) {
      setPapers(data)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPapers()
  }, [searchParams])

  const handlePageChange = (page) => {
    if (search) {
      setSearchParams({ search: search, page: page.toString() })
    } else {
      setSearchParams({ page: page.toString() })
    }
    window.scrollTo(0, 0)
  }

  return (
    <div className='min-w-screen flex-col flex justify-center items-center p-8'>
      <img className='w-120 p-8' src='src/assets/images/research.svg' />
      <H1 className='p-8 flex justify-center items-center text-center'>{search ? `Search results for: ${search}` : 'Search Filters'}</H1>
      <Form {...form} className='w-screen'>
        <form onSubmit={handleSubmit(fetchPapers)}>
          <div className='mx-auto flex flex-col md:flex-row md:w-3xl justify-around items-center space-y-4 md:space-y-0'>
            {/* Grade Level Field */}
            <SelectField
              name='grade_level'
              control={control}
              options={GRADE_LEVELS}
              placeholder='Select grade level...'
              errors={errors}
              className='w-50 space-y-0'
            />

            {/* Strand Field */}
            <SelectField
              name='strand'
              control={control}
              options={STRANDS}
              placeholder='Select strand...'
              errors={errors}
              className='w-50 space-y-0'
            />

            {/* Research Type Field */}
            <SelectField
              name='research_type'
              control={control}
              options={RESEARCH_TYPES}
              placeholder='Select research type...'
              errors={errors}
              className='w-50 space-y-0'
            />

            <Button type='submit' className='flex w-20 mb-2'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </Button>
          </div>
        </form>
      </Form>

      {isLoading ? (
        <div className='p-10 min-w-[95%] md:min-w-4xl lg:min-w-6xl'>
          <PaperSkeleton />
        </div>
      ) : (
        <div className='p-10 min-w-[95%] md:min-w-4xl lg:min-w-6xl'>
          {papers.length == 0 ? (
            <NoPapersFound />
          ) : (
            papers.map((data) => {
              return <PaperCard key={data.id} data={data} />
            })
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-disabled={currentPage <= 1}
                  tabIndex={currentPage <= 1 ? -1 : undefined}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
                />
              </PaginationItem>
              {/* Display page numbers */}
              <PaginationItem>
                <PaginationLink>{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>/</PaginationItem>
              <PaginationItem>
                <PaginationLink>{totalPages == 0 ? 1 : totalPages}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-disabled={currentPage >= totalPages}
                  tabIndex={currentPage >= totalPages ? -1 : undefined}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default Home
