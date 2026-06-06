import isScrolledDown from './isScrolledDown';

function addClassOnScroll(
  element,
  container,
  className,
  animationOutName,
  offset = 0,
) {
  const scrollTrigger = container || element;
  const isScrolled = isScrolledDown(scrollTrigger, offset);

  if (isScrolled) {
    element.classList.add(className);
    if (animationOutName) {
      element.classList.remove(animationOutName);
    }
    return;
  }

  element.classList.remove(className);
  if (animationOutName) {
    element.classList.add(animationOutName);
  }
}

export default addClassOnScroll;
