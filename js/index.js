var output = document.getElementById('output');
var score = document.getElementById('score');
var result = document.getElementById('result');
var modalOne = document.getElementById('modal-one');
var options = ['papier', 'kamien', 'nozyce'];
var params = {
  rounds: "",
  playerScore: 0,
  computerScore: 0,
  // progress: []
}

// losowanie liczby od 1-3 i zwracanie nazwy ruchu komputera
function computerMoveName() {
  return options[Math.floor(Math.random() * 3)];
}

// arg = papier, kamien, nozyce - wybrane przez gracza
// porównywanie ruchów
function playerMove(playerMove, computerMove) {
  if (playerMove == computerMove) {
    score.innerHTML = 'Remis';
  } else if (
    (playerMove == 'papier' && computerMove == 'kamien') ||
    (playerMove == 'nozyce' && computerMove == 'papier') ||
    (playerMove == 'kamien' && computerMove == 'nozyce')) {
    score.innerHTML = 'You win!';
    params.playerScore += 1;
  } else {
    score.innerHTML = 'You lost!';
    params.computerScore += 1;
  }
}

// funkcja blokujaca buttony i aktywujace po skonczonej grze
function activeButtons() {
  for (var i = 0; i <= 2; i++) {
    document.getElementsByClassName("btn")[i].disabled = false; 
  }
}

function disableButtons() {
  for (var i = 0; i <= 2; i++) {
    document.getElementsByClassName("btn")[i].disabled = true; 
  }
}

// event na button 'new game'
document.querySelector('.new-game').addEventListener('click', function () {
  params.rounds = prompt('Write the number of won rounds, which ends the game:');
  params.rounds = params.rounds.trim();
  // params.progress = [];
  if (isNaN(params.rounds) || params.rounds == '0' || params.rounds == "") {
    alert('The correct number has not been entered.');
  } else {
    params.playerScore = 0;
    params.computerScore = 0;
    // resetowanie wartosci
    result.innerHTML = params.playerScore + ' - ' + params.computerScore;
    output.innerHTML = '';
    score.innerHTML = '';
    modalOne.innerHTML= '';
    document.querySelector('.rounds').innerHTML = params.rounds + '<br>Winnings, its your victory.';
    activeButtons();
  }
}
);

// wyświetlanie tekstu o ruchu gracza i komputera
function printMoves(playerM, computerMove) {
  output.innerHTML = 'Player: ' + playerM + '<br>' + 'Computer: ' +'<span class="computer-move">' +  computerMove + '</span>';
}

var test = document.getElementsByClassName("player-move"); // new class

// event kliknięcia na button
for (var i = 0; i < test.length; i++) {

  test[i].addEventListener("click", function () {
    var currentMove = this.getAttribute("data-move");
    printMoves(currentMove, computerMoveName());
    playerMove(currentMove, computerMoveName());
    result.innerHTML = params.playerScore + ' - ' + params.computerScore;

    if (params.rounds == params.playerScore) {
      score.modalOne = 'You won the whole game !!! <br> END OF THE GAME !!! PRESS THE BUTTON "NEW GAME" ';
      disableButtons();
    } else if (params.rounds == params.computerScore) {
      score.modalOne = 'You lost the whole game !!! <br> END OF THE GAME !!! PRESS THE BUTTON "NEW GAME" ';
      disableButtons();
    }
  });
}


(function(){ 
  //zmienna dla wszystkich otwartych modali  : 
  var modalLinks = document.querySelectorAll(".show-modal");
  //zmienna dla zamykanie modala 
  var modalOverlay = document.querySelector("#modal-overlay");
  // zmienna dla przerwania propoagacji :
  var modals = document.querySelectorAll(".modal");
  // zamykanie modala poprzez kliknięcie w overlay  
  var closeButtons = document.querySelectorAll(".modal .close");
  
   // usuwanie klasy show  i dodanie overlay
  var showModal = function(event) {
      event.preventDefault();
      modalOverlay.classList.add("show");
      for (var i = 0; i < modals.length; i++) {
        modals[i].classList.remove("show");
      }
      document.querySelector(this.getAttribute("href")).classList.add('show');
    };
    
  // dodanie do wszystkich modali 
      for (var i = 0; i < modalLinks.length; i++) {
          modalLinks[i].addEventListener("click", showModal);
    }
    
  var hideModal = function(event) {
      event.preventDefault();
      modalOverlay.classList.remove("show");
    };
  
      for (var i = 0; i < closeButtons.length; i++) {
          closeButtons[i].addEventListener("click", hideModal);
    }
          modalOverlay.addEventListener("click", hideModal);
    
  // przerwanie propagacji 
      for (var i = 0; i < modals.length; i++) {
          modals[i].addEventListener("click", function(event) {
          event.stopPropagation();
      });
    }
  })();