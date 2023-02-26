import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//   appId: process.env.REACT_APP_APP_ID,
// }
const firebaseConfig = {
  apiKey: 'AIzaSyAa8p96T318pdd27nN4VCB8blGzVOslFjM',
  authDomain: 'twitter-clone-827d7.firebaseapp.com',
  projectId: 'twitter-clone-827d7',
  storageBucket: 'twitter-clone-827d7.appspot.com',
  messagingSenderId: '761303093399',
  appId: '1:761303093399:web:763e20f43941612ae359d2',
}

initializeApp(firebaseConfig)
export const authService = getAuth()
export const db = getFirestore()
