var SERVER_ADDRESS;
fetch("http://ip.jsontest.com/")
  .then((response) => response.json())
  .then((response) => {
    SERVER_ADDRESS = response.ip;
  });
