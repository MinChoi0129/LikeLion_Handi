// 변수설정
const ChapterTitle = document.querySelector('.ChapterTitle');
const CurrentCount = document.querySelector('.CurrentCount');
const AllCount = document.querySelector('.AllCount');
const StageBar = document.querySelector('.StageBar');
// const QuizVideo = document.querySelector('.QuizBox').querySelector('video');
const SelectBox = document.querySelector('.SelectBox');
const StopBtn = document.querySelector('.StopBtnBox');

// 퀴즈 시작 전 모달
const Back = document.querySelector('.Back');
const StartModal = document.querySelector('.StartModal');
const StartBtn = document.querySelector('.StartBtn');
const NoBtn = document.querySelector('.NoStartBtnBox');

StartBtn.addEventListener("click", ()=>{
    Back.style.display = "none";
    StartModal.style.display = "none";
})
NoBtn.addEventListener("click", ()=> {
    //전 페이지로 이동
})

// 진행바

// 그만풀기 버튼
const StopModal = document.querySelector('.StopModal');
const Yes = document.querySelector('.YesBtn');
const No = document.querySelector('.NoBtn');

StopBtn.addEventListener("click", () => {
    StopModal.style.display = "flex";
    Back.style.display = "block";
})
Yes.addEventListener("click", ()=> {
    //전페이지
})
No.addEventListener("click", ()=> {
    StopModal.style.display = "none";
    Back.style.display = "none";
})

//ajax 백엔드 연결

fetch("http://localhost:8000/api/lecture/" + Id + "/")
	.then((response) => {
		return response.json()
		})
	.then((data) => {
        const title = data.sub_category;
        const count = data.length;
        ChapterTitle.innerHTML = title;
        AllCount.innerHTML = count;
        var CurrentIndex = 0;

        for (let i = 0; i < data.length; i++) {
            CurrentCount.innerHTML = CurrentIndex + 1;

        }

        fetch('http://localhost:8000/api/quiz/' + Id + "/")
            .then((response) => {
                return response.json()
                })
            .then((data) => {
                console.log(data);
                
            })
    })
