import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Profile from 'routes/Profile'
import Nav from 'components/Nav'

function Router({ isLogin }) {
  return (
    <BrowserRouter>
      {isLogin && Nav}
      <Routes>
        {isLogin ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
