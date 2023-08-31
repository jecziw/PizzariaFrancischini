document.addEventListener("DOMContentLoaded", function() {
  const loginContainer = document.querySelector(".login-container");
  loginContainer.classList.add("appear");
});

document.addEventListener("DOMContentLoaded", function() {
  const loginContainer = document.querySelector(".login-container");
  loginContainer.classList.add("appear");

  const form = document.querySelector("form");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  form.addEventListener("submit", function(event) {
    let valid = true;

    // Validar campos de e-mail e senha
    if (!emailField.value) {
      emailError.textContent = "Por favor, insira seu e-mail.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    if (!passwordField.value) {
      passwordError.textContent = "Por favor, insira sua senha.";
      valid = false;
    } else {
      passwordError.textContent = "";
    }

    if (!valid) {
      event.preventDefault(); // Impedir o envio do formulário se houver erros
    }
  });
});
