import Router from './Router'
import { useEffect, useState } from 'react'
import { authService } from 'myBase'

function App() {
  const [init, setInit] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
      setInit(true)
    })
  }, [])

  const madeDate = new Date().getFullYear()
  return (
    <>
      {init ? <Router isLogin={isLogin} /> : 'initializing...'}
      <footer>&copy; made {madeDate} </footer>
    </>
  )
}

export default App
