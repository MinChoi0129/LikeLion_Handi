let parent_learning = document.querySelector(".Sc2")

let lectures = document.querySelector(".lectures")

let very_much_text = ""
const text = `<div class="lecture">
<div class="difficulty">난이도 하</div>
<img class="lectureImg" src="{% static 'image/login/first.png' %}">
<div class="lectureName">lectureName</div>
<div class="lengthWithPercent">
    <div class="maxLength">총 n개</div>
    <div class="percent">n%</div>
</div>
<div class="processing"></div>
</div>`


for (let i=0; i<5;i++) {
    very_much_text += text
}


lectures.innerHTML = very_much_text


