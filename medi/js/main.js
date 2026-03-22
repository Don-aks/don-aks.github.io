'use strict';

$(function () {
  $('.hero__slider').slick({
    responsive: [
      {
        breakpoint: 1331,
        settings: {
          arrows: false,
        },
      },
    ],
    prevArrow:
      '<button class="slick-prev" aria-label="Попередній слайд" type="button">→</button>',
    nextArrow:
      '<button class="slick-next" aria-label="Наступний слайд" type="button">→</button>',
  });

  $('.header__btn-menu').on('click', function () {
    $('.header__btn-menu .btn-menu__line').toggleClass(
      'btn-menu__line--active',
    );
    $('.header__list').toggleClass('header__list--active');
    $('body').toggleClass('locked');
  });

  var $salonsSubmenu = $('.salons__submenu');

  $('body').on('click', function (e) {
    var className = 'salons__submenu--hidden';
    var $target = $(e.target);

    if ($target.hasClass('salons')) {
      if ($salonsSubmenu.hasClass(className)) showSalonsSubmenu();
      else hideSalonsSubmenu();
    } else if (
      $target.hasClass('salons__submenu') &&
      $target.hasClass('salons__link')
    ) {
      $salonsSubmenu.addClass(className);
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
  $salonsLinks.removeAttr('tabindex');
}

function hideSalonsSubmenu() {
  var className = 'salons__submenu--hidden';
  var $salonsSubmenu = $('.salons__submenu');
  var $salonsLinks = $('.salons__link');

  $salonsSubmenu.addClass(className);
  $salonsLinks.attr('tabindex', '-1');
}
