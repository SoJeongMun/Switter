import { useEffect, useState } from 'react'
import { db } from 'myBase'
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'
import Sweet from 'components/Sweet'

function Home({ userObj }) {
  const [sweet, setSweet] = useState('')
  const [sweets, setSweets] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'sweets'), orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSweets(sweetArray)
    })
  }, [])

  const onSubmitSweet = async (e) => {
    e.preventDefault()
    try {
      const doc = await addDoc(collection(db, 'sweets'), {
        text: sweet,
        createdAt: serverTimestamp(),
        creator: userObj.uid,
      })
      console.log(doc)
    } catch (err) {
      console.log(err.message)
    }
    setSweet('')
  }

  const onChangeSweet = ({ target: { value } }) => {
    setSweet(value)
  }

  return (
    <>
      <form onSubmit={onSubmitSweet}>
        <input
          type='text'
          placeholder="What's on your mind?"
          maxLength={140}
          value={sweet}
          onChange={onChangeSweet}
        />
        <input type='submit' value='Sweet' />
      </form>
      <div>
        {sweets.map(({ id, text, creator }) => (
          <Sweet
            key={id}
            txt={text}
            userObj={userObj}
            txtOwner={creator === userObj.uid}
          />
        ))}
      </div>
    </>
  )
}

export default Home
