var savedItems = JSON.parse(localStorage.getItem("favorites")) || [];

var favoritesListEl = document.getElementById("favorites-list");

for (i = 0; i < savedItems.length; i++) {
  console.log(savedItems[i]);

  const newDiv = document.createElement("div");
  newDiv.classList.add("slide");

  const newImg = document.createElement("img");
  newImg.src = savedItems[i].imgURL;

  const newP = document.createElement("p");
  newP.textContent = savedItems[i].title;

  newDiv.append(newImg, newP);

  favoritesListEl.append(newDiv);
}

// <div>
// <img src="https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_Ratio0.6699_AL_.jpg"/>
// <p>Mario</p>
// </div>
