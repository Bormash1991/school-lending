let form: HTMLFormElement = document.querySelector(".form"),
  inputs = form.querySelectorAll(
    ".form__input"
  ) as unknown as HTMLInputElement[],
  obj: object = {},
  valid: boolean = false;

export function initForm(): void {
  setData();
  submitHendler();
  changeHendler();
}

function submitHendler(): void {
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    inputs.forEach((input, i) => {
      if (input.value == "") {
        (
          document.querySelector(
            `label[for="${input.getAttribute("id")}"]`
          ) as HTMLLabelElement
        ).innerText = "You must fill in the field";
      } else if (i == inputs.length - 1) {
        const formData: any = new FormData(form);
        let formObj: object = {};
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
function formValidate(input: HTMLInputElement): string {
  let id: string = input.getAttribute("id");
  if (id == "fullname") {
    let reg: RegExp = new RegExp(/^[a-zA-Z, \s]+$/);
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
    let reg: RegExp = new RegExp(/^[\d\+][\d\(\)\ -]{4,14}\d$/);
    if (input.value == "") {
      return "";
    } else if (!reg.test(input.value)) {
      return "You must enter +380000000000";
    } else {
      return "";
    }
  } else if (id == "email") {
    let reg: RegExp = new RegExp(
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
function illuminationForInput(text: string, input: HTMLInputElement): void {
  if (text) {
    input.classList.add("form__input_invalid");
  } else {
    input.classList.remove("form__input_invalid");
  }
}
function changeHendler() {
  form.addEventListener("keyup", (e: Event) => {
    let target = e.target as HTMLInputElement;
    if (target.classList.contains("form__input")) {
      let text = formValidate(target);
      let label: HTMLLabelElement = document.querySelector(
        `label[for="${target.getAttribute("id")}"]`
      );
      label.innerText = text;
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
  let data: string = JSON.parse(localStorage.getItem("formData"));
  if (data && localStorage.getItem("formData") != null) {
    inputs.forEach((input) => {
      if (data[input.getAttribute("name")]) {
        input.value = data[input.getAttribute("name")];
        let text = formValidate(input);
        (
          document.querySelector(
            `label[for="${input.getAttribute("id")}"]`
          ) as HTMLLabelElement
        ).innerText = text;
        illuminationForInput(text, input);
      }
    });
  }
}
