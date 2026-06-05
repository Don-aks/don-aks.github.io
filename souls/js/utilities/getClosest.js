var matchesSelector =
  Element.prototype.matches ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.webkitMatchesSelector;

function getClosest(element, selector) {
  while (element && element.nodeType === 1) {
    if (matchesSelector.call(element, selector)) {
      return element;
    }

    element = element.parentNode;
  }

  return null;
}

export default getClosest;
