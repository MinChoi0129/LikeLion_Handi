// modal.js 파일 수정

// 'open' 버튼과 모달 요소들을 변수로 가져옵니다.
const openButton = document.getElementById("open");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modalOverlay");
const closeBtn = document.querySelector("#NoBtn");

// 모달을 열기 위한 함수 정의
const openModal = () => {
  modal.classList.remove("hidden");
};

// 모달을 닫기 위한 함수 정의
const closeModal = () => {
  modal.classList.add("hidden");
};

// 오버레이를 클릭하거나 'NoBtn'을 클릭할 때 모달을 닫도록 이벤트 리스너를 추가합니다.
overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

// 'open' 버튼을 클릭하면 모달을 열도록 이벤트 리스너를 추가합니다.
openButton.addEventListener("click", openModal);