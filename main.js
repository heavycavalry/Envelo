const data = [
  { numer: "777777777", code: "7777" },
  { numer: "555555555", code: "5555" },
  { numer: "333333333", code: "3333" },
];
const form = document.querySelector("#form");
const phone = document.querySelector("#phone");
const code = document.querySelector("#code");
const popUp = document.querySelector(".pop-up");
const startBtn = document.querySelector(".start-btn");
const submitBtn = document.querySelector(".submit-btn");
const endBtn = document.querySelector(".end-btn");
const nextPackageBtn = document.querySelector(".next-package-btn");
const phoneErrorDisplay = document.querySelector(".phone-message");
const codeErrorDisplay = document.querySelector(".code-message");
const sendErrorMessage = document.querySelector(".send-message");

const reload = () => {
  window.location.reload();
};
const show = (item) => {
  item.classList.remove("hidden");
};
const hide = (item) => {
  item.classList.add("hidden");
};
const handleStart = () => {
  show(form);
  hide(startBtn);
};
const addErrorBorder = (item) => {
  item.style.border = "1px solid var(--red)";
};
const removeBorder = (item) => {
  item.style.border = "2px solid var(--gray)";
};
const addSuccessBorder = (item) => {
  item.style.border = "2px solid var(--green)";
};
const isPhoneValid = () => {
  if (phone.value.length == 9 && /^\d+$/.test(phone.value)) {
    return true;
  }
  return false;
};
const isCodeValid = () => {
  if (code.value.length == 4 && /^\d+$/.test(code.value)) {
    return true;
  }
  return false;
};

const serverPostRequestMock = (phoneNumber, code) => {
  let ok = false;
  data.forEach((item) => {
    if (phoneNumber == item.numer && code == item.code) {
      ok = true;
    }
  });
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ok);
    }, 300);
  });
  return promise;
};
const postData = () => {
  serverPostRequestMock(phone.value, code.value).then((ok) => {
    if (ok) {
      show(popUp);
    } else {
      form.reset();
      removeBorder(code);
      removeBorder(phone);
      sendErrorMessage.innerHTML = "Niestety nie mamy twojej paczki :(";
    }
  });
};
const autenticateData = () => {
  postData();
};

// INPUT LISTENERS //
phone.addEventListener("focusout", () => {
  if (!isPhoneValid()) {
    phoneErrorDisplay.innerHTML = "Niepoprawny telefon.";
    addErrorBorder(phone);
  } else {
    addSuccessBorder(phone);
  }
});

code.addEventListener("focusout", () => {
  if (!isCodeValid()) {
    codeErrorDisplay.innerHTML = "Niepoprawny kod.";
    addErrorBorder(code);
  } else {
    addSuccessBorder(code);
  }
});

phone.addEventListener("focus", () => {
  phoneErrorDisplay.innerHTML = "";
  sendErrorMessage.innerHTML = "";
});

code.addEventListener("focus", () => {
  codeErrorDisplay.innerHTML = "";
  sendErrorMessage.innerHTML = "";
});

endBtn.addEventListener("click", () => {
  reload();
});

nextPackageBtn.addEventListener("click", () => {
  hide(popUp);
  form.reset();
  removeBorder(code);
  removeBorder(phone);
});

//DISABLE BUTTON LISTENER
const listenInputChanges = (item) => {
  item.addEventListener("input", () => {
    if (isCodeValid() && isPhoneValid()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });
};

listenInputChanges(phone);
listenInputChanges(code);
