let form = document.querySelector(".form"),
  inputs = form.querySelectorAll(".form__input");

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
    localStorage.removeItem("formData");
    console.log(formObj);
  });
}
function changeHendler() {
  let obj = {};
  form.addEventListener("keyup", (e) => {
    let target = e.target;
    if (target.classList.contains("form__input")) {
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
function setData() {
  let data = JSON.parse(localStorage.getItem("formData"));
  if (data && localStorage.getItem("formData") != null) {
    [...inputs].forEach((input) => {
      input.value = data[input.getAttribute("name")];
    });
  }
}
