import { useEffect, useState, useRef } from 'react'
import { db } from 'myBase'
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'
import { v4 } from 'uuid'
import { storage } from 'myBase'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
import Sweet from 'components/Sweet'

function Home({ userObj }) {
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
    //트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함
    let attachmentUrl = ''
    try {
      //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 if문 사용
      if (attachment !== '') {
        //파일 경로 참조 만들기
        // 'data_url' === reader.readAsDataURL(fileInfo)
        const attachmentRef = ref(storage, `${userObj.uid}/${v4()}`)
        //storage 참조 경로로 파일 업로드 하기
        const attachmentUpload = await uploadString(
          attachmentRef,
          attachment,
          'data_url',
        )
        //storage에 있는 파일 URL로 다운로드 받기
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
            {/* infinite-loop re-rendering 방지 */}
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

export default Home
