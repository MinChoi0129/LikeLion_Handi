// ajax 백엔드 연결

// 변수설정
const LectureTitle = document.querySelector(".ChapterTitle");
const StageBar = document.querySelectorAll(".StageBar");
const QuizSentence = document.querySelector(".QuizSentence");
const SelectBox = document.querySelector(".SelectBox");
const StopBtn = document.querySelector(".StopBtnBox");

// 재학습하기 설정 -> 학습한 문장

//학습종료버튼 설정
const StopModal = document.querySelector(".StopModal");
const Yes = document.querySelector(".YesBtn");
const No = document.querySelector(".NoBtn");
const Back = document.querySelector(".Back");

StopBtn.addEventListener("click", () => {
  StopModal.style.display = "flex";
  Back.style.display = "block";
});
Yes.addEventListener("click", () => {
  //전페이지
});
No.addEventListener("click", () => {
  StopModal.style.display = "none";
  Back.style.display = "none";
});
