//풀페이지슬라이드event
const down_btn = document.querySelector(".fa-arrow-down");

console.log(down_btn);

down_btn.addEventListener("click", () => {
  var location = document.querySelector(".SecondSection").offsetTop;

  console.log(location);
  window.scrollTo({ top: location, behavior: "smooth" });
});

//scrollevent
const sr = ScrollReveal({
  reset: true,
  distance: "60px",
  duration: 1500,
  delay: 100,
});
const sub_text = document
  .querySelector(".FirstSection")
  .querySelector(".SubText");
const main_text = document.querySelector(".TextWrap").querySelector("h1");
const translate_btn = document.querySelector(".TranslateBtn");
const study_btn_box = document.querySelector(".StudyBtnBox");
const main_img = document.querySelector(".MainImg");
const second_text = document
  .querySelector(".SecondSection")
  .querySelector("h2");
const second_sub_text = document
  .querySelector(".SecondSection")
  .querySelector(".SubText");
const img_slide = document.querySelector(".ImgWrap");

sr.reveal(sub_text, { delay: 300, origin: "left" });
sr.reveal(main_text, { delay: 500, origin: "left" });
sr.reveal(translate_btn, { delay: 700, origin: "bottom" });
sr.reveal(study_btn_box, { delay: 700, origin: "bottom" });
sr.reveal(main_img, { delay: 600, origin: "right" });

sr.reveal(second_text, { delay: 300, origin: "left" });
sr.reveal(second_sub_text, { delay: 500, origin: "left" });
sr.reveal(img_slide, { delay: 700, origin: "bottom" });
