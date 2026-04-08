'use strict';

var HIDE_MENU_BREAKPOINT = 1200;
var FOCUSABLE_SELECTORS = 'a[href], button, [tabindex="0"]';
var HIDDEN_CELLS =
  '.header__cell-phone, .header__cell-salons, .header__cell-social';

var $window = $(window);
var $header;
var $body = $(document.body);

var $btnMenuLine;
var $headerList;
var $menuFocusableElements;
var $hiddenCells;
var $hiddenCellsFocusableElements;

$(function () {
  $('.skip-to-content').on('click', function () {
    $('#main').trigger('focus');
  });

  $header = $('.header__top');
  $window.on('scroll', throttle(handleScroll, 150));

  $('.btn--visually-impaired').on('click', function () {
    var isActive = $body.hasClass('visually-impaired');
    $body.toggleClass('visually-impaired', !isActive);
  });

  var $headerBtnMenu = $('.header__btn-menu');
  $btnMenuLine = $headerBtnMenu.find('.btn-menu__line');

  $headerList = $('.header__list');
  $menuFocusableElements = $headerList.find(FOCUSABLE_SELECTORS);

  var $hiddenCells = $header.find(HIDDEN_CELLS);
  $hiddenCellsFocusableElements = $hiddenCells.find(FOCUSABLE_SELECTORS);

  if ($window.outerWidth() <= HIDE_MENU_BREAKPOINT) {
    setTabIndex($menuFocusableElements, '-1');
    setTabIndex($hiddenCellsFocusableElements, '-1');
  }

  $headerBtnMenu.on('click', handleBtnMenuClick);
  $window.on('resize', debounce(handleResize, 150));
  $body.on('click', handleSalonsClick);

  pulse($('.header__btn-booking'));

  $('.modal__form').on('submit', function (event) {
    event.preventDefault();

    $.fancybox.close();
    $.fancybox.open({
      src: '#modal-thanks',
      type: 'inline',
    });
  });

  $('.hero__slider').slick({
    responsive: [
      {
        breakpoint: 1331,
        settings: {
          arrows: false,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 5000,

    prevArrow:
      '<button class="slick-prev" aria-label="Попередній слайд" type="button">←</button>',
    nextArrow:
      '<button class="slick-next" aria-label="Наступний слайд" type="button">→</button>',
  });

  var $heroSliderWrap = $('.hero__slider-wrap');
  $heroSliderWrap.on('mousedown', function (e) {
    $heroSliderWrap.css('cursor', 'grabbing');
  });

  $heroSliderWrap.on('mouseup', function (e) {
    $heroSliderWrap.css('cursor', '');
  });

  var $tabs = $('.tabs__tab');
  var $tabsBtns = $tabs.find('.tabs__btn');

  $tabsBtns.on('click', { $tabs: $tabs, $tabsBtns: $tabsBtns }, toggleTab);
});

// FUNCTIONS

function handleScroll() {
  if ($window.scrollTop() > 0) {
    $header.addClass('header__top--scrolled');
    return;
  }

  $header.removeClass('header__top--scrolled');
}

function handleBtnMenuClick() {
  var isActive = $headerList.hasClass('header__list--active');

  $btnMenuLine.toggleClass('btn-menu__line--active', !isActive);
  $headerList.toggleClass('header__list--active', !isActive);
  $body.toggleClass('locked', !isActive);

  setTabIndex($menuFocusableElements, !isActive ? '0' : '-1');
  setTabIndex($hiddenCellsFocusableElements, !isActive ? '0' : '-1');
}

function handleResize() {
  if ($window.outerWidth() > HIDE_MENU_BREAKPOINT) {
    setTabIndex($menuFocusableElements, '0');
    setTabIndex($hiddenCellsFocusableElements, '0');
    return;
  }

  setTabIndex($menuFocusableElements, '-1');
  setTabIndex($hiddenCellsFocusableElements, '-1');
}

function handleSalonsClick(e) {
  var $salonsSubmenu = $('.salons__submenu');

  var className = 'salons__submenu--hidden';
  var $target = $(e.target);

  var isToggleBtn = $target.closest('.salons').length;
  var isSubmenu = $target.closest('.salons__submenu').length;

  if (isToggleBtn && $salonsSubmenu.hasClass(className)) {
    showSalonsSubmenu();
    return;
  }

  if (isToggleBtn && !$salonsSubmenu.hasClass(className)) {
    hideSalonsSubmenu();
    return;
  }

  if (!isSubmenu) {
    hideSalonsSubmenu();
    return;
  }
}

function showSalonsSubmenu() {
  var className = 'salons__submenu--hidden';
  var $salonsSubmenu = $('.salons__submenu');
  var $salonsLinks = $('.salons__link');

  $salonsSubmenu.removeClass(className);
  setTabIndex($salonsLinks, '0');
}

function hideSalonsSubmenu() {
  var className = 'salons__submenu--hidden';
  var $salonsSubmenu = $('.salons__submenu');
  var $salonsLinks = $('.salons__link');

  $salonsSubmenu.addClass(className);
  setTabIndex($salonsLinks, '-1');
}

function pulse($element, delay = 5000) {
  $element.css('transform', 'scale(1.05)');

  setTimeout(function () {
    $element.css('transform', 'scale(1)');
    setTimeout(function () {
      pulse($element, delay);
    }, delay);
  }, 500);
}

function toggleTab(event) {
  var $container = $(this).closest('.tabs__tab');
  var $tabs = event.data.$tabs;
  var className = 'tabs__tab--active';

  $tabs.removeClass(className);
  $container.addClass(className);

  var $tabsBtns = $tabs.find('.tabs__btn');
  setTabIndex($tabsBtns, '0');

  var $btn = $container.find('.tabs__btn');
  setTabIndex($btn, '-1');

  $btn.blur();

  var selector = '.news__item';
  className = 'news__item--active';

  var contentSelector = selector + '[data-tab=' + $container.data('tab') + ']';
  $(selector).removeClass(className);
  $(contentSelector).addClass(className);
}

// UTILS

function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

function throttle(func, limit) {
  var inThrottle;

  return function () {
    var context = this;
    var args = arguments;

    if (!inThrottle) {
      func.apply(context, args);

      inThrottle = true;

      setTimeout(function () {
        inThrottle = false;
      }, limit);
    }
  };
}

function setTabIndex($elements, value) {
  $elements.each(function () {
    if ($(this).attr('tabindex') === value) return;
    $(this).attr('tabindex', value);
  });
}
