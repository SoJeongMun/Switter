import { db } from 'myBase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

function Sweet({ id, txt, txtOwner }) {
  const sweetTxtRef = doc(db, 'sweets', `${id}`)
  const [editBtn, setEditBtn] = useState(false)
  const [editSweet, setEditSweet] = useState(txt)

  const onDelete = async () => {
    const accept = window.confirm('정말로 스윗을 삭제하시겠습니까?')
    if (accept) {
      await deleteDoc(sweetTxtRef)
    }
  }
  const toggleEditBtn = () => {
    setEditBtn((prev) => !prev)
  }
  const onChangeEdit = ({ target: { value } }) => {
    setEditSweet(value)
  }
  const onSubmitEdit = async (e) => {
    e.preventDefault()
    await updateDoc(sweetTxtRef, { text: editSweet })
    setEditBtn(false)
  }

  return (
    <>
      {editBtn ? (
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
        <>
          <h3>{txt}</h3>
          {txtOwner && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={toggleEditBtn}>Edit</button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Sweet
