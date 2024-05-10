// firebase.ts

import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDabIRtpiAXM3HjD6pTMyi3zRsqfZNSmOI",
    authDomain: "crossplat-9fa5a.firebaseapp.com",
    projectId: "crossplat-9fa5a",
    storageBucket: "crossplat-9fa5a.appspot.com",
    messagingSenderId: "471959255848",
    appId: "1:471959255848:web:d71dc04ffa92d2eda02e1d",
    measurementId: "G-7C0HSG5GH9"
  };

// Inisialisasi Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default firebaseApp;
