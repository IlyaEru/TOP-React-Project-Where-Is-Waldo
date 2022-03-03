import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBlmZRxfHb26_pifKBK18tJl9xIarxLkLs',
  authDomain: 'waldo-5d782.firebaseapp.com',
  projectId: 'waldo-5d782',
  storageBucket: 'waldo-5d782.appspot.com',
  messagingSenderId: '274623830143',
  appId: '1:274623830143:web:f082749c70c2cf41ddc74a',
  measurementId: 'G-XR4WQHLQD4',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
