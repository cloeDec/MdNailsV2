const menuBurger = document.querySelector(".menu_burger");
const navLinks = document.querySelector(".nav-links");

menuBurger.addEventListener('click', () => {
navLinks.classList.toggle("mobile-menu");
});

// Carroussel presentation
const images = document.querySelectorAll('.container img');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');

let position = 0;

const moveRight = () => {
    images[position].classList.remove('active');
    position = (position + 1) % images.length;
    images[position].classList.add('active');
}

const moveLeft = () => {
    images[position].classList.remove('active');
    position = (position - 1 + images.length) % images.length;
    images[position].classList.add('active');
}

rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);

// Initially show the first image
images[position].classList.add('active');
