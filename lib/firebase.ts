
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 请从 Firebase 控制台获取正确的配置
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_CORRECT_API_KEY_HERE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "eduai-7efea.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "eduai-7efea",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "eduai-7efea.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "39166156482",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:39166156423:web:5eb6c44b3842209df74ad2",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-0TQ3BN0GS3"
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
