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
  });
  $('.header__btn-menu').on('click', function () {
    $('.header__btn-menu .btn-menu__line').toggleClass(
      'btn-menu__line--active'
    );
    $('.header__list').toggleClass('header__list--active');
    $('body').toggleClass('locked');
  });

  const salonsSubmenu = $('.salons__submenu');

  $('body').on('click', function (e) {
    const className = 'salons__submenu--hidden';

    if ($(e.target).hasClass('salons')) {
      if (salonsSubmenu.hasClass(className)) showSalonsSubmenu();
      else hideSalonsSubmenu();
    } else if (
      !$(e.target).hasClass('salons__submenu') &&
      !$(e.target).hasClass('salons__link')
    ) {
      salonsSubmenu.addClass(className);
    }
  });

  const tabs = $('.tabs__tab');
  tabs.on('click', function () {
    className = 'tabs__tab--active';
    tabs.removeClass(className);
    $(this).addClass(className);

    const selector = '.news__item';
    className = 'news__item--active';

    const contentSelector = selector + '[data-tab=' + $(this).data('tab') + ']';
    $(selector).removeClass(className);
    $(contentSelector).addClass(className);
  });
});

function showSalonsSubmenu() {
  const className = 'salons__submenu--hidden';
  const salonsSubmenu = $('.salons__submenu');
  const salonsLinks = $('.salons__link');

  salonsSubmenu.removeClass(className);
  salonsLinks.removeAttr('tabindex');
}

function hideSalonsSubmenu() {
  const className = 'salons__submenu--hidden';
  const salonsSubmenu = $('.salons__submenu');
  const salonsLinks = $('.salons__link');

  salonsSubmenu.addClass(className);
  salonsLinks.attr('tabindex', '-1');
}
