// firebase.ts

import firebase from 'firebase/app';
import 'firebase/auth'; // Import modul auth dari firebase
import { toast } from '../toast';

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

export const auth = firebase.auth(); // Mendapatkan instance auth dari firebase

export default firebaseApp;

// Membuat akun baru user
export async function registerUser(email: string, password: string) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    return toast("Email has already been used"); // Memperbaiki pesan toast
  }
}

// Login dengan akun yang sudah dibuat
export async function loginUser(email: string, password: string) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return toast("Login failed, please check your password and email"); // Memperbaiki pesan toast
  }
}
