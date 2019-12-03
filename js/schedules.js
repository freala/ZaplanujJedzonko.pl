let userNameHeader = document.querySelector(".user h2");  //imię u góry po prawej

(localStorage.name !== undefined) && (userNameHeader.innerText = localStorage.name);