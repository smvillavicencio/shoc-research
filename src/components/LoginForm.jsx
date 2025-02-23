import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/supabaseClient'
import { useState } from 'react'
import Small from './typo/Small'

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      setMessage('Error logging in: ' + error.message) // Handle error
    } else {
      navigate('/dashboard') // Navigate to the dashboard or home page after successful login
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <Link to='/' className='flex items-center justify-center w-full'>
            <img src='/vite.svg' className='h-10 sm:h-8 px-2' />
            <p className='text-zinc-700 text-3xl font-bold block'>SHOC</p>
          </Link>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  value={email}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input onChange={(e) => setPassword(e.target.value)} id='password' type='password' value={password} required />
              </div>
              {message && (
                <div className='grid'>
                  <Small className='text-red-600'>{message}</Small>
                </div>
              )}
              <Button type='submit' className='w-full'>
                Login
              </Button>
              <Button variant='secondary' className='w-full' onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
