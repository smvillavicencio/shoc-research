import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import NotFoundPage from './pages/NotFoundPage'
import PaperPage from './pages/PaperPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AuthWrapper from './pages/AuthWrapper'

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

const AppRoutes = () => {
  const location = useLocation()

  return (
    <div className='min-h-screen w-full pt-12 bg-zinc-50'>
      {/* Conditionally render Header based on current route */}
      {location.pathname !== '/login' && <Header />}
      <Header />

      <div className='container max-w-7xl h-full'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/:id' element={<PaperPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route
            exact
            path='/dashboard'
            element={
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            }
          />
          <Route exact path='/*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
