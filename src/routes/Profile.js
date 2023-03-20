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
  width: 600px;
  height: 100vh;
  padding: 60px 0 0 0;
  box-sizing: border-box;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
`
const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  min-height: 100px;
  padding: 0px 30px 30px 30px;
  box-sizing: border-box;
`
const SweetBox = styled.div`
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  h3,
  img {
    padding: 0 30px;
    box-sizing: border-box;
  }
  h3 {
    margin-bottom: 15px;
  }
  img {
    width: 50%;
  }
  button {
    margin: 20px 0 0 30px;
    &:last-child {
      margin-left: 20px;
    }
  }
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
      <ProfileBox>
        <h2>{userObj.displayName}</h2>
        <form onSubmit={onSubmitName}>
          <input
            type='text'
            // placeholder='Display Name...'
            // value={displayName}
            onChange={onChangeName}
          />
          <input type='submit' value='Update Profile' />
        </form>
        <button onClick={onClickLogOut}>Log Out</button>
      </ProfileBox>
      {mySweet && (
        <>
          {mySweet.map(({ text, attachmentUrl }) => (
            <SweetBox>
              <h3>{text}</h3>
              {attachmentUrl && <img src={attachmentUrl} alt='sweetImg' />}
            </SweetBox>
          ))}
        </>
      )}
    </FlexWrap>
  )
}
