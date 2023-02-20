import { useNavigate } from 'react-router-dom'

function Nav() {
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
        <li onClick={goProfile}>Profile</li>
      </ul>
    </nav>
  )
}
export default Nav
