fetch("http://localhost:8000/api/lecture/" + 3 + "/")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		for (let i = 0; i < data.length; i++) { // "o"를 "0"으로 수정
			StudyImg[i].setAttribute(
				"src",
				"http://localhost:8000" + data[i].lecture_img
			);
		}
	});