import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  GoogleAuthProvider,
  // getAuth,
  // query,
  // collection,
  // where,
  // getDocs,
} from './firebase-imports.js';
import { firebaseConfig } from "./firebase-config.js";
// import {db} from './firestore.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";

const app = initializeApp(firebaseConfig);

const storage = getStorage();
 

/////////imput de la imagen
export async function uploadImage(profileImage) {
  const image = profileImage.files[0];
  console.log(image);
  const archivoref = ref(storage, `ImageProfile/${image.name}`);
  await uploadBytes(archivoref, image)
    .then(() => {
      getProfileImage(image) = ()=> {
        const clearImagePath = image.replace(/C:\\fakepath\\/, '');
        const archivoref1 = ref(storage, `ImageProfile/${clearImagePath}`);
        getDownloadURL(archivoref1).then(() => {(url) => {   
          return url;
          };
        });
    };
};

// export async function ReadProfileImage(userEmail) {
//   // const q = query(collection(db, "profile"), where("userEmail", "==", userEmail));
//   // const querySnapshot = await getDocs(q);
//   // const unsubscribe = onSnapshot(q, (profile) => {
//   //   postList.forEach((profile) =>{
//     const image = profile.data().userPhoto;
//        getProfileImage(image).then((url) => {
        
//         localStorage.setItem('photoUser', url );
//         console.log(url);
//         return url;
//       });    
//   });
// };


/// elimina el conflicto fakepath
// export async function getProfileImage(image) {
//   const clearImagePath = image.replace(/C:\\fakepath\\/, '');
//   const archivoref = ref(storage, `ImageProfile/${clearImagePath}`);
//   return getDownloadURL(archivoref);
// }