// 변수설정
const ChapterTitle = document.querySelector('.ChapterTitle ');
const CurrentCount = document.querySelector('.CurrentCount ');
const AllCount = document.querySelector('.AllCount ');
const StudyVideo = document.querySelectorAll('.Video');
const StudyWord = document.querySelectorAll('.Word ');
const StudyImg = document.querySelectorAll('.StudyImg ');

const StopBtnBox = document.querySelector('.StopBtnBox');

// 단어슬라이더
const StudySlider = document.querySelector('.StudySlider');
const SliderContainer = document.querySelector('.SliderContainer');
const StudyWrap = document.querySelectorAll('.StudyWrap');

const Btn = document.querySelectorAll('.button')
const PrevBtn = document.querySelector('#PrevBtn');
const NextBtn = document.querySelector('#NextBtn');
const QuizBtn = document.querySelector('.QuizBtn');

let CurrentIndex = 0;
let intervalid;

// 숫자변경
CurrentCount.innerHTML = CurrentIndex+1;

// 첫번째 단어& 마지막 단어 버튼
if(CurrentIndex == '0') {
    PrevBtn.style.display = "none";
}

const slideWord = () => {
    CurrentIndex = CurrentIndex === StudyWrap.length ? 0 : CurrentIndex < 0 ? StudyWrap.length -1 : CurrentIndex;

    SliderContainer.style.transform = `translate(-${CurrentIndex * 100}%)`

    CurrentCount.innerHTML = CurrentIndex+1;

    if(CurrentIndex == '0') {
        PrevBtn.style.display = "none";
    } else {
        PrevBtn.style.display = "block";
    }
    if(CurrentIndex == StudyWrap.length-1) {
        NextBtn.style.display = 'none';
        QuizBtn.style.display = 'block';
    } else {
        NextBtn.style.display = 'block';
        QuizBtn.style.display = 'none';
    }
}

const updateClick=(e) => {
    CurrentIndex += e.target.id === "NextBtn" ? 1 : -1;

    slideWord(CurrentIndex);
}

Btn.forEach((button) => button.addEventListener("click", updateClick));

//ajax 백엔드 연결
fetch('http://localhost:8000/api/lecture/1')
	.then((response) => {
        if (!response.ok){
            throw new Error('400아니면500에러남')
        }
		return response.json()
		})
	.then((data) => {
        console.log(data);
        const count = `${data.length}`;
        AllCount.innerHTML = count;
        const title = data.description;
        ChapterTitle.innerHTML = title;
    })
    .catch(()=>{
        console.log('에러남')
    })

// 학습종료시 모달
const StopModal = document.querySelector('.StopModal');
const Yes = document.querySelector('.YesBtn');
const No = document.querySelector('.NoBtn');
const Back = document.querySelector('.Back');
StopBtnBox.addEventListener("click", () => {
    StopModal.style.display = "flex";
    Back.style.display = "block";
})
Yes.addEventListener("click", ()=> {
    //이동
    location.replace('url');
})
No.addEventListener("click", ()=> {
    StopModal.style.display = "none"
    Back.style.display = "none";
})