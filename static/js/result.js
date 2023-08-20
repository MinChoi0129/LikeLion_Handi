//변수설정
const ChapterTitle = document.querySelector(".ChapterTitle ");
const chart = document.querySelector(".ChartBar");
const FailedWordWrap = document.querySelector(".FailedWordWrap");
let totalMinwon = chart.dataset.percent;

//ajax 백엔드 연결
fetch(SERVER_ADDRESS + "/api/lecture/" + Id + "/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    ChapterTitle.innerHTML = data.name;

    // wrong_choices, RightPer 보내기
    fetch(SERVER_ADDRESS + "/api/quiz/result/" + Id + "/", {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
      mode: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        totalMinwon = `${data[0].RightPer}`;
        // chartevent
        chart.style.background = `conic-gradient(#FFBD6D 0% ${totalMinwon}%, #FFEA8D ${totalMinwon}% 100%)`;
        let t4 = 0;
        const chartAnimation = setInterval(() => {
          chart.dataset.percent = t4;
          chart.style.background = `conic-gradient(#FFBD6D 0 ${t4}%, #FFEA8D ${t4}% 100% )`;
          t4++ >= totalMinwon && clearInterval(chartAnimation);
        }, 15);
        //오답문제정리

        var wrong_choices_arr = data[0].wrong_choices.split(",");
        for (let i = 0; i < wrong_choices_arr.length; i++) {
          let wrongs = `<div class="FailedWord">${wrong_choices_arr[i]}</div>`;

          FailedWordWrap.insertAdjacentHTML("beforeend", wrongs);
        }

        fetch(SERVER_ADDRESS + "/api/quiz/result/delete/" + Id + "/", {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          cache: "no-cache",
          mode: "same-origin",
        }).then((data) => {});
      });
  });
// 틀린 퀴즈 목록 설정

// 버튼 구현
const HomeBtn = document.querySelector(".HomeBtn");
const ReviewBtn = document.querySelector(".ReviewBtn");
HomeBtn.addEventListener("click", () => {
  location.replace(SERVER_ADDRESS + "/");
});
ReviewBtn.addEventListener("click", () => {
  location.replace(SERVER_ADDRESS + "/lecture/" + Id + "/study/word");
});
