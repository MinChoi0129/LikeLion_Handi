function signup() {
  let username = document.getElementById("id").value;
  let joinBtn = document.getElementById('join');


fetch('http://127.0.0.1:8000/api/signup/checkid/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({username: username})
})
  .then((response) => response.json())
  .then((data) => {

    console.log("로그인 정보")
    console.log(data);

  if(data["available"] == true){
      alert("사용할 수 있는 아이디입니다.")
  joinBtn.disabled = true;
  }
  else{
      alert("이미 존재하는 아이디입니다.")
  joinBtn.disabled = false;
  }

  });
}

function join() {
  window.location.href = 'http://127.0.0.1:8000/login/';
}