import { useEffect, useState } from 'react'
import { db } from 'myBase'
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
  // QuerySnapshot,
} from 'firebase/firestore/lite'

function Home() {
  const [sweet, setSweet] = useState('')
  const [sweets, setSweets] = useState([])
  const getSweets = async () => {
    const getDoc = await getDocs(collection(db, 'sweets'))
    getDoc.forEach((document) => {
      // 왜 함수를 쓰는가 ?? getDoc의 모든 document에 setSweets() 함수를 쓸거고 모든 이전 sweets에 대해 배열을 리턴할 것, 그 리턴값은 새 트윗과 이전 값을 포함한 새 배열 반환
      const sweetObj = {
        ...document.data(),
        id: document.id,
      }
      setSweets((prev) => [sweetObj, ...prev])
    })
  }

  useEffect(() => {
    getSweets()
  }, [])

  const onSubmitSweet = async (e) => {
    e.preventDefault()
    try {
      const doc = await addDoc(collection(db, 'sweets'), {
        sweet,
        createdAt: serverTimestamp(),
      })
      console.log(doc)
    } catch (err) {
      console.log(err.message)
    }
    setSweet('')
  }

  const onChangeSweet = ({ target: { value } }) => {
    // const {
    //   target: { value },
    // } = e
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
        {sweets.map((sweet) => (
          <div key={sweet.id}>
            <h4>{sweet.sweet}</h4>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
