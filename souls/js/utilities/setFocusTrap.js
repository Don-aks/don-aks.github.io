import getFocusable from './getFocusable';

function setFocusTrap(container) {
  const focusableElements = getFocusable(container);

  function handleFocusIn(event) {
    if (!container.contains(event.target)) {
      focusableElements[0].focus();
      event.preventDefault();
    }
  }

  function handleKeyDown(event) {
    const isTabPressed = event.keyCode === 9;
    if (!isTabPressed) return;

    const focusable = focusableElements.filter(function (el) {
      return el.getAttribute('tabindex') !== '-1' && !el.disabled;
    });

    if (focusable.length === 0) return;

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }

      return;
    }

    if (document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }

  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('keydown', handleKeyDown);

  return function () {
    document.removeEventListener('focusin', handleFocusIn);
    document.removeEventListener('keydown', handleKeyDown);
  };
}

export default setFocusTrap;
