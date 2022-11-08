let form = document.querySelector(".form"),
  inputs = form.querySelectorAll(".form__input");
let obj = {};
let valid = false;

export function initForm() {
  setData();
  submitHendler();
  changeHendler();
}

function submitHendler() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputs.forEach((input, i) => {
      if (input.value == "") {
        document.querySelector(
          `label[for="${input.getAttribute("id")}"]`
        ).innerText = "You must fill in the field";
      } else if (i == inputs.length - 1) {
        const formData = new FormData(form);
        let formObj = {};
        for (let [key, value] of formData.entries()) {
          formObj[key] = value;
        }
        clearInput();
        clearStorage();
        obj = {};
        console.log(formObj);
      }
    });
  });
}
function formValidate(input) {
  let id = input.getAttribute("id");
  if (id == "fullname") {
    let reg = new RegExp(/^[a-zA-Z, \s]+$/);
    if (input.value == "") {
      return "";
    } else if (!reg.test(input.value)) {
      return "You must enter only English letters";
    } else if (input.value.length < 3 || input.value.length > 20) {
      return "You must enter more than 2 or less then 20 letters";
    } else if (input.value.length >= 3 && input.value.length <= 20) {
      return "";
    }
  } else if (id == "phone") {
    let reg = new RegExp(/^[\d\+][\d\(\)\ -]{4,14}\d$/);
    if (input.value == "") {
      return "";
    } else if (!reg.test(input.value)) {
      return "You must enter +380000000000";
    } else {
      return "";
    }
  } else if (id == "email") {
    let reg = new RegExp(
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    );
    if (input.value == "") {
      return "";
    } else if (!reg.test(input.value)) {
      return "You must enter email as in example: 'lutsenko@gmail.com'";
    } else {
      return "";
    }
  }
}
function illuminationForInput(text, input) {
  if (text) {
    input.classList.add("form__input_invalid");
  } else {
    input.classList.remove("form__input_invalid");
  }
}
function changeHendler() {
  form.addEventListener("keyup", (e) => {
    let target = e.target;
    if (target.classList.contains("form__input")) {
      let text = formValidate(target);
      document.querySelector(
        `label[for="${target.getAttribute("id")}"]`
      ).innerText = text;
      illuminationForInput(text, target);
      let d = JSON.parse(localStorage.getItem("formData"));
      if (d) {
        if (Object.keys(d).length >= 1) {
          obj = JSON.parse(localStorage.getItem("formData"));
        }
      }
      obj[target.getAttribute("name")] = target.value;
      localStorage.setItem("formData", JSON.stringify(obj));
    }
  });
}

function clearInput() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function clearStorage() {
  localStorage.removeItem("formData");
}

function setData() {
  let data = JSON.parse(localStorage.getItem("formData"));
  if (data && localStorage.getItem("formData") != null) {
    inputs.forEach((input) => {
      if (data[input.getAttribute("name")]) {
        input.value = data[input.getAttribute("name")];
        let text = formValidate(input);
        document.querySelector(
          `label[for="${input.getAttribute("id")}"]`
        ).innerText = text;
        illuminationForInput(text, input);
      }
    });
  }
}
