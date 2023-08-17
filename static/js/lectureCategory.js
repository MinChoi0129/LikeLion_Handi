let parent_main = document.querySelector(".main");

fetch("http://localhost:8000/api/lecture/" + inshinjia + "/")
	.then((response) => {
		return response.json();
	})
  .then((뭔가) => {
    console.log(뭔가)

    document.querySelector('.apple1').src = 뭔가["lecture_img"]
    document.querySelector('.title1').innerHTML = 뭔가["theme_category"]
    document.querySelector('.count1').innerHTML = 뭔가["총 " + "length" + "개"]
  });



// 학습하기
document.querySelector('.study').addEventListener('click', function() {
  if (inshinjia <= 543) {
    window.location.href = `http://localhost:8000/lecture/${inshinjia}/study/word/`;
  } else {
    window.location.href = `http://localhost:8000/lecture/${inshinjia}/study/sentence/`;
  }
});

// 퀴즈 풀기
document.querySelector('.game').addEventListener('click', function() {
  if (inshinjia <= 543) {
    window.location.href = `http://localhost:8000/lecture/${inshinjia}/quiz/word/`;
  } else {
    window.location.href = `http://localhost:8000/lecture/${inshinjia}/quiz/sentence/`;
  }
});