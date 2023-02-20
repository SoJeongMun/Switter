import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const goHome = () => {
    setTitle('Home')
    navigate('/')
  }
  const goProfile = () => {
    setTitle('Profile')
    navigate('/profile')
  }
  return (
    <nav>
      <ul>
        <li onClick={goHome}>{title}</li>
        <li onClick={goProfile}>{title}</li>
      </ul>
    </nav>
  )
}
export default Nav
