// Задание 1

let color = document.getElementById("color");
let lang = document.getElementById("lang");

let paragraph = document.getElementById("par");

function changeInterface() {
  let optionLang = lang.options;
  let optionCol = color.options;
  if (optionCol[color.selectedIndex].text) {
    document.body.style.backgroundColor = optionCol[color.selectedIndex].text;
    sessionStorage.setItem("color", color.value);
  }
  if (optionLang[lang.selectedIndex].text) {
    let language = optionLang[lang.selectedIndex].text;
    paragraph.innerHTML = "Interface language: " + language;
    sessionStorage.setItem("language", lang.value);
  }
}

// Задание 2

let form = document.getElementById("form");
let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");

form.addEventListener("submit", function () {
  localStorage.setItem("Name", inputName.value);
  localStorage.setItem("Email", inputEmail.value);
});

// Задание 3

let cart = document.querySelector(".cart");
let cartName = document.querySelector(".cart-name");
let cartPrice = document.querySelector(".cart-price");
let totalPrice = document.querySelector(".total-price");
let totalValue = document.querySelector(".total-value");

function pickChaynik() {
  let prodName = document.createElement("p");
  prodName.innerHTML = "Чайник";
  cartName.append(prodName);
  let prodPrice = document.createElement("p");
  prodPrice.innerHTML = "50р";
  cartPrice.append(prodPrice);
  console.log(chaynik.cost);
}

function pickKastryulya() {
  let prodName = document.createElement("p");
  prodName.innerHTML = "Кастрюля";
  cartName.append(prodName);
  let prodPrice = document.createElement("p");
  prodPrice.innerHTML = "70р";
  cartPrice.append(prodPrice);
}
function pickSkovorodka() {
  let prodName = document.createElement("p");
  prodName.innerHTML = "Сковорода";
  cartName.append(prodName);

  let prodPrice = document.createElement("p");
  prodPrice.innerHTML = "40р";
  cartPrice.append(prodPrice);
}

class Order {
  constructor(name, price, infoUser) {
    this.name = name;
    this.price = price;
    this.infoUser = infoUser;
  }

  static dataProduct() {
    let dataName = [...cartName.getElementsByTagName("p")].map((el) => {
      return el.textContent;
    });

    let dataPrice = [...cartPrice.getElementsByTagName("p")].map((el) => {
      return el.textContent;
    });
    let arrProduct = dataName.map((el, i) => {
      return new Order(el, dataPrice[i]);
    });
    return arrProduct;
  }

  static clearCart() {
    let dataName = [...cartName.getElementsByTagName("p")].forEach((p) => {
      p.remove();
    });
    let dataPrice = [...cartPrice.getElementsByTagName("p")].forEach((p) => {
      p.remove();
    });
  }
}

let btnOrder = document.getElementById("btn-order");

btnOrder.addEventListener("click", function () {
  let dataOrder = Order.dataProduct();
  let url = "https://api.github.com";
  fetch(url, {
    method: "post",
    body: dataOrder,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error("Ошибка запроса!");
      } else if (response.status === 401) {
        throw new Error("Ошибка авторизации!");
      } else if (response.status === 404) {
        throw new Error("Ресурс не найден!");
      }
    })
    .then((data) => {
      console.log("Заказ принят!");
    })
    .catch((error) => {
      console.error(error);
    });

  Order.clearCart();
});

// Задание 4

function checkStatus() {
  fetch("https://innodom.com/student")
    .then((response) => {
      if (response.ok) {
        console.log("Онлайн");
      } else {
        console.log("Офлайн");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

setInterval(checkStatus, 5000);
