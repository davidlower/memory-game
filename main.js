// <i class="fas fa-car"></i>
// <i class="fas fa-bomb"></i>
// <i class="fas fa-bell"></i>
// <i class="fas fa-bowling-ball"></i>
// <i class="fas fa-camera"></i>
// <i class="fas fa-cloud"></i>
// <i class="fas fa-key"></i>
// <i class="fas fa-shopping-cart"></i>

var iconsArray = [
   'fa-shopping-cart card-1',
   'fa-shopping-cart card-1',
   'fa-car card-2',
   'fa-car card-2',
   'fa-bomb card-3',
   'fa-bomb card-3',
   'fa-bell card-4',
   'fa-bell card-4',
   'fa-bowling-ball card-5',
   'fa-bowling-ball card-5',
   'fa-camera card-6',
   'fa-camera card-6',
   'fa-cloud card-7',
   'fa-cloud card-7',
   'fa-key card-8',
   'fa-key card-8'
];
var doesItMatchArray = [];
var itemArray = [];
var counter = 0;
var starsArray = [];

// SHUFFLE FUCNTION - to randomise the various icons used in the game.
Array.prototype.shuffle = function() {
   for (i = 1; i < this.length; i++) {
      random = Math.round(Math.random() * i);
      temp = this[random];
      this[random] = this[i];
      this[i] = temp;
   }
   return this;
};

// SETUP OF THE MEMORY BOARD - assigning all the icons to random cards
function memoryGameBoard() {
   var htmlCode = "";
   var gameBoard = document.getElementById("memory-game-board");
   iconsArray.shuffle();
   for (i = 0; i < iconsArray.length; i++) {
      htmlCode += '<div class="card" id="card' + i + '"><div class="back"><i class="fas ' + iconsArray[i] + '"></i></div></div>';
   }
   gameBoard.innerHTML = htmlCode;
}
memoryGameBoard();


document.addEventListener("DOMContentLoaded", function(event) {

   // REFRESHING OR RELOADING of the game board
   var refresh = document.getElementById("refresh");
   refresh.addEventListener("click", memoryGameBoard);

   // FLIP CARD AND CLICK EVENT LISTENER
   var deck = document.querySelector("#memory-game-board");
   deck.addEventListener("click", function(event) {
      if (event.target.classList.contains("card")) {
         event.target.style.transform = "rotateY(-180deg)";
         flipCard();
      }
   });

   // COMPARING CARDS FUNCTION
   function flipCard() {
      var cardId = document.getElementsByTagName(i);
      cardIdSelection = cardId.classList;
      console.log(cardIdSelection);

      // if (itemArray.length == 0) {
      //    itemArray.push("a");
      // } else if (itemArray.length == 1) {
      //    itemArray.push("b");
      // } else {
      //    console.log("match");
      // }
      // console.log(itemArray);
      console.log("clicked");



   }
});