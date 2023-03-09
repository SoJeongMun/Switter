import Router from './Router'
import { useEffect, useState } from 'react'
import { authService } from 'myBase'
import 'assets/Style.css'

function App() {
  const [init, setInit] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true)
        setUserObj(user)
      } else {
        setIsLogin(false)
      }
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({ ...user })
  }

  const madeDate = new Date().getFullYear()
  return (
    <div className='container'>
      {init ? (
        <Router isLogin={isLogin} userObj={userObj} refreshUser={refreshUser} />
      ) : (
        'initializing...'
      )}
      <footer>&copy; made {madeDate} </footer>
    </div>
  )
}

export default App
