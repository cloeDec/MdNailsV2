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
const intervalTime = 3000;
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
// Sélectionne l'élément DOM avec la classe 'menu'
const $menu = document.querySelector('.menu')

// Sélectionne tous les éléments DOM avec la classe 'menu-item'
const $items = document.querySelectorAll('.menu-item')

// Sélectionne toutes les balises <img> à l'intérieur des éléments avec la classe 'menu-item'
const $images = document.querySelectorAll('.menu-item img')

// Initialise la largeur du menu en utilisant la largeur actuelle de l'élément $menu
let menuWidth = $menu.clientWidth

// Initialise la largeur d'un item en utilisant la largeur du premier élément de $items
let itemWidth = $items[0].clientWidth

// Calcul de la largeur totale du wrapper en multipliant le nombre d'items par la largeur d'un item
let wrapWidth = $items.length * itemWidth

// Initialise la vitesse de défilement à 0
let scrollSpeed = 0

// Initialise la position de défilement précédente à 0
let oldScrollY = 0

// Initialise la position de défilement actuelle à 0
let scrollY = 0

// Initialise la variable y à 0 pour la gestion du défilement
let y = 0

/*--------------------
Lerp (Linear interpolation)
--------------------*/

// Fonction lerp pour interpoler linéairement entre deux valeurs v0 et v1 selon un facteur t
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t
}

/*--------------------
Dispose
--------------------*/

// Fonction dispose pour ajuster la position des items selon le défilement
const dispose = (scroll) => {
  gsap.set($items, {
    x: (i) => {
      return i * itemWidth + scroll
    },
    modifiers: {
      x: (x, target) => {
        // Utilisation de gsap.utils.wrap pour assurer que la position reste dans les limites
        const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
        return `${s}px`
      }
    }
  })
} 

// Appelle la fonction dispose avec une valeur initiale de scroll à 0
dispose(0)

/*--------------------
Wheel (Souris)
--------------------*/

// Fonction handleMouseWheel pour gérer l'événement de défilement de la souris
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9
}

/*--------------------
Touch (Écran tactile)
--------------------*/

// Variables pour gérer les événements d'écran tactile
let touchStart = 0
let touchX = 0
let isDragging = false

// Fonction handleTouchStart pour gérer le début du mouvement tactile
const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX
  isDragging = true
  $menu.classList.add('is-dragging') // Ajoute la classe 'is-dragging' à $menu
}

// Fonction handleTouchMove pour gérer le mouvement tactile
const handleTouchMove = (e) => {
  if (!isDragging) return
  touchX = e.clientX || e.touches[0].clientX
  scrollY += (touchX - touchStart) * 2.5
  touchStart = touchX
}

// Fonction handleTouchEnd pour gérer la fin du mouvement tactile
const handleTouchEnd = () => {
  isDragging = false
  $menu.classList.remove('is-dragging') // Retire la classe 'is-dragging' de $menu
}

/*--------------------
Écouteurs d'événements
--------------------*/

// Ajoute des écouteurs d'événements pour la souris
$menu.addEventListener('mousewheel', handleMouseWheel)

// Ajoute des écouteurs d'événements pour l'écran tactile
$menu.addEventListener('touchstart', handleTouchStart)
$menu.addEventListener('touchmove', handleTouchMove)
$menu.addEventListener('touchend', handleTouchEnd)

// Ajoute des écouteurs d'événements pour le clic de souris
$menu.addEventListener('mousedown', handleTouchStart)
$menu.addEventListener('mousemove', handleTouchMove)
$menu.addEventListener('mouseleave', handleTouchEnd)
$menu.addEventListener('mouseup', handleTouchEnd)

// Empêche la sélection de texte lors de la sélection sur $menu
$menu.addEventListener('selectstart', () => { return false })

/*--------------------
Redimensionnement de la fenêtre
--------------------*/

// Ajoute un écouteur d'événement pour redimensionner la fenêtre
window.addEventListener('resize', () => {
  menuWidth = $menu.clientWidth
  itemWidth = $items[0].clientWidth
  wrapWidth = $items.length * itemWidth
})

/*--------------------
Rendu
--------------------*/

// Fonction render pour effectuer le rendu continu à l'aide de requestAnimationFrame
const render = () => {
  requestAnimationFrame(render) // Utilisation de requestAnimationFrame pour appeler render de manière continue

  // Interpolation linéaire de y basée sur scrollY
  y = lerp(y, scrollY, .1)

  // Ajuste la position des items en fonction de y
  dispose(y)
  
  // Calcul de la vitesse de défilement
  scrollSpeed = y - oldScrollY
  oldScrollY = y

  // Animer les items avec GSAP en fonction de la vitesse de défilement
  gsap.to($items, {
    skewX: -scrollSpeed * .2,
    rotate: scrollSpeed * .01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
  })
}

// Appelle la fonction render pour démarrer le rendu continu
render()
