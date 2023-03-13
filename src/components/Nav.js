import { useNavigate } from 'react-router-dom'

function Nav({ userObj }) {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }
  const goProfile = () => {
    navigate('/profile')
  }
  return (
    <nav>
      <ul>
        <li onClick={goHome}>Home</li>
        <li onClick={goProfile}>{userObj.displayName}의 Profile</li>
      </ul>
    </nav>
  )
}
export default Nav
