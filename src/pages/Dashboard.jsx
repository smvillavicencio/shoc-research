import { columns } from '@/app/papers/columns'
import { DataTable } from '@/components/DataTable'
import H2 from '@/components/typo/H2'
import { Button } from '@/components/ui/button'
import { supabase } from '@/supabaseClient'
import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [papers, setPapers] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    navigate('/login')
  }

  const fetchPapers = async () => {
    setIsLoading(true)
    let query = supabase.from('papers').select('*', { count: 'exact' })

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching papers:', error)
    } else if (data) {
      setPapers(data)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPapers()
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div className='min-w-screen flex-col flex justify-center items-center p-8 mx-auto'>
      <div className='flex flex-row w-full md:max-w-6xl items-center justify-between gap-4 py-8 px-2'>
        <H2>Admin Dashboard</H2>
        <div className='flex flex-col md:flex-row gap-3'>
          <Button onClick={handleLogout}>
            <LogOut />
            Logout
          </Button>
        </div>
      </div>

      <DataTable columns={columns(fetchPapers)} fetchPapers={fetchPapers} data={papers} />
    </div>
  )
}

export default Dashboard
