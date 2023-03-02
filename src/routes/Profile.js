import { authService } from 'myBase'
import { useNavigate } from 'react-router-dom'

function Profile() {
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

export default Profile
