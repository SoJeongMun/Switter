import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
// import EditProfile from '../routes/EditProfile'
// import Profile from '../routes/Profile'

function Router({ isLogin }) {
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path='/' element={<Home />} />
            {/* <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/profile' element={<Profile />} /> */}
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
