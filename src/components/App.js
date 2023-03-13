import Router from './Router'
import { useEffect, useState } from 'react'
import { authService } from 'myBase'

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

  const madeDate = new Date().getFullYear()
  return (
    <>
      {init ? (
        <Router isLogin={isLogin} userObj={userObj} />
      ) : (
        'initializing...'
      )}
      <footer>&copy; made {madeDate} </footer>
    </>
  )
}

export default App
