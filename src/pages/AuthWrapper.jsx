import { supabase } from '@/supabaseClient'
import { useEffect, useState } from 'react'
import UnauthorizedPage from './UnauthorizedPage'

const AuthWrapper = ({ children }) => {
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
      return <>{children}</>
    } else {
      return <UnauthorizedPage />
    }
  }
}

export default AuthWrapper
