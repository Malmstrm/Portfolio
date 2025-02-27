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

    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            360: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 5 },

        }
    });
});

