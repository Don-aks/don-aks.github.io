const langBtn = document.querySelector('.lang');
const langText = document.querySelector('.lang__text');
const langMenu = document.querySelector('.lang__menu');
const langList = ['en', 'ru', 'uk'];
let currentLang;
changeLanguage();

langBtn.addEventListener('click', function() {
  langMenu.classList.toggle('lang__menu--active');
});

langMenu.addEventListener('click', function(e) {
  e.preventDefault();
  const langHref = e.target.getAttribute('href');
  if (!langHref)
    return;

  location.href = window.location.pathname + langHref;
  location.reload();
});


const closeBtn = document.querySelector('.notify__close');
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
closeBtn.addEventListener('click', function(){
  this.parentElement.style.display = 'none';
  header.style.height = '100vh';
  hero.style.height = 'calc(100vh - 192px)';
});


const menuBtns = document.querySelectorAll('.header__btn');
const body = document.querySelector('body')
for (let i = 0; i < menuBtns.length; i++) {
  menuBtns[i].addEventListener('click', changeMenuState);
}
body.addEventListener('click', function(e){
  if (e.target.classList.contains('locked'))
    changeMenuState();
  else if (e.target != langBtn && e.target != langText && langMenu.classList.contains('lang__menu--active')) {
    langMenu.classList.remove('lang__menu--active');
  }
});

const products = document.querySelector('.products__inner');
const productsSwiper = new Swiper('.products__inner', {
  loop: true,
  slidesPerView: 3.5,
  spaceBetween: 60,
  navigation: {
    nextEl: '.products__next',
    prevEl: '.products__prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    }
  }
});

const slider = document.querySelector('.slider__wrapper');
const sliderSwiper  = new Swiper('.slider__wrapper', {
  loop: true,
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 230,
  pagination: {
    el: '.slider__pagination',
    type: 'bullets',
  }
});

const recipes = document.querySelector('.recipes__wrapper');
const recipesSwiper = new Swiper('.recipes__wrapper', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 39
});

let isScrolledToSlider = {
  slider: false,
  products: false,
  recipes: false
}


const scrollBtn = document.querySelector('.scroll-down-btn');
scrollBtn.addEventListener('click', scrollIntoView);
const headerWrapper = document.querySelector('.header__wrapper');
headerWrapper.addEventListener('click', scrollIntoView);


const windowOffset = window.innerHeight / 2;
const images = document.querySelectorAll('.images-rotate__img');
const animatedElements = document.querySelectorAll('.animate__animated');
const blockHero = document.querySelector('.hero');
const title = document.querySelector('.hero__title');
window.addEventListener('scroll', function(){
  for (let i = 0; i < images.length; i++)
    addClassOnScroll(images[i], 'images-rotate__img--show');

  for (let i = 0; i < animatedElements.length; i++) {
    const el = animatedElements[i];
    const classes = el.classList;
    let className, classOutOfVisibility;

    for (let i = 0; i < classes.length; i++)
      if(classes[i].indexOf('anim--') == 0)
        className = classes[i].slice(6, classes[i].length);

    if (className && className.indexOf('In') !== -1)
      classOutOfVisibility = className.replace('In', 'Out');

    addClassOnScroll(el, 'animate__' + className, true, windowOffset, classOutOfVisibility ? ('animate__' + classOutOfVisibility) : null);
  }

  const scrollY = this.scrollY;
  if (scrollY < blockHero.offsetHeight)
    title.style.marginTop = scrollY * 1.5 + 'px';

  // Behavior sliders on scroll
  if (
    isScrolledDown(slider, false, windowOffset) && 
    !isScrolledToSlider.slider
  ) {
    sliderSwiper.slideNext();
    isScrolledToSlider.slider = true;
  }
  else if (
    isScrolledDown(recipes, false, windowOffset) && !isScrolledToSlider.recipes
  ) {
    recipesSwiper.slideNext();
    isScrolledToSlider.recipes = true;
  }
  else if (
    isScrolledDown(products, false, windowOffset) && !isScrolledToSlider.products
  ) {
    productsSwiper.slideNext();
    isScrolledToSlider.products = true;
  }
});


// Parralax is not for IE and
// not for screens under 992
if (!(/*@cc_on!@*/false || !!document.documentMode) && window.innerWidth > 992) {
  const scenes = document.querySelectorAll('.image-scene');
  for (let i = 0; i < scenes.length; i++)
    new Parallax(scenes[i]);

  if (window.innerWidth <= 1200)
    for (let i = 0; i < scenes.length; i++)
      for (let j = 0; j < scenes[i].children.length; j++)
        scenes[i].children[j].setAttribute('data-depth', '0.1');
}


// ====== FUNCTIONS ====== //

function changeLanguage(){
  let hash = window.location.hash.substring(1);
  let isLang = false;
  for (let i = 0; i < langList.length; i++)
    if (hash.indexOf(langList[i]) !== -1)
      isLang = true;
  
  if (!isLang) {
    location.href = window.location.pathname + '#en';
    hash = 'en';
    return;
  }

  if (hash == 'en')
    return;
  
  document.querySelector('html').setAttribute('lang', hash);
  langBtn.querySelectorAll('lang__text').innerHTML = hash;

  for(let key in langArray) {
    const elems = document.querySelectorAll('.lng-' + key);
    const text = langArray[key][hash];
    if (elems.length === 0)
      continue;
  
    if (text === "") {
      for (let i = 0; i < elems.length; i++)
        elems[i].parentElement.removeChild(elems[i]);
      continue;
    }
    
    for (let i = 0; i < elems.length; i++)
      if(elems[i].tagName === "IMG")
        elems[i].setAttribute("alt", text);
      else if(elems[i].tagName === "INPUT")
        elems[i].setAttribute("placeholder", text)
      else
        elems[i].innerHTML = text;
  }
}

function scrollIntoView(e){
  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (!href)
    return;

  const scrollTarget = document.getElementById(href.substring(1));
  if (!scrollTarget)
    return;

  const topOffset = 0;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;

  window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
  });
}

function addClassOnScroll(el, className, isUsingTransform, offset, classOutOfVisibility) {
  if (!offset)
    offset = windowOffset;

  const isScrolled = isScrolledDown(el, isUsingTransform, offset);
  
  if (isScrolled) {
    el.classList.add(className);
    if (classOutOfVisibility)
      el.classList.remove(classOutOfVisibility);
  } else {
    el.classList.remove(className);
    if (classOutOfVisibility)
      el.classList.add(classOutOfVisibility);
  }
}

function isScrolledDown(el, isUsingTransform, offset) {
  let scrollY = window.innerHeight - offset;
  let top = el.getBoundingClientRect().top;

  if (isUsingTransform) {
    scrollY = window.scrollY;
    top = el.offsetTop - offset;
  }

  return top < scrollY;
}
