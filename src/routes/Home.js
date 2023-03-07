import { useEffect, useState } from 'react'
import { db } from 'myBase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import EditSweet from 'components/EditSweet'
import WriteSweets from 'components/WriteSweets'

export default function Home({ userObj }) {
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

  return (
    <>
      <div>
        <WriteSweets userObj={userObj} />
      </div>
      <div>
        {sweets.map(({ id, text, creator, attachmentUrl }) => (
          <EditSweet
            key={id}
            id={id}
            txt={text}
            txtOwner={creator === userObj.uid}
            img={attachmentUrl}
          />
        ))}
      </div>
    </>
  )
}
