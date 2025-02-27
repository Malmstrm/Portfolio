document.addEventListener("DOMContentLoaded", function () {
    const menuMobile = document.querySelector(".menu-mobile");
    const navList = document.querySelector(".nav-content ul");

    menuMobile.addEventListener("click", function () {
        navList.classList.toggle("menu-active");
    });

    // Lägg till en eventlyssnare på varje länk i nav-listan
    const navLinks = document.querySelectorAll(".nav-content ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navList.classList.remove("menu-active");
        });
    });


});

