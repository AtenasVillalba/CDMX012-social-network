import { initializeApp } from "./firebase-imports.js";
import {
  getAuth,
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  updateProfile,
} from "./firebase-imports.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export let savePost = (post, date) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const displayName = user.displayName;
    const email = user.email;
    const photo = user.photoURL;

    return addDoc(collection(db, "post"), {
      post,
      date,
      uid,
      displayName,
      email,
      photo,
      likes: [],
    });
  } else {
    // No user is signed in.
  }
};

export const updateProfileColecction = (
  userPhoto,
  userName,
  userBirthday,
  userCity,
  userGender,
  userEmail
) => {
  addDoc(collection(db, "profile"), {
    userPhoto,
    userName,
    userBirthday,
    userCity,
    userGender,
    userEmail,
  }).then(() => {
    localStorage.setItem("dataProfile", true);
  });
};

export let updateUserData = (userName, userPhoto) => {
  const auth = getAuth();
  if (userPhoto) {
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: userPhoto,
    });
  } else {
    updateProfile(auth.currentUser, {
      displayName: userName,
    });
  }
};

// export let updateUserphoto = (userPhoto) => {
//   const auth = getAuth();
//   if (userPhoto) {
//     updateProfile(auth.currentUser, {
//       photoURL: userPhoto,
//     });
//   }
// };

// export let updateUserData = ( userName) => {
//   const auth = getAuth();
//   updateProfile(auth.currentUser, {
//     displayName : userName
//   })
// };

export const deletePost = (id) => {
  //alert("Este post será eliminado");
  deleteDoc(doc(db, "post", id));
};

export async function editPost(id, editImput, date) {
  const postRef = doc(db, "post", id);
  await updateDoc(postRef, {
    post: editImput,
    date: new Date(),
  });
}

export async function likePost(post) {
  const auth = getAuth();
  const user = auth.currentUser;

  const likes = post.data().likes;
  const doILikeIt = likes.find((like) => like.email === user.email);

  if (doILikeIt) {
    // Lo quito
    const postRef = doc(db, "post", post.id);
    await updateDoc(postRef, {
      likes: arrayRemove({ email: user.email }),
    });
  } else {
    const postRef = doc(db, "post", post.id);
    await updateDoc(postRef, {
      likes: arrayUnion({ email: user.email }),
    });
  }
}
