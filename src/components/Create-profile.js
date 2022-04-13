import { onNavigate } from "../main.js";
import { updateProfileColecction, updateUserData } from "../lib/firestore.js";
import {
  getAuth,
  query,
  collection,
  where,
  getDocs,
} from "../lib/firebase-imports.js";
import { db } from "../lib/firestore.js";
import { uploadImage } from "../lib/image-posts.js";
// ReadProfileImage
export const createProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const profileContainer = document.createElement("section");
  profileContainer.setAttribute("class", "background_Content");

  ////////DATA SECTION
  const prifileSection = document.createElement("section");
  prifileSection.setAttribute("class", "account_section");

  ////////////////// logo y retorno
  const profileClose = document.createElement("img");
  profileClose.setAttribute("src", "../Resourses/icons/flecha.png");
  profileClose.setAttribute("class", "register_close");
  profileClose.addEventListener("click", () => {
    onNavigate("/Register");
  });

  const imgProfileLogo = document.createElement("img");
  imgProfileLogo.setAttribute("src", "../Resourses/Logos/Solovino_Black.png");
  imgProfileLogo.setAttribute("class", "solovino_logo_logIn");

  ////////////// datos usuario
  const UserInputSection = document.createElement("section");
  UserInputSection.setAttribute("class", "input_section");

  const textCreateProfile = document.createElement("h2");
  textCreateProfile.setAttribute("class", "text_create_profile");
  textCreateProfile.textContent = "Perfil del Dueño";

  // input imagen
  const imgProfileUpdate = document.createElement("img");
  imgProfileUpdate.setAttribute("src", "../Resourses/icons/profile_image.png");
  imgProfileUpdate.setAttribute("class", "img_profile_update");

  const inputProfileImage = document.createElement("input");
  inputProfileImage.type = "file";
  inputProfileImage.name = "user-photo";
  inputProfileImage.setAttribute("accept", "image/*");
  inputProfileImage.id = "photo_user";
  inputProfileImage.classList.add("photo_user");

  const previewImgProfile = document.createElement("img");
  previewImgProfile.setAttribute("id", "preview_img_profile");
  previewImgProfile.setAttribute("class", "preview_img");

  inputProfileImage.addEventListener("change", () => {
    previewImage();
  });
  function previewImage() {
    let file = document.getElementById("photo_user").files;
    if (file.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        document
          .getElementById("preview_img_profile")
          .setAttribute("src", event.target.result);
      };
      fileReader.readAsDataURL(file[0]);
    }
  }

  // input nombre
  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.required = "required";
  inputName.setAttribute("id", "name_user");
  inputName.setAttribute("class", "input_account");
  inputName.setAttribute("placeholder", "Nombre");

  // input fecha de nacimiento
  const inputBirthday = document.createElement("input");
  inputBirthday.setAttribute("type", "text");
  inputBirthday.required = "required";
  inputBirthday.setAttribute("id", "birthday_user");
  inputBirthday.setAttribute("class", "input_account");
  inputBirthday.setAttribute("placeholder", "Fecha de nacimiento dd/mm/aa");

  // input ciudad
  const contentCity = document.createElement("select");
  contentCity.setAttribute("id", "city_user");
  contentCity.setAttribute("class", "input_account");
  contentCity.required = "required";

  const optioncity = document.createElement("option");
  optioncity.setAttribute("value", "hide");
  optioncity.textContent = "Ciudad";

  const cityMex = document.createElement("option");
  cityMex.setAttribute("value", "Mexico");
  cityMex.setAttribute("id", "city_mex");
  cityMex.setAttribute("class", "label_city");
  cityMex.textContent = "Ciudad de México";

  const cityGdl = document.createElement("option");
  cityGdl.setAttribute("value", "GDL");
  cityGdl.setAttribute("id", "city_gdl");
  cityGdl.setAttribute("class", "label_city");
  cityGdl.textContent = "Guadalajara";

  contentCity.append(optioncity, cityMex, cityGdl);

  // input gender
  const content_Gender = document.createElement("select");
  content_Gender.setAttribute("id", "gender_user");
  content_Gender.setAttribute("class", "input_account");
  content_Gender.required = "required";

  const option_Gender = document.createElement("option");
  option_Gender.setAttribute("value", "hide");
  option_Gender.textContent = "Genero";

  const maleGender = document.createElement("option");
  maleGender.setAttribute("value", "male");
  maleGender.setAttribute("id", "Male");
  maleGender.setAttribute("class", "label_gender");
  maleGender.textContent = "Hombre";

  const femaleGender = document.createElement("option");
  femaleGender.setAttribute("value", "female");
  femaleGender.setAttribute("id", "female");
  femaleGender.setAttribute("class", "label_gender");
  femaleGender.textContent = "Mujer";

  const otherGender = document.createElement("option");
  otherGender.setAttribute("value", "female");
  otherGender.setAttribute("id", "other");
  otherGender.setAttribute("class", "label_gender");
  otherGender.textContent = "Personalizado";

  content_Gender.append(option_Gender, maleGender, femaleGender, otherGender);

  // boton crear perfil
  const buttonCreateProfile = document.createElement("button");
  buttonCreateProfile.setAttribute("id", "create_Profile");
  buttonCreateProfile.setAttribute("class", "button_account");
  buttonCreateProfile.textContent = "Crear Perfil";

  localStorage.setItem("dataProfile", false);

  buttonCreateProfile.addEventListener("click", (e) => {
    e.preventDefault();

    uploadImage(photo_user);

    let userPhoto = document.getElementById("photo_user").value;
    let userName = document.getElementById("name_user").value;
    let userBirthday = document.getElementById("birthday_user").value;
    let userCity = document.getElementById("city_user").value;
    let userGender = document.getElementById("gender_user").value;

    updateProfileColecction(
      userPhoto,
      userName,
      userBirthday,
      userCity,
      userGender,
      user.email
    );
    updateUserData(userName, userPhoto);
    onNavigate("/Timeline");
  });

  UserInputSection.append(
    textCreateProfile,
    imgProfileUpdate,
    previewImgProfile,
    inputProfileImage,
    inputName,
    inputBirthday,
    contentCity,
    content_Gender,
    buttonCreateProfile
  );

  prifileSection.append(profileClose, imgProfileLogo, UserInputSection);

  profileContainer.append(prifileSection);

  return profileContainer;
};
