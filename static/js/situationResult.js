//ajax 백엔드 연결

// 맞은개수/틀린개수

// 퍼센트 계산

// chartevent
const chart = document.querySelector(".ChartBar");
let totalMinwon = chart.dataset.percent;
chart.style.background = `conic-gradient(#FFBD6D 0% ${totalMinwon}%, #FFEA8D ${totalMinwon}% 100%)`;

let t4 = 0
const chartAnimation = setInterval(() => {
    chart.dataset.percent = t4
    chart.style.background = `conic-gradient(#FFBD6D 0 ${t4}%, #FFEA8D ${t4}% 100% )`
    t4++ >= totalMinwon && clearInterval(chartAnimation)
}, 15)

// 버튼 구현
// 다시학습하기 -> 학습한 문장
// 다음 문장 학습하기 -> 그다음 문장