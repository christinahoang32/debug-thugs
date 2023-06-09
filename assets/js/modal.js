// Get the modal
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modal-data");
var movie = document.querySelector(".myBtn");
var inTheaters = document.getElementById("carousel-container1");
var comingSoon = document.getElementById("carousel-container2");

function getInTheater() {
  fetch("https://imdb-api.com/en/API/InTheaters/k_h19lyz0m")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract relevant data
      displayInTheater(data.items);
      console.log(data);
    });
}

function getComingSoon() {
  fetch("https://imdb-api.com/en/API/ComingSoon/k_h19lyz0m")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract relevant data
      displayComingSoon(data.items);
      console.log(data);
    });
}

getComingSoon();
getInTheater();

function displayInTheater(list) {
  console.log(list);
  inTheaters.innerHTML = "";

  for (var i = 0; i < list.length; i++) {
    var divContainer = document.createElement("div");
    divContainer.setAttribute("data-id", list[i].id);
    divContainer.classList.add("slide", "myBtn");

    var poster = document.createElement("img");
    poster.setAttribute("src", list[i].image);

    var title = document.createElement("h3");
    title.textContent = list[i].title;

    divContainer.append(poster, title);
    inTheaters.append(divContainer);
  }

  addButton();
}

function displayComingSoon(list) {
  console.log(list);
  comingSoon.innerHTML = "";

  for (var i = 0; i < list.length; i++) {
    var divContainer = document.createElement("div");
    divContainer.setAttribute("data-id", list[i].id);
    divContainer.classList.add("slide", "myBtn");

    var poster = document.createElement("img");
    poster.setAttribute("src", list[i].image);

    var title = document.createElement("h3");
    title.textContent = list[i].title;

    divContainer.append(poster, title);
    comingSoon.append(divContainer);
  }

  addButton();
}

function addButton() {
  var btns = $(".myBtn");

  btns.on("click", function (event) {
    // Fetch API to retrieve data
    console.log(event.target.parentElement);
    var imdbID = event.target.parentElement.getAttribute("data-id");
    var modal = document.getElementById("myModal");
    modal.querySelector(".modal-content").setAttribute("id", imdbID);

    fetch("https://www.omdbapi.com/?i=" + imdbID + "&apikey=ce851610")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Extract relevant data

        console.log(data);

        var title = data.Title;
        var description = data.Plot;
        var poster = data.Poster;
        var ratings = data.imdbRating;
        var genre = data.Genre;
        var rated = data.Rated;
        var actors = data.Actors;

        // Update modal content dynamically
        modalContent.innerHTML = `
        <h2 class="title"> ${title}</h2>
        <p>${description}</p>
        <p>IMDb Rating: ${ratings}</p>
        <p>Genre: ${genre}</p>
        <p>Motion Picture Rated: ${rated}</p>
        <p>Actors: ${actors}</p>
        <img class="modal-img"src="${poster}" alt="${title} movie poster">
      `;

        // Display the modal
        modal.style.display = "block";
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  btns.on("click", function () {
    modal.style.display = "block";
  });
}

// Get the button that opens the modal
//var button = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// for(i = 0; i < btns.lenght; i++) {
//   console.log(btns[i])
//   btns[i].onclick = function() {
//     modal.style.display = "block";
//   }
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// like button functionality
var likeBtn = document.getElementById("like-btn");

likeBtn.addEventListener("click", function () {
  console.log("saving");
  var favoritesArr = JSON.parse(localStorage.getItem("favorites")) || [];

  var modal = document.querySelector(".modal-content");
  var imgURL = document.querySelector(".modal-img").src;
  var title = document.querySelector(".title").textContent;

  var data = {
    title,
    imgURL,
    modal,
  };
  console.log(data);
  favoritesArr.push(data);

  localStorage.setItem("favorites", JSON.stringify(favoritesArr));
});
