import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from '../routes/Home'
import Auth from '../routes/Auth'
// import EditProfile from '../routes/EditProfile'
// import Profile from '../routes/Profile'

function Router() {
  const [isLogin] = useState(false)
  return (
    <HashRouter>
      <Routes>
        {isLogin ? (
          // <> = fragment: 많은 요소를 render하고 싶은데 div나 span 등등에 넣기 싫을 때
          <>
            <Route path='/' element={<Home />} />
            {/* <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/profile' element={<Profile />} /> */}
          </>
        ) : (
          <Route path='/auth' element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  )
}

export default Router
