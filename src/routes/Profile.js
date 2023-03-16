import { authService, db } from 'myBase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import styled from 'styled-components'

const FlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 60px 0 0 0;
  box-sizing: border-box;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
`

export default function Profile({ userObj, refreshUser }) {
  const [displayName, setDisplayName] = useState(userObj.displayName)
  const [mySweet, setMySweet] = useState()

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
      console.log(doc.data())
    })
    setMySweet(queryResult.docs.map((doc) => doc.data()))
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
    <FlexWrap>
      <h2>{userObj.displayName}</h2>
      <form onSubmit={onSubmitName}>
        <input
          type='text'
          placeholder='Display Name...'
          value={displayName}
          onChange={onChangeName}
        />
        <input type='submit' value='Update Profile' />
      </form>
      {mySweet && (
        <>
          {mySweet.map(({ text, attachmentUrl }) => (
            <div>
              <h3>{text}</h3>
              {attachmentUrl && <img src={attachmentUrl} alt='sweetImg' />}
            </div>
          ))}
        </>
      )}
      <button onClick={onClickLogOut}>Log Out</button>
    </FlexWrap>
  )
}
