'use strict';

import Swiper from 'swiper';
import Parallax from 'parallax-js';
import 'picturefill';

const FOCUSABLE_ELEMENTS_SELECTOR =
  '[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

const CLASSES = {
  menuActive: 'header__menu--active',
  menuBtn: 'header__btn',
  menuBtnActive: 'header__btn--active',
  menuLink: 'menu__link',

  notify: 'notify',
  notifyBtn: 'notify__close',
  notifyClosed: 'notify--closed',
};

let preloader = getEl('preloader');
let preloaderLogo = getEl('preloader__image');
const headerLogo = getEl('logo__img');

const langBtn = getEl('lang');
const langText = getEl('lang__text');
const langMenu = getEl('lang__menu');
const langLinks = getElements('lang__link');
initLanguage();
setKeyboardSupport(langMenu, langLinks);

langBtn.addEventListener('click', function () {
  const isOpen = langMenu.classList.toggle('lang__menu--active');

  langLinks.forEach(function (link) {
    link.setAttribute('tabindex', isOpen ? '0' : '-1');
  });
  langMenu.setAttribute('aria-hidden', String(!isOpen));
  langBtn.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    function onTransitionEnd() {
      langMenu.removeEventListener('transitionend', onTransitionEnd);
      langLinks[0].focus();
    }

    langMenu.addEventListener('transitionend', onTransitionEnd);
    return;
  }

  langBtn.focus();
});

langMenu.addEventListener('click', function (e) {
  const langHref = e.target.getAttribute('href');
  if (!langHref) return;
  e.preventDefault();

  location.href = window.location.pathname + langHref;
  location.reload();
});

const headerWrapper = getEl('header__wrapper');
const notifyCloseBtn = getEl(CLASSES.notifyBtn);
const header = getEl('header');
const menu = getEl('header__menu');
const hero = getEl('hero');

notifyCloseBtn.addEventListener('click', function () {
  const notify = getClosest(e.currentTarget, '.' + CLASSES.notify);

  if (!notify) {
    console.error('No notify found for', e.currentTarget);
    return;
  }

  notify.classList.add(CLASSES.notifyClosed);
});

const menuBtns = getElements('header__btn');
const body = document.querySelector('body');
let removeFocusTrap;

for (let i = 0; i < menuBtns.length; i++) {
  menuBtns[i].addEventListener('click', changeMenuState);
}
body.addEventListener('click', bodyClickHandler);

const cookies = getEl('cookies');
const cookiesBtn = getEl('cookies__btn');
cookiesBtn.addEventListener('click', hideCookies);

const products = getEl('products__inner');
const productsSwiper = new Swiper('.products__inner', {
  slidesPerView: 4.5,
  spaceBetween: 60,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1.5,
    },
    920: {
      slidesPerView: 2.5,
    },
    1320: {
      slidesPerView: 3.5,
    },
  },
});

const slider = getEl('slider__wrapper');
const sliderSwiper = new Swiper('.slider__wrapper', {
  loop: true,
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 230,
  pagination: {
    el: '.slider__pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    660: {
      spaceBetween: 50,
    },
    768: {
      spaceBetween: 100,
    },
    992: {
      spaceBetween: 230,
    },
  },
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
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

let isScrolledToSlider = {
  slider: false,
  products: false,
  recipes: false,
};

const scrollBtn = getEl('scroll-down-btn');
scrollBtn.addEventListener('click', scrollIntoView);
headerWrapper.addEventListener('click', scrollIntoView);

const windowOffset = window.innerHeight / 2;
const images = getElements('images-rotate__img');
const animatedElements = getElements('animate__animated');
const blockHero = getEl('hero');
const title = getEl('hero__title');
const sectionsBgColor = [
  {
    section: '.hero',
    color: 'rgba(237, 123, 73, ',
  },
  {
    section: '.slider',
    color: 'rgba(233, 168, 198, ',
  },
  {
    section: '.store',
    color: 'rgba(245, 175, 185, ',
  },
  {
    section: '.footer',
    color: 'rgba(190, 90, 75, ',
  },
];

if (window.scrollY > headerWrapper.offsetHeight) {
  headerWrapper.style.top = '0';
  setHeaderBgColor();
}

window.addEventListener(
  'scroll',
  throttle(function () {
    if (this.scrollY > headerWrapper.offsetHeight) {
      headerWrapper.style.top = '0';
      setHeaderBgColor();
    } else {
      header.style.color = '';
      headerWrapper.style.backgroundColor = '';
      if (isNotifyClosed) {
        headerWrapper.style.top = '0';
      } else {
        headerWrapper.style.top = '46px';
      }
    }

    for (let i = 0; i < images.length; i++) {
      addClassOnScroll(images[i], 'images-rotate__img--show');
    }

    setAnimationOnElements();

    const scrollY = this.scrollY;
    if (scrollY < blockHero.offsetHeight)
      title.style.marginTop = scrollY * 1.5 + 'px';

    // Behavior of sliders on scroll
    if (isScrolledDown(slider, false) && !isScrolledToSlider.slider) {
      sliderSwiper.slideNext();
      isScrolledToSlider.slider = true;
    } else if (isScrolledDown(recipes, false) && !isScrolledToSlider.recipes) {
      recipesSwiper.slideNext();
      isScrolledToSlider.recipes = true;
    } else if (
      isScrolledDown(products, false) &&
      !isScrolledToSlider.products
    ) {
      productsSwiper.slideNext();
      isScrolledToSlider.products = true;
    }
  }),
);

if (!isIE()) {
  initParallax();
}

// ====== FUNCTIONS ====== //

function initLanguage() {
  function changeLanguage() {
    let hash = window.location.hash.substring(1);
    let hasLang = LANG_LIST.some(function (lang) {
      return hash.indexOf(lang) !== -1;
    });

    if (!hasLang) {
      location.href = window.location.pathname + '#en';
      hash = 'en';
      return;
    }

    if (hash == 'en') {
      return;
    }

    document.documentElement.lang = hash;
    langText.innerHTML = hash;

    Object.keys(LANG_DICTIONARY).forEach(function (key) {
      const elems = document.querySelectorAll('.lng-' + key);
      if (elems.length === 0) {
        return;
      }

      const rawText = LANG_DICTIONARY[key][hash] || '';

      if (rawText === '') {
        elems.forEach(function (el) {
          el.parentElement.removeChild(el);
        });
        return;
      }

      elems.forEach(function (el) {
        if (el.hasAttribute('aria-label')) {
          el.setAttribute('aria-label', rawText);
          return;
        }

        if (el.tagName === 'IMG') {
          el.setAttribute('alt', rawText);
          return;
        }

        if (el.tagName === 'INPUT') {
          el.setAttribute('placeholder', rawText);
          return;
        }

        const safeHtml = escapeHTML(rawText).replace(/\n/g, '<br>');
        el.innerHTML = safeHtml;
      });
    });
  }

  changeLanguage();
  document.documentElement.classList.remove(langLoadingClass);
  document.documentElement.classList.remove(lockedClass);
  document.body.removeAttribute('aria-busy');

  setTimeout(function () {
    transitionPreloaderLogoToHeader();
    removePreloaderWhenReady();
  }, 0);
}

function changeMenuState() {
  const willBeActive = menu.classList.toggle('header__menu--active');
  document.documentElement.classList.toggle(lockedClass, willBeActive);

  const links = document.querySelectorAll('.header__menu .menu__link');

  const tabIndex = !isActive ? '0' : '-1';

  menuCloseBtn.setAttribute('tabindex', tabIndex);
  for (let i = 0; i < links.length; i++) {
    links[i].setAttribute('tabindex', tabIndex);
  }

  menu.setAttribute('aria-hidden', String(isActive));

  if (!isActive) {
    removeFocusTrap = setFocusTrap(menu);
  } else if (removeFocusTrap) {
    removeFocusTrap();
  }
}

function hideCookies() {
  // TODO: add animation
  scrollBtn.focus();
  cookies.style.display = 'none';
}

function scrollIntoView(e) {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (!href) return;

  menu.classList.remove('header__list--active');
  body.classList.remove('locked');

  const scrollTarget = document.getElementById(href.substring(1));
  if (!scrollTarget) return;

  const topOffset = 0;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;

  window.scrollBy({
    top: offsetPosition - headerWrapper.offsetHeight,
    behavior: 'smooth',
  });
}

function addClassOnScroll(
  el,
  className,
  isUsingTransform,
  offset,
  classOutOfVisibility,
) {
  if (!offset) offset = windowOffset;

  const isScrolled = isScrolledDown(el, isUsingTransform, offset);

  isScrolled ? el.classList.add(className) : el.classList.remove(className);

  if (isScrolled) {
    classOutOfVisibility ? el.classList.remove(classOutOfVisibility) : null;
  } else {
    classOutOfVisibility ? el.classList.add(classOutOfVisibility) : null;
  }
}

function isScrolledDown(el, isUsingTransform, offset) {
  const effectiveOffset = offset == null ? windowOffset : offset;

  let scrollY = window.innerHeight - effectiveOffset;
  let top = el.getBoundingClientRect().top;

  if (isUsingTransform) {
    scrollY = window.scrollY;
    top = el.offsetTop - effectiveOffset;
  }

  return top < scrollY;
}

function setHeaderBgColor() {
  for (let i = 0; i < sectionsBgColor.length; i++) {
    let el = document.querySelector(sectionsBgColor[i].section);

    if (isScrolledDown(el, false)) {
      const bgColor = sectionsBgColor[i].color;
      menu.style.backgroundColor = bgColor + '1)';
      header.style.color = bgColor + '0.5)';
    }
  }
}

function setAnimationOnElements() {
  for (let i = 0; i < animatedElements.length; i++) {
    const el = animatedElements[i];
    const classes = el.classList;
    let className, classOutOfVisibility;

    for (let i = 0; i < classes.length; i++)
      if (classes[i].indexOf('anim--') == 0) {
        className = classes[i].slice(6, classes[i].length);
      }

    if (className && className.indexOf('In') !== -1) {
      classOutOfVisibility = className.replace('In', 'Out');
    }

    addClassOnScroll(
      el,
      'animate__' + className,
      true,
      windowOffset,
      classOutOfVisibility ? 'animate__' + classOutOfVisibility : null,
    );
  }
}

function transitionPreloaderLogoToHeader() {
  if (!preloaderLogo || !headerLogo) {
    return;
  }

  const from = preloaderLogo.getBoundingClientRect();
  const to = headerLogo.getBoundingClientRect();

  const dx = to.left - from.left;
  const dy = to.top - from.top;

  preloaderLogo.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
}

function removePreloaderWhenReady() {
  if (!preloader || !preloaderLogo || !headerLogo) {
    return;
  }

  function onTransitionEnd() {
    preloaderLogo.removeEventListener('transitionend', onTransitionEnd);

    document.body.removeChild(preloader);

    preloader = null;
    preloaderLogo = null;
  }

  preloaderLogo.addEventListener('transitionend', onTransitionEnd);
}

function initParallax() {
  const scenes = document.querySelectorAll('.image-scene');
  if (window.innerWidth > 1200) return;

  for (let i = 0; i < scenes.length; i++) {
    for (let j = 0; j < scenes[i].children.length; j++) {
      scenes[i].children[j].setAttribute('data-depth', '0.1');
    }
  }
}

// ====== UTILS ====== //

function throttle(func, wait) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

function toArray(list) {
  return Array.prototype.slice.call(list);
}

var matchesSelector =
  Element.prototype.matches ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.webkitMatchesSelector;

function getClosest(element, selector) {
  while (element && element.nodeType === 1) {
    if (matchesSelector.call(element, selector)) {
      return element;
    }

    element = element.parentNode;
  }

  return null;
}

function getEl(className) {
  return document.querySelector('.' + className);
}

function getElements(className) {
  return toArray(document.querySelectorAll('.' + className));
}

function escapeHTML(str) {
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}

function isIE() {
  const ua = window.navigator.userAgent;

  // IE 10 or older
  const msie = ua.indexOf('MSIE ');

  // IE 11
  const trident = ua.indexOf('Trident/');

  return msie > -1 || trident > -1;
}

function setKeyboardSupport(container, focusableElements) {
  var focusable = focusableElements || getFocusable(container);

  function handleKeydown(e) {
    var key = e.keyCode;
    var current = focusable.indexOf(document.activeElement);
    var len = focusable.length;
    var next;

    switch (key) {
      case 40: // ArrowDown
      case 38: // ArrowUp
        var step = key === 40 ? 1 : -1;
        next = (current + step + len) % len;
        break;

      case 36: // Home
        next = 0;
        break;

      case 35: // End
        next = len - 1;
        break;

      // If it's not one of the handled keys
      default:
        return;
    }

    if (next !== undefined && focusable[next]) {
      e.preventDefault();
      focusable[next].focus();
    }
  }

  container.addEventListener('keydown', handleKeydown);
}

function setHeroHeight(style) {
  hero.setAttribute('style', 'height: ' + style);
}

function getFocusable(container) {
  return toArray(container.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR));
}

function setFocusTrap(container) {
  const focusableElements = getFocusable(container);

  function handleFocusIn(event) {
    if (!container.contains(event.target)) {
      focusableElements[0].focus();
      event.preventDefault();
    }
  }

  function handleKeyDown(event) {
    const isTabPressed = event.keyCode === 9;
    if (!isTabPressed) return;

    const focusable = focusableElements.filter(function (el) {
      return el.getAttribute('tabindex') !== '-1' && !el.disabled;
    });

    if (focusable.length === 0) return;

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }

      return;
    }

    if (document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }

  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('keydown', handleKeyDown);

  return function () {
    document.removeEventListener('focusin', handleFocusIn);
    document.removeEventListener('keydown', handleKeyDown);
  };
}
