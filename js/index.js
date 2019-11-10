let prev = document.getElementById("prevPicture");
let next = document.getElementById("nextPicture");
let listElements = document.querySelectorAll("#slider li");
let counter = 0;

listElements[counter].classList.add("visible");

prev.addEventListener("click", function () {
    listElements[counter].classList.remove("visible");
    counter--;
    if (counter < 0) {
        counter = listElements.length - 1;
    }
    listElements[counter].classList.add("visible");
});

next.addEventListener("click", function () {
    listElements[counter].classList.remove("visible");
    counter++;
    if (counter > listElements.length - 1) {
        counter = 0;
    }
    listElements[counter].classList.add("visible");
});

setInterval(function () {
    listElements[counter].classList.remove("visible");
    counter++;
    if (counter > listElements.length - 1) {
        counter = 0;
    }
    listElements[counter].classList.add("visible");
}, 3000);
