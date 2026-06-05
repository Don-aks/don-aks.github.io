export default {
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
};
