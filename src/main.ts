import "./style.css";
import { Article } from "./assets/types";
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const userInputSearch = document.getElementById(
  "input-text"
) as HTMLInputElement;

const outputDiv = document.querySelector<HTMLDivElement>(".output")!;

type NewsInput = {
  articles: string[];
};

function userSearch(input: string) {
  const searchLinkAPI = `https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}`;

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
        outputDiv.appendChild(newArticle);
      });
    });
}

userSearch("dog");
