document.addEventListener("DOMContentLoaded", function(event) {

   var iconsArray = [
      [1, 'fa-shopping-cart'],
      [1, 'fa-shopping-cart'],
      [2, 'fa-car'],
      [2, 'fa-car'],
      [3, 'fa-bomb'],
      [3, 'fa-bomb'],
      [4, 'fa-bell'],
      [4, 'fa-bell'],
      [5, 'fa-bowling-ball'],
      [5, 'fa-bowling-ball'],
      [6, 'fa-cloud'],
      [6, 'fa-cloud'],
      [7, 'fa-camera'],
      [7, 'fa-camera'],
      [8, 'fa-key'],
      [8, 'fa-key']
   ];

   // VARIOUS VARIABLES
   var match = [];
   var item = [];
   var counter = 0;
   var moves = 0;
   var stars = [];

   var gameBoard = document.getElementById("memory-game-board");
   var refresh = document.getElementById("refresh");


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
      iconsArray.shuffle();
      for (i = 0; i < iconsArray.length; i++) {
         htmlCode += '<div class="card card' + iconsArray[i][0] + '"><i class="fas ' + iconsArray[i][1] + '"></i></div>';
      }
      gameBoard.innerHTML = htmlCode;
   }
   memoryGameBoard();

   // FLIP CARD AND ASSIGNING A CLICK EVENT
   function flipCard() {
      gameBoard.addEventListener("click", function(e) {
         if (e.target.classList.contains("card")) {
            e.target.classList.add("selected");
            matchCards(e.target);
            timer();
         }
      });
   }
   flipCard();

   // CHECKING FOR MATCHED FLIPPED CARDS
   function matchCards(element) {
      var cardId = element.classList[1];
      var selected = document.querySelectorAll(".selected");
      if (item.length == 0) {
         item.push(1);
         match.push(cardId);
         console.log(item);
         console.log(match);
      } else if (item.length == 1) {
         item.push(1);
         match.push(cardId);
         moves++;
         console.log(moves);
         if (match[0] == match[1]) {
            console.log("there is a match");
            setTimeout(function() {
               success();
            }, 500);
            counter += 2;
            console.log(counter);
            match = [];
            item = [];
            if (counter == iconsArray.length) {
               popupModal();
            }
         } else {
            console.log('it does not match');
            setTimeout(function() {
               fail();
            }, 500);
         }
      }
   }

   // FUNCTION WHEN CARDS MATCH
   function success() {
      var selected = document.querySelectorAll(".selected");
      selected[0].classList.add("success");
      selected[1].classList.add("success");
      setTimeout(function() {
         selected[0].classList.remove("selected");
         selected[1].classList.remove("selected");
      }, 1000);
   }

   // FUNCTION WHEN CARDS FAIL TO MATCH
   function fail() {
      console.log("flipping you back");
      var selected = document.querySelectorAll(".selected");
      selected[0].classList.add("fail");
      selected[1].classList.add("fail");
      setTimeout(function() {
         selected[0].classList.remove("fail", "selected");
         selected[1].classList.remove("fail", "selected");
      }, 1000);
   }

   // FUNCTION FOR WHEN GAME IS COMPLETE AND MODAL POPS UP WITH CONGRATULATIONS
   function popupModal() {
      console.log("game has finished");
   }


   // TIMER function
   function timer() {
      var time = 0;
      setTimeout(function() {
         time++;
         var mins = Math.floor(time / 10 / 60);
         var seconds = Math.floor(time / 10);
         if (mins < 10) {
            mins = "0" + mins;
         }
         if (seconds < 10) {
            seconds = "0" + seconds;
         }
         document.getElementById("timer").innerHTML = mins + ":" + seconds;
         timer();
      }, 500);
   }

   // REFRESHING OF THE GAME BOARD
   refresh.addEventListener("click", memoryGameBoard);

});