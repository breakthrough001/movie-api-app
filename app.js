const API_KEY = "api_key=54748490340bbcba7cde6bc58cb05f0f";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const overview = document.querySelector(".overview");
const hero = document.querySelector(".hero");

getMovies(API_URL);

function getMovies(url) {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         console.log(data.results);
         showMovies(data.results);
      });
}

function showMovies(data) {
   main.innerHTML = "";

   data.forEach((movie) => {
      const { title, poster_path, vote_average, overview, release_date } =
         movie;
      const movieEl = document.createElement("div");
      const year = release_date.split("-");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
       <img
          class='poster'
          src="${IMG_URL + poster_path}"
          alt="${title}"
        />

        <div class="movie-info">

            <div class='movie-info__rating'>
                  <img class='movie-info__star' src='${getApproval(
                     vote_average
                  )}'/>
                  <span>&#160;${vote_average}/10</span>
            </div>

            <h3 id='movieTitle'>${title}</h3>
            <p>Release Year: ${year[0]}</p>

        </div>

        <div class='overview-container'>
            <div class="overview">
               <h3>Overview</h3>
               <p>${overview}</p>
            </div>
         </div>
        `;

      // if overview.length > overview = overview.substring(0, 10)
      // color changing rating code <span class='${getColor(vote_average)}'>${vote_average}/10</span>;
      main.appendChild(movieEl);
   });
}

function getApproval(rating) {
   if (rating >= 6) {
      return "img/star-yellow.svg";
   } else {
      return "img/star-red.svg";
   }
}

function getColor(vote) {
   if (vote >= 8) {
      return "green";
   } else if (vote >= 5) {
      return "orange";
   } else {
      return "red";
   }
}

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const searchTerm = search.value;

   if (searchTerm) {
      hero.classList.add("hide");
      getMovies(searchURL + "&query=" + searchTerm);
   } else {
      hero.classList.remove("hide");
      getMovies(API_URL);
   }
});

///// Responsive Nav Bar

const navSlide = () => {
   const burger = document.querySelector(".burger");
   const nav = document.querySelector(".nav-links");
   const navLinks = document.querySelectorAll(".nav-links li");

   burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");

      // Animate links
      navLinks.forEach((link, index) => {
         if (link.style.animation) {
            link.style.animation = "";
         } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
               index / 7 + 0.5
            }s`;
         }
      });

      // Burger Animation
      burger.classList.toggle("toggle");
   });
};

// if have many functions add them like this then invoke app() below
const app = () => {
   navSlide();
   //    navSlide();
   //    navSlide();
   //    navSlide();
};

app();
