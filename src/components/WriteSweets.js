import { useState, useRef } from 'react'
import { db, storage } from 'myBase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { v4 } from 'uuid'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'

export default function WriteSweets({ userObj }) {
  const [sweet, setSweet] = useState('')
  const [attachment, setAttachment] = useState('')

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

  const onChangeFile = (e) => {
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
          onChange={onChangeFile}
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
    </>
  )
}
