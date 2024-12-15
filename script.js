const wheels = [
  "<img src='https://mitchellsnursery.com/wp-content/uploads/2024/12/SlotGame.png' alt='Bee'>", 
  "<img src='https://mitchellsnursery.com/wp-content/uploads/2024/12/SlotGame-1.png' alt='Cherry'>", 
  "<img src='https://mitchellsnursery.com/wp-content/uploads/2024/12/SlotGame-2.png' alt='Strawberry'>", 
  "<img src='https://mitchellsnursery.com/wp-content/uploads/2024/12/SlotGame-3.png' alt='Tomato'>", 
  "<img src='https://mitchellsnursery.com/wp-content/uploads/2024/12/SlotGame-4.png' alt='Sunflower'>", 
  "<img src='https://mitchellsnursery.com/wp-content/uploads/2024/12/SlotGame-5.png' alt='Rose'>"
];

let tokens = 100;
let winnings = 0;
let spinning = [false, false, false];
let results = ["?", "?", "?"];

const tokenDisplay = document.getElementById("tokens");
const winningsDisplay = document.getElementById("winnings");
const wheelElements = [
  document.getElementById("wheel1"),
  document.getElementById("wheel2"),
  document.getElementById("wheel3")
];
const stopButtons = [
  document.getElementById("stop1"),
  document.getElementById("stop2"),
  document.getElementById("stop3")
];

// Set initial wheels to bee image
wheelElements.forEach((wheel) => {
  wheel.innerHTML = wheels[0]; // Bee image
});

function updateDisplays() {
  tokenDisplay.textContent = tokens;
  winningsDisplay.textContent = winnings;
}

function spinWheel(wheelIndex) {
  spinning[wheelIndex] = true;
  results[wheelIndex] = "?";
  const interval = setInterval(() => {
    if (!spinning[wheelIndex]) {
      clearInterval(interval);
      return;
    }
    wheelElements[wheelIndex].innerHTML = wheels[Math.floor(Math.random() * wheels.length)];
  }, 100);
}

function stopWheel(wheelIndex) {
  spinning[wheelIndex] = false;
  results[wheelIndex] = wheelElements[wheelIndex].innerHTML;

  if (wheelIndex < 2) {
    stopButtons[wheelIndex + 1].disabled = false;
  } else {
    calculateWinnings();
    document.getElementById("spin").disabled = false;
  }
  stopButtons[wheelIndex].disabled = true;
}

function calculateWinnings() {
  const counts = {};
  results.forEach((symbol) => {
    counts[symbol] = (counts[symbol] || 0) + 1;
  });

  if (counts[results[0]] === 3) {
    winnings = 50;
  } else if (Object.values(counts).includes(2)) {
    winnings = 10;
  } else {
    winnings = 0;
  }

  tokens += winnings;
  updateDisplays();
}

document.getElementById("spin").addEventListener("click", () => {
  if (tokens <= 0) {
    alert("No more tokens! Game over.");
    return;
  }

  tokens -= 1;
  updateDisplays();

  spinning = [false, false, false];
  results = ["?", "?", "?"];

  stopButtons.forEach((btn) => (btn.disabled = true));
  stopButtons[0].disabled = false;

  for (let i = 0; i < 3; i++) {
    spinWheel(i);
  }
  document.getElementById("spin").disabled = true;
});

stopButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => stopWheel(index));
});

updateDisplays();
