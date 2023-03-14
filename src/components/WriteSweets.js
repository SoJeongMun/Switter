import { useState, useRef } from 'react'
import { db, storage } from 'myBase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { v4 } from 'uuid'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
import styled from 'styled-components'

const FormBox = styled.form`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 600px;
  height: 120px;
  margin-bottom: 20px;
`
const InputBox = styled.input`
  padding: 0 30px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: none;
  }
`
const SubmitBtn = styled.input.attrs({ type: 'submit' })`
  background: #7d82b8;
  color: white;
  padding: 6px 14px;
  border-radius: 18px;
  font-size: 15px;
`
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
`

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
      <FormBox onSubmit={onSubmitSweet}>
        <InputBox
          type='text'
          placeholder='무슨 일이 일어나고 있나요?'
          maxLength={140}
          value={sweet}
          onChange={onChangeSweet}
        />
        <FlexRow>
          <input
            type='file'
            accept='image/*'
            onChange={onChangeFile}
            ref={fileInput}
          />
          <SubmitBtn type='submit' value='Sweet' />
        </FlexRow>
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
      </FormBox>
    </>
  )
}
