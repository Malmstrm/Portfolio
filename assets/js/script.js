document.addEventListener("DOMContentLoaded", function () {
    const menuMobile = document.querySelector(".menu-mobile");
    const navList = document.querySelector(".nav-content ul");

    menuMobile.addEventListener("click", function () {
        navList.classList.toggle("menu-active");
    });

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
    const contactForm = document.getElementById("contactForm");
    const feedback = document.getElementById("feedback");
  
    // Öppna modalen
    if (openModalBtn) {
      openModalBtn.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
      });
    }
  
    // Stäng modalen
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }
  
    // Stäng modalen om användaren klickar utanför
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Hantera formulärsändning med JSON
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };
  
      fetch("https://formspree.io/f/xqaerzva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          // Visa feedback meddelande
          feedback.style.display = "block";
          feedback.textContent = "Tack för ditt meddelande!";
          // Nollställ formuläret
          contactForm.reset();
          // Stäng modalen efter en kort stund
          setTimeout(() => {
            modal.style.display = "none";
            feedback.style.display = "none";
          }, 3000);
        } else {
          feedback.style.display = "block";
          feedback.style.borderColor = "#dc3545";
          feedback.style.backgroundColor = "#f8d7da";
          feedback.style.color = "#721c24";
          feedback.textContent = "Något gick fel, försök igen senare.";
        }
      })
      .catch(error => {
        console.error("Fel vid sändning av meddelande:", error);
        feedback.style.display = "block";
        feedback.style.borderColor = "#dc3545";
        feedback.style.backgroundColor = "#f8d7da";
        feedback.style.color = "#721c24";
        feedback.textContent = "Något gick fel, försök igen senare.";
      });
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
});

