const timeBar = document.querySelector(".TimeBar");
const remainTime = document.querySelector(".RemainTime");

let timeLeft = 60;
let timerInterval;
let isRedBackground = false; 

function updateTimeBar() {
  const fullWidth = 131.8; 
  const remainingWidth = (timeLeft / 60) * fullWidth; 
  timeBar.style.width = `${remainingWidth}rem`;
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    remainTime.textContent = timeLeft;
    updateTimeBar();

    if (timeLeft === 10) {
      remainTime.style.backgroundColor = "red";
      isRedBackground = true;
    }

    if (timeLeft > 10 && isRedBackground) {
      remainTime.style.backgroundColor = "white";
      isRedBackground = false; 
    }
  } else {
    clearInterval(timerInterval);
  }
}

function startGameTimer() {
  timerInterval = setInterval(updateTimer, 1000); 
}

const yesBtn = document.querySelector(".Test");
yesBtn.addEventListener("click", () => {
  startGameTimer();
});
