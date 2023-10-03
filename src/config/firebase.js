// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider,setPersistence,browserSessionPersistence} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMJvOCtVwBcqE_Wp2KMJMcyybrmMbgUFw",
  authDomain: "jolubook-31060.firebaseapp.com",
  projectId: "jolubook-31060",
  storageBucket: "jolubook-31060.appspot.com",
  messagingSenderId: "958637062169",
  appId: "1:958637062169:web:2564174199c3c60bb31288",
  measurementId: "G-MDDZ6F819T"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
setPersistence(auth,browserSessionPersistence);
const provider = new GoogleAuthProvider();
export {auth,provider};