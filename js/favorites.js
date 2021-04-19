import changeCity from './main.js';
import {fiesta} from './ui.js';

// Add an event listener to the favorite button
document.querySelector("#add-to-favorites").addEventListener("click", () => {
  let val = document.querySelector(".change-city").value;
  addToFavourites(val);
  fiesta()
});

/**
 * Add a city to favorites
 *
 * @param {string} city The city wanted to be a favorite (City - Postcode)
 */
function addToFavourites(city) {
  let regex = /[a-zA-Z-'éèàê]+\s-\s\d{5}/;
  let match = city.match(regex);

  // Verify if the city res^pect the right format
  if (match[0] === match.input) {
    let favorites;
    // Verify if there is already favorites
    if (!localStorage.getItem('favorites')) {
        favorites = [];
    } else {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }

    favorites.push(city);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();
  } else {
    console.error("Invalid value");
  }
}

/**
 * Returns user's favorites
 *
 * @returns {array} Returns all the favorites
 */
function getFavorites() {
  let favorites = localStorage.getItem("favorites");

  return favorites;
}

/**
 * This function displays user's favorites on the side menu
 */
function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  let ul = document.querySelector(".favorites ul");
  ul.innerHTML = "";

  // Create elements to display the favorite
  favorites.forEach((favorite) => {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.textContent = favorite;
    btn.addEventListener('click', () => {
      changeCity(btn.textContent)
    })

    let i = document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-trash");
    i.addEventListener("click", () => {
      deleteFavorite(btn.textContent);
    });

    btn.appendChild(i);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

/**
 * Delete a favorite from the user's favorites
 * @param {string} favorite 
 */
function deleteFavorite(favorite) {
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  favorites.pop(favorite);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  displayFavorites();
}

displayFavorites();
