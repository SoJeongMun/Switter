import Router from './Router'
import { useEffect, useState, useMemo } from 'react'
import { authService } from 'myBase'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`

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
    <Wrap>
      {init ? (
        <Router isLogin={isLogin} userObj={userObj} refreshUser={refreshUser} />
      ) : (
        'initializing...'
      )}
    </Wrap>
  )
}

export default App
