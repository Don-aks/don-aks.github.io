'use strict';

var HIDE_MENU_BREAKPOINT = 1200;
var FOCUSABLE_SELECTORS = 'a[href], button, [tabindex="0"]';
var HIDDEN_CELLS =
  '.header__cell-phone, .header__cell-salons, .header__cell-social';

var $window = $(window);
var $body = $(document.body);

var $header = $('.header__top');
var $headerList = $('.header__list');
var $hiddenCells = $header.find(HIDDEN_CELLS);

var $headerBtnMenu = $header.find('.header__btn-menu');
var $tabs = $('.tabs__tab');

var UI = {
  $skipToContent: $('.skip-to-content'),
  $content: $('#main'),

  $highContrastBtn: $('.btn--visually-impaired'),

  $header: $header,
  $headerList: $headerList,
  $headerListFocusable: getFocusable($headerList),
  headerListActiveClass: 'header__list--active',

  $headerBtnMenu: $headerBtnMenu,
  $btnMenuLine: $headerBtnMenu.find('.btn-menu__line'),
  $hiddenCells: $hiddenCells,
  $hiddenCellsFocusable: getFocusable($hiddenCells),
  btnMenuLineActiveClass: 'btn-menu__line--active',

  $btnBooking: $('.header__btn-booking'),

  $salonsSubmenu: $('.salons__submenu'),
  $salonsLinks: $('.salons__link'),
  salonsSelector: '.salons',
  salonsSubmenuSelector: '.salons__submenu',
  salonsHideClass: 'salons__submenu--hidden',

  $heroSlider: $('.hero__slider'),
  sliderBtnPrevHTML:
    '<button class="slick-prev" aria-label="Попередній слайд" type="button">←</button>',
  sliderBtnNextHTML:
    '<button class="slick-next" aria-label="Наступний слайд" type="button">→</button>',

  $tabs: $tabs,
  $tabsBtns: $tabs.find('.tabs__btn'),
  tabsTabSelector: '.tabs__tab',
  tabsBtnSelector: '.tabs__btn',
  tabsActiveClass: 'tabs__tab--active',

  $newsItems: $('.news__item'),
  newsItemActiveClass: 'news__item--active',

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
  setTabIndex(getFocusable(UI.$headerList), -1);
  setTabIndex(getFocusable(UI.$hiddenCells), -1);
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
  var isActive = UI.$headerList.hasClass(UI.headerListActiveClass);

  UI.$btnMenuLine.toggleClass(UI.btnMenuLineActiveClass, !isActive);
  UI.$headerList.toggleClass(UI.headerListActiveClass, !isActive);
  $body.toggleClass('locked', !isActive);

  setTabIndex(UI.$headerListFocusable, !isActive ? 0 : -1);
  setTabIndex(UI.$hiddenCellsFocusable, !isActive ? 0 : -1);
  UI.$headerList.attr('aria-hidden', String(isActive));
}

function handleResize() {
  var isMenuVisible = $window.outerWidth() > HIDE_MENU_BREAKPOINT;
  setTabIndex(UI.$headerListFocusable, isMenuVisible ? 0 : -1);
  setTabIndex(UI.$hiddenCellsFocusable, isMenuVisible ? 0 : -1);

  UI.$headerList.attr('aria-hidden', String(!isMenuVisible));
}

function handleSalonsClick(e) {
  var className = '';
  var $target = $(e.target);

  var isToggleBtn = $target.closest(UI.salonsSelector).length;
  var isSubmenu = $target.closest(UI.salonsSubmenuSelector).length;
  var isSubmenuHidden = UI.$salonsSubmenu.hasClass(UI.salonsHideClass);

  if (isToggleBtn && isSubmenuHidden) {
    showSalonsSubmenu();
    return;
  }

  if (isToggleBtn && !isSubmenuHidden) {
    hideSalonsSubmenu();
    return;
  }

  if (!isSubmenu) {
    hideSalonsSubmenu();
    return;
  }
}

function showSalonsSubmenu() {
  toggleSalonsSubmenu(false);
}

function hideSalonsSubmenu() {
  toggleSalonsSubmenu(true);
}

function toggleSalonsSubmenu(shouldHide) {
  UI.$salonsSubmenu.toggleClass(UI.salonsHideClass, shouldHide);
  setTabIndex(UI.$salonsLinks, shouldHide ? -1 : 0);
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
  var $tabContainer = $(this).closest(UI.tabsTabSelector);

  UI.$tabs.removeClass(UI.tabsActiveClass);
  $tabContainer.addClass(UI.tabsActiveClass);

  setTabIndex(UI.$tabsBtns, 0);

  var $btn = $tabContainer.find(UI.tabsBtnSelector);
  $btn.prop('tabIndex', -1);
  $btn.blur();

  var $currentNews = UI.$newsItems.filter(
    '[data-tab=' + $tabContainer.data('tab') + ']',
  );

  UI.$newsItems.removeClass(UI.newsItemActiveClass);
  $currentNews.addClass(UI.newsItemActiveClass);
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
    var $this = $(this);

    if ($this.prop('tabIndex') === value) return;
    $this.prop('tabIndex', value);
  });
}

function getFocusable($container) {
  return $container.find(FOCUSABLE_SELECTORS);
}
