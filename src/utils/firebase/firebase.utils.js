import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import {
    getFirestore,
    doc, //used to retrieve documents from our db in firebase
    getDoc, // used to access the docs
    setDoc, // used to set data in the docs
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0-sKu1Q6sGh2uXmnDfzjdxAOKkAqEGZo",
    authDomain: "code-crushed-wears-db.firebaseapp.com",
    projectId: "code-crushed-wears-db",
    storageBucket: "code-crushed-wears-db.appspot.com",
    messagingSenderId: "276604609214",
    appId: "1:276604609214:web:659fbca63afec017a8b4ef"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    // prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log("error creating the user", error.message);
        }

        return userDocRef
    }

    //if user data does not exist

    //create/set the doc with the data from userAuth in my collection
    //if user data exists

    //return userDocRef
  }