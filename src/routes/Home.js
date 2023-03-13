import { useEffect, useState, useRef } from 'react'
import { db, storage } from 'myBase'
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'
import { v4 } from 'uuid'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
import Sweet from 'components/Sweet'

export default function Home({ userObj }) {
  const [sweet, setSweet] = useState('')
  const [sweets, setSweets] = useState([])
  const [attachment, setAttachment] = useState('')

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
    let attachmentUrl = ''
    try {
      if (attachment !== '') {
        const attachmentRef = ref(storage, `${userObj.uid}/${v4()}`)
        const attachmentUpload = await uploadString(
          attachmentRef,
          attachment,
          'data_url',
        )
        attachmentUrl = await getDownloadURL(attachmentUpload.ref)
      }
      const doc = await addDoc(collection(db, 'sweets'), {
        text: sweet,
        createdAt: serverTimestamp(),
        creator: userObj.uid,
        attachmentUrl,
      })
      console.log(doc)
    } catch (err) {
      console.log(err.message)
    }
    setSweet('')
    onClickClear()
  }

  const onChangeSweet = ({ target: { value } }) => {
    setSweet(value)
  }

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e
    const fileInfo = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(fileInfo)
  }
  const fileInput = useRef()
  const onClickClear = () => {
    fileInput.current.value = ''
    setAttachment('')
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
        <input
          type='file'
          accept='image/*'
          onChange={onFileChange}
          ref={fileInput}
        />
        {attachment && (
          <div>
            <img
              src={attachment}
              width='120px'
              height='120px'
              alt='thumbnail'
            />
            <button onClick={onClickClear}>Delete</button>
          </div>
        )}
      </form>
      <div>
        {sweets.map(({ id, text, creator, attachmentUrl }) => (
          <Sweet
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
