import { db } from 'myBase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

function Sweet({ id, txt, txtOwner }) {
  const sweetTxtRef = doc(db, 'sweets', `${id}`)
  const [editSweet, setEditSweet] = useState(false)
  const [newSweet, setNewSweet] = useState(txt)

  const onDelete = async () => {
    const accept = window.confirm('정말로 스윗을 삭제하시겠습니까?')
    if (accept) {
      await deleteDoc(sweetTxtRef)
    }
  }
  const toggleEditing = () => {
    setEditSweet((prev) => !prev)
  }
  const onChangeEdit = ({ target: { value } }) => {
    setNewSweet(value)
  }
  const onSubmitEdit = async (e) => {
    e.preventDefault()
    await updateDoc(sweetTxtRef, { text: newSweet })
    setEditSweet(false)
  }

  return (
    <>
      {editSweet ? (
        <form onSubmit={onSubmitEdit}>
          <input
            value={newSweet}
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
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Sweet
