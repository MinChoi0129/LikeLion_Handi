let parent_main = document.querySelector(".main");

fetch("http://localhost:8000/api/lecture/" + inshinjia + "/") // 링크 뭐 연결해야 하는지 모름
	.then((response) => {
		return response.json();
	})
  .then((뭔가) => {
    console.log(뭔가)

    document.querySelector('.apple1').src = 뭔가["lecture_img"]
    document.querySelector('.title1').innerHTML = 뭔가["theme_category"]
    document.querySelector('.count1').innerHTML = 뭔가["총 " + "length" + "개"]
  });
