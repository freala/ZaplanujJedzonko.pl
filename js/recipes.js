let userNameHeader = document.querySelector(".user h2");  //imię u góry po prawej

(localStorage.name !== undefined) && (userNameHeader.innerText = localStorage.name);

let newRecipeButton = document.querySelector(".recipes__header button");
//console.log(newRecipeButton);

/*newRecipeButton.addEventListener("click", function(){ // jeszcze nie działa jak powinno, bo nie otwiera okna dodaj przepis
    window.open("app.html","windowName");
    welcome.style.display = "none";
    desktop.style.display = 'none';
    newRecipeWindow.style.display = 'block';
});*/

let recipesLS = JSON.parse(localStorage.getItem('recipes'));
//console.log(recipesLS);

let recipesList = document.querySelector(".list");

let rowToClone = document.querySelector(".list ul");
//console.log(rowToClone);

rowToClone.firstElementChild.innerText = Object.values(recipesLS[0])[0];
rowToClone.children[1].innerText = Object.values(recipesLS[0])[1];
rowToClone.children[2].innerText = Object.values(recipesLS[0])[2];

for(let i = 0; i< recipesLS.length -1;i++){

    let elementsArray = Object.values(recipesLS[i+1]);
    //console.log(elementsArray);

    let newRow = rowToClone.cloneNode(true);

    newRow.firstElementChild.innerText = elementsArray[0];
    newRow.children[1].innerText = elementsArray[1];
    newRow.children[2].innerText = elementsArray[2];

    recipesList.appendChild(newRow);
};