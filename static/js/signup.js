function signup() {
  let username = document.getElementById("id").value;
  let password = document.getElementById("password").value;
  let myname = document.getElementById("name").value;
  let number = document.getElementById("PhoneNumber");

  let joinBtn = document.getElementById("join");
  fetch("http://101.101.209.37/api/signup/checkid/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username: username }), // 왼쪽이 노션에 있는 이름, 오른쪽이 변수명
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("로그인 정보");
      console.log(data);

      if (data["available"] == true) {
        alert("사용할 수 있는 아이디입니다.");
        joinBtn.disabled = false;
      } else {
        alert("이미 존재하는 아이디입니다.");
        joinBtn.disabled = true;
      }
    });
}
function join() {
  let username = document.getElementById("id").value;
  let password = document.getElementById("password").value;
  let myname = document.getElementById("name").value;
  let number = document.getElementById("PhoneNumber");

  fetch("http://101.101.209.37/api/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: username,
      password: password,
      name: myname,
      phone_number: number,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("회원가입");
      console.log(data);
      window.location.href = "http://101.101.209.37/login/";
    });
}
