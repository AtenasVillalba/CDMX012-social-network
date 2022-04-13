import { savePost } from "../lib/firestore.js";
import ReadPost from "./post/ReadPost.js";
import { onNavigate } from "../main.js";
import { singOut } from "../lib/auth.js";
import { getAuth } from "../lib/firebase-imports.js";
// import{ReadProfileImage} from "../lib/image-posts.js"

export const timeline = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const contentTimeline = document.createElement("section");
  contentTimeline.setAttribute("class", "content_timeline");

  ///// HEADER
  const timelineHeader = document.createElement("header");
  timelineHeader.setAttribute("class", "timeline_header");

  const headerLogo = document.createElement("img");
  headerLogo.setAttribute("class", "solovino_logo_timeline");
  headerLogo.setAttribute("src", "../Resourses/Logos/solovino black movil.png");

  timelineHeader.append(headerLogo);

  ///// NEW POST
  const newPostContent = document.createElement("section");
  newPostContent.setAttribute("id", "new_post_content");

  const NewPostImgUser = document.createElement("img");
  NewPostImgUser.setAttribute("class", "post_img_user");
  NewPostImgUser.setAttribute("src", user.photoURL);

  const Newpost = document.createElement("input");
  Newpost.setAttribute("placeholder", "Escribe algo...");
  Newpost.setAttribute("id", "new_post");
  Newpost.setAttribute("class", "new_post_input");

  const buttonToPost = document.createElement("button");
  buttonToPost.textContent = "Publicar";
  buttonToPost.setAttribute("id", "button_to_post");
  buttonToPost.addEventListener("click", () => {
    const contentPost = document.getElementById("new_post").value;
    const date = new Date();
    savePost(contentPost, date);
  });

  buttonToPost.addEventListener("click", () => {
    function limpiar() {
      document.getElementById("new_post").value = "";
    }
    limpiar();
  });
  newPostContent.append(NewPostImgUser, Newpost, buttonToPost);

  ///// POST AREA
  const PostsArea = document.createElement("section");
  PostsArea.setAttribute("id", "posts_container");
  PostsArea.appendChild(ReadPost());

  ///// MENU
  const menuMovileContainer = document.createElement("section");
  menuMovileContainer.className = "menu_container";

  const iconHomeMovile = document.createElement("img");
  iconHomeMovile.setAttribute("src", "../Resourses/icons/home.png");
  iconHomeMovile.className = "menu_icon";
  iconHomeMovile.addEventListener("click", () => {
    backToTop();
  });

  const iconProfileMovile = document.createElement("img");
  iconProfileMovile.setAttribute("src", "../Resourses/icons/user.png");
  iconProfileMovile.className = "menu_icon";
  iconProfileMovile.addEventListener("click", () => {
    onNavigate("/Profile");
  });

  const iconAdoptsMovile = document.createElement("img");
  iconAdoptsMovile.setAttribute("src", "../Resourses/icons/adopt.png");
  iconAdoptsMovile.className = "menu_icon";
  iconAdoptsMovile.addEventListener("click", () => {
    onNavigate("/Adoptions");
  });

  const iconLogOutMovile = document.createElement("img");
  iconLogOutMovile.setAttribute("src", "../Resourses/icons/log out.png");
  iconLogOutMovile.className = "menu_icon";
  iconLogOutMovile.addEventListener("click", () => {
    singOut();
  });

  menuMovileContainer.append(
    iconHomeMovile,
    iconProfileMovile,
    iconAdoptsMovile,
    iconLogOutMovile
  );
  contentTimeline.append(
    timelineHeader,
    newPostContent,
    PostsArea,
    menuMovileContainer
  );

  return contentTimeline;
};

function backToTop() {
  // window.scrollTo(0,0);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
