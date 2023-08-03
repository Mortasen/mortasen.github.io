var dropdownDiv;
var button;

function dropdownChange (buttonPressed) {
  console.log(buttonPressed);
  button = buttonPressed;
  newValue = buttonPressed.innerText;
  dropdownDiv = buttonPressed.parentElement.parentElement;
  buttonDiv = dropdownDiv.firstElementChild.firstElementChild;
  buttonDiv.innerText = newValue;
}

function popupOpen (name) {
  let element = document.getElementById(name + "-form-popup");
  element.style = "display: block;";
}

function popupClose (el) {
  e = window.event;
  if (el === e.target) {
    let elements = document.querySelectorAll(".popup");
    for (let i = 0; i < elements.length; i++)
      elements[i].style = null;
  }
}

var catalogPage = 2;
var catalogMaxPage = 3;

function catalogPrevPage () {
  let elements = document.querySelectorAll("#catalog .catalog");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("catalog-hidden");
  }
  catalogPage -= 1;
  if (catalogPage == 1) {
    let buttonLeft = document.querySelector("#catalog > .container > button.left");
    buttonLeft.disabled = true;
  }
  let buttonRight = document.querySelector("#catalog > .container > button.right");
  buttonRight.disabled = false;
  console.log("prev" + catalogPage);
  let vCatalog = document.querySelector("#catalog-page-" + catalogPage);
  vCatalog.classList.remove("catalog-hidden");
}

function catalogNextPage () {
  let elements = document.querySelectorAll("#catalog .catalog");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("catalog-hidden");
  }
  catalogPage += 1;
  console.log("next" + catalogPage);
  if (catalogPage == catalogMaxPage) {
    let buttonRight = document.querySelector("#catalog > .container > button.right");
    buttonRight.disabled = true;
  }
  let buttonLeft = document.querySelector("#catalog > .container > button.left");
  buttonLeft.disabled = false;
  let vCatalog = document.querySelector("#catalog-page-" + catalogPage);
  vCatalog.classList.remove("catalog-hidden");
}

var lastGroup = 1;

function addSize () {
  let form = document.querySelector("#application form");
  let summary = document.querySelector("#application form > .summary");
  let sizeDiv = document.createElement("div");
  sizeDiv.className = "size";
  lastGroup++;
  sizeDiv.innerHTML = '<h2>Група листів ' + lastGroup + ':</h2>\
  <button type=button onclick="removeSize(this);"><img src="img/close.svg" alt="Удалить" width=32 height=32></button>\
  <div class="size-fields">\
    <div>\
      <h3>Ширина</h3>\
      <input type="text">\
    </div>\
    <div>\
      <h3>Довжина</h3>\
      <input type="text">\
    </div>\
    <div>\
      <h3>Кількість</h3>\
      <input type="text">\
    </div>\
  </div>';
  form.insertBefore(sizeDiv, summary)
}

function removeSize (el) {
  lastGroup--;
  el.parentElement.remove();
  let elements = document.querySelectorAll("#application form > .size");
  for (let i = 0; i < elements.length; i++) {
    elements[i].firstElementChild.innerText = "Група листів " + (i + 1) + ":";
  }
}
