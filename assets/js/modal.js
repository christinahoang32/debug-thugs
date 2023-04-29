// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btns = document.getElementsByClassName("myBtn");
var btns = $(".myBtn")

console.log(btns)

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// for(i = 0; i < btns.lenght; i++) {
//   console.log(btns[i])
//   btns[i].onclick = function() {
//     modal.style.display = "block";
//   }
// }
  btns.on("click", function() {
    modal.style.display = "block";
  })

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// like button functionality
var likeBtn = document.getElementById("like-btn");

likeBtn.addEventListener("click", function() {
  console.log("saving")
  var favoritesArr = JSON.parse(localStorage.getItem("favorites")) || []

  var title = document.getElementById("modal-title").textContent;
  var imgURL = document.getElementById("modal-img").src;

  var data = {
    title,
    imgURL
  }

  favoritesArr.push(data)

  localStorage.setItem("favorites", JSON.stringify(favoritesArr))
})