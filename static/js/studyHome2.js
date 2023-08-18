///let parent_learning = document.querySelector(".lectureSection")
const level = {1: "난이도 하", 2: "난이도 중", 3: "난이도 상"}

function goToLectureDetailPage(lecture_id) {
	location.href = location.href + lecture_id
}

fetch("http://127.0.0.1:8000/api/lectures/")
    .then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data)

        lectures = document.querySelectorAll(".lectures")

        lecture1 = lectures[0]
        lecture2 = lectures[1]
        lecture3 = lectures[2]


        for (let i = 0; i < 10; i++) {
            now_data = data[i]
        
        let text = `<div class="lecture">
                <div class="lecture" onclick="goToLectureDetailPage(${now_data.id})">
                <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent"></div>
                </div>
                <div class="processing"></div>
                </div>`
        lecture1.innerHTML += text
        }


        for (let i = 10; i < 15; i++) {
            now_data = data[i]
        
        
        let text = `<div class="lecture">
                <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent">00%</div>
                </div>
                <div class="processing"></div>
                </div>`
        lecture2.innerHTML += text
        }


        for (let i = 15; i < 20; i++) {
            now_data = data[i]
        
        let text = `<div class="lecture">
                <div class="difficulty">${level[now_data.level]}</div>
                <img class="lectureImg" src="${now_data.lecture_img}"/>
                <div class="lectureName">${now_data.name}</div>
                <div class="lengthWithPercent">
                    <div class="maxLength">총 ${now_data.length}개</div>
                    <div class="percent">00%</div>
                </div>
                <div class="processing"></div>
                </div>`
        lecture3.innerHTML += text
        }
    }
)


// 버튼 조작
document.addEventListener('DOMContentLoaded', function() {
    const leftButton = document.querySelector('.left');
    const rightButton = document.querySelector('.right');
    const lecturesContainer = document.querySelector('.lectures');

    let currentPosition = 0;
    const lectureWidth = 187; // 각 박스의 너비

    leftButton.addEventListener('click', function() {
        if (currentPosition < 0) {
            currentPosition += lectureWidth;
            lecturesContainer.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    rightButton.addEventListener('click', function() {
        const maxPosition = -(lectureWidth * (lecturesContainer.children.length - 4)); // 4개의 박스가 화면에 보일 때까지만 이동
        if (currentPosition > maxPosition) {
            currentPosition -= lectureWidth;
            lecturesContainer.style.transform = `translateX(${currentPosition}px)`;
        }
    });
});

