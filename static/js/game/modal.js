/* 모달창 구현 */
const openButton = document.getElementById("open");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modalOverlay");
const closeBtn = document.querySelector("#NoBtn");

const openModal = () => {
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
};


overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);


/* '예' 클릭 시 메인 페이지 이동 */
const yesButton = document.querySelector(".YesBtn");
yesButton.addEventListener("click", () => {
    window.location.href = "index.html";
});