import { authService, db } from 'myBase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'

export default function Profile({ userObj, refreshUser }) {
  const [displayName, setDisplayName] = useState(userObj.displayName)

  const navigate = useNavigate()
  const onClickLogOut = () => {
    authService.signOut()
    navigate('/')
  }

  const getMySweets = async () => {
    const q = query(
      collection(db, 'sweets'),
      where('creator', '==', userObj.uid),
      orderBy('createdAt', 'desc'),
    )
    const queryResult = await getDocs(q)
    queryResult.forEach((doc) => {
      console.log(doc.id, ':', doc.data())
    })
  }
  useEffect(() => {
    getMySweets()
  }, [])

  const onChangeName = (e) => {
    const {
      target: { value },
    } = e
    setDisplayName(value)
  }
  const onSubmitName = async (e) => {
    e.preventDefault()
    if (userObj.displayName !== displayName) {
      await updateProfile(authService.currentUser, {
        displayName: displayName,
      })
    }
    refreshUser()
  }
  return (
    <>
      <form onSubmit={onSubmitName}>
        <input
          type='text'
          placeholder='Display Name...'
          value={displayName}
          onChange={onChangeName}
        />
        <input type='submit' value='Update Profile' />
      </form>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  )
}
