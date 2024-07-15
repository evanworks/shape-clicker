console.log(localStorage)
// Made by Elias Zamaria on Stack Overflow (https://stackoverflow.com/questions/2901102)
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
localStorage.clear();
//function recoverData() {
//  score = Number(localStorage.getItem("score"));
//  console.log(score);
//  if (localStorage.getItem("extraClicks") && localStorage.getItem("extraClickPrice")) {
//    document.getElementById("extraClickPrice").innerHTML = numberWithCommas(extraClickPrice);
//    extraClicks = Number(localStorage.getItem("extraClicks"));
//    extraClickPrice = Number(localStorage.getItem("extraClickPrice"));
//   extraClickPrice = 50;
//  } else {
//    extraClicks = 1;
//    extraClickPrice = 50;
//  }
//  if (localStorage.getItem("autoclickMultiplierOn")) {
//    autoclickMultiplierOn = Number(localStorage.getItem("autoclickMultiplierOn"));
//    autoclickMultiplier = Number(localStorage.getItem("autoclickMultiplier"))
//  }
//  document.getElementById("price").innerHTML = extraClicks + 1;
//  document.getElementById("score").innerHTML = numberWithCommas(score);
//  this.setInterval(clicked, autoclickLevel);
//}
var score = 0; 
// Awards points to your score when the shape is clicked
function clicked() {
  score += extraClicks;
  console.log(extraClicks)
  if (autoclickMultiplierOn === 1) {
    score += autoclickMultiplier;
  }
  document.getElementById("score").innerHTML = numberWithCommas(score);
  localStorage.setItem("score", score);
  console.log(localStorage);
}

// * * * * * * * *  * * * * * * * * * * //
// * * * * * * * UPGRADES * * * * * * * //
// * * * * * * * *  * * * * * * * * * * //

// * * * * * EXTRA CLICKS * * * * * //
// Allows you to buy an upgrade that gives you more clicks for each time you click on the shape.
var extraClicks = 1;
var extraClickPrice = 50; // 50
function buyClicks() {
  if (extraClicks > 999) {
    unlockedWrapper = 1;
    alert("You have beaten the game! Total score: ///");
    activateRainbow();
  } else {
    if (score >= extraClickPrice) {
     extraClicks += 1;
     score -= extraClickPrice;
     extraClickPrice = extraClickPrice * 2;
     console.log(extraClickPrice)
     localStorage.setItem("extraClickPrice", extraClickPrice);
     document.getElementById("price").innerHTML = extraClicks + 1;
     document.getElementById("score").innerHTML = numberWithCommas(score);
     document.getElementById("extraClickPrice").innerHTML = numberWithCommas(extraClickPrice);
     localStorage.setItem("extraClicks", extraClicks);
   } else {
     document.getElementById("buyclickcontent").style.color = "red";
     setTimeout(() => {
       document.getElementById("buyclickcontent").style.color = "black";
     }, "1000");
   }
  }
}


// * * * * * AUTOCLICKER * * * * * //
var autoclickMultiplierOn = 0; //
var autoclickLevel = 2000;
var autoclickLevelVisual = 1;
var autoclickPrice = 30;
var autoclickMultiplier = 1; // // Acts as the amount of points autoclick gives once the it clicks every millisecond
var autoclickMax = 512;
function buyautoclick() {
    if (score >= autoclickPrice) {
      autoclickLevelVisual = autoclickLevelVisual * 2;
      score = score - autoclickPrice;
      autoclickPrice = autoclickPrice * 3;
      document.getElementById("autoclickPrice").innerHTML = numberWithCommas(autoclickPrice);
      document.getElementById("score").innerHTML = numberWithCommas(score);
      document.getElementById("autoclicklevelVisual").innerHTML = autoclickLevelVisual;
      this.setInterval(clicked, autoclickLevel);
      if (autoclickLevelVisual >= autoclickMax) {
        document.getElementById("buyautoclickcontent").innerHTML = "This upgrade has been maxed out.";
        document.getElementById("buyautoclickcontent").style.background = "black";
        document.getElementById("buyautoclickcontent").style.color = "white";
      } else {
        if (autoclickMax === 512) {
          autoclickLevel = autoclickLevel / 2; 
        } else {
          autoclickMultiplierOn = 1;
          localStorage.setItem("autoclickMultiplierOn", 1)
          autoclickMultiplier = autoclickMultiplier * 2;
          localStorage.setItem("autoclickMultiplier", autoclickMultiplier)
        }
      }
    } else {
      document.getElementById("buyautoclickcontent").style.color = "red";
      setTimeout(() => {
        document.getElementById("buyautoclickcontent").style.color = "black";
      }, "1000");
    }
}

// * * * * * * * *  * * * * * * * * * * //
// * * * * * SHAPE MANAGEMENT * * * * * //
// * * * * * * * *  * * * * * * * * * * //

function buyShape() {
  if (unlockedCircle === 0) {
    activateCircle();
  } else if (unlockedTriangle === 0) {
    activateTriangle();
  } else {
    activatePentagon();
  }
}

// * * * * * SQUARE * * * * * //
function useSquare() { 
  localStorage.clear();
  document.getElementById("square").style.display = "block";
  document.getElementById("circle").style.display = "none";
  document.getElementById("triangle").style.display = "none";
  document.getElementById("pentagon").style.display = "none";
  document.getElementById("wrapper-1").style.display = "none";
}

// * * * * * CIRCLE * * * * * //
var unlockedCircle = 0;
function activateCircle() {
  if (score >= 250000) {
    if (unlockedCircle === 0) {
      unlockedCircle = 1;
      useCircle();
      score -= 250000;
      autoclickPrice = autoclickPrice * 2; 
      clearInterval(this.intervalID);
      autoclickMax = 1048576;
      document.getElementById("shapeprice").innerHTML = "5,000,000";
      document.getElementById("circleVisual").innerHTML = "Circle";
      document.getElementById("circleVisual").style.cursor = "pointer";
      if (autoclickLevelVisual === "512") {
        document.getElementById("buyautoclickcontent").innerHTML = 'Autoclick <span id="autoclicklevelVisual">512</span> CPS [<span id="autoclickPrice">30</span>]';
      }
      document.getElementById("autoclickPrice").innerHTML = numberWithCommas(autoclickPrice);
      document.getElementById("buyautoclickcontent").style.background = "white";
      document.getElementById("buyautoclickcontent").style.color = "black";
      document.getElementById("score").innerHTML = numberWithCommas(score);
    }
  } else {
    if (score < 250000) { 
      document.getElementById("buyshapecontent").style.color = "red";
      setTimeout(() => {
        document.getElementById("buyshapecontent").style.color = "black";
      }, "1000");
    }
  } 
}
function useCircle() {
  if (unlockedCircle === 1) {
    document.getElementById("square").style.display = "none";
    document.getElementById("circle").style.display = "block";
    document.getElementById("triangle").style.display = "none";
    document.getElementById("pentagon").style.display = "none";
    document.getElementById("wrapper-1").style.display = "none";
  } else {
    console.log("You have not unlocked this shape yet!");
  }
}

// * * * * * TRIANGLE * * * * * //
var unlockedTriangle = 0;
function activateTriangle() {
  if (score >= 5000000 && autoclickLevelVisual > 4096) {
    if (unlockedTriangle === 0) {
      unlockedTriangle = 1;
      useTriangle();
      score -= 5000000
      autoclickPrice = autoclickPrice * 2; 
      clearInterval(this.intervalID);
      document.getElementById("triangleVisual").innerHTML = "Triangle";
      document.getElementById("triangleVisual").style.cursor = "pointer";
      document.getElementById("score").innerHTML = numberWithCommas(score);
      document.getElementById("shapeprice").innerHTML = "500,000,000";
    }
  } else {
    if (autoclickLevelVisual < 8192) {
      alert("You have to have at least an 8192 CPS Autocklicker to buy this upgrade.")
    }
    if (score < 5000000) { 
      alert("You do not have enough clicks to buy this upgrade.")
    }
  } 
}
function useTriangle() {
  if (unlockedTriangle === 1) {
    document.getElementById("square").style.display = "none";
    document.getElementById("circle").style.display = "none";
    document.getElementById("triangle").style.display = "block";
    document.getElementById("pentagon").style.display = "none";
    document.getElementById("wrapper-1").style.display = "none";
  } else {
    console.log("You have not unlocked this shape yet!");
  }
}

// * * * * * PENTAGON * * * * * //
var unlockedPentagon = 0;
function activatePentagon() {
  if (score >= 500000000 && autoclickLevelVisual > 16384) {
    if (unlockedPentagon === 0) {
      unlockedPentagon = 1;
      usePentagon();
      score -= 500000000
      autoclickPrice = autoclickPrice * 2; 
      clearInterval(this.intervalID);
      document.getElementById("pentagonVisual").innerHTML = "Pentagon";
      document.getElementById("pentagonVisual").style.cursor = "pointer";
      document.getElementById("score").innerHTML = numberWithCommas(score);
    }
  } else {
    if (autoclickLevelVisual < 32768) {
      alert("You have to have at least an 32768 CPS Autocklicker to buy this upgrade.")
    }
    if (score < 500000000) { 
      alert("You do not have enough clicks to buy this upgrade.")
    }
    if (extraClicks < 99) {
      alert("You have to have at least 100 points per click to buy this upgrade")
    }
  } 
}
function usePentagon() {
  if (unlockedPentagon === 1) {
    document.getElementById("square").style.display = "none";
    document.getElementById("circle").style.display = "none";
    document.getElementById("triangle").style.display = "none";
    document.getElementById("pentagon").style.display = "block";
    document.getElementById("wrapper-1").style.display = "none";
  } else {
    console.log("You have not unlocked this shape yet!");
  }
}


// * * * * * RAINBOW * * * * * //
function activateRainbow() {
    useWrapper();
    clearInterval(this.intervalID);
    document.getElementById("rainbowVisual").innerHTML = "!!!";
    document.getElementById("rainbowVisual").style.cursor = "pointer";
    document.getElementById("score").innerHTML = numberWithCommas(score);
}
var unlockedWrapper = 0; // Secret shape
function useWrapper() {
  if (unlockedWrapper === 1) {
    document.getElementById("square").style.display = "none";
    document.getElementById("circle").style.display = "none";
    document.getElementById("triangle").style.display = "none";
    document.getElementById("pentagon").style.display = "none";
    document.getElementById("wrapper-1").style.display = "block";
  } else {
    console.log("You have not unlocked this shape yet!");
  }
}
