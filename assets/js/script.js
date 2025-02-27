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
    const modal = document.getElementById("contactModal");
    const openModalBtn = document.getElementById("openContactForm");
    const closeBtn = document.querySelector(".close-button");

    // Öppna modalen när knappen klickas
    openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
    });

    // Stäng modalen när "X" klickas
    closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    });

    // Stäng modalen om användaren klickar utanför modalinnehållet
    window.addEventListener("click", function (event) {
    if (event.target === modal) {
    modal.style.display = "none";
    }
    });

    const cityInput = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");
    const cityLabel = document.getElementById("city-label");
    const tempLabel = document.getElementById("temp-label");
    const weatherIcon = document.getElementById("weather-icon");

    const API_KEY = "42e7ac043437beb71b6c3a3a0a5f2655"; // Din giltiga API-nyckel

    function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    // Hämta ikon-koden och bygg URL:en
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    
                    // Uppdatera DOM-element
                    cityLabel.textContent = data.name;
                    tempLabel.textContent = `${Math.round(data.main.temp)}°C`;
                    weatherIcon.src = iconUrl;
                    weatherIcon.alt = data.weather[0].description;
                } else {
                    cityLabel.textContent = "Stad ej hittad";
                    tempLabel.textContent = "";
                    weatherIcon.src = "";
                }
            })
            .catch(error => {
                console.error("Fel vid hämtning av väderdata:", error);
                cityLabel.textContent = "Fel";
                tempLabel.textContent = "";
                weatherIcon.src = "";
            });
    }


    fetchWeather("Söderhamn");

    searchBtn.addEventListener("click", function() {
        const city = cityInput.value.trim();
        if (city !== "") {
            fetchWeather(city);
        }
    });
});

