import "./style.css";
import { Article } from "./assets/types";
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const userInputSearch = document.getElementById(
    "input-text"
) as HTMLInputElement;

const outputDiv = document.querySelector<HTMLDivElement>(".output");
const inputLanguage = document.querySelector(
    "#input-sprache"
) as HTMLSelectElement;
const inputSort = document.querySelector("#input-sort") as HTMLSelectElement;
const submitBtn = document.querySelector("#search-btn") as HTMLButtonElement;

function userSearch(input: string, inputUserLang: string, sort: string) {
    const searchLinkAPI = `https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}&language=${inputUserLang}&sortBy=${sort}`;

    fetch(searchLinkAPI)
        .then((response) => response.json())
        .then((data) => {
            if (data.articles.length === 0) { 
                window.alert("Keine Ergebnisse zu diesem Suchbegriff gefunden!");
                return;
            } else {
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
            });}
        })
        .catch((error) => console.log(error));
}
submitBtn.addEventListener("click", () => {
    if (outputDiv) {
        outputDiv.innerHTML = "";
    }

    if (userInputSearch.value === "") {
        window.alert("Kein Suchbegriff eingegeben. Bitte eingeben!");
    } else {
        userSearch(userInputSearch.value, inputLanguage.value, inputSort.value);
    }
});
