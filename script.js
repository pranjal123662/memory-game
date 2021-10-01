const gameContainer = document.getElementById("game");
const Startbutton = document.getElementById("button");
const restartButton = document.getElementById("restart-button");
const addScore = document.getElementById("add-score");
const score = document.getElementById("score");
const drag = document.getElementById("drag");
const select = document.getElementById("cars");
const bestScore = document.getElementById("add-best-score");
const winner = document.getElementById("winner");
const gameOver = document.getElementById("game-over");
const resetButton=document.getElementById("reset-button");
const addForBest=document.getElementById("store-best-score");

 if(!localStorage.getItem('Score')){
  addForBest.innerText = "Best Score: " + 0;
 }else{
  addForBest.innerText = "Best Score: " + localStorage.getItem("Score");
 }

let arr = [];
let count = 0;
let clicked = 0;
let move = 0;
let arrayForReset=[];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

function gameFunction() {
  let audio = new Audio("./audio/mario.mpeg");
  audio.play();
  audio.loop = true;
  if (select.value === "1") {
    let COLORS = [
      "gifs/2.gif",
      "gifs/4.gif",
      "gifs/7.gif",
      "gifs/8.gif",
      "gifs/4.gif",
      "gifs/7.gif",
      "gifs/8.gif",
      "gifs/2.gif",
    ];
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  } else if (select.value === "2") {
    let COLORS = [
      "gifs/6.gif",
      "gifs/1.gif",
      "gifs/12.gif",
      "gifs/4.gif",
      "gifs/8.gif",
      "gifs/9.gif",
      "gifs/6.gif",
      "gifs/1.gif",
      "gifs/12.gif",
      "gifs/4.gif",
      "gifs/8.gif",
      "gifs/9.gif",
    ];
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  } else {
    let COLORS = [
      "gifs/1.gif",
      "gifs/2.gif",
      "gifs/3.gif",
      "gifs/4.gif",
      "gifs/5.gif",
      "gifs/6.gif",
      "gifs/7.gif",
      "gifs/8.gif",
      "gifs/9.gif",
      "gifs/10.gif",
      "gifs/1.gif",
      "gifs/2.gif",
      "gifs/3.gif",
      "gifs/4.gif",
      "gifs/5.gif",
      "gifs/6.gif",
      "gifs/7.gif",
      "gifs/8.gif",
      "gifs/9.gif",
      "gifs/10.gif",
    ];
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  }
  if (gameContainer.style.display === "") {
    gameContainer.style.display = "flex";
    Startbutton.style.display = "None";
    score.style.display = "block";
    drag.style.display = "none";
    resetButton.style.display="block";
    addForBest.style.display="none";

  }
}

Startbutton.addEventListener("click", gameFunction);

function restart() {
  if (select.value === "1") {
    if (clicked === 8) {
      location.reload();
    }
  } else if (select.value === "2") {
    if (clicked === 12) {
      location.reload();
    }
  } else {
    if (clicked === 20) {
      location.reload();
    }
  }
}

restartButton.addEventListener("click", restart);

function reset(){
  addScore.innerHTML=0;
  move=0;
  for(let index=0;index<arrayForReset.length;index++){
    arrayForReset[index].style="background-image:none";
    arrayForReset[index].style.backgroundColor= "khaki";
  }
}

resetButton.addEventListener('click',reset);

// function confirmForReset(){
//       let x=confirm("Are you sure want to reset")
//       if(x){
//         return true;
//       }else{
//         return false;
//       }
// }
// let arr = [];
// let count = 0;
// let clicked = 0;
// let move = 0;
function handleCardClick(event) {
  if (event.target.classList[1] !== "clicked") {
    console.log(arr.length);
    if (arr.length< 2) {
     
      let image = event.target.classList;
      event.target.style = `background-image : url(${image})`;
      event.target.classList.add("clicked");
      arr.push(event.target);
      arrayForReset.push(event.target);
      move += 1;
      count+=1;
      addScore.innerHTML = move;
    }
  }
    if (count=== 2) {
      if (arr[0].classList[0] !== arr[1].classList[0]) {
        document.body.style.pointerEvents="none";
        setTimeout(() => {
          if(arr.length===2){
            arr[0].style = "background-image:none";
            arr[1].style = "background-image:none";
            arr[0].style="transform:rotateY(180deg);transition:200ms ease-in-out"
            arr[1].style="transform:rotateY(180deg);transition:200ms ease-in-out"
            arr[0].style.backgroundColor = "khaki";
            arr[1].style.backgroundColor = "khaki";
           
            arr[0].classList.remove("clicked");
            arr[1].classList.remove("clicked");
            document.body.style.pointerEvents="auto";
            arr = [];
            count=0;
          } 
        }, 1 * 1000);
      } else {
       
        arr[0].removeEventListener("click", handleCardClick);
        arr[1].removeEventListener("click", handleCardClick);
        clicked += 2;
        arr = [];
        count=0;
      }
    }
  
    if (select.value === "1") {
      
      if (clicked === 8) {
        restartButton.style.display = "block";
        resetButton.style.display="none";
        gameOver.innerText = "Game Over";
        if (!localStorage.getItem("Score")) {
          localStorage.setItem("Score", move);
          winner.innerText = "Best score: " + move;
        } else if (move <= localStorage.getItem("Score")) {
          winner.innerText = "Best Score: " + move;
          localStorage.setItem("Score", move);
        } else {
          winner.innerText = "Best Score: " + localStorage.getItem("Score");
        }
      }
    }
    if (select.value === "2") {
      if (clicked === 12) {
        restartButton.style.display = "block";
        resetButton.style.display="none";
        gameOver.innerText = "Game Over";
        if (!localStorage.getItem("Score")) {
          localStorage.setItem("Score", move);
          winner.innerHTML = "Best score: " + move;
        } else if (move <= localStorage.getItem("Score")) {
          winner.innerHTML = "Best Score: " + move;
          localStorage.setItem("Score", move);
        } else {
          winner.innerHTML = "Best Score: " + localStorage.getItem("Score");
        }
      }
    }
    if (select.value === "3") {
      if (clicked === 20) {
        restartButton.style.display = "block";
        resetButton.style.display="none";
        gameOver.innerText = "Game Over";
        if (!localStorage.getItem("Score")) {
          localStorage.setItem({ Score: move });
          winner.innerHTML = "Best score: " + move;
        } else if (move <= localStorage.getItem("Score")) {
          winner.innerHTML = "Best Score: " + move;
          localStorage.setItem({ Score: move });
        } else {
          winner.innerHTML = "Best Score: " + localStorage.getItem("Score");
        }
      }
    }
  }
  

