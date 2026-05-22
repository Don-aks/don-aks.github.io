'use strict';

import Swiper from 'swiper';
import Parallax from 'parallax-js';
import 'picturefill';

const FOCUSABLE_ELEMENTS_SELECTOR =
  '[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

const CLASSES = {
  hidden: 'hidden',
  overlay: 'overlay',
  locked: lockedClass,
  langLoading: langLoadingClass,
  preloaderAnimation: preloaderAnimationClass,

  menuActive: 'header__menu--active',
  menuBtn: 'header__btn',
  menuBtnActive: 'header__btn--active',
  menuLink: 'menu__link',

  notify: 'notify',
  notifyBtn: 'notify__close',
  notifyClosed: 'notify--closed',
};

let preloader = getEl('preloader');
let preloaderLogo = getEl('logo__img', preloader);

const header = getEl('header');
const headerLogo = getEl('logo__img', header);

const originalPageLang = document.documentElement.lang;
const lang = getEl('lang');
const langBtn = getEl('lang__btn', lang);
const langText = getEl('lang__text', lang);
const langMenu = getEl('lang__menu', lang);
const langLinks = getElements('lang__link', lang);

let previousLang = null;
const langDict = LANG_DICTIONARY;

initLanguage();
setKeyboardSupport(langMenu, langLinks);

langBtn.addEventListener('click', toggleLangMenu);

document.addEventListener('keydown', function (e) {
  const isEsc = e.keyCode === 27;
  if (!isEsc) return;

  closeAllPopups();
});

document.addEventListener('click', closePopupsIfOutside);

const headerWrapper = getEl('header__wrapper', header);
const notifyCloseBtn = getEl('notify__close');
const menu = getEl('header__menu', header);

notifyCloseBtn.addEventListener('click', handleNotifyClose);

const menuCloseBtn = getEl('header__btn', menu);
const menuBtn = getEl('header__btn', headerWrapper);
let removeFocusTrap;

menuCloseBtn.addEventListener('click', changeMenuState);
menuBtn.addEventListener('click', changeMenuState);
setKeyboardSupport(menu);

const cookies = getEl('cookies');
const cookiesBtn = getEl('cookies__btn', cookies);
cookiesBtn.addEventListener('click', hideCookies);

const slider = getEl('slider__wrapper');
const sliders = [
  {
    el: slider,
    swiper: new Swiper('.slider__wrapper', {
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
    }),
    isScrolledDown: false,
    isScrolledUp: true,
  },
  {
    el: getEl('recipes__wrapper'),
    swiper: new Swiper('.recipes__wrapper', {
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
    }),
    isScrolledDown: false,
    isScrolledUp: true,
  },
  {
    el: getEl('products__inner'),
    swiper: new Swiper('.products__inner', {
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
    }),
    isScrolledDown: false,
    isScrolledUp: true,
  },
];

const scrollBtn = getEl('scroll-down-btn');
scrollBtn.addEventListener('click', scrollIntoView);
headerWrapper.addEventListener('click', scrollIntoView);

let halfWindowHeight = window.innerHeight / 2;
let headerHeight = header.offsetHeight;
window.addEventListener('resize', throttle(function () {
  halfWindowHeight = window.innerHeight / 2;
  headerHeight = header.offsetHeight;
}, 200));

const images = getElements('images-rotate__img');
const animatedElements = getElements('animate__animated');
const hero = getEl('hero');
const title = getEl('hero__title', hero);
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
    const scrollY = window.scrollY;

    if (scrollY > headerWrapper.offsetHeight) {
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

    imageWrappers.forEach(function (wrapper) {
      addClassOnScroll(wrapper, 'images-rotate__wrapper--show');
    });

    setAnimationOnElements();

    if (scrollY < headerHeight) {
      title.style.marginTop = scrollY * 1.5 + 'px';
    }

    sliders.forEach(function (slider) {
      const isScrolled = isScrolledDown(slider.el, false);

      if (isScrolled && !slider.isScrolledDown && slider.isScrolledUp) {
        slider.swiper.slideNext();
        slider.isScrolledDown = true;
        slider.isScrolledUp = false;
      }

      if (!isScrolled && slider.isScrolledDown && !slider.isScrolledUp) {
        slider.swiper.slidePrev();
        slider.isScrolledDown = false;
        slider.isScrolledUp = true;
      }
    });
  }),
);

if (!isIE()) {
  initParallax();
}

// ====== FUNCTIONS ====== //

function initLanguage() {
  function isLang(lang) {
    return LANG_LIST.some(function (langItem) {
      return lang.indexOf(langItem) !== -1;
    });
  }

  function getLangFromHash() {
    const hash = location.hash.replace('#', '');
    return isLang(hash) ? hash : null;
  }

  function getLangFromStorage() {
    return localStorage.getItem('user-lang');
  }

  const saveLang = function saveLangToStorage(lang) {
    localStorage.setItem('user-lang', lang);
  };

  function getTargetTextAttribute(element) {
    if (element.tagName === 'IMG') {
      return 'alt';
    }

    if (element.tagName === 'INPUT') {
      return 'placeholder';
    }

    if (element.hasAttribute('aria-label')) {
      return 'aria-label';
    }

    return null;
  }

  function changeLanguage(lang) {
    if (typeof lang === 'string' && isLang(lang)) {
      // It's recursive call here and below
      // because we handle hash change in the same function
      setHash(lang);
      return;
    }

    const currentLang = getLangFromHash();

    if (previousLang === null && currentLang === null) {
      const storedLang = getLangFromStorage();
      if (isLang(storedLang)) {
        setHash(storedLang);
        return;
      }

      const browserLang = navigator.language || navigator.userLanguage;
      if (isLang(browserLang)) {
        setHash(browserLang);
        return;
      }
    }

    if (currentLang === null) {
      return;
    }

    if (currentLang === originalPageLang && previousLang === null) {
      setHash(originalPageLang);
      return;
    }

    updateLanguageUI(currentLang);

    Object.keys(langDict).forEach(function (key) {
      const elems = document.querySelectorAll('.lng-' + key);
      if (elems.length === 0) {
        return;
      }

      let rawText = langDict[key][currentLang];

      let safeHtml = escapeHTML(rawText).replace(/\n/g, '<br>');
      if (currentLang === originalPageLang) {
        safeHtml = rawText;
      }

      elems.forEach(function (el) {
        if (rawText === '') {
          el.classList.add(CLASSES.hidden);
          return;
        }

        if (el.classList.contains(CLASSES.hidden)) {
          el.classList.remove(CLASSES.hidden);
        }

        const attr = getTargetTextAttribute(el);
        if (attr) {
          el.setAttribute(attr, rawText);
          return;
        }

        el.innerHTML = safeHtml;
      });
    });

    previousLang = currentLang;
    saveLang(currentLang);
  }

  Object.keys(langDict).forEach(function (key) {
    const elem = getEl('lng-' + key);
    if (!elem) return;

    const attr = getTargetTextAttribute(elem);
    if (attr) {
      langDict[key][originalPageLang] = elem.getAttribute(attr);
      return;
    }

    langDict[key][originalPageLang] = elem.innerHTML;
  });

  changeLanguage();

  document.documentElement.classList.remove(CLASSES.langLoading);
  document.documentElement.classList.remove(CLASSES.locked);

  document.body.removeAttribute('aria-busy');

  window.addEventListener('hashchange', changeLanguage);

  setTimeout(function () {
    transitionPreloaderLogoToHeader();
    removePreloaderWhenReady();
  }, 0);
}

function handleNotifyClose(e) {
  const notify = getClosest(e.currentTarget, '.' + CLASSES.notify);

  if (!notify) {
    console.error('No notify found for', e.currentTarget);
    return;
  }

  header.focus();
  notify.classList.add(CLASSES.notifyClosed);
}

function changeMenuState() {
  const willBeActive = menu.classList.toggle('header__menu--active');
  document.documentElement.classList.toggle(CLASSES.locked, willBeActive);
  document.body.classList.toggle(CLASSES.overlay, willBeActive);

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

function toggleLangMenu(forceState) {
  let state = forceState;

  if (forceState === undefined) {
    state = !langMenu.classList.contains('lang__menu--active');
  }

  const isOpen = langMenu.classList.toggle('lang__menu--active', state);

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
}

function closeAllPopups() {
  if (menu.classList.contains('header__menu--active')) {
    changeMenuState(false);
  }

  if (langMenu.classList.contains('lang__menu--active')) {
    toggleLangMenu(false);
  }
}

function closePopupsIfOutside(e) {
  const isInsideMenu = getClosest(e.target, '.header__menu');
  const isInsideLangMenu = getClosest(e.target, '.lang__menu');
  const isLangBtn = getClosest(e.target, '.lang__btn');
  const isMenuBtn = getClosest(e.target, '.header__btn');

  const notMenus = !isInsideMenu && !isInsideLangMenu;
  const notBtns = !isLangBtn && !isMenuBtn;

  if (notMenus && notBtns) {
    closeAllPopups();
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
  const effectiveOffset = offset == null ? halfWindowHeight : offset;
  const isScrolled = isScrolledDown(el, isUsingTransform, effectiveOffset);

  isScrolled ? el.classList.add(className) : el.classList.remove(className);

  if (isScrolled) {
    classOutOfVisibility ? el.classList.remove(classOutOfVisibility) : null;
  } else {
    classOutOfVisibility ? el.classList.add(classOutOfVisibility) : null;
  }
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
  animatedElements.forEach(function (el) {
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
      halfWindowHeight,
      classOutOfVisibility ? 'animate__' + classOutOfVisibility : null,
    );
  });
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

    document.documentElement.classList.remove(CLASSES.preloaderAnimation);

    document.body.removeChild(preloader);

    preloader = null;
    preloaderLogo = null;
  }

  preloaderLogo.addEventListener('transitionend', onTransitionEnd);
}

function initParallax() {
  const scenes = getElements('image-scene');
  if (window.innerWidth > 1200) return;

  scenes.forEach(function (scene) {
    toArray(scene.children).forEach(function (sceneChild) {
      sceneChild.setAttribute('data-depth', '0.1');
    });
  });
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

function getEl(className, parent = document) {
  return parent.querySelector('.' + className);
}

function getElements(className, parent = document) {
  return toArray(parent.querySelectorAll('.' + className));
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

function isScrolledDown(el, isUsingTransform, offset) {
  const effectiveOffset = offset == null ? halfWindowHeight : offset;

  let scrollY = window.innerHeight - effectiveOffset;
  let top = el.getBoundingClientRect().top;

  if (isUsingTransform) {
    scrollY = window.scrollY;
    top = el.offsetTop - effectiveOffset;
  }

  return top < scrollY;
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

function setHash(hash) {
  location.hash = '#' + hash;
}

function updateLanguageUI(lang) {
  document.documentElement.lang = lang;
  langText.textContent = lang;
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
