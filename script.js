const menuBurger = document.querySelector(".menu_burger");
const navLinks = document.querySelector(".nav-links");

menuBurger.addEventListener('click', () => {
navLinks.classList.toggle("mobile-menu");
});

// Carrousel presentation
const images = document.querySelectorAll('.container .carousel-item');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');

let position = 0;

const moveRight = () => {
  images[position].classList.remove('active');
  position = (position + 1) % images.length;
  images[position].classList.add('active');
};

const moveLeft = () => {
  images[position].classList.remove('active');
  position = (position - 1 + images.length) % images.length;
  images[position].classList.add('active');
};

rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);

// Initially show the first image
images[position].classList.add('active');

// Set up interval to change slides every 4 seconds
const intervalTime = 6000;
const slideInterval = setInterval(moveRight, intervalTime);

// Pause interval on button click and restart it
rightBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  setTimeout(() => {
    setInterval(moveRight, intervalTime);
  }, intervalTime);
});

leftBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  setTimeout(() => {
    setInterval(moveRight, intervalTime);
  }, intervalTime);
});

// Slider diplome
document.addEventListener('DOMContentLoaded', function () {
  const swiperEl = document.querySelector('swiper-container');
  const swiper = new Swiper(swiperEl, {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 3,
    centeredSlides: false,
    spaceBetween: 30,
  });

  var appendNumber = 4;
  var prependNumber = 1;
  document.querySelector(".prepend-2-slides").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.prependSlide([
      '<swiper-slide>Slide ' + --prependNumber + "</swiper-slide>",
      '<swiper-slide>Slide ' + --prependNumber + "</swiper-slide>",
    ]);
  });
  document.querySelector(".prepend-slide").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.prependSlide('<swiper-slide>Slide ' + --prependNumber + "</swiper-slide>");
  });
  document.querySelector(".append-slide").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.appendSlide('<swiper-slide>Slide ' + ++appendNumber + "</swiper-slide>");
  });
  document.querySelector(".append-2-slides").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.appendSlide([
      '<swiper-slide>Slide ' + ++appendNumber + "</swiper-slide>",
      '<swiper-slide>Slide ' + ++appendNumber + "</swiper-slide>",
    ]);
  });
});


 