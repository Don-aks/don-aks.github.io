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
  })
});