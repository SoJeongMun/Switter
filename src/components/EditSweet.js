import { useState } from 'react'
import { db, storage } from 'myBase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { ref, deleteObject } from '@firebase/storage'
import styled from 'styled-components'

const SweetBox = styled.div`
  width: 600px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  h3,
  img {
    padding: 0 30px;
    box-sizing: border-box;
  }
  img {
    width: 50%;
  }
  button {
    margin: 20px 0 0 30px;
  }
`

export default function EditSweet({ id, txt, txtOwner, img }) {
  const sweetTxtRef = doc(db, 'sweets', `${id}`)
  const [isEdit, setIsEdit] = useState(false)
  const [editSweet, setEditSweet] = useState(txt)

  const onDelete = async () => {
    const urlRef = ref(storage, img)
    const accept = window.confirm('정말로 스윗을 삭제하시겠습니까?')
    if (accept) {
      await deleteDoc(sweetTxtRef)
      await deleteObject(urlRef)
    }
  }
  const toggleEditBtn = () => {
    setIsEdit((prev) => !prev)
  }
  const onChangeEdit = ({ target: { value } }) => {
    setEditSweet(value)
  }
  const onSubmitEdit = async (e) => {
    e.preventDefault()
    await updateDoc(sweetTxtRef, { text: editSweet })
    setIsEdit(false)
  }

  return (
    <>
      {isEdit ? (
        <form onSubmit={onSubmitEdit}>
          <input
            value={editSweet}
            type='text'
            placeholder='Edit your sweet here'
            onChange={onChangeEdit}
            required
          />
          <input value='Edit' type='submit' required />
        </form>
      ) : (
        <SweetBox>
          <h3>{txt}</h3>
          {img && <img src={img} alt='thumbnail' />}
          {txtOwner && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={toggleEditBtn}>Edit</button>
            </>
          )}
        </SweetBox>
      )}
    </>
  )
}
