import { LoginForm } from '@/components/LoginForm'
import { supabase } from '@/supabaseClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      setAuthenticated(!!session)
      setLoading(false)
    }

    getSession()
  }, [])

  if (loading) {
    return <>Loading...</>
  } else {
    if (authenticated) {
      navigate('/dashboard')
    } else {
      return (
        <div className='flex min-h-svh min-w-screen items-center justify-center p-6 md:p-10'>
          <div className='w-full max-w-sm'>
            <LoginForm />
          </div>
        </div>
      )
    }
  }
}

export default LoginPage
