let form = document.querySelector(".form"),
  inputs = form.querySelectorAll(".form__input");
let obj = {};

export function initForm() {
  setData();
  submitHendler();
  changeHendler();
}

function submitHendler() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let formObj = {};
    for (let [key, value] of formData.entries()) {
      formObj[key] = value;
    }
    clearInput();
    clearStorage();
    obj = {};
    console.log(formObj);
  });
}

function changeHendler() {
  form.addEventListener("keyup", (e) => {
    let target = e.target;
    if (target.classList.contains("form__input")) {
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
      }
    });
  }
}
