$(function(){
  $(".hero__slider").slick({
    responsive: [
      {
        breakpoint: 1281,
        settings: {
          arrows: false
        }
      }
    ]
  });
  $(".header__btn-menu").on("click", function() {
    $(".header__btn-menu .btn-menu__line").toggleClass("btn-menu__line--active");
    $(".header__list").toggleClass("header__list--active");
    $("body").toggleClass("locked");
  });

  $(".tabs__tab").on("click", function(){
    $(".tabs__tab").removeClass("tabs__tab--active");
    $(this).addClass("tabs__tab--active");

    let contentSelector = ".news__item[data-tab=" + $(this).data("tab") + "]";
    $(".news__item").removeClass("news__item--active");
    $(contentSelector).addClass("news__item--active");
  });
});