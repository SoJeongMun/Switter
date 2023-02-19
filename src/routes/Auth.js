import { useState } from 'react'
import { authService } from '../myBase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount] = useState(true)

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
      let res
      if (newAccount) {
        res = await createUserWithEmailAndPassword(authService, email, password)
      } else {
        res = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(res)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <form>
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
          value={newAccount ? 'Create Account' : 'Log In'}
          required
          onSubmit={onSubmit}
        />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
      </div>
    </div>
  )
}

export default Auth
