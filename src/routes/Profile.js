import { authService, db } from 'myBase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'

export default function Profile({ userObj }) {
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

  return (
    <>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  )
}
