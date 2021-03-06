console.log('app.js is connected');

class Game extends Cards{
  constructor(game) {
    super(name, color)
  //Put attributes here!
      this.memoryID = [];
      this.memoryValues = [];
      this.deck =  getCards;
      this.cardsFlipped = 0;
      shuffle();
      newGame();
      magicFlip();
   }

//The approach used for shuffling the contents of the array is something that Fisher-Yates devised and Don Knuth popularized.
shuffle(array) {
          let index;
          let temphold;
        //switcharoo with placement of each card
          while(array,length > 0) {
          index = Math.floor(Math.random() * array.length);
          (array.length)--;
          temphold = backgdCards[array.length];
          backgdCards[curturn] = backgdCards[index];
          backgdCards[index] = temphold;
           }
         }

      newGame () {
      cardsFlipped =0;
      let output = ' ';
      backgdCards.shuffle();
      nameCards.shuffle();
      let i = -1;
      cardBacks.forEach(function(assign){
        output += '<div id ="cardfront_' + i++ +' " onclick="magic3DFlip(this, \''+cardBacks[i] + ' \' )"></div>'
        });
      document.querySelector('#gameBoard').innerHTML = output;
      console.log(output);
      setTimeout(function () {alert ("You Did Not Meet Time Requirement")}, 60000);
  }
}


let memoryValues = [];
let memoryID = [];
let cardsFlipped = 0;

const cardBacks = [["White"], ["Black"], ["Red"], ["Black"], ["Red"], ["White"], ["White"], ["Black"], ["Red"], ["Black"], ["White"], ["Red"],
["Black"], ["Red"], ["White"], ["Black"], ["White"], ["Red"], ["Red"], ["Black"], ["Black"],  ["Red"], ["White"], ["White"],]

let nameCards = [cardBacks[0], cardBacks[1], cardBacks[2],cardBacks[3], cardBacks[4], cardBacks[5],
                            cardBacks[12], cardBacks[13], cardBacks[14],cardBacks[15], cardBacks[16], cardBacks[17]]
let backgdCards = [cardBacks[6], cardBacks[7], cardBacks[8],cardBacks[9], cardBacks[10], cardBacks[11],
                               cardBacks[18], cardBacks[19], cardBacks[20],cardBacks[21], cardBacks[22], cardBacks[23]]


let currpass = nameCards.length
let curturn = backgdCards.length



//The approach used for shuffling the contents of the array is something that Fisher-Yates devised and Don Knuth popularized.
function shuffleClr() {
          let index;
          let temphold;

        //switcharoo
          while(curturn > 0) {
          index = Math.floor(Math.random() * curturn);
          curturn--;
          temphold = backgdCards[curturn];
          backgdCards[curturn] = backgdCards[index];
          backgdCards[index] = temphold;
           }
         }

function shuffleNme() {
          let index;
          let temphold;
          while(currpass > 0) {
          index = Math.floor(Math.random() * currpass);
          currpass--;
          temphold = nameCards[currpass];
          nameCards[currpass] = nameCards[index];
          nameCards[index] = temphold;
           }
         }

/*
It resets game back to where no cards are flipped reorganizees cards through shuffle method and dynamically assigns an ID to each div
i = -1 since starting at 0 returns an undefined card. -1 corrects issue but not sure why it happens at 0. This function also creates the divs
on the game board. I added a set Timeout to alert time requirement has not been meet for game. The shuffle function does not work  */
function startGame () {
      cardsFlipped =0;
      let output = ' ';
      shuffleNme();
      shuffleClr();
       let i = -1;
      cardBacks.forEach(function(assign){
        output += '<div id ="cardfront_' + i++ +' " onclick="magic3DFlip(this, \''+cardBacks[i] + ' \' )"></div>'
        });
      document.querySelector('#gameBoard').innerHTML = output;
      console.log(output);
      setTimeout(function () {alert ("You Did Not Meet Time Requirement")}, 60000);
 }



function magic3DFlip(cardfront, val){
   if(cardfront.innerHTML == "" && memoryValues.length < 2){
        cardfront.style.background = "orange";
        cardfront.innerHTML = val;
        $("div div:nth-child(7)").css("background-color", "black");
        $("div div:nth-child(8)").css("background-color", "white");
        $("div div:nth-child(9)").css("background-color", "black");
        $("div div:nth-child(10)").css("background-color", "red");
        $("div div:nth-child(11)").css("background-color", "white");
        $("div div:nth-child(12)").css("background-color", "black");
        $("div div:nth-child(19)").css("background-color", "red");
        $("div div:nth-child(20)").css("background-color", "white");
        $("div div:nth-child(21)").css("background-color", "black");
        $("div div:nth-child(22)").css("background-color", "red");
        $("div div:nth-child(23)").css("background-color", "white");
        $("div div:nth-child(24)").css("background-color", "red");
       if(memoryValues.length == 0){
        memoryValues.push(val);
        memoryID.push(cardfront.id);
       }else if (memoryValues.length == 1){
        memoryValues.push(val);
        memoryID.push(cardfront.id);
/*This is the win logic below. There are two types of matches.... one with orange background and values are identical and other
where the backgrounds match*/
        if ((memoryValues[0] == memoryValues[1] && document.getElementById(memoryID[0]).style.background === document.getElementById(memoryID[1]).style.background)
          || (document.getElementById(memoryID[0]).style.background === document.getElementById(memoryID[1]).style.background && cardfront.style.background !== "orange")){
           cardsFlipped += 2;
           memoryValues = [];
           memoryID =[];
           if (cardsFlipped == cardBacks.length){
            alert("Level 1 complete! Level 2 is WIP");
           }
         }else {
              function returnBack () {
              document.getElementById(memoryID[0]).style.background = "url('assets/cardfront.jpeg')";
              document.getElementById(memoryID[1]).style.background = "url('assets/cardfront.jpeg')";
              document.getElementById(memoryID[0]).innerHTML = "";
              document.getElementById(memoryID[1]).innerHTML = "";
              memoryValues = [];
              memoryID = [];
            }
         setTimeout(returnBack, 500);
        }
       }
     }
};



window.onload = function() {
document.querySelector('#reset').addEventListener('click', startGame);
}

