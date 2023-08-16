// 변수설정
const ChapterTitle = document.querySelector(".ChapterTitle ");
const CurrentCount = document.querySelector(".CurrentCount ");
const AllCount = document.querySelector(".AllCount ");
const StudyVideo = document.querySelectorAll(".Video");
const StudyWord = document.querySelectorAll(".Word ");
const StudyImg = document.querySelectorAll(".StudyImg ");
const StudySlider = document.querySelector(".StudySlider");
const SliderContainer = document.querySelector(".SliderContainer");
const StudyWrap = document.querySelectorAll(".StudyWrap");

const Btn = document.querySelectorAll(".button");
const PrevBtn = document.querySelector("#PrevBtn");
const NextBtn = document.querySelector("#NextBtn");
const QuizBtn = document.querySelector(".QuizBtn");

const StopBtnBox = document.querySelector(".StopBtnBox");

//ajax 백엔드 연결
fetch("http://localhost:8000/api/lecture/" + Id + "/")
  .then((response) => {
    // if (!response.ok) {
    //   throw new Error("400아니면500에러남");
    // }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const count = `${data.length}`;
    AllCount.innerHTML = count;
    const title = data.sub_category;    ;
    ChapterTitle.innerHTML = title;
    for (let i = 0; i< data.length; i++) {
      let imgSrc = data.media_entries[i].image_url.slice(7);
      let wrap = `<div class="StudyWrap">
                      <div class="StudyVideo">
                          <video class='Video' src="${data.media_entries[i].video_url}" muted autoplay loop></video>
                      </div>
                      <div class="StudyInfoWrap">
                          <div class="StudyWord">
                              <p class="Word">${data.media_entries[i].name}</p>
                          </div>
                          <img class="StudyImg" src="${"/" + data.media_entries[i].image_url}" alt="${data.media_entries[i].name}"/>
                      </div>
                  </div> `;
      SliderContainer.insertAdjacentHTML('beforeend', wrap);
    }
    // 단어슬라이더

    let CurrentIndex = 0;

    // 숫자변경
    CurrentCount.innerHTML = CurrentIndex + 1;

    // 첫번째 단어& 마지막 단어 버튼
    if (CurrentIndex == "0") {
      PrevBtn.style.display = "none";
    }

    const slideWord = () => {
      CurrentIndex =
        CurrentIndex === count
          ? 0
          : CurrentIndex < 0
          ? count - 1
          : CurrentIndex;

      SliderContainer.style.transform = `translate(-${CurrentIndex * 100}%)`;

      CurrentCount.innerHTML = CurrentIndex + 1;

      if (CurrentIndex == "0") {
        PrevBtn.style.display = "none";
      } else {
        PrevBtn.style.display = "block";
      }
      if (CurrentIndex == count - 1) {
        NextBtn.style.display = "none";
        QuizBtn.style.display = "block";
      } else {
        NextBtn.style.display = "block";
        QuizBtn.style.display = "none";
      }
    };

    const updateClick = (e) => {
      CurrentIndex += e.target.id === "NextBtn" ? 1 : -1;

      slideWord(CurrentIndex);
    };

    Btn.forEach((button) => button.addEventListener("click", updateClick));
  });



// 학습종료시 모달
const StopModal = document.querySelector(".StopModal");
const Yes = document.querySelector(".YesBtn");
const No = document.querySelector(".NoBtn");
const Back = document.querySelector(".Back");
StopBtnBox.addEventListener("click", () => {
  StopModal.style.display = "flex";
  Back.style.display = "block";
  console.log(CurrentCount);
});
Yes.addEventListener("click", () => {
  //이동
  location.replace("http://127.0.0.1:8000/lecture/" + Id + "/");
});
No.addEventListener("click", () => {
  StopModal.style.display = "none";
  Back.style.display = "none";
});

//퀴즈버튼 이동
QuizBtn.addEventListener("click", ()=>{
  location.href = "http://127.0.0.1:8000/lecture/" + Id + "/quiz/word/";
})
