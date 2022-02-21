import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { writeUserData } from "../database";

const firebaseConfig = {
  apiKey: "AIzaSyAMhZ91f3eC8BGku9B2rYwa6GlVlJUpfx8",
  authDomain: "whatiread-io.firebaseapp.com",
  databaseURL:
    "https://whatiread-io-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "whatiread-io",
  storageBucket: "whatiread-io.appspot.com",
  messagingSenderId: "11675328532",
  appId: "1:11675328532:web:bc143f4d5fdbb5d7678701",
  measurementId: "G-HM5XQ56788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

export const SignupUser = (data) => {
  const { email, password, name } = data;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      writeUserData({ userId: user.uid, name, email, imageUrl: "" });
      console.log("Signup success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const LoginUser = (data) => {
  const { email, password } = data;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const GoogleLogin = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  auth.languageCode = "it";
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      writeUserData({
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        imageUrl: user.photoURL,
      });
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const Signout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("SignOut success");
    })
    .catch((error) => {
      // An error happened.
    });
};

export { app };
