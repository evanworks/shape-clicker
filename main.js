let score = 0; 
let delta = 100;

let extraClicks = 1;
let extraClickPrice = 50;

let autoclickMultiplierOn = 0;
let autoclickLevel = 2000;
let autoclickLevelVisual = 1;
let autoclickPrice = 30;
let autoclickMultiplier = 1;
let hasAutoclicker = false;

let unlockedCircle = 0;
let unlockedTriangle = 0;
let unlockedPentagon = 0;
let unlockedWrapper = 0;

console.log(localStorage)

// Made by Elias Zamaria on Stack Overflow (https://stackoverflow.com/questions/2901102)
function numberWithCommas(x) {
    x = x.toString();
    let pattern = /(-?\d+)(\d{3})/;
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

function clicked() {
  score += extraClicks;
  console.log(extraClicks)
  if (autoclickMultiplierOn === 1) {
    score += autoclickMultiplier;
  }
  document.getElementById("score").innerHTML = numberWithCommas(score);
  /*localStorage.setItem("score", score);
  console.log(localStorage);*/
  let container = document.getElementById('little-body');
  const floatingPoints = document.createElement('div');
  floatingPoints.className = 'floating-points';
  floatingPoints.textContent = '+'+extraClicks;
  floatingPoints.style.left = `${event.clientX + 10}px`;
  floatingPoints.style.top = `${event.clientY - 20}px`;




  container.appendChild(floatingPoints);

  setTimeout(() => {
      floatingPoints.remove();
  }, 500);
} 

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("square").addEventListener("mousedown", (event) => {
    event.target.style.transform = "scale(0.93)";
    start = new Date();
    document.getElementById("square").addEventListener("mouseup", (event) => {
      end = new Date();
      delta = (end - start) / 1000.0;
      delta = 0.75 - delta 
      console.log("Button held for " + delta + " seconds." )
      setTimeout(function() {
        event.target.style.filter = "grayscale(0%)";
        event.target.style.transform = "scale(1)";
      }, delta * 20)
    })
  }, delta)
});  

let autoclicker = null;
/*let autoclicker = setInterval(function() {
  console.log(autoclickLevel);
  if (hasAutoclicker) { 
    clicked();
  }
}, autoclickLevel);*/

document.addEventListener("DOMContentLoaded", function() {});
// * * * * * * * *  * * * * * * * * * * //
// * * * * * * * UPGRADES * * * * * * * //
// * * * * * * * *  * * * * * * * * * * //


function buyClicks() {
  if (extraClicks > 99) {
    unlockedWrapper = 1;
    alert("Congratulations, player. You have seen what not many others have."); // FIXIIXGNN
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

function buyautoclick() {
    if (score >= autoclickPrice) {
      hasAutoclicker = true;
      autoclickLevelVisual = autoclickLevelVisual + 1;
      score = score - autoclickPrice;
      autoclickPrice = autoclickPrice * 3;
      document.getElementById("autoclickPrice").innerHTML = numberWithCommas(autoclickPrice);
      document.getElementById("score").innerHTML = numberWithCommas(score);
      document.getElementById("autoclicklevelVisual").innerHTML = autoclickLevelVisual; // autoclickLevelVisual
      if (autoclickLevel > 62.5) {
        autoclickLevel = autoclickLevel / 2; 
      } else {
        autoclickMultiplierOn = 1;
        localStorage.setItem("autoclickMultiplierOn", 1);
        autoclickMultiplier = autoclickMultiplier * 2;
        localStorage.setItem("autoclickMultiplier", autoclickMultiplier);
      }
      autoclicker = setInterval(function() {
        if (hasAutoclicker) { 
          clicked();
        }
      }, autoclickLevel)
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
  } else if (unlockedPentagon === 0){
    activatePentagon();
  } else {
    activateRainbow();
  }
}

function useSquare() { 
  localStorage.clear();
  document.getElementById("square").style.display = "block";
  document.getElementById("circle").style.display = "none";
  document.getElementById("triangle").style.display = "none";
  document.getElementById("pentagon").style.display = "none";
  document.getElementById("wrapper-1").style.display = "none";
}


function activateCircle() {
  if (score >= 250000) {
    if (unlockedCircle === 0) {
      document.getElementById("square").style.display = "none";
      document.getElementById("circle-screen").style.display = "block";
      document.getElementsByClassName("dropdown-content")[0].style.opacity = 0;
      setTimeout(()=>{
        document.getElementById("circle-screen").style.display = "none";
        document.getElementById("circle-effect").style.display = "block";
        unlockedCircle = 1;
        useCircle();
        score -= 250000;
        setTimeout(()=>{
          document.getElementsByClassName("dropdown-content")[0].style.opacity = 1;
        }, 4000)
      }, 12000)
      autoclickPrice = autoclickPrice * 1.5 + autoclickPrice/10; 
      document.getElementById("shapeprice").innerHTML = "5,000,000";
      document.getElementById("circleVisual").innerHTML = "Circle";
      document.getElementById("circleVisual").style.cursor = "pointer";
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
    let whatkindoftrickisthis = prompt("heh, nice try. you can't outsmart me! Unless you type in 'iamadoofus'");
    if (whatkindoftrickisthis === "iamadoofus") {
      document.getElementById("square").style.display = "none";
      document.getElementById("circle").style.display = "none";
      document.getElementById("triangle").style.display = "none";
      document.getElementById("pentagon").style.display = "none";
      document.getElementById("wrapper-1").style.display = "none";
    }
  }
}

function activateTriangle() {
  if (score >= 5000000) {
    if (unlockedTriangle === 0) {
      document.getElementById("triangle-screen").style.display = "block";
      document.getElementsByClassName("dropdown-content")[0].style.opacity = 0;
      setTimeout(()=>{
        document.getElementById("triangle-screen").style.display = "none";
        document.getElementById("triangle-effect").style.display = "block";
        unlockedTriangle = 1;
        useTriangle();
        score -= 5000000;
        setTimeout(()=>{
          document.getElementsByClassName("dropdown-content")[0].style.opacity = 1;
        }, 4000)
      }, 12000)
      autoclickPrice = autoclickPrice * 2; 
      clearInterval(this.intervalID);
      document.getElementById("triangleVisual").innerHTML = "Triangle";
      document.getElementById("triangleVisual").style.cursor = "pointer";
      document.getElementById("score").innerHTML = numberWithCommas(score);
      document.getElementById("shapeprice").innerHTML = "500,000,000"; // 500,000,000
    }
  } else {
    if (score < 5000000) { 
      document.getElementById("buyshapecontent").style.color = "red";
      setTimeout(() => {
        document.getElementById("buyshapecontent").style.color = "black";
      }, "1000");
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

function activatePentagon() {
  if (score >= 500000000) {
    if (unlockedPentagon === 0) {
      document.getElementById("pentagon-screen").style.display = "block";
      document.getElementsByClassName("dropdown-content")[0].style.opacity = 0;
      setTimeout(()=>{
        document.getElementById("pentagon-screen").style.display = "none";
        document.getElementById("pentagon-effect").style.display = "block";
        unlockedPentagon = 1;
        usePentagon();
        score -= 500000000;
        setTimeout(()=>{
          document.getElementsByClassName("dropdown-content")[0].style.opacity = 1;
        }, 4000)
      }, 12000)
      autoclickPrice = autoclickPrice * 2; 
      clearInterval(this.intervalID);
      document.getElementById("pentagonVisual").innerHTML = "Pentagon";
      document.getElementById("pentagonVisual").style.cursor = "pointer";
      document.getElementById("score").innerHTML = numberWithCommas(score);
      document.getElementById("shapeprice").innerHTML = "5,000,000,000";
    } else {
      alert("Wait, how's that possible?")
    }
  } else {
    if (score < 500000000) { 
      document.getElementById("buyshapecontent").style.color = "red";
      setTimeout(() => {
        document.getElementById("buyshapecontent").style.color = "black";
      }, "1000");
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

function activateRainbow() {
  if (score > 5000000000) {
    document.getElementById("rainbow-screen").style.display = "block";
    document.getElementsByClassName("dropdown-content")[0].style.opacity = 0;
    setTimeout(()=>{
      document.getElementById("rainbow-screen").style.display = "none";
      document.getElementById("rainbow-effect").style.display = "block";
      unlockedWrapper = 1;
      useWrapper();
      score -= 5000000000;
      setTimeout(()=>{
        document.getElementsByClassName("dropdown-content")[0].style.opacity = 1;
      }, 4000)
    }, 12000)
    clearInterval(this.intervalID);
    document.getElementById("rainbowVisual").innerHTML = "!!!";
    document.getElementById("rainbowVisual").style.cursor = "pointer";
    document.getElementById("score").innerHTML = numberWithCommas(score);
  } else {
    if (score < 5000000000) { 
      document.getElementById("buyshapecontent").style.color = "red";
      setTimeout(() => {
        document.getElementById("buyshapecontent").style.color = "black";
      }, "1000");
    }
  }
}

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

