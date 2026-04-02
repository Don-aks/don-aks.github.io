'use strict';

var HIDE_MENU_BREAKPOINT = 1200;
var FOCUSABLE_SELECTORS = 'a[href], button, [tabindex="0"]';
var HIDDEN_CELLS =
  '.header__cell-phone, .header__cell-salons, .header__cell-social';

$(function () {
  var $window = $(window);

  $('.skip-to-content').on('click', function () {
    $('#main').focus();
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

  var $header = $('.header__top');

  $window.on('scroll', function () {
    if ($window.scrollTop() > 0) {
      $header.addClass('header__top--scrolled');
      return;
    }

    $header.removeClass('header__top--scrolled');
  });

  var $headerBtnMenu = $('.header__btn-menu');
  var $btnMenuLine = $headerBtnMenu.find('.btn-menu__line');

  var $headerList = $('.header__list');
  var $menuFocusableElements = $headerList.find(FOCUSABLE_SELECTORS);
  var $hiddenCells = $header.find(HIDDEN_CELLS);
  var $hiddenCellsFocusableElements = $hiddenCells.find(FOCUSABLE_SELECTORS);

  if ($window.width() > HIDE_MENU_BREAKPOINT) {
    setTabIndex($menuFocusableElements, '-1');
    setTabIndex($hiddenCellsFocusableElements, '-1');
  }

  $headerBtnMenu.on('click', function () {
    var isActive = $headerList.hasClass('header__list--active');

    $btnMenuLine.toggleClass('btn-menu__line--active', !isActive);
    $headerList.toggleClass('header__list--active', !isActive);
    $(document.body).toggleClass('locked', !isActive);

    setTabIndex($menuFocusableElements, !isActive ? '0' : '-1');
    setTabIndex($hiddenCellsFocusableElements, !isActive ? '0' : '-1');
  });

  $window.on(
    'resize',
    debounce(function () {
      if ($window.width() > HIDE_MENU_BREAKPOINT) {
        setTabIndex($menuFocusableElements, '0');
        setTabIndex($hiddenCellsFocusableElements, '0');
        return;
      }

      setTabIndex($menuFocusableElements, '-1');
      setTabIndex($hiddenCellsFocusableElements, '-1');
    }, 150),
  );

  var $salonsSubmenu = $('.salons__submenu');

  $(document.body).on('click', function (e) {
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
  });

  var $tabs = $('.tabs__tab');
  $tabs.on('click', function () {
    var className = 'tabs__tab--active';
    $tabs.removeClass(className);
    $(this).addClass(className);

    var selector = '.news__item';
    className = 'news__item--active';

    var contentSelector = selector + '[data-tab=' + $(this).data('tab') + ']';
    $(selector).removeClass(className);
    $(contentSelector).addClass(className);
  });
});

// FUNCTIONS

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

function setTabIndex($elements, value) {
  $elements.each(function () {
    if ($(this).attr('tabindex') === value) return;
    $(this).attr('tabindex', value);
  });
}
