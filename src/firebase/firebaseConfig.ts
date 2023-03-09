// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBeQlN1XrlGfOFItMuE3S2G8vSM3ij043w',
  authDomain: 'myshop-ccd91.firebaseapp.com',
  projectId: 'myshop-ccd91',
  storageBucket: 'myshop-ccd91.appspot.com',
  messagingSenderId: '939837996457',
  appId: '1:939837996457:web:423c7206ad943839c398b8',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
