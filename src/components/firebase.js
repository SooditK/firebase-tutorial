import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_pLsjf4-gopHnmx1YpqTfNckbrLRIcv8",
  authDomain: "think-piece-85544.firebaseapp.com",
  projectId: "think-piece-85544",
  storageBucket: "think-piece-85544.appspot.com",
  messagingSenderId: "1041067145404",
  appId: "1:1041067145404:web:d2c4ac8fc17e48ec4538b9",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore(); // NEW

// firestore.settings({ timestampsInSnapshots: true });

export default firebase;

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
