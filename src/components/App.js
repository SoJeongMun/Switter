import Router from './Router'
import { useState } from 'react'
import { authService } from '../myBase'

function App() {
  const [isLogin] = useState(authService.currentUser)
  const madeDate = new Date().getFullYear()
  return (
    <>
      <Router isLogin={isLogin} />
      <footer>&copy; made {madeDate} </footer>
    </>
  )
}

export default App
