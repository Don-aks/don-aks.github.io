const langBtn = document.querySelector('.lang');
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

const closeBtn = document.querySelector('.notify__close');
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
closeBtn.addEventListener('click', function(){
  this.parentElement.style.display = 'none';
  header.style.height = '100vh';
  hero.style.height = 'calc(100vh - 192px)';
});

const scrollBtn = document.querySelector('.scroll-down-btn');
scrollBtn.addEventListener('click', scrollIntoView);
const headerWrapper = document.querySelector('.header__wrapper');
headerWrapper.addEventListener('click', scrollIntoView);

const images = document.querySelectorAll('.images-rotate__img');
const animatedElements = document.querySelectorAll('.animate__animated');
const blockHero = document.querySelector('.hero');
const title = document.querySelector('.hero__title');
window.addEventListener('scroll', function(){
  for (let i = 0; i < images.length; i++)
    addClassOnScroll(images[i], 'images-rotate__img--show', true);

  for (let i = 0; i < animatedElements.length; i++) {
    const el = animatedElements[i];
    const classes = el.classList;
    let className, classOutOfVisibility;

    for (let i = 0; i < classes.length; i++)
      if(classes[i].indexOf('anim--') == 0)
        className = classes[i].slice(6, classes[i].length);

    if (className && className.indexOf('In') !== -1)
      classOutOfVisibility = className.replace('In', 'Out');

    addClassOnScroll(el, 'animate__' + className, false, 550, classOutOfVisibility ? ('animate__' + classOutOfVisibility) : null);
  }

  const scrollY = this.scrollY;
  if (scrollY < blockHero.offsetHeight)
    title.style.marginTop = scrollY * 1.5 + 'px';
});

// Parralax is not for IE
if (!(/*@cc_on!@*/false || !!document.documentMode) && window.innerWidth > 992) {
  const scenes = document.querySelectorAll('.image-scene');
  for (let i = 0; i < scenes.length; i++)
    new Parallax(scenes[i]);

  if (window.innerWidth <= 1200)
    for (let i = 0; i < scenes.length; i++)
      for (let j = 0; j < scenes[i].children.length; j++)
        scenes[i].children[j].setAttribute('data-depth', '0.1');
}

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

function addClassOnScroll(el, className, isImages, offset, classOutOfVisibility) {
  if (!offset)
    offset = 550;
  let scrollY = window.scrollY;
  let top = el.offsetTop - offset;
  
  if (isImages) {
    scrollY = window.innerHeight - offset;
    top = el.getBoundingClientRect().top;
  }

  if (top < scrollY) {
    el.classList.add(className);
    if (classOutOfVisibility)
      el.classList.remove(classOutOfVisibility);
  } else {
    el.classList.remove(className);
    if (classOutOfVisibility)
      el.classList.add(classOutOfVisibility);
  }
}
