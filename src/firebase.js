import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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

firestore.settings({ timestampsInSnapshots: true });

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const storage = firebase.storage();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`/users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    return firestore.collection("users").doc(uid);
  } catch (err) {
    console.error(err.message);
  }
};

export default firebase;
