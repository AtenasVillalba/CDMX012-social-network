import { app } from "./firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "./firebase-imports.js";
import { onNavigate } from "../main.js";

export const auth = getAuth(app);

export function registerNewUsers(emailRegister, paswordRegister) {
  createUserWithEmailAndPassword(auth, emailRegister, paswordRegister)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        email: emailRegister,
        password: paswordRegister,
        photoURL: "https://random.imagecdn.app/300/300",
      }).then(() => {
        localStorage.setItem("dataProfile", false);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode || errorMessage);
      
    });
}



export const isLogin = (emailLogin, passwordLogin) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        localStorage.setItem("dataProfile", true);
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode || errorMessage);
    });
};

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      clearImmediate;
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log(user);
      onNavigate("/Timeline");
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
      console.log("no esta ingresando gmail");
      //alert(errorCode || errorMessage || email || credential);
    });
};

export const loginWithFacebook = () => {
  const auth = getAuth();
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      onNavigate("/Timeline");
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      alert(errorMessage || email || credential);
      // ...
    });
};

export const singOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      localStorage.clear();
      onNavigate("/");
    })
    .catch((error) => {
      // An error happened.
      alert("Error al intentar cerrar sesión");
    });
};
