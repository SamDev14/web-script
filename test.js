
"use strict";
QUnit.module("Basics");

QUnit.test("Change the id method in index.js to return your student ID.",
    function(assert) {
        assert.notEqual(
            id(),
            "UP000000",
            "The ID function should return your student ID."
        );
    }
);

QUnit.module("Coursework");

QUnit.test(

  "The game has a leaderboard which is initialized with various names.  During a game it will be necessary to update this leaderboard regularly.  Create a function called `updateLeaderBoard` which accepts two parameters, the first is an array of player names, the first ten of which should be inserted into the leaderboard as list items. The second parameter `me` is an optional string that represents the current player's name.  If any string in the array exactly matches the second parameter, then set its list item class to be `myself`",

  function (assert) {
    assert.ok(
      typeof updateLeaderBoard === "function",
      "Create a `updateLeaderBoard` function."
    );

    updateLeaderBoard([]);
    assert.equal(
      window.top10.children.length,
      0,
      "updateLeaderBoard handles an empty list well."
    );

    updateLeaderBoard(["Neo"]);
    assert.equal(
      window.top10.children.length,
      1,
      "updateLeaderBoard handles a single entry well."
    );

    updateLeaderBoard(["aaaaaaaaaa", "bbbbbbbbbb", "ccccccccccc"]);
    assert.equal(
      window.top10.children.length,
      3,
      "updateLeaderBoard handles a three entry well."
    );

    updateLeaderBoard([
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven"
    ]);
    assert.equal(
      window.top10.children.length,
      10,
      "updateLeaderBoard must only update ten entries, not eleven."
    );


    updateLeaderBoard(["Neo"], "Neo");
    assert.equal(
      window.top10.firstElementChild.className,
      "myself",
      "Player name highlighting works for one player."
    );

    updateLeaderBoard([
      "R2-D2",
      "C3-P0",
      "BB-8",
      "Gonk",
    ], "BB-8");
    assert.equal(
      window.top10.children[0].className,
      "",
      "R2-D2 should have no classes in this test."
    );

    assert.equal(
      window.top10.children[1].className,
      "",
      "C3-P0 should have no classes in this test."
    );
    assert.equal(
      window.top10.children[2].className,
      "myself",
      "BB-8 should have the class `myself` in this test."
    );

    window.leaderboardTest.classList.add("done");
  }
);



QUnit.test(

  "When the game is in play, the player's nickname will appear at the top of the screen.  Create a function `nickChanged` which updates the content of the `playername` field to match the content of the 'nick' input field.  Attach an appropriate event listener to the `nick` field such that `playername` is updated for all input.  When attaching the event listener, place that code with the other similar lines in the `init` function.",

  function (assert) {
    assert.ok(
      typeof nickChanged === "function",
      "Create a `nickChanged` function."
    );

    assert.equal(
        window.playername.textContent,
        "Player 1",
        "Before the first change, it says Player 1."
    );

    window.nick.value = "Obi-Wan";
    window.nick.dispatchEvent( new Event("input") );
    assert.equal(
        window.playername.textContent,
        "Obi-Wan",
        "After the first change, Obi-Wan is playing (don't forget to attach the eventListener)."
    );

    window.nick.value = "Qui-Gon";
    window.nick.dispatchEvent( new Event("input") );
    assert.equal(
        window.playername.textContent,
        "Qui-Gon",
        "After the first change, Qui-Gon is playing."
    );

    window.nick.value = "‽🇬🇧❤️🇪🇺‽";
    window.nick.dispatchEvent( new Event("input") );
    assert.equal(
        window.playername.textContent,
        "‽🇬🇧❤️🇪🇺‽",
        "UTF-8 Emoji work too."
    );

    window.namechangetest.classList.add("done");

    assert.ok(
      true,
      "What happens if your player is called: Chip, or Philip, or Phyllida Lloyd?  Can you solve this curious behaviour?"
  );

  }
);




QUnit.test(

  "Create a function updateStep which updates the value of the `step` global variable so that it is in sync with the `scalerange` element.  Beware that step must be a number or you may see some strange and difficult-to-debug behaviour.",

  function (assert) {

    assert.ok(
      typeof updateStep === "function",
      "Create a `updateStep` function."
    );

    window.scalerange.value = 20;
    updateStep();
    assert.equal( step, 20, "Value is 20." );

    window.scalerange.value = 80;
    updateStep();
    assert.equal( step, 80, "Value is 80." );

    window.scalerange.value = "55";
    updateStep();
    assert.equal( step, 55, "Value is 55 - if it's a string, convert it to a number." );

    window.scalerange.value = "88";
    updateStep();
    assert.equal( step, 88, "Value is 88 - if it's a string, convert it to a number." );

    window.scalerange.value = 64;
    updateStep();
    assert.equal( step, 64, "Value is 64." );

    window.stepupdatertest.classList.add("done");
  }
);




QUnit.test(

  "Create a function `leaders` that takes one parameter which is the maximum number of results to return.  Leaders should return an array of the names currently on the leaderboard.",

  function (assert) {
    assert.ok(
      typeof updateLeaderBoard === "function",
      "This task requires that you have already correctly created an `updateLeaderBoard` function."
    );

    updateLeaderBoard(["one", "two", "three"]);
    assert.equal(
      window.top10.children.length,
      3,
      "updateLeaderBoard has three entries."
    );

    assert.ok(
      typeof leaders === "function",
      "Create a `leaders` function."
    );

    const single = leaders(1);
    assert.equal(
      single[0],
      "one",
      "one correctly returned as it is at the top of the leaderboard."
    );

    const double = leaders(2);
    assert.equal(
      double[1],
      "two",
      "two correctly returned as it is second on the leaderboard."
    );


    const all = leaders(4);
    assert.equal(
      all.length,
      3,
      "Asked for 4 and 3 available."
    );

    updateLeaderBoard([]);
    const none = leaders(7);
    assert.equal(
      none.length,
      0,
      "Asked for 7 and zero available."
    );

    updateLeaderBoard(["Me"]);
    const noneAgain = leaders(0);
    assert.equal(
      noneAgain.length,
      0,
      "Asked for 0 and one available."
    );

    updateLeaderBoard(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "a", "b", "c"]);
    assert.equal(
      window.top10.children.length,
      10,
      "updateLeaderBoard has three entries."
    );

    const onlyTen = leaders(12);
    assert.deepEqual(
      onlyTen,
      ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "a"],
      "Asked for 12 but the DOM doesn't contain so many so should only get 10."
    );

    window.leaderstest.classList.add("done");
  }
);




QUnit.test(

  "The `pointer` object has a `degrees` property that is currently not maintained.  It is intended as a convenience variable that will be used for debugging the `pointer.angle` property.  Find where `pointer.angle` is set and near to that, write the necessary code to update `pointer.degrees` so that it gives an integer value (i.e. no decimal places) between 0 and 360.  The formula to calculate this is: `angle * 180 / Math.PI`",

  function (assert) {

    mouseMoved({pageX: canvas.offsetLeft, pageY: canvas.offsetTop});
    assert.notEqual(
        pointer.degrees,
        "todo",
        "the degrees should not be 'todo'"
    );

    assert.ok(
        !isNaN(pointer.degrees) && Number.isInteger(+pointer.degrees),
        "the degrees should be an integer number"
    );

    const previous = pointer.degrees;
    mouseMoved({pageX: canvas.offsetWidth, pageY: canvas.offsetTop});

    assert.notEqual(
        pointer.degrees,
        previous,
        "after moving the cursor, the degrees should change"
    );

    assert.ok(
      pointer.degrees >= 0,
      "Negative degrees should not appear here!"
    );
    
    mouseMoved({pageX: canvas.offsetWidth, pageY: canvas.offsetHeight});
    assert.ok(
      pointer.degrees < 360,
      "If degrees are above 360, then you're back to 0."
    );

    if (debug) {
      assert.equal(
        window.degrees.textContent,
        pointer.degrees,
        "If debugging is on, the degrees should be reported accurately."
      );  
    }
    assert.ok(
        true,
        "Manually check your result in the debug panel (accessible by pressing D)."
    );
  }
);




QUnit.test(

  "When the game is played we want to show the position of the player and where they're headed.  At present (for debug purposes) a yellow line is drawn from the player's position in the centre of the screen to the mouse position, additionally a thicker green line is drawn in the same direction but its length represents the player's speed.  This can be toggled on and off using the D key.   Implement the `drawUserPos` and `drawPointerPos` methods such that pointer position is indicated by a thin black circle whose diameter is `pointer.radius / step * 50` - furthermore - show the player's position in the centre of the screen with a filled circle with diameter `step`, and its colour set to be the first item in the `colours` array. Each time the mouse is clicked the player should change colour, cycling through the `colours` array.",

  function (assert) {

    assert.ok(
      typeof drawUserPos === "function",
      "Please create and manually review `drawUserPos`."
    );

    assert.ok(
      typeof drawPointerPos === "function",
      "Please create and manually review `drawPointerPos`."
    );

    assert.ok(
      true,
      "Remember the accuracy of the drawing cannot be tested automatically, so manually check your result!"
  );


  }
);
