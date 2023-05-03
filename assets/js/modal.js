// Get the modal
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modal-data");
var movie = document.querySelector(".myBtn");

function getMovieList() {
  fetch("https://imdb-api.com/en/API/InTheaters/k_ivg2w8iz")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract relevant data
      displayMovieList(data.items);
      console.log(data);
    });
}

getMovieList();

function displayMovieList(list) {
  var movieContainer = document.getElementById("carousel-container");
  console.log(list);

  movieContainer.innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    var divContainer = document.createElement("div");
    divContainer.setAttribute("data-id", list[i].id);
    divContainer.classList.add("slide", "myBtn");

    var poster = document.createElement("img");
    poster.setAttribute("src", list[i].image);

    var title = document.createElement("h3");
    title.textContent = list[i].title;

    divContainer.append(poster, title);
    movieContainer.append(divContainer);
  }

  addButton();
}

function addButton() {
  var btns = $(".myBtn");

  btns.on("click", function (event) {
    // Fetch API to retrieve data
    console.log(event.target.parentElement);
    var imdbID = event.target.parentElement.getAttribute("data-id");

    fetch("http://www.omdbapi.com/?i=" + imdbID + "&apikey=63da6da2")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Extract relevant data

        console.log(data);

        var title = data.Title;
        var description = data.Plot;
        var poster = data.Poster;

        // Update modal content dynamically
        modalContent.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <img src="${poster}" alt="${title} movie poster">
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

  var title = document.getElementById("modal-title").textContent;
  var imgURL = document.getElementById("modal-img").src;

  var data = {
    title,
    imgURL,
  };

  favoritesArr.push(data);

  localStorage.setItem("favorites", JSON.stringify(favoritesArr));
});
