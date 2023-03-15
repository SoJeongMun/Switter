import { useState, useRef } from 'react'
import { db, storage } from 'myBase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { v4 } from 'uuid'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import picture from '../assets/images/picture.png'

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
  min-height: 100px;
  margin-bottom: 20px;
  div.img-box {
    margin: 20px 0 20px 30px;
    position: relative;
    button{
        position: absolute;
        top: 10px;
        left: 10px;
      }
    }
  }
`
const SweetBox = styled.textarea`
  padding: 0 30px;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  width: 100%;
  outline: none;
  border: none;
  resize: none;
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

const ImageFile = styled.div`
  display: flex;
  align-items: center;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
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
        <div>
          <SweetBox
            type='text'
            placeholder='무슨 일이 일어나고 있나요?'
            maxLength='140'
            value={sweet}
            onChange={onChangeSweet}
          />
          {attachment && (
            <div className='img-box'>
              <img src={attachment} alt='thumbnail' />
              <button onClick={onClickClear}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
        <FlexRow>
          <ImageFile>
            <label htmlFor='ex_file'>
              <div>
                <img src={picture} alt='icon' width='20' height='20' />
              </div>
            </label>
            <input
              type='file'
              id='ex_file'
              accept='image/*'
              onChange={onChangeFile}
              ref={fileInput}
            />
          </ImageFile>
          <SubmitBtn type='submit' value='Sweet' />
        </FlexRow>
      </FormBox>
    </>
  )
}
