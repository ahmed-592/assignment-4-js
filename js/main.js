var nameInput = document.getElementById("userName");
var emailInput = document.getElementById("userEmail");
var passwordInput = document.getElementById("userPassword");
var emailLoginInput = document.getElementById("user-email-login");
var passwordLoginInput = document.getElementById("user-password-login");
var btnRegister = document.getElementById("btnRegister");
var btnLogin = document.getElementById("btnLogin");
var h1UserName = document.getElementById("h1UserName");

var clients;
if (JSON.parse(localStorage.getItem("client")) != null) {
  var clients = JSON.parse(localStorage.getItem("client"));
} else {
  clients = [];
}

function addClient() {
  if (
    validtionForm(nameInput) &&
    validtionForm(emailInput) &&
    validtionForm(passwordInput) &&
    validData(emailInput)
  ) {
    var client = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    clients.push(client);
    localStorage.setItem("client", JSON.stringify(clients));
    clearForm();
    btnRegister.nextElementSibling.innerHTML = "Success";
    btnRegister.nextElementSibling.classList.remove("text-danger");
  } else {
    btnRegister.nextElementSibling.innerHTML = "Invalid inpute";
    btnRegister.nextElementSibling.classList.add("text-danger");
  }
}

function clearForm() {
  nameInput.value = null;
  emailInput.value = null;
  passwordInput.value = null;
  btnRegister.value = null;
}
if (btnLogin) {
  btnLogin.addEventListener("click", function (e) {
    if (loginClient(emailLoginInput.value, passwordLoginInput.value)) {
      btnLogin.parentElement.setAttribute("href", "home.html");
      localStorage.setItem(
        "message",
        "Welcome " + JSON.parse(localStorage.getItem("client"))[index].name
      );
    } else {
    }
  });
}

if (h1UserName) {
  h1UserName.innerHTML = localStorage.getItem("message");
}

if (btnRegister) {
  btnRegister.addEventListener("click", function (e) {
    addClient();
  });
}

var index;
function loginClient(email, password) {
  for (var i = 0; i < clients.length; i++) {
    if (
      email == JSON.parse(localStorage.getItem("client"))[i].email &&
      password == JSON.parse(localStorage.getItem("client"))[i].password
    ) {
      index = i;
      return true;
    }
  }
  return false;
}

function validtionForm(element) {
  var regex = {
    userName: /^[A-Z][a-z]{2,8}(\s[a-z]{3,10})?$/,
    userEmail:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    userPassword: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  };

  if (regex[element.id].test(element.value)) {
    return true;
  } else {
    return false;
  }
}

function validData(elemnt) {
  for (var i = 0; i < clients.length; i++) {
    if (elemnt.value == JSON.parse(localStorage.getItem("client"))[i].email) {
      return false;
    }
  }
  return true;
}
