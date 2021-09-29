const gameContainer = document.getElementById("game");
const Startbutton= document.getElementById("button");
// const gamecontainer1=gameContainer.querySelector("div");
const restartButton=document.getElementById("restart-button");
const addScore=document.getElementById("add-score");
const score=document.getElementById("score");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

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

let shuffledColors = shuffle(COLORS);

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
function gameFunction(){
  // console.log(gamecontainer1);
  // console.log(gameContainer);
  // console.log(gameContainer.style);
  if(gameContainer.style.display===""){
    gameContainer.style.display="inline-block";
    Startbutton.style.display="None";
    restartButton.style.display="block";
    score.style.display="block";
  }
}
Startbutton.addEventListener('click',gameFunction);
function restart(){
  // console.log(clicked);
  if(clicked===COLORS.length){
    location.reload();
  }
}
restartButton.addEventListener('click',restart);

let arr=[];
let count=0;
let clicked=0;
let move=0;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(count<2){
    let color=event.target.classList;
    event.target.style.backgroundColor=color;
    arr.push(event.target);
    
    move+=1;
    count+=1;
    addScore.innerHTML=move;
    // console.log(arr);
  }
  
  
  if(count==2){
    // console.log(arr[0].className);
    // if(arr[0].className!==arr[1].className){
      if(arr[0].className!=arr[1].className){
        setTimeout(()=>{
            arr[0].style.backgroundColor="darkblue";
            arr[1].style.backgroundColor="darkblue";
            count=0;
            arr=[];
        },1*1000);
      }
      else{
        // console.log(arr);
        arr[0].removeEventListener("click",handleCardClick);
        arr[1].removeEventListener("click",handleCardClick);
        clicked+=2;
        count=0;
        arr=[];  
      }
     
      // console.log(clicked);
    }
  }


// }

// when the DOM loads
createDivsForColors(shuffledColors);
