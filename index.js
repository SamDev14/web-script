'use strict';


// 1. Basics: Change the id method in index.js to return your student ID.
//Returns student ID.
function id() {
  return "UP877426";
}

function init() {
  // if your solution needs to add add listeners
  // do so here

  // Event listener that run 'nickChanged' to change the nickname when the user types. 
  document.getElementById("nick").addEventListener("input", nickChanged);

  // Event listener to allow the colour of the userPos circle to change when the mouse is clicked.
  window.addEventListener("click",colourChange);

  // Event listener to allow users to have the letter "p" in their name regardless of whether they have used the mouse or tab to navigate to the text box.
  document.getElementById("nick").addEventListener("focus",nickSelected);
}

window.addEventListener("load", init);

let currentColour = 0;


// 2. Coursework: The game has a leaderboard which is initialized with various names. During a game it will be necessary to update this leaderboard regularly. Create a function called `updateLeaderBoard` which accepts two parameters, the first is an array of player names, the first ten of which should be inserted into the leaderboard as list items. The second parameter `me` is an optional string that represents the current player's name. If any string in the array exactly matches the second parameter, then set its list item class to be `myself`.
function updateLeaderBoard(newScoreBoard,me) {
  let list = document.getElementById("top10");
  let items = list.children;

  // While loop to remove the current items in the list.
  while(list.firstChild) {
    list.firstChild.remove();
  }

  // Loop to append new "li" items to the scoreboard.
  let boardNum = newScoreBoard.length;
  for (let i = 0; i < boardNum; i++) {
    if(i < 10) {
      let newItem = document.createElement("li");
      newItem.textContent = newScoreBoard[i];
      if(me == newScoreBoard[i])newItem.className = "myself";
      list.appendChild(newItem);
    }
  }
}


// 3. Coursework: When the game is in play, the player's nickname will appear at the top of the screen. Create a function `nickChanged` which updates the content of the `playername` field to match the content of the 'nick' input field. Attach an appropriate event listener to the `nick` field such that `playername` is updated for all input. When attaching the event listener, place that code with the other similar lines in the `init` function.
// Assigns the value of "nick" to the variable 'nickName'. Then sets 'nickName' as "playername".
function nickChanged(e) {
  let nickName = document.getElementById("nick").value;
  document.getElementById("playername").innerHTML = nickName;
}

// Function to remove all event listeners for handle keys. Then adds a new event listener so that user can click play button to return to game.
function nickSelected(){
  window.removeEventListener("keydown", handleKeys);
  document.getElementById("play").addEventListener("click", playClick);
}

// Adds a new event listener for handleKeys. Allows player to set a name with the letter 'p' without the player window closing.
function playClick(){
  window.addEventListener("keydown", handleKeys);
  window.player.classList.toggle("hidden");
  document.getElementById("play").removeEventListener("click", playClick);

}


// 4. Coursework: Create a function updateStep which updates the value of the `step` global variable so that it is in sync with the `scalerange` element. Beware that step must be a number or you may see some strange and difficult-to-debug behaviour.
function updateStep() {
  //Takes window.scalerange.value and forces it to be an integer. this is then assigned to the 'checkNumber' variable.
  let checkNumber = parseInt(window.scalerange.value);

  //If statement to check that the variable 'checkNumber' is definitely a number.
  if(isNaN(checkNumber) === false) {
    step = checkNumber;
  } else {
    checkNumber = 0;
  }
}


// 5. Coursework: Create a function `leaders` that takes one parameter which is the maximum number of results to return. Leaders should return an array of the names currently on the leaderboard.
function leaders(maxNum) {
  let list = document.getElementById("top10");
  let items = list.children;
  let leader = [];

  // Uses a loop to add new items to the 'leader' array. It then returns the array.
  for (let i = 0; i < maxNum; i++) {
    if(items[i] != undefined)leader.push(items[i].textContent);
  }
  return leader;
}


// 6. Coursework: The `pointer` object has a `degrees` property that is currently not maintained. It is intended as a convenience variable that will be used for debugging the `pointer.angle` property. Find where `pointer.angle` is set and near to that, write the necessary code to update `pointer.degrees` so that it gives an integer value (i.e. no decimal places) between 0 and 360. The formula to calculate this is: `angle * 180 / Math.PI`.
function mouseMoved(e) {

  // position of the pointer within the canvas
  pointer.x = (e.pageX - canvas.offsetLeft);
  pointer.y = (e.pageY - canvas.offsetTop);


  // position of the pointer relative to the centre of the canvas
  pointer.xOffset = pointer.x-halfWidth;
  pointer.yOffset = pointer.y-halfHeight;

  // TODO calulate angle and unit vector radius
  // based on mouse.xOffset and mouse.yOffset .
  pointer.radius =
  Math.min(
    Math.sqrt(
      Math.pow(pointer.xOffset,2) +
      Math.pow(pointer.yOffset,2)
    ),
    limitOfAcceleration
  ) / limitOfAcceleration * step;

  pointer.angle = Math.atan2(pointer.yOffset,pointer.xOffset).toFixed(3);

  pointer.degrees = parseInt(pointer.angle * 180 / Math.PI);

  if(pointer.degrees < 0) {
    pointer.degrees = pointer.degrees + 360;
  }

  redraw();
}


// 7. Coursework: When the game is played we want to show the position of the player and where they're headed. At present (for debug purposes) a yellow line is drawn from the player's position in the centre of the screen to the mouse position, additionally a thicker green line is drawn in the same direction but its length represents the player's speed. This can be toggled on and off using the D key. Implement the `drawUserPos` and `drawPointerPos` methods such that pointer position is indicated by a thin black circle whose diameter is `pointer.radius / step * 50` - furthermore - show the player's position in the centre of the screen with a filled circle with diameter `step`, and its colour set to be the first item in the `colours` array. Each time the mouse is clicked the player should change colour, cycling through the `colours` array.

// Function to draw the user position circle.
function drawUserPos() {
  circle(context,halfWidth,halfHeight,step/2,true);
}

// Function to draw the pointer position circle.
function drawPointerPos() {
  circle(context,pointer.x,pointer.y,pointer.radius/step*50);
}

// Function to create a circle and fill it if needed.
function circle(c,x,y,r,fill) {
  c.beginPath();
  c.strokeStyle = "#000";
  c.arc(x,y,r,0,2*Math.PI,false);
  if(fill) {
    let colourPicker = colours[currentColour];
    c.strokeStyle = String(colourPicker);
    c.fillStyle = String(colourPicker);
    c.fill();
  }
  c.stroke();
}

// Function to change the colour of the userPos circle.
function colourChange(){
  currentColour++;
  if(currentColour==colours.length)currentColour = 0;
  circle(context,halfWidth,halfHeight,step/2,true);
}
