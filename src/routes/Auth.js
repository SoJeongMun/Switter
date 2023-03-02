import { useState } from 'react'
import { authService } from 'myBase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'

function Auth() {
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='pssword'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'sign In'}
          required
          onSubmit={onSubmit}
        />
      </form>
      <button onClick={toggleBtn}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </button>
      <div>
        <button name='google' onClick={onClickSocial}>
          Continue with Google
        </button>
        <button name='github' onClick={onClickSocial}>
          Continue with GitHub
        </button>
      </div>
    </div>
  )
}

export default Auth
