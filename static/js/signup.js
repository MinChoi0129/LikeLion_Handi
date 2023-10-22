function signup() {
  let username = document.getElementById("id").value;
  let joinBtn = document.getElementById("join");
  fetch(SERVER_ADDRESS + "/api/signup/checkid/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username: username }), // 왼쪽이 노션에 있는 이름, 오른쪽이 변수명
  })
    .then((response) => response.json())
    .then((data) => {
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
  let email_address = document.getElementById("email_address").value;
  let nickname = document.getElementById("nickname").value;
  if (username == "" || password == "" || myname == "" || nickname == "") {
    alert("입력하지 않은 항목이 있습니다.");
  } else {
    fetch(SERVER_ADDRESS + "/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
        name: myname,
        email_address: email_address,
        nickname: nickname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = SERVER_ADDRESS + "/login/";
      });
  }
}
