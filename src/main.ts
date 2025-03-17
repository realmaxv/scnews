import "./style.css";
import { Article } from "./assets/types";
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const userInputSearch = document.getElementById(
  "input-text"
) as HTMLInputElement;

const outputDiv = document.querySelector<HTMLDivElement>(".output");
const inputLanguage = document.querySelector("#input-sprache") as HTMLSelectElement;
const inputSort = document.querySelector("#input-sort") as HTMLSelectElement; 
const submitBtn = document.querySelector("#search-btn") as HTMLButtonElement;



let userValue = userInputSearch.value;
type NewsInput = {
  articles: string[];
};

function userSearch(input: string, inputUserLang: string) {
  const searchLinkAPI = `https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}&language=${inputUserLang}`;

  fetch(searchLinkAPI)
    .then((response) => response.json())
    .then((data) => {
      data.articles.forEach((element: Article) => {
        const newArticle = document.createElement("div");
        newArticle.className = "single-article";
        const newHeadline = document.createElement("h3");
        newHeadline.textContent = element.title;
        const description = document.createElement("p");
        description.textContent = element.description;
        const image = document.createElement("img");

        image.src = element.urlToImage || "kein Bild";
        const articleBtn = document.createElement("a");
        articleBtn.innerText = "Zum Artikel";
        articleBtn.href = element.url;

        newArticle.append(newHeadline, description, image, articleBtn);
        if (outputDiv) {
            outputDiv.appendChild(newArticle);
        }
      });
    });
}

userSearch();

inputLanguage.addEventListener("change", (input) => {
    if(outputDiv){
     outputDiv.innerHTML = "";
    }
    switch(inputLanguage.value) {
        case "de": userSearch(input, "de")
        break;
        case "en": userSearch(input, "en")
        break;
        case "es": userSearch(input, "es")
        break;
        case "fr": userSearch(input, "fr")
        break;
        case "it": userSearch(input, "it")
        break;
        case "ru": userSearch(input, "ru")
        break;
        case "ar": userSearch(input, "ar")
        break;
        case "he": userSearch(input, "he")
        break;
        case "nl": userSearch(input, "nl")
        break;
        case "no": userSearch(input, "no")
        break;
        case "sv": userSearch(input, "sv")
        break;
        case "pt": userSearch(input, "pt")
        break;
        case "chn": userSearch(input, "chn")
        break;
        default:
    }
    }
);
