const langBtn = document.querySelector('.lang');
const langText = document.querySelector('.lang__text');
const langMenu = document.querySelector('.lang__menu');
const langList = ['en', 'ru', 'uk'];
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

const headerWrapper = document.querySelector('.header__wrapper');
const closeBtn = document.querySelector('.notify__close');
const header = document.querySelector('.header');
const menu = document.querySelector('.header__menu');
const hero = document.querySelector('.hero');
let isNotifyClosed = false;
closeBtn.addEventListener('click', function(){
  isNotifyClosed = true;
  this.parentElement.style.display = 'none';
  header.setAttribute(
    'style', 
    header.getAttribute('style') + ' height: 100vh; height: 100dvh'
  );
  if (window.innerHeight <= 465)
    hero.setAttribute(
      'style',
      'height: calc(100vh - 124px); height: calc(100dvh - 124px)'
    );
  else if (window.offsetWidth <= 440 || window.innerHeight <= 750)
    hero.setAttribute(
      'style',
      'height: calc(100vh - 114px); height: calc(100dvh - 114px)'
    );
  else
    hero.setAttribute(
      'style', 
      'height: calc(100vh - 225px); height: calc(100dvh - 225px)'
    );
  menu.style.top = '0';
  headerWrapper.style.top = '0';
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

const cookies = document.querySelector('.cookies');
const cookiesBtn = document.querySelector('.cookies__btn');
cookiesBtn.addEventListener('click', function() {
  cookies.style.display = 'none';
});

const products = document.querySelector('.products__inner');
const productsSwiper = new Swiper('.products__inner', {
  loop: true,
  slidesPerView: 4.5,
  spaceBetween: 60,
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 1.5
    },
    920: {
      slidesPerView: 2.5
    },
    1320: {
      slidesPerView: 3.5
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
    clickable: true
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    660: {
      spaceBetween: 50
    },
    768: {
      spaceBetween: 100
    },
    992: {
      spaceBetween: 230,
    }
  }
});

const recipesSwiper = new Swiper('.recipes__wrapper', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 39,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    }
  }
});

let isScrolledToSlider = {
  slider: false,
  products: false,
  recipes: false
}


const scrollBtn = document.querySelector('.scroll-down-btn');
scrollBtn.addEventListener('click', scrollIntoView);
headerWrapper.addEventListener('click', scrollIntoView);


const windowOffset = window.innerHeight / 2;
const images = document.querySelectorAll('.images-rotate__img');
const animatedElements = document.querySelectorAll('.animate__animated');
const blockHero = document.querySelector('.hero');
const title = document.querySelector('.hero__title');
const sectionsBgColor = [
  {
    section: '.hero',
    color: 'rgba(237, 123, 73, '
  },
  {
    section: '.slider',
    color: 'rgba(233, 168, 198, '
  },
  {
    section: '.store',
    color: 'rgba(245, 175, 185, '
  },
  {
    section: '.footer',
    color: 'rgba(190, 90, 75, '
  }
]

if (window.scrollY > headerWrapper.offsetHeight) {
  headerWrapper.style.top = '0';
  setHeaderBgColor();
}

window.addEventListener('scroll', function(){
  if (this.scrollY > headerWrapper.offsetHeight) {
    headerWrapper.style.top = '0';
    setHeaderBgColor();
  }
  else {
    headerWrapper.style.backgroundColor = 'transparent';
    if (isNotifyClosed)
      headerWrapper.style.top = '0';
    else
      headerWrapper.style.top = '46px';
  }


  for (let i = 0; i < images.length; i++)
    addClassOnScroll(images[i], 'images-rotate__img--show');

  setAnimationOnElements();

  const scrollY = this.scrollY;
  if (scrollY < blockHero.offsetHeight)
    title.style.marginTop = scrollY * 1.5 + 'px';

  // Behavior of sliders on scroll
  if (
    isScrolledDown(slider, false) && 
    !isScrolledToSlider.slider
  ) {
    sliderSwiper.slideNext();
    isScrolledToSlider.slider = true;
  }
  else if (
    isScrolledDown(recipes, false) && 
    !isScrolledToSlider.recipes
  ) {
    recipesSwiper.slideNext();
    isScrolledToSlider.recipes = true;
  }
  else if (
    isScrolledDown(products, false) && 
    !isScrolledToSlider.products
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
  langText.innerHTML = hash;

  for(let key in langArray) {
    const elems = document.querySelectorAll('.lng-' + key);
    const text = langArray[key][hash];
    if (elems.length === 0)
      continue;
  
    if (text === '') {
      for (let i = 0; i < elems.length; i++)
        elems[i].parentElement.removeChild(elems[i]);
      continue;
    }
    
    for (let i = 0; i < elems.length; i++)
      if(elems[i].tagName === 'IMG')
        elems[i].setAttribute('alt', text);
      else if(elems[i].tagName === 'INPUT')
        elems[i].setAttribute('placeholder', text)
      else
        elems[i].innerHTML = text;
  }
}

function changeMenuState() {
  menu.classList.toggle('header__menu--active');
  body.classList.toggle('locked');

  const links = document.querySelectorAll('.header__menu .menu__link')
  const btn = document.querySelector('.header__menu .header__btn');
  if (menu.classList.contains('header__menu--active')) {
    btn.removeAttribute('tabindex');
    for (let i = 0; i < links.length; i++)
      links[i].removeAttribute('tabindex');
  }
  else {
    btn.setAttribute('tabindex', '-1');
    for (let i = 0; i < links.length; i++)
      links[i].setAttribute('tabindex', '-1');
  }
}

function scrollIntoView(e){
  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (!href)
    return;

  menu.classList.remove('header__list--active');
  body.classList.remove('locked');

  const scrollTarget = document.getElementById(href.substring(1));
  if (!scrollTarget)
    return;

  const topOffset = 0;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;

  window.scrollBy({
      top: offsetPosition - headerWrapper.offsetHeight,
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
  if (!offset)
    offset = windowOffset;

  let scrollY = window.innerHeight - offset;
  let top = el.getBoundingClientRect().top;

  if (isUsingTransform) {
    scrollY = window.scrollY;
    top = el.offsetTop - offset;
  }

  return top < scrollY;
}

function setHeaderBgColor() {
  for (let i = 0; i < sectionsBgColor.length; i++) {
    let el = document.querySelector(sectionsBgColor[i].section);
    if (isScrolledDown(el, false)) {
      const bgColor = sectionsBgColor[i].color;
      menu.style.backgroundColor = bgColor + '1)';
      headerWrapper.style.backgroundColor = bgColor + '0.5)';
    }
  }
}

function setAnimationOnElements() {
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
}
