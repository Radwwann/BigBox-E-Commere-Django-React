const asideSection = document.querySelector("aside"); 
const mainSection = document.querySelector("main");

const signInBtn = document.getElementById("sign-in-btn");

const signUpBtn = document.getElementById("sign-up-btn");

signInBtn.addEventListener("click", () => { 
    mainSection.classList.add("slideRight"); 
    asideSection.classList.add("slideLeft");

});

signUpBtn.addEventListener("click", () => { 
    mainSection.classList.remove("slideRight"); 
asideSection.classList.remove("slideLeft");

});