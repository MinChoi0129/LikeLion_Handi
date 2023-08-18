//변수설정
const ChapterTitle = document.querySelector(".ChapterTitle ");
const chart = document.querySelector(".ChartBar");
const FailedWordWrap = document.querySelector('.FailedWordWrap');
let totalMinwon = chart.dataset.percent;

//ajax 백엔드 연결
fetch("http://127.0.0.1:8000/api/lecture/" + Id + "/")
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        console.log(data);
        ChapterTitle.innerHTML = data.sub_category;

        fetch("url만들면넣기" + Id + "/")
            .then((response) => {
                return response.json();
                })
            .then((data) => {
            console.log(data)
            totalMinwon = data.정답률;
            //오답문제정리
            for(let i = 0; i < 오답.length; i++) {
                let wrongs = `<div class="FailedWord">${data.오답[i]}</div>`;
                
                FailedWordWrap.insertAdjacentHTML('beforeend', wrongs);
            }
            
        })
    })
// 틀린 퀴즈 목록 설정

// chartevent
chart.style.background = `conic-gradient(#FFBD6D 0% ${totalMinwon}%, #FFEA8D ${totalMinwon}% 100%)`;
let t4 = 0
const chartAnimation = setInterval(() => {
  chart.dataset.percent = t4;
  chart.style.background = `conic-gradient(#FFBD6D 0 ${t4}%, #FFEA8D ${t4}% 100% )`;
  t4++ >= totalMinwon && clearInterval(chartAnimation);
}, 15);



// 버튼 구현
const HomeBtn = document.querySelector(".HomeBtn");
const ReviewBtn = document.querySelector(".ReviewBtn");
HomeBtn.addEventListener("click", () => {
  location.replace("http://101.101.209.37/");
});
ReviewBtn.addEventListener("click", () => {
  location.replace("http://101.101.209.37/lecture/" + Id + "/study/word");
});
