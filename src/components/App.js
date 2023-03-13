import Router from './Router'
import { useEffect, useState, useMemo } from 'react'
import { authService } from 'myBase'

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)
  const isLogin = useMemo(() => userObj !== null, [userObj])

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setUserObj(user)
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({ ...user })
  }

  return (
    <div className='container'>
      {init ? (
        <Router isLogin={isLogin} userObj={userObj} refreshUser={refreshUser} />
      ) : (
        'initializing...'
      )}
    </div>
  )
}

export default App
