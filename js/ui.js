let menuToggler = document.querySelector('.menu-toggler');
let menu = document.querySelector('.menu');

menuToggler.onclick = function() {
  menuToggler.classList.toggle('active');
  menu.classList.toggle('active');
}

const containerSlot = document.querySelector('.slot');
const emojis = ['⭐', '🌟']

/**
 * This function creates confettis on DOM
 */
export function fiesta() {
  for (let i = 0; i<50; i++) {
    const confetti = document.createElement('div');
    confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)]
    containerSlot.appendChild(confetti);
  }

  animateConfettis();
}

/**
 * Animate confettis
 */
function animateConfettis() {
  const TLCONF = gsap.timeline()

  TLCONF
  .to('.slot div', {
    y: 'random(-100, 100)',
    x: 'random(-100, 100)',
    z: 'random(0, 1000)',
    rotation: 'random(-90, 90)',
    duration: 1
  })
  .to('.slot div', {
    autoAlpha: 0,
    duration: 0.3
  },
  '-=0.2'
  )
  .add(() => {
    containerSlot.innerHTML = '';
  })
}