function isScrolledDown(el, offset = 0) {
  let scrollY = window.innerHeight - offset;
  let top = el.getBoundingClientRect().top;

  return top < scrollY;
}

export default isScrolledDown;
