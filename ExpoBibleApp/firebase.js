import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Constants from 'expo-constants';
// import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"


// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};


// if (!firebase.apps.length) {
  const fireApp = firebase.initializeApp(firebaseConfig);
// }
initializeAuth(fireApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// const auth = getAuth();
// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return signInWithEmailAndPassword(auth, email, password);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


export { firebase };