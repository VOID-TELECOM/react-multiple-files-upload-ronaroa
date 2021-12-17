import firebase from 'firebase/app';
import  "firebase/auth";
import "firebase/database";
import "firebase/storage";




const firebaseConfig = {

  apiKey: "AIzaSyD87Ccggx4sft7-TdwIv-D11DjupURPoE8",

  authDomain: "kiosk-midea.firebaseapp.com",

  databaseURL: "https://kiosk-midea-default-rtdb.firebaseio.com",

  projectId: "kiosk-midea",

  storageBucket: "kiosk-midea.appspot.com",

  messagingSenderId: "165128555846",

  appId: "1:165128555846:web:a4fc4d182177b49548a947",

  measurementId: "G-5Z49TT6CTK"

};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

export { firebase, auth, database, storage };

