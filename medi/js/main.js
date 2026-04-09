'use strict';

var HIDE_MENU_BREAKPOINT = 1200;
var FOCUSABLE_SELECTORS = 'a[href], button, [tabindex="0"]';
var HIDDEN_CELLS =
  '.header__cell-phone, .header__cell-salons, .header__cell-social';

var $window = $(window);
var $body = $(document.body);

var $header = $('.header__top');
var $headerBtnMenu = $header.find('.header__btn-menu');
var $tabs = $('.tabs__tab');

var UI = {
  $skipToContent: $('.skip-to-content'),
  $content: $('#main'),

  $highContrastBtn: $('.btn--visually-impaired'),

  $header: $header,
  $headerList: $header.find('.header__list'),

  $headerBtnMenu: $headerBtnMenu,
  $btnMenuLine: $headerBtnMenu.find('.btn-menu__line'),
  $hiddenCells: $header.find(HIDDEN_CELLS),

  $btnBooking: $('.header__btn-booking'),

  $salonsSubmenu: $('.salons__submenu'),
  $salonsLinks: $('.salons__link'),
  salonsHideClass: 'salons__submenu--hidden',

  $heroSlider: $('.hero__slider'),
  sliderBtnPrevHTML:
    '<button class="slick-prev" aria-label="Попередній слайд" type="button">←</button>',
  sliderBtnNextHTML:
    '<button class="slick-next" aria-label="Наступний слайд" type="button">→</button>',

  $tabs: $tabs,
  $tabsBtns: $tabs.find('.tabs__btn'),

  $modalForm: $('.modal__form'),
  modalThanksSelector: '#modal-thanks',
};

UI.$skipToContent.on('click', function () {
  UI.$content.trigger('focus');
});

$window.on('scroll', throttle(handleScroll, 150));

UI.$highContrastBtn.on('click', function () {
  var isActive = $body.hasClass('visually-impaired');
  $body.toggleClass('visually-impaired', !isActive);
});

if ($window.outerWidth() <= HIDE_MENU_BREAKPOINT) {
  setTabIndex(getFocusable(UI.$headerList), '-1');
  setTabIndex(getFocusable(UI.$hiddenCells), '-1');
}

UI.$headerBtnMenu.on('click', handleBtnMenuClick);
$window.on('resize', debounce(handleResize, 150));
$body.on('click', handleSalonsClick);

pulse(UI.$btnBooking);

UI.$modalForm.on('submit', function (event) {
  event.preventDefault();

  $.fancybox.close();
  $.fancybox.open({
    src: UI.modalThanksSelector,
    type: 'inline',
  });
});

UI.$heroSlider.slick({
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

  prevArrow: UI.sliderBtnPrevHTML,
  nextArrow: UI.sliderBtnNextHTML,
});

UI.$heroSlider.on('mousedown', function (e) {
  UI.$heroSlider.css('cursor', 'grabbing');
});

UI.$heroSlider.on('mouseup', function (e) {
  UI.$heroSlider.css('cursor', '');
});

UI.$tabsBtns.on(
  'click',
  { $tabs: UI.$tabs, $tabsBtns: UI.$tabsBtns },
  toggleTab,
);

// FUNCTIONS

function handleScroll() {
  if ($window.scrollTop() > 0) {
    UI.$header.addClass('header__top--scrolled');
    return;
  }

  UI.$header.removeClass('header__top--scrolled');
}

function handleBtnMenuClick() {
  var isActive = UI.$headerList.hasClass('header__list--active');

  UI.$btnMenuLine.toggleClass('btn-menu__line--active', !isActive);
  UI.$headerList.toggleClass('header__list--active', !isActive);
  $body.toggleClass('locked', !isActive);

  setTabIndex(getFocusable(UI.$headerList), !isActive ? '0' : '-1');
  setTabIndex(getFocusable(UI.$hiddenCells), !isActive ? '0' : '-1');
}

function handleResize() {
  var $headerListFocusableElements = getFocusable(UI.$headerList);
  var $hiddenCellsFocusableElements = getFocusable(UI.$hiddenCells);

  if ($window.outerWidth() > HIDE_MENU_BREAKPOINT) {
    setTabIndex($headerListFocusableElements, '0');
    setTabIndex($hiddenCellsFocusableElements, '0');
    return;
  }

  setTabIndex($headerListFocusableElements, '-1');
  setTabIndex($hiddenCellsFocusableElements, '-1');
}

function handleSalonsClick(e) {
  var className = '';
  var $target = $(e.target);

  var isToggleBtn = $target.closest('.salons').length;
  var isSubmenu = $target.closest('.salons__submenu').length;

  if (isToggleBtn && UI.$salonsSubmenu.hasClass(UI.salonsHideClass)) {
    showSalonsSubmenu();
    return;
  }

  if (isToggleBtn && !UI.$salonsSubmenu.hasClass(UI.salonsHideClass)) {
    hideSalonsSubmenu();
    return;
  }

  if (!isSubmenu) {
    hideSalonsSubmenu();
    return;
  }
}

function showSalonsSubmenu() {
  UI.$salonsSubmenu.removeClass(UI.salonsHideClass);
  setTabIndex(UI.$salonsLinks, '0');
}

function hideSalonsSubmenu() {
  UI.$salonsSubmenu.addClass(UI.salonsHideClass);
  setTabIndex(UI.$salonsLinks, '-1');
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

function toggleTab() {
  var $container = $(this).closest('.tabs__tab');
  var className = 'tabs__tab--active';

  UI.$tabs.removeClass(className);
  $container.addClass(className);

  var $tabsBtns = UI.$tabs.find('.tabs__btn');
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

function getFocusable($container) {
  return $container.find(FOCUSABLE_SELECTORS);
}
