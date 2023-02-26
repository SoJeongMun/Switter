import { db } from 'myBase'
import { doc, deleteDoc } from 'firebase/firestore'

function Sweet({ id, txt, txtOwner, userObj }) {
  const sweetTxtRef = doc(db, 'sweets', `${userObj.id}`)
  const onDelete = async () => {
    const accept = window.confirm('정말로 스윗을 삭제하시겠습니까?')
    if (accept) {
      await deleteDoc(sweetTxtRef)
    }
  }
  return (
    <>
      <div ket={id}>
        <h3>{txt}</h3>
        <span>{txtOwner}</span>
        {txtOwner && (
          <>
            <button onClick={onDelete}>Delete</button>
            <button>Edit</button>
          </>
        )}
      </div>
    </>
  )
}

export default Sweet
