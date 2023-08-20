const timeBar = document.querySelector(".TimeBar");
const remainTime = document.querySelector(".RemainTime");

let timeLeft = 60;
let minusTime = 75 / 60;

function updateTimeBar() {
  const fullWidth = 75;
  const remainingWidth = fullWidth - (60 - timeLeft) * minusTime;
  timeBar.style.width = `${remainingWidth}rem`;
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    remainTime.textContent = timeLeft;
    updateTimeBar();

    if (timeLeft <= 10 && timeLeft % 2 == 0) {
      remainTime.style.backgroundColor = "red";
    } else {
      remainTime.style.backgroundColor = "white";
    }
    startGameTimer(); // Schedule the next update using setTimeout
  } else {
    endGame(currentScoreNum.innerText);
  }
}

function startGameTimer() {
  setTimeout(updateTimer, 1000);
}
