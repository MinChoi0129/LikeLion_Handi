//scrollevent
const sr = ScrollReveal({
    reset: true,
    distance: '60px',
    duration: 1500,
    delay: 100
});

const success = document.querySelector('.Success');
sr.reveal(success, { delay: 600, origin: 'bottom' });

//chartevent
const chart = document.querySelector(".ChartBar");
let totalMinwon = chart.dataset.percent;
chart.style.background = `conic-gradient(#FFBD6D 0% ${totalMinwon}%, #FFEA8D ${totalMinwon}% 100%)`;

console.log(chart.style.background);

let t4 = 0
const chartAnimation = setInterval(() => {
    chart.dataset.percent = t4
    chart.style.background = `conic-gradient(#FFBD6D 0 ${t4}%, #FFEA8D ${t4}% 100% )`
    t4++ >= totalMinwon && clearInterval(chartAnimation)
}, 15)

//buttonevent