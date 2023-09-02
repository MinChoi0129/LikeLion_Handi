function login() {
  let username = document.getElementById("id").value;
  let password = document.getElementById("password").value;

  fetch(SERVER_ADDRESS + "/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username: username, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = SERVER_ADDRESS + "/";
    });
}

document.getElementById("password").addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    document.getElementById("loginBtn").click();
  }
});
