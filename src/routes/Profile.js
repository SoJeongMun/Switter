import { authService } from 'myBase'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const onLogOut = () => {
    authService.signOut()
    navigate('/')
  }
  return (
    <>
      <button onClick={onLogOut}>Log Out</button>
    </>
  )
}
