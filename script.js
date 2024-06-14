const menuBurger = document.querySelector(".menu_burger");
const navLinks = document.querySelector(".nav-links");

menuBurger.addEventListener('click', () => {
navLinks.classList.toggle("mobile-menu");
});