import { login } from "./components/Login.js";
import { register } from "./components/Register.js";
import { timeline } from "./components/Timeline.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

const rootContent = document.getElementById("root");

const routes = {
  "/": login,
  "/Register": register,
  "/Timeline": timeline,
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  while (rootContent.firstChild) {
    rootContent.removeChild(rootContent.firstChild);
  }

  rootContent.appendChild(routes[pathname]());
};

window.onpopstate = () => {
  rootContent.appendChild(routes[window.location.pathname]());
};

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
    console.log(user);
    onNavigate("/Timeline");
  } else {
    // User is signed out

    onNavigate("/");
  }
});

let component = routes[window.location.pathname];
rootContent.appendChild(component());