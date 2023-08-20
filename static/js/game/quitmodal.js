const openButton = document.getElementById("quitopen");
const modal = document.querySelector(".quitmodal");
const overlay = modal.querySelector(".modalOverlay");
const closeBtn = modal.querySelector("#NoBtn");

const openModal = () => {
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
};

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);
