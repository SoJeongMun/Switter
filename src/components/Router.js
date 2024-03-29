import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Profile from 'routes/Profile'
import Nav from 'components/Nav'

function Router({ isLogin, userObj, refreshUser }) {
  return (
    <BrowserRouter>
      {isLogin && <Nav userObj={userObj} />}
      <Routes>
        {isLogin ? (
          <>
            <Route path='/' element={<Home userObj={userObj} />} />
            <Route
              path='/profile'
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
