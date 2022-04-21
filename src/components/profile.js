import { onNavigate } from "../main.js";

export const profile = () => {
  const profileAllContent = document.createElement("section");
  profileAllContent.className = "content-adoptions";

  const profileContent = document.createElement("img");
  profileContent.setAttribute(
    "src",
    "./Resourses/Logos/404_Solovino_movile.jpg"
  );
  profileContent.className = "working-adoptions";
  profileContent.id = "image-working";

  const profileClose = document.createElement("img");
  profileClose.setAttribute("src", "./Resourses/icons/flecha.png");
  profileClose.setAttribute("class", "Adopt_close");
  profileClose.addEventListener("click", () => {
    onNavigate("/Timeline");
  });

  profileAllContent.append(profileClose, profileContent);
  return profileAllContent;
};
