let userNameHeader = document.querySelector(".user h2");  //imię u góry po prawej
let welcome = document.querySelector(".welcome");
let desktop = document.querySelector(".desktop");
let newRecipeWindow = document.querySelector(".new_recipe");
let newPlanWindow = document.querySelector(".new_plan");

            // jakie okno najpierw ma się wyświetlić

if (localStorage.name !== undefined) {
    welcome.style.display = "none";
    desktop.style.display = "block";
    newRecipeWindow.style.display = "none";
    newPlanWindow.style.display = "none";
    userNameHeader.innerText = localStorage.name;
} else {
    welcome.style.display = 'flex';
    desktop.style.display = 'none';
    newRecipeWindow.style.display = 'none';
    newPlanWindow.style.display = "none";
}
          //co się dzieje po wpisaniu imienia w input

let inputName = document.querySelector(".welcome input");
let submitName = document.querySelector(".welcome button");

submitName.addEventListener('click', function (e) {
    if (inputName.value.length < 1) {
        inputName.style.border = "2px solid red";
        e.preventDefault();
    } else {
        localStorage.setItem("name", inputName.value);
        welcome.style.display = "none";
        desktop.style.display = "block";
        userNameHeader.innerText = localStorage.name;
    }
});
          //co się dzije po kliknięciu na widget dodaj przepis

let newRecipeWidget = document.querySelector('.widget_recipe');

newRecipeWidget.addEventListener('click', function () {
    welcome.style.display = "none";
    desktop.style.display = 'none';
    newRecipeWindow.style.display = 'block';
    newPlanWindow.style.display = "none";
});
            //co się dzije po kliknięciu na widget dodaj plan

let newPlanWidget = document.querySelector('.widget_plan');

newPlanWidget.addEventListener('click', function () {
    welcome.style.display = "none";
    desktop.style.display = 'none';
    newRecipeWindow.style.display = 'none';
    newPlanWindow.style.display = "block";
});
            //OKNO DODAJ PRZEPIS

//ściągam potrzebne elementy ze strony
let closeButton = document.querySelector(".my_recipe_button button");
let titleInput = document.getElementById('recipename');
let descriptionInput = document.getElementById('recipedescribtion');
let instructionsInput = document.getElementById('instructionsInput');
let ingredientsInput = document.getElementById('ingredientsinput');
let instructionsButton = document.getElementById('instruction_button');
let ingredientsButton = document.getElementById('ingredients_button');
let instructionsList = document.querySelector('.list-instruction');
let ingredientsList = document.querySelector('.igredients_scroll ul');

let recipesLS = JSON.parse(localStorage.getItem('recipes'));   //wyciągam zmienną z już przekonwertowaną z local storage wartość recipe

//ustawiam event na buttony żeby dodawał instrukcje i składniki do listy poniżej

instructionsButton.addEventListener('click', function (e) {
    if (instructionsInput.value.length < 1 || instructionsInput.value.length > 150) {
        e.preventDefault();
    }else {
        let newLi = document.createElement('li');
        newLi.innerHTML = `${instructionsInput.value}<i class="far fa-edit"></i><i class="far fa-trash-alt"></i>`;
        instructionsList.appendChild(newLi);
        instructionsInput.value = '';

        // guzikowi kosz daję możliwość usunięcia własnego LI

        let removeInstructions = newLi.querySelector('.fa-trash-alt');
        removeInstructions.addEventListener('click', function () {
            instructionsList.removeChild(newLi);
        });

        //przycisk edit

        let editInstructions = newLi.querySelector('.fa-edit');
        editInstructions.addEventListener('click', function (e) {
            if (instructionsInput.value.length !== 0) {
                e.preventDefault()
            } else {
                instructionsList.removeChild(newLi);
                instructionsInput.value = newLi.innerText;
            }
        })
    }
});

ingredientsButton.addEventListener('click', function (e) {
    if (ingredientsInput.value.length < 1 || ingredientsInput.value.length > 50) {
        e.preventDefault();
    }else {
        let newLi = document.createElement('li');
        newLi.innerHTML = `${ingredientsInput.value}<i class="far fa-edit"></i><i class="far fa-trash-alt"></i>`;
        ingredientsList.appendChild(newLi);
        ingredientsInput.value = '';

            // guzikowi kosz daję możliwość usunięcia własnego LI

        let removeIngredients = newLi.querySelector('.fa-trash-alt');
        removeIngredients.addEventListener('click', function () {
        ingredientsList.removeChild(newLi);

        });
        //przycisk edit

        let editIngredients = newLi.querySelector('.fa-edit');
        editIngredients.addEventListener('click', function (e) {
            if (ingredientsInput.value.length !== 0) {
                e.preventDefault()
            } else {
                ingredientsList.removeChild(newLi);
                ingredientsInput.value = newLi.innerText;
            }
        })
    }
});

//tworzenie nowego obiektu przepis po naciśnięciu przycisku zapisz i zamknij

closeButton.addEventListener('click' ,function (e) {

    if (titleInput.value.length < 1 || titleInput.value.length > 50) {
        titleInput.style.border = '2px solid red';
        e.preventDefault()
    } else if (descriptionInput.value.length < 1 || descriptionInput.value.length > 360) {
        descriptionInput.style.border = '2px solid red';
        e.preventDefault()
    } else if (instructionsList.children.length === 0) {
        e.preventDefault()
    } else if (ingredientsList.children.length === 0) {
        e.preventDefault()
    } else {

        let newRecipe = {
            id: "",
            title: titleInput.value,
            description: descriptionInput.value,
            instructions: [],
            ingredients: []
        };
        //dopisujemy do obiektu newRecipe instrukcje
        for (let i = 0; i < instructionsList.children.length; i++) {
            newRecipe.instructions.push(instructionsList.children[i].innerText);
        }
        //dopisujemy do obiektu newRecipe składniki
        for (let i = 0; i < ingredientsList.children.length; i++) {
            newRecipe.ingredients.push(ingredientsList.children[i].innerText);
        }
        //local storage
        let dataFromLocalStorage = [];

        if (localStorage.getItem('recipes') !== null) {
            newRecipe.id = recipesLS.length + 1;
            dataFromLocalStorage = recipesLS;
            dataFromLocalStorage.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(dataFromLocalStorage));
        } else {
            newRecipe.id = 1;
            dataFromLocalStorage.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(dataFromLocalStorage));
        }
        //odświeżam okno, bo counter się nie aktualizuje
        window.location.reload();

    }
});

    // licznik przepisów

let counter = document.querySelector('.counter');

(recipesLS !== null) && (counter.innerText = recipesLS.length);

     //zamykanie powiadomień

let closeModalsButtons = document.getElementsByClassName('fa-times');
let modals = document.querySelector('.modals').children;

for (let i = 0; i < closeModalsButtons.length; i++) {
    closeModalsButtons[i].style.cursor = 'pointer';     //przy okazji dodaję pointer na hover :)
    closeModalsButtons[i].addEventListener('click', function () {
        modals[i].style.display = 'none';
    })
}

    //OKNO NOWY PLAN

//TWORZENIE LISTY KADEGO SELECTA Z PRZEPISOW W LOCALSTORAGE

let selections = document.querySelectorAll("select");
// console.log(selections);

selections.forEach(function(select){
    for (let i=0; i<recipesLS.length; i++){
        let newOption = document.createElement("option");
        newOption.innerText = Object.values(recipesLS[i])[1];
        Array.from(newOption);
        select.appendChild(newOption);
    }
});

let closeSaveButton = document.querySelector('.my_plan_button button');
let titlePlanInput = document.getElementById('planname');
let descriptionPlanInput = document.getElementById('plandescribtion');
let weekNumber = document.getElementById('week_number');

let plansLS = JSON.parse(localStorage.getItem('plans'));   //wyciągam zmienną z już przekonwertowaną z local storage wartość recipe


closeSaveButton.addEventListener('click' ,function (e) {

    if (titlePlanInput.value.length < 1 || titlePlanInput.value.length > 50) {
        titlePlanInput.style.border = '2px solid red';
        e.preventDefault()
    } else if (descriptionPlanInput.value.length < 1 || descriptionPlanInput.value.length > 360) {
        descriptionPlanInput.style.border = '2px solid red';
        e.preventDefault()
    } else if (weekNumber.value === "") {
        weekNumber.style.border = '2px solid red';
        e.preventDefault()
    } else {

        let newPlan = {
            id: "",
            title: titlePlanInput.value,
            description: descriptionPlanInput.value,
            weekNumber: weekNumber.value,
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        };


        //dopisujemy selecty do poniedziałku
        for (let i = 0; i <= 4; i++) {
            newPlan.monday.push(selections[i].options[selections[i].selectedIndex].text);
        }

        //dopisujemy selecty do wtorku
        for (let i = 5; i <= 9; i++) {
            newPlan.tuesday.push(selections[i].options[selections[i].selectedIndex].text);
        }

        //dopisujemy selecty do środy
        for (let i = 10; i <= 14; i++) {
            newPlan.wednesday.push(selections[i].options[selections[i].selectedIndex].text);
        }

        //dopisujemy selecty do czwartku
        for (let i = 15; i <= 19; i++) {
            newPlan.thursday.push(selections[i].options[selections[i].selectedIndex].text);
        }

        //dopisujemy selecty do piątku
        for (let i = 20; i <= 24; i++) {
            newPlan.friday.push(selections[i].options[selections[i].selectedIndex].text);
        }

        //dopisujemy selecty do soboty
        for (let i = 25; i <= 29; i++) {
            newPlan.saturday.push(selections[i].options[selections[i].selectedIndex].text);
        }

        //dopisujemy selecty do niedzieli
        for (let i = 30; i <= 34; i++) {
            newPlan.sunday.push(selections[i].options[selections[i].selectedIndex].text);
        }



        //local storage
        let dataFromLocalStorage = [];

        if (localStorage.getItem('plans') !== null) {
            newPlan.id = plansLS.length + 1;
            dataFromLocalStorage = plansLS;
            dataFromLocalStorage.push(newPlan);
            localStorage.setItem('plans', JSON.stringify(dataFromLocalStorage));
        } else {
            newPlan.id = 1;
            dataFromLocalStorage.push(newPlan);
            localStorage.setItem('plans', JSON.stringify(dataFromLocalStorage));
        }
        window.location.reload();

    }
});