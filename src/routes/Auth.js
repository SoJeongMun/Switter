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

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState('')

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
    // firebase의 provider = 소셜로그인 제공 업체
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    await signInWithPopup(authService, provider)
  }

  return (
    <div className='login-form'>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
          className='email'
        />
        <input
          name='pssword'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          className='password'
        />
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Sign In'}
          required
          onSubmit={onSubmit}
          className='login-btn'
        />
      </form>
      <div className='new-account'>
        <span className='desc'>기존 회원이 아니신가요?</span>
        <button onClick={toggleBtn} className='toggle-btn'>
          {newAccount ? 'Sign In' : 'Create Account'}
        </button>
      </div>
      <div className='provider'>
        <button name='google' onClick={onClickSocial}>
          <img src={google} alt='google' />
        </button>
        <button name='github' onClick={onClickSocial}>
          <img src={github} alt='google' />
        </button>
      </div>
    </div>
  )
}
