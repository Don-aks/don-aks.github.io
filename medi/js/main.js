'use strict';

var FOCUSABLE_SELECTORS = 'a[href], button, [tabindex="0"]';

$(function () {
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

  $(window).on('scroll', function () {
    var $header = $('.header__top');

    if ($(this).scrollTop() > 0) {
      $header.addClass('header__top--scrolled');
      return;
    }

    $header.removeClass('header__top--scrolled');
  });

  const $headerBtnMenu = $('.header__btn-menu');
  const $btnMenuLine = $headerBtnMenu.find('.btn-menu__line');
  const $btnMenuCell = $headerBtnMenu.closest('.header__btn-cell');

  const $headerList = $('.header__list');
  const $menuFocusableElements = $headerList.find(FOCUSABLE_SELECTORS);

  if ($btnMenuCell.css('display') !== 'none') {
    setTabIndex($menuFocusableElements, '-1');
  }

  $headerBtnMenu.on('click', function () {
    const isActive = $headerList.hasClass('header__list--active');

    $btnMenuLine.toggleClass('btn-menu__line--active', !isActive);
    $headerList.toggleClass('header__list--active', !isActive);
    $(document.body).toggleClass('locked', !isActive);

    setTabIndex($menuFocusableElements, !isActive ? '0' : '-1');
  });

  $(window).on(
    'resize',
    debounce(function () {
      console.log($(this).width());

      if ($(this).width() <= 1200) {
        setTabIndex($menuFocusableElements, '0');
        return;
      }

      setTabIndex($menuFocusableElements, '-1');
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
