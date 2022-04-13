import { onNavigate } from "../main.js";

export const adoptions = () => {
  const adoptionsAllContent = document.createElement("section");
  adoptionsAllContent.className = "content-adoptions";

  const adoptionsContent = document.createElement("img");
  adoptionsContent.setAttribute(
    "src",
    "../Resourses/Logos/404_Solovino_movile.jpg"
  );
  adoptionsContent.className = "working-adoptions";
  adoptionsContent.id = "image-working";

  const adoptionsClose = document.createElement("img");
  adoptionsClose.setAttribute("src", "../Resourses/icons/flecha.png");
  adoptionsClose.setAttribute("class", "Adopt_close");
  adoptionsClose.addEventListener("click", () => {
    onNavigate("/Timeline");
  });

  adoptionsAllContent.append(adoptionsClose, adoptionsContent);
  return adoptionsAllContent;
};
