import { useState } from 'react'
import { authService } from 'myBase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'
import google from 'assets/images/google.png'
import github from 'assets/images/github.png'
import styled from 'styled-components'

const FormBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin-top: 20lvh;
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
    span {
      color: #7d82b8;
    }
  }
`
const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`
const BasicBtn = styled.button`
  width: 300px;
  height: 40px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  border: 1px solid #dadce0;
  border-radius: 20px;
  font-size: 14px;
  margin-top: 15px;
  img {
    width: 20px;
    margin-right: 5px;
  }
`
const LoginInput = styled(BasicBtn)`
  text-align: center;
  background: ${(props) => props.isSubmitBg || 'white'};
  color: ${(props) => props.isSubmitColor || '#000'};
`
const NewAccount = styled.div`
  margin-top: 40px;
  font-size: 15px;
  span {
    margin-right: 8px;
  }
  button {
    font-weight: bold;
    color: #7d82b8;
  }
`
const Deco = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  div {
    width: 110px;
    border: 1px solid #dadce0;
  }
  p {
    margin: 0 15px;
  }
`

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(false)

  const onChange = (e) => {
    // const { name, value } = e.target
    const {
      target: { name, value },
    } = e
    name === 'email' ? setEmail(value) : setPassword(value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const regExp =
        // eslint-disable-next-line
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      if (!regExp.test(email)) {
        alert('유효한 이메일 양식이 아닙니다.')
      } else if (password.length < 6) {
        alert('최소 6자리 이상의 비밀번호를 입력해주세요.')
      }
      if (newAccount) {
        const res = await createUserWithEmailAndPassword(
          authService,
          email,
          password,
        )
        console.log(res)
      } else {
        const res = await signInWithEmailAndPassword(
          authService,
          email,
          password,
        )
        console.log(res)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const toggleBtn = () => setNewAccount((prev) => !prev)

  const onClickSocial = async (e) => {
    const {
      target: { name },
    } = e
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    await signInWithPopup(authService, provider)
  }

  return (
    <FormBox>
      <h2>
        <span>Switter</span>에 로그인하기
      </h2>
      <div>
        <BasicBtn name='google' onClick={onClickSocial}>
          <img src={google} alt='google' />
          <span>Google 계정으로 로그인</span>
        </BasicBtn>
        <BasicBtn name='github' onClick={onClickSocial}>
          <img src={github} alt='google' />
          <span>Github 계정으로 로그인</span>
        </BasicBtn>
      </div>
      <Deco>
        <div></div>
        <p>또는</p>
        <div></div>
      </Deco>
      <Form onSubmit={onSubmit}>
        <LoginInput
          as='input'
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <LoginInput
          as='input'
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <LoginInput
          as='input'
          type='submit'
          value={newAccount ? '가입하기' : '로그인'}
          required
          onSubmit={onSubmit}
          isSubmitBg='#7d82b8'
          isSubmitColor='white'
        />
      </Form>
      <NewAccount>
        <span>
          {newAccount ? '이미 회원이신가요?' : '아직 회원이 아니신가요?'}
        </span>
        <button onClick={toggleBtn}>
          {newAccount ? '로그인' : '가입하기'}
        </button>
      </NewAccount>
    </FormBox>
  )
}
