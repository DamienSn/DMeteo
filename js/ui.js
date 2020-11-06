let menuToggler = document.querySelector('.menu-toggler');
let menu = document.querySelector('.menu');

menuToggler.onclick = function() {
  menuToggler.classList.toggle('active');
  menu.classList.toggle('active');
}

window.onscroll = function(e) {
  if (window.pageYOffset > 20) {
    document.querySelector('.menu').style.padding = '20px';
  } else {
    document.querySelector('.menu').style.padding = '140px 20px 10px';
  }
}
