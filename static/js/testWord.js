// 변수설정
const ChapterTitle = document.querySelector('.ChapterTitle');
const CurrentCount = document.querySelector('.CurrentCount');
const AllCount = document.querySelector('.AllCount');
const StageBar = document.querySelector('.StageBar');
const QuizWrap = document.querySelector('.QuizWrap');
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
    location.replace("http://localhost:8000/lecture/" + Id + "/")
})
No.addEventListener("click", ()=> {
    StopModal.style.display = "none";
    Back.style.display = "none";
})

//ajax 백엔드 연결

fetch('http://localhost:8000/api/quiz/' + Id + "/")
	.then((response) => {
		return response.json()
		})
	.then((data) => {
        // 선다나누기 
        const typeA = `<div class="QuizVer1">
        <div class="SelectBox" id="ver1">
        </div>
        </div>`;
        const typeB = `<div class="QuizBox">
                    </div>
                    <div class="SelectBox" id="ver2">
                    </div>`
        const title = data.sub_category;
        const count = data.length;
        AllCount.innerHTML = count;
        console.log(data);
        var CurrentIndex = 0;
        var QuizIndex = 0;

        if (CurrentIndex+1 <= Math.floor(data.type_A_quizzes.length / 2)) {
            ChapterTitle.innerHTML = `${title} - ${data.type_A_quizzes[QuizIndex].name}`;
            QuizWrap.insertAdjacentHTML('beforeend', typeA);
            for(let i=0; i<5; i++ ){
                let select_five = `
                <input type="radio" id="select${i+1}" name="wordSelect">
                <label for="select${i+1}"><video src="${data.type_A_quizzes[QuizIndex].image_urls[i]}" muted autoplay loop></video></label>
                `;
                console.log(select_five);
                document.querySelector('#ver1').insertAdjacentHTML('beforeend', select_five);
            }

        } else if (CurrentIndex+1 > Math.floor(data.type_A_quizzes.length / 2)){
            ChapterTitle.innerHTML = title;
            QuizWrap.insertAdjacentHTML('beforeend', typeB);
            // //for문 돌리고   
            let quiz_four = `<video src="${data.type_B_quizzes[QuizIndex].video_url}" muted autoplay loop></video>`;
            document.querySelector('.QuizBox').insertAdjacentHTML('beforeend',quiz_four);
            for(let i=0; i<4; i++ ){
                let select_four = `
                    <input type="radio" id="select${i+1}" name="wordSelect">
                    <label for="select${i+1}"><span>${data.type_B_quizzes[QuizIndex].names[i]}</span></label>
                `;

                console.log(select_four);
                document.querySelector('#ver2').insertAdjacentHTML('beforeend', select_four);
            }
        }
    })


//이거 for문 돌려서 ver1안에 넣어야됨.
//다음 누르면 currentIndex+=1 되게 해야함.
