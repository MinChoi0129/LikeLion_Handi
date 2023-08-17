/* 모달창 구현 */
const openButton = document.getElementById("open");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modalOverlay");
const closeBtn = document.querySelector("#closeBtn");
const startBtn = document.querySelector(".startBtn");


const openModal = () => {
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
};

const startGame = () => {
  window.location.href = "http://127.0.0.1:8000/game/start/"
}

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);
startBtn.addEventListener("click", startGame);
