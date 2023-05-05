function init() {
  renderMovieLists();
  checkListDate();
} 
init();

//events
$('#currentDay').on('click', updateLists);

function updateLists() {
  fetchMovies();
  $('#currentDay').html(moment().format('LLLL'));
  //hover effect maybe
}

function checkListDate() {
  let currentDayEl = $('#currentDay');
  var listDate = JSON.parse(localStorage.getItem("currentListDate"));
  console.log("This is the currentListDate: " + listDate);

  if (listDate === null) {
    localStorage.setItem("currentListDate", JSON.stringify(moment().format('LLLL')));
    currentDayEl.html(moment().format('LLLL'));

  } else if (moment().isAfter(listDate)) {
    currentDayEl.html(listDate);
    localStorage.setItem("currentListDate", JSON.stringify(moment().format('LLLL')));
  }
}

function renderMovieLists() {
  var movieDataListA = JSON.parse(localStorage.getItem("movieDataListA"));
  var movieDataListB = JSON.parse(localStorage.getItem("movieDataListB"));
  //Checks if there is movie list data in local storage
  if (movieDataListA === null || movieDataListB === null) {
    //do a fetch now yall
    fetchMovies();
  } else {
    displayInTheater(movieDataListA);
    displayComingSoon(movieDataListB);
  }
}

function fetchMovies() {
  getComingSoon();
  getInTheater();
}

function getInTheater() {
  fetch("https://imdb-api.com/en/API/InTheaters/k_k5gvh7yi")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract relevant data
      displayInTheater(data.items);
      localStorage.setItem("movieDataListA", JSON.stringify(data.items));
      console.log(data);
    });
}

function getComingSoon() {
  fetch("https://imdb-api.com/en/API/ComingSoon/k_k5gvh7yi")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract relevant data
      displayComingSoon(data.items);
      localStorage.setItem("movieDataListB", JSON.stringify(data.items));
      console.log(data);
    });
}

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


//--Carousel functionality--//

function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
      result += mod;
    }
    return result;
  }
  
  function setUpCarousel(carousel) {
    function handleNext() {
      currentSlide = modulo(currentSlide + 1, numSlides);
      changeSlide(currentSlide);
    }
  
    function handlePrevious() {
      currentSlide = modulo(currentSlide - 1, numSlides);
      changeSlide(currentSlide);
    }
  
    function changeSlide(slideNumber) {
      carousel.style.setProperty('--current-slide', slideNumber);
    } 
  
    // get elements
    const buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
    const buttonNext = carousel.querySelector('[data-carousel-button-next]');
    const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
  
    // carousel state we need to remember
    let currentSlide = 0;
    const numSlides = slidesContainer.children.length;
  
    // set up events
    buttonPrevious.addEventListener('click', handlePrevious);
    buttonNext.addEventListener('click', handleNext);
  }
  
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(setUpCarousel);
  