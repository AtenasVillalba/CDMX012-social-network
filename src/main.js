import { login } from "./components/Login.js";
import { register } from "./components/Register.js";
import { createProfile } from "./components/Create-profile.js";
import { timeline } from "./components/Timeline.js";
import { profile } from "./components/Profile.js";
import { adoptions } from "./components/Adoptions.js";

import { onAuthStateChanged, getAuth } from "../lib/firebase-imports.js";

const rootContent = document.getElementById("root");

const routes = {
  "/": login,
  "/Register": register,
  "/Create-profile": createProfile,
  "/Timeline": timeline,
  "/Profile": profile,
  "/Adoptions": adoptions,
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
    let isValid = localStorage.getItem("dataProfile");

    if (JSON.parse(isValid)) {
      onNavigate("/Timeline");
    } else {
      onNavigate("/Create-profile");
    }
  } else {
    // User is signed out
    onNavigate("/");
  }
});

let component = routes[window.location.pathname];
rootContent.appendChild(component());
