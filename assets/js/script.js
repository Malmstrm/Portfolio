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

    const iconCode = data.weather[0].icon; // Hämtar ikon-koden från API-svaret
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const cityInput = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");
    const cityLabel = document.getElementById("city-label");
    const tempLabel = document.getElementById("temp-label");

    const API_KEY ="42e7ac043437beb71b6c3a3a0a5f2655"; // Ersätt med din faktiska API-nyckel

    function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if(data.cod === 200) {
            // Uppdatera etiketterna med stadens namn och temperaturen (avrundad)
            cityLabel.textContent = data.name;
            tempLabel.textContent = `${Math.round(data.main.temp)}°C`;
            } else {
            cityLabel.textContent = "Stad ej hittad";
            tempLabel.textContent = "";
            }
        })
        .catch(error => {
            console.error("Fel vid hämtning av väderdata:", error);
            cityLabel.textContent = "Fel";
            tempLabel.textContent = "";
        });
    }
    fetchWeather("Stockholm");

    searchBtn.addEventListener("click", function() {
        const city = cityInput.value.trim();
        if(city !== "") {
        fetchWeather(city);
        }
    });
});

