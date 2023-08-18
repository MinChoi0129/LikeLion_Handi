function login() {
  let username = document.getElementById("id").value;
  let password = document.getElementById("password").value;

  fetch("http://101.101.209.37/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username: username, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("로그인 정보");
      console.log(data);
      window.location.href = "http://101.101.209.37/";
    });
}
