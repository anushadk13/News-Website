const api_key = "241a83ac3751433db87d698939c7aac3";
const api_url = "https://newsapi.org/v2/everything?q=";

let curSelectedNav = null; // change to let

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const response = await fetch(`${api_url}${query}&apiKey=${api_key}`);
  const data = await response.json();
  bindData(data.articles); // Fixed typo from ariticles to articles
}

function bindData(articles) {
  // Fixed typo from ariticles to articles
  const cardsContainer = document.querySelector(".cards-container");
  const newsCardtemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    // Fixed typo from ariticles to articles
    if (!article.urlToImage) return;
    const cardClone = newsCardtemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsDesc = cardClone.querySelector("#news-desc");
  const newsSource = cardClone.querySelector("#news-source");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  newsSource.innerHTML = article.source.name;

  const data = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
  });

  newsSource.innerHTML = `${data} | ${article.source.name}`;

  cardClone.querySelector(".card").addEventListener("click", () => {
    window.open(article.url, "_blank"); // open in new tab
  });
}

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  if (curSelectedNav) curSelectedNav.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;

  if (!query) return;
  fetchNews(query);
  if (curSelectedNav) curSelectedNav.classList.remove("active");
  searchText.value = ""; // Clear the search input
});
