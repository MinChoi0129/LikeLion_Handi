let parent_learning = document.querySelector(".section1");
let parent_popular = document.querySelector(".section2");
let parent_king = document.querySelector(".section3");
let parent_daily = document.querySelector(".section4");

function goToLectureDetailPage(lecture_id) {
  location.href = location.href + lecture_id;
}

<<<<<<< Updated upstream
fetch("http://localhost:8000/api/lectures/")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data)
		difficulties = {1: "난이도 하", 2: "난이도 중", 3: "난이도 상"}


		for (let i = 0; i < 2; i++) {
			let 뭔가 = data[i]

			let box = document.createElement("div")
			box.setAttribute("class", "box" + (i+1))
			box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`)
			
			
			let difficulty = document.createElement("div")
			difficulty.setAttribute("class", "difficulty")
			difficulty.innerHTML = difficulties[뭔가["level"]]


			let img = document.createElement("img")
			img.setAttribute("class", "img")
			img.setAttribute("src", 뭔가["lecture_img"])


			let sub = document.createElement("div")
			sub.setAttribute("class", "sub")
			let theme_category = 뭔가["theme_category"]
			sub.innerHTML = theme_category + " ".repeat(15-theme_category.length)


			let ing = document.createElement("div")
			ing.setAttribute("class", "ing")
			let count = document.createElement("div")
			count.setAttribute("class", "count")
			count.innerHTML = "총 " + 뭔가["length"] + "개"

			let percent = document.createElement("div")
			percent.setAttribute("class", "percent")
			// percent.innerHTML = fetch에서 가져온 내용
			percent.innerHTML = 23 + "%"



			ing.appendChild(count)
			ing.appendChild(percent)

			let bar = document.createElement("div")
			bar.setAttribute("class", "bar")
			let bar2 = document.createElement("div")
			bar2.setAttribute("class", "bar2")






			box.appendChild(difficulty)
			box.appendChild(img)
			box.appendChild(sub)
			box.appendChild(ing)
			box.appendChild(bar)
			box.appendChild(bar2)

			parent_learning.appendChild(box)
		}


		for (let i = 0; i < 5; i++) {
			let 뭔가 = data[i]

			let box = document.createElement("div")
			box.setAttribute("class", "box" + (i+3))
			box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`)
			
			
			let difficulty = document.createElement("div")
			difficulty.setAttribute("class", "difficulty")
			difficulty.innerHTML = difficulties[뭔가["level"]]


			let img = document.createElement("img")
			img.setAttribute("class", "img")
			img.setAttribute("src", 뭔가["lecture_img"])


			let sub = document.createElement("div")
			sub.setAttribute("class", "sub")
			let theme_category = 뭔가["theme_category"]
			sub.innerHTML = theme_category + " ".repeat(15-theme_category.length)


			let ing = document.createElement("div")
			ing.setAttribute("class", "ing")
			let count = document.createElement("div")
			count.setAttribute("class", "count")
			count.innerHTML = "총 " + 뭔가["length"] + "개"

			let percent = document.createElement("div")
			percent.setAttribute("class", "percent")
			// percent.innerHTML = fetch에서 가져온 내용
			percent.innerHTML = 23 + "%"



			ing.appendChild(count)
			ing.appendChild(percent)

			let bar = document.createElement("div")
			bar.setAttribute("class", "bar")
			let bar2 = document.createElement("div")
			bar2.setAttribute("class", "bar2")






			box.appendChild(difficulty)
			box.appendChild(img)
			box.appendChild(sub)
			box.appendChild(ing)
			box.appendChild(bar)
			box.appendChild(bar2)

			parent_popular.appendChild(box)
		}

		for (let i = 0; i < 7; i++) {
			let 뭔가 = data[i]

			let box = document.createElement("li")
			box.setAttribute("class", "box" + (i+8))
			box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`)
			
			
			let difficulty = document.createElement("div")
			difficulty.setAttribute("class", "difficulty")
			difficulty.innerHTML = difficulties[뭔가["level"]]


			let img = document.createElement("img")
			img.setAttribute("class", "img")
			img.setAttribute("src", 뭔가["lecture_img"])


			let sub = document.createElement("div")
			sub.setAttribute("class", "sub")
			let theme_category = 뭔가["theme_category"]
			sub.innerHTML = theme_category + " ".repeat(15-theme_category.length)


			let ing = document.createElement("div")
			ing.setAttribute("class", "ing")
			let count = document.createElement("div")
			count.setAttribute("class", "count")
			count.innerHTML = "총 " + 뭔가["length"] + "개"

			let percent = document.createElement("div")
			percent.setAttribute("class", "percent")
			// percent.innerHTML = fetch에서 가져온 내용
			percent.innerHTML = 23 + "%"



			ing.appendChild(count)
			ing.appendChild(percent)

			let bar = document.createElement("div")
			bar.setAttribute("class", "bar")
			let bar2 = document.createElement("div")
			bar2.setAttribute("class", "bar2")






			box.appendChild(difficulty)
			box.appendChild(img)
			box.appendChild(sub)
			box.appendChild(ing)
			box.appendChild(bar)
			box.appendChild(bar2)

			parent_king.appendChild(box)
		}

		for (let i = 0; i < 5; i++) {
			let 뭔가 = data[i]

			let box = document.createElement("div")
			box.setAttribute("class", "box" + (i+15))
			box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`)
			
			
			let difficulty = document.createElement("div")
			difficulty.setAttribute("class", "difficulty")
			difficulty.innerHTML = difficulties[뭔가["level"]]


			let img = document.createElement("img")
			img.setAttribute("class", "img")
			img.setAttribute("src", 뭔가["lecture_img"])


			let sub = document.createElement("div")
			sub.setAttribute("class", "sub")
			let theme_category = 뭔가["theme_category"]
			sub.innerHTML = theme_category + " ".repeat(15-theme_category.length)


			let ing = document.createElement("div")
			ing.setAttribute("class", "ing")
			let count = document.createElement("div")
			count.setAttribute("class", "count")
			count.innerHTML = "총 " + 뭔가["length"] + "개"

			let percent = document.createElement("div")
			percent.setAttribute("class", "percent")
			// percent.innerHTML = fetch에서 가져온 내용
			percent.innerHTML = 23 + "%"



			ing.appendChild(count)
			ing.appendChild(percent)

			let bar = document.createElement("div")
			bar.setAttribute("class", "bar")
			let bar2 = document.createElement("div")
			bar2.setAttribute("class", "bar2")






			box.appendChild(difficulty)
			box.appendChild(img)
			box.appendChild(sub)
			box.appendChild(ing)
			box.appendChild(bar)
			box.appendChild(bar2)

			parent_daily.appendChild(box)
		}

		
	}
	);
=======
fetch("http://101.101.209.37/api/lectures/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    difficulties = { 1: "난이도 하", 2: "난이도 중", 3: "난이도 상" };

    for (let i = 0; i < 2; i++) {
      let 뭔가 = data[i];

      let box = document.createElement("div");
      box.setAttribute("class", "box" + (i + 1));
      box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`);

      let difficulty = document.createElement("div");
      difficulty.setAttribute("class", "difficulty");
      difficulty.innerHTML = difficulties[뭔가["level"]];

      let img = document.createElement("img");
      img.setAttribute("class", "img");
      img.setAttribute("src", 뭔가["lecture_img"]);

      let sub = document.createElement("div");
      sub.setAttribute("class", "sub");
      let theme_category = 뭔가["theme_category"];
      sub.innerHTML = theme_category + " ".repeat(15 - theme_category.length);

      let ing = document.createElement("div");
      ing.setAttribute("class", "ing");
      let count = document.createElement("div");
      count.setAttribute("class", "count");
      count.innerHTML = "총 " + 뭔가["length"] + "개";

      let percent = document.createElement("div");
      percent.setAttribute("class", "percent");
      // percent.innerHTML = fetch에서 가져온 내용
      percent.innerHTML = 23 + "%";

      ing.appendChild(count);
      ing.appendChild(percent);

      let bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      let bar2 = document.createElement("div");
      bar2.setAttribute("class", "bar2");

      box.appendChild(difficulty);
      box.appendChild(img);
      box.appendChild(sub);
      box.appendChild(ing);
      box.appendChild(bar);
      box.appendChild(bar2);

      parent_learning.appendChild(box);
    }

    for (let i = 0; i < 5; i++) {
      let 뭔가 = data[i];

      let box = document.createElement("div");
      box.setAttribute("class", "box" + (i + 3));
      box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`);

      let difficulty = document.createElement("div");
      difficulty.setAttribute("class", "difficulty");
      difficulty.innerHTML = difficulties[뭔가["level"]];

      let img = document.createElement("img");
      img.setAttribute("class", "img");
      img.setAttribute("src", 뭔가["lecture_img"]);

      let sub = document.createElement("div");
      sub.setAttribute("class", "sub");
      let theme_category = 뭔가["theme_category"];
      sub.innerHTML = theme_category + " ".repeat(15 - theme_category.length);

      let ing = document.createElement("div");
      ing.setAttribute("class", "ing");
      let count = document.createElement("div");
      count.setAttribute("class", "count");
      count.innerHTML = "총 " + 뭔가["length"] + "개";

      let percent = document.createElement("div");
      percent.setAttribute("class", "percent");
      // percent.innerHTML = fetch에서 가져온 내용
      percent.innerHTML = 23 + "%";

      ing.appendChild(count);
      ing.appendChild(percent);

      let bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      let bar2 = document.createElement("div");
      bar2.setAttribute("class", "bar2");

      box.appendChild(difficulty);
      box.appendChild(img);
      box.appendChild(sub);
      box.appendChild(ing);
      box.appendChild(bar);
      box.appendChild(bar2);

      parent_popular.appendChild(box);
    }

    for (let i = 0; i < 7; i++) {
      let 뭔가 = data[i];

      let box = document.createElement("li");
      box.setAttribute("class", "box" + (i + 8));
      box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`);

      let difficulty = document.createElement("div");
      difficulty.setAttribute("class", "difficulty");
      difficulty.innerHTML = difficulties[뭔가["level"]];

      let img = document.createElement("img");
      img.setAttribute("class", "img");
      img.setAttribute("src", 뭔가["lecture_img"]);

      let sub = document.createElement("div");
      sub.setAttribute("class", "sub");
      let theme_category = 뭔가["theme_category"];
      sub.innerHTML = theme_category + " ".repeat(15 - theme_category.length);

      let ing = document.createElement("div");
      ing.setAttribute("class", "ing");
      let count = document.createElement("div");
      count.setAttribute("class", "count");
      count.innerHTML = "총 " + 뭔가["length"] + "개";

      let percent = document.createElement("div");
      percent.setAttribute("class", "percent");
      // percent.innerHTML = fetch에서 가져온 내용
      percent.innerHTML = 23 + "%";

      ing.appendChild(count);
      ing.appendChild(percent);

      let bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      let bar2 = document.createElement("div");
      bar2.setAttribute("class", "bar2");

      box.appendChild(difficulty);
      box.appendChild(img);
      box.appendChild(sub);
      box.appendChild(ing);
      box.appendChild(bar);
      box.appendChild(bar2);

      parent_king.appendChild(box);
    }

    for (let i = 0; i < 5; i++) {
      let 뭔가 = data[i];

      let box = document.createElement("div");
      box.setAttribute("class", "box" + (i + 15));
      box.setAttribute("onclick", `goToLectureDetailPage(${뭔가.id})`);

      let difficulty = document.createElement("div");
      difficulty.setAttribute("class", "difficulty");
      difficulty.innerHTML = difficulties[뭔가["level"]];

      let img = document.createElement("img");
      img.setAttribute("class", "img");
      img.setAttribute("src", 뭔가["lecture_img"]);

      let sub = document.createElement("div");
      sub.setAttribute("class", "sub");
      let theme_category = 뭔가["theme_category"];
      sub.innerHTML = theme_category + " ".repeat(15 - theme_category.length);

      let ing = document.createElement("div");
      ing.setAttribute("class", "ing");
      let count = document.createElement("div");
      count.setAttribute("class", "count");
      count.innerHTML = "총 " + 뭔가["length"] + "개";

      let percent = document.createElement("div");
      percent.setAttribute("class", "percent");
      // percent.innerHTML = fetch에서 가져온 내용
      percent.innerHTML = 23 + "%";

      ing.appendChild(count);
      ing.appendChild(percent);

      let bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      let bar2 = document.createElement("div");
      bar2.setAttribute("class", "bar2");

      box.appendChild(difficulty);
      box.appendChild(img);
      box.appendChild(sub);
      box.appendChild(ing);
      box.appendChild(bar);
      box.appendChild(bar2);

      parent_daily.appendChild(box);
    }
  });
>>>>>>> Stashed changes
