export { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
export {
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

export {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";

// getDoc,
// setDoc,
