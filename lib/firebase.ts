
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// 环境变量验证
if (!firebaseConfig.apiKey) {
  console.error('Missing NEXT_PUBLIC_FIREBASE_API_KEY environment variable')
  throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is required')
}

if (!firebaseConfig.authDomain) {
  console.error('Missing NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN environment variable')
  throw new Error('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is required')
}

if (!firebaseConfig.projectId) {
  console.error('Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable')
  throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is required')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

console.log('Firebase initialized with project:', firebaseConfig.projectId)
