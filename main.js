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
   var timerRunning = 0;
   var time = 0;

   var gameBoard = document.getElementById("memory-game-board");
   var refresh = document.getElementById("refresh");
   var bodyId = document.getElementById("body-wrapper");
   var modalId = document.getElementById("modal-wrapper");
   var scoreId = document.getElementById("score");
   var movesId = document.getElementById("moves");
   var btnId = document.getElementById("btn");
   var closeId = document.getElementById("close");
   var timeId = document.getElementById("time");
   var movesCounter = document.getElementById("movesCounter");
   var timerCounter = document.getElementById("timer");
   var starsCounter = document.getElementById("stars-container");
   var fullStar = '<i class="fas fa-star"></i>';
   var emptyStar = '<i class="far fa-star"></i>';


   // *****************************************************************
   // SHUFFLE FUCNTION - to randomise the various icons used in the game
   Array.prototype.shuffle = function() {
      for (i = 1; i < this.length; i++) {
         random = Math.round(Math.random() * i);
         temp = this[random];
         this[random] = this[i];
         this[i] = temp;
      }
      return this;
   };
   // *****************************************************************


   // *****************************************************************
   // SETUP OF THE MEMORY BOARD - assigning all the icons to random cards
   function memoryGameBoard() {
      var htmlCode = "";
      iconsArray.shuffle();
      for (i = 0; i < iconsArray.length; i++) {
         htmlCode += '<div class="card card' + iconsArray[i][0] + '"><i class="fas ' + iconsArray[i][1] + '"></i></div>';
      }
      gameBoard.innerHTML = htmlCode;
      match = [];
      item = [];
      moves = 0;
      counter = 0;
      time = 0;
      timerrunning = 0;
      movesCounter.innerHTML = "0 moves";
      timerCounter.innerHTML = "00:00";
      starsCounter.innerHTML = fullStar + fullStar + fullStar;
   }
   memoryGameBoard();
   // *****************************************************************


   // *****************************************************************
   // FLIP CARD AND ASSIGNING A CLICK EVENT
   function flipCard() {
      gameBoard.addEventListener("click", function(e) {
         if (e.target.classList.contains("card")) {
            e.target.classList.add("selected");
            matchCards(e.target);
            timer(e.target);
            gameMoves(e.target);
         }
      });
   }
   flipCard();
   // *****************************************************************


   // *****************************************************************
   // CHECKING FOR MATCHED FLIPPED CARDS
   function matchCards(element) {
      var cardId = element.classList[1];
      if (item.length == 0) {
         item.push(1);
         match.push(cardId);
      } else if (item.length == 1) {
         item.push(1);
         match.push(cardId);
         moves++;
         if (match[0] == match[1]) {
            setTimeout(function() {
               success();
            }, 500);
            counter += 2;
            match = [];
            item = [];
            if (counter == iconsArray.length) {
               setTimeout(function() {
                  popupModal();
               }, 1500);
            }
         } else {
            setTimeout(function() {
               fail();
            }, 500);
            match = [];
            item = [];
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
      var selected = document.querySelectorAll(".selected");
      selected[0].classList.add("fail");
      selected[1].classList.add("fail");
      setTimeout(function() {
         selected[0].classList.remove("fail", "selected");
         selected[1].classList.remove("fail", "selected");
      }, 1000);
   }
   // *****************************************************************


   // *****************************************************************
   // FUNCTION FOR WHEN GAME IS COMPLETE AND MODAL POPS UP WITH CONGRATULATIONS
   function popupModal() {
      bodyId.style.display = "none";
      modalId.style.display = "inline";
      movesId.innerHTML = 'You did it in <span class=\"strong\">' + moves + '</span> moves.';
      if (moves < 16) {
         console.log("this modal is working");
         scoreId.innerHTML = "Your score was " + fullStar + fullStar + fullstar;
      } else if (moves > 15 && moves < 21) {
         scoreId.innerHTML = "Your score was " + fullStar + fullStar + emptyStar;
      } else {
         scoreId.innerHTML = "Your score was " + fullStar + emptyStar + emptyStar;
      }
   }
   // CLOSING OF MODAL AND/OR STARTING A NEW GAME
   function closeModal() {
      bodyId.removeAttribute("style");
      modalId.removeAttribute("style");
      memoryGameBoard();
   }
   closeModal();
   btnId.addEventListener("click", closeModal);
   closeId.addEventListener("click", closeModal);
   // REFRESHING OF THE GAME BOARD
   refresh.addEventListener("click", memoryGameBoard);
   // *****************************************************************


   // *****************************************************************
   // MOVES FUNCTION - COUNTING THE MOVES AND UPDATING THE STARS
   function gameMoves(element) {
      movesCounter.innerHTML = moves + " moves";
      if (moves == 16) {
         starsCounter.innerHTML = fullStar + fullStar + emptyStar;
      }
      if (moves == 21) {
         starsCounter.innerHTML = fullStar + emptyStar + emptyStar;
      }
   }
   // *****************************************************************


   // *****************************************************************
   // TIMER FUNCTION
   // function timer() {
   //    if (timerRunning == 0) {
   //       timerRunning++;
   //       setTimeout(function() {
   //          time++;
   //          var mins = Math.floor(time / 10 / 60);
   //          var seconds = Math.floor(time / 10);
   //          if (mins < 10) {
   //             mins = "0" + mins;
   //          }
   //          if (seconds < 10) {
   //             seconds = "0" + seconds;
   //          }
   //          timerCounter.innerHTML = mins + ":" + seconds;
   //          if (counter == iconsArray.length) {
   //             timeId.innerHTML = "With a time of <span class='strong' " + mins + ":" + seconds + " </span";
   //          }
   //          timer();
   //       }, 500);
   //    }
   // }


   function timer() {
      if (timerRunning == 0) {
         timerRunning++;
         setInterval(addTime, 1000);
         var secs = 0;
         var mins = "0" + 0;

         function addTime() {
            if (secs < 59) {
               secs++;
               if (secs < 10) {
                  secs = "0" + secs;
               }
            } else {
               secs = 0;
               mins++;
               if (mins < 10) {
                  mins = "0" + mins;
               }
            }
            timerCounter.innerHTML = mins + ":" + secs;
            if (counter == iconsArray.length) {
               timeId.innerHTML = "With a time of <span class='strong'> " + mins + ":" + secs + " </span>";
            }
         }
      }
   }

   // *****************************************************************

});