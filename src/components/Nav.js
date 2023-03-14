import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Gnb = styled.nav`
  height: 100lvh;
  padding: 60px 30px 0px 60px;
  box-sizing: border-box;
  text-align: right;
  ul {
    list-style-type: none;
    li {
      padding-bottom: 20px;
    }
  }
`

function Nav({ userObj }) {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }
  const goProfile = () => {
    navigate('/profile')
  }
  return (
    <Gnb>
      <ul>
        <li onClick={goHome}>홈</li>
        <li onClick={goProfile}>{userObj.displayName}의 프로필</li>
      </ul>
    </Gnb>
  )
}
export default Nav
