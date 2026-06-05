import isScrolledDown from './isScrolledDown';

// TODO: edit logic
// function addClassOnScroll(
//   element,
//   container,
//   className,
//   animationOutName,
//   offset = 0,
// ){
//   const el = container || element;
// }

function addClassOnScroll(
  wrapper,
  child,
  className,
  animationOutName,
  offset = 0,
) {
  const el = child || wrapper;
  const isScrolled = isScrolledDown(wrapper, offset);

  if (isScrolled) {
    el.classList.add(className);
    if (animationOutName) {
      el.classList.remove(animationOutName);
    }
    return;
  }

  el.classList.remove(className);
  if (animationOutName) {
    el.classList.add(animationOutName);
  }
}

export default addClassOnScroll;
