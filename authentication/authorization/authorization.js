(function (Backendless) {
  const APPLICATION_ID = "10C03549-73C1-476B-8D8F-C9313DDD8D00";
  const SECRET_KEY = "44C48D58-78FF-4558-8489-9979881887E4";

  Backendless.initApp(APPLICATION_ID, SECRET_KEY);

  document.getElementById("login-btn")?.addEventListener("click", loginUser);

  function loginUser() {
    const login = {};

    document.querySelectorAll(".login-field").forEach((input) => {
      login[input.name] = input.value;
    });

    showInfo("Logging in...");

    Backendless.UserService.login(login.name, login.password, true)
      .then((user) => {
        if (user) {
          showInfo("Login successful");
          setTimeout(() => {
            window.location.href = "../../file-management/file-management.html";
          }, 1000);
        } else {
          showInfo("Login failed");
        }
      })
      .catch(onError);
  }

  function onError(error) {
    console.error("An error occurred:", error);
    showInfo(error.message || "An error occurred");
  }

  function showInfo(text) {
    const messageElement = document.getElementById("message");
    if (!messageElement) {
      console.error("Message element not found");
      return;
    }
    messageElement.textContent = text;
    messageElement.classList.add("visible");

    setTimeout(() => {
      messageElement.classList.remove("visible");
    }, 5000);
  }
})(Backendless);