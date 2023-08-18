// 변수설정
const ChapterTitle = document.querySelector('.ChapterTitle');
const CurrentCount = document.querySelector('.CurrentCount');
const AllCount = document.querySelector('.AllCount');
const StageBar = document.querySelector('.StageBar');
const BackStageBar = document.querySelector('.BackStageBar');
const QuizWrap = document.querySelector('.QuizWrap');
const StopBtn = document.querySelector('.StopBtnBox');

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

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
    location.href = "http://127.0.0.1:8000/lecture/" + Id + "/";
})

// 그만풀기 버튼
const StopModal = document.querySelector('.StopModal');
const Yes = document.querySelector('.YesBtn');
const No = document.querySelector('.NoBtn');

StopBtn.addEventListener("click", () => {
    StopModal.style.display = "flex";
    Back.style.display = "block";
})
Yes.addEventListener("click", ()=> {
    location.replace("http://127.0.0.1:8000/lecture/" + Id + "/")
})
No.addEventListener("click", ()=> {
    StopModal.style.display = "none";
    Back.style.display = "none";
})


//ajax 백엔드 연결
fetch('http://127.0.0.1:8000/api/quiz/' + Id + "/")
.then((response) => {
    return response.json()
    })
.then((data) => {
    const title = data.sub_category;
    const count = data.length;
    AllCount.innerHTML = count;
    // 선다나누기 
    const typeA = `<div class="QuizVer1">
    <div class="SelectBox" id="ver1">
    <input type="radio" id="select1" name="wordSelect">
    <label for="select1"><video src="" muted autoplay loop></video></label>
    <input type="radio" id="select2" name="wordSelect">
    <label for="select2"><video src="" muted autoplay loop></video></label>
    <input type="radio" id="select3" name="wordSelect">
    <label for="select3"><video src="" muted autoplay loop></video></label>
    <input type="radio" id="select4" name="wordSelect">
    <label for="select4"><video src="" muted autoplay loop></video></label>
    <input type="radio" id="select5" name="wordSelect">
    <label for="select5"><video src="" muted autoplay loop></video></label>
    </div>
    </div>`;
    const typeB = `<div class="QuizBox">
                    <video src="" muted autoplay loog></video>
                </div>
                <div class="SelectBox" id="ver2">
                    <input type="radio" id="select1" name="wordSelect">
                    <label for="select1"></label>
                    <input type="radio" id="select2" name="wordSelect">
                    <label for="select2"></label>
                    <input type="radio" id="select3" name="wordSelect">
                    <label for="select3"></label>
                    <input type="radio" id="select4" name="wordSelect">
                    <label for="select4"></label>
                </div>`

    console.log(data);

    //변수세팅
    let CurrentIndex = 0; //현재문제수
    let index = 0;
    var wrong_choices = []; //틀린문제배열

    //patch보낼변수
    let RightPer;
    
    // 진행바
    StageBar.style.width = `${Math.round(CurrentIndex / count * 100)}%`

    var answer_url; //정답url
    QuizWrap.insertAdjacentHTML('beforeend', typeA);
    const QuizSelects = Array.from(document.querySelectorAll('video'));
    const QuizLabels = document.querySelectorAll('label');

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    //정답검사함수
    const QuizAnswerTypeA = (event) => {
        if(event.target.src == answer_url) {
            //초록띄우기
        } else {
            wrong_choices.push(data.type_A_quizzes[CurrentIndex].name);
            
        }
        CurrentIndex++;

        FillSrc(CurrentIndex); 
        console.log(wrong_choices);
    }
    const QuizAnswerTypeB = (event, index) => {
        if(event.target.innerHTML == answer_url) {
            //초록띄우기
            if(CurrentIndex+1 == count) {
                RightPer = Math.round((count - wrong_choices.length) / count * 100);
                console.log(RightPer);
                // wrong_choices, RightPer 보내기
                fetch("url만들면넣기" + Id + "/", {
                    method: "PATCH",
                    credentials: 'include',
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrftoken,
                    },
                    cache: 'no-cache',
                    mode: 'same-origin',
                    body: new URLSearchParams({파라미터: RightPer, wrong_choices})
                })
                .then((data) => {
                    console.log(data)
                })
                location.replace("http://127.0.0.1:8000/lecture/" + Id + "/result/word");
                return
            }
        } else {
            wrong_choices.push(data.type_B_quizzes[index].answer_name);
            if(CurrentIndex+1 == count) {
                RightPer = Math.round((count - wrong_choices.length) / count * 100);
                console.log(RightPer);
                // wrong_choices, RightPer 보내기
                fetch("url만들면넣기" + Id + "/", {
                    method: "PATCH",
                    credentials: 'include',
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrftoken,
                    },
                    cache: 'no-cache',
                    mode: 'same-origin',
                    body: new URLSearchParams({파라미터: RightPer, wrong_choices})
                })
                .then((data) => {
                    console.log(data)
                })
                location.replace("http://127.0.0.1:8000/lecture/" + Id + "/result/word");
                return
            }
            
        }
        CurrentIndex++;
        FillSrc(CurrentIndex); 
        console.log(wrong_choices);
    }
    //초기세팅
    function FillSrc(CurrentIndex) {
        CurrentCount.innerHTML = CurrentIndex+1;
        if (CurrentIndex >= Math.floor(data.length/2)){
            StageBar.style.width = `${Math.round((CurrentIndex+1) / count * 100)}%`;
            CurrentIndex = CurrentIndex % Math.floor(data.length/2);
            //TYPEA양식 삭제
            QuizWrap.innerHTML = "";
            //typeB양식 넣기
            QuizWrap.insertAdjacentHTML('beforeend', typeB);
            ChapterTitle.innerHTML = title;
            answer_url = data.type_B_quizzes[CurrentIndex].answer_name;
            const QuizLabelsTypeB = Array.from(document.querySelectorAll('label'));
            const QuizVideo = document.querySelector('video');
            // console.log(QuizLabelsTypeB);
            shuffle(QuizLabelsTypeB)
            for(let i = 0; i<4; i++) {
                QuizVideo.setAttribute("src", data.type_B_quizzes[CurrentIndex].video_url);
                QuizLabelsTypeB[i].innerHTML = `${data.type_B_quizzes[CurrentIndex].names[i]}`;
                QuizLabelsTypeB[i].addEventListener("click", (e) => QuizAnswerTypeB(e, CurrentIndex));
            }
            
        } else {
            StageBar.style.width = `${Math.round((CurrentIndex+1) / count * 100)}%`;
            ChapterTitle.innerHTML = `${title} - ${data.type_A_quizzes[CurrentIndex].name}`;
            answer_url = data.type_A_quizzes[CurrentIndex].image_urls[0]; //정답url초기화
            shuffle(QuizSelects)
            for(let i=0; i<5; i++) {
                QuizSelects[i].setAttribute("src", data.type_A_quizzes[CurrentIndex].image_urls[i]);
                // QuizLabels[i].setAttribute('onclick', QuizAnswer());
                QuizLabels[i].addEventListener("click", QuizAnswerTypeA)
            }
        }

        
    }

    FillSrc(CurrentIndex);
})