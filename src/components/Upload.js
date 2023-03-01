import { useState, useRef } from 'react'
// import { v4 } from 'uuid'
// import { storage } from 'myBase'
// import { ref, uploadString } from '@firebase/storage'
function Upload() {
  const [attachment, setAttachment] = useState('')
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e
    const fileInfo = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(fileInfo)
  }
  const fileInput = useRef()
  const onClickClear = setAttachment('')
  return (
    <>
      <input
        type='file'
        accept='image/*'
        onChange={onFileChange}
        ref={fileInput}
      />
      {attachment && (
        <div>
          <img src={attachment} width='100px' height='100px' alt='thumbnail' />
          <button onClick={onClickClear}>Delete</button>
        </div>
      )}
    </>
  )
}
export default Upload
