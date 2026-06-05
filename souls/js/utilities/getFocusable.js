import FOCUSABLE_SELECTOR from '@/constants/FOCUSABLE_SELECTOR';
import toArray from '@/utilities/toArray';

function getFocusable(container) {
  return toArray(container.querySelectorAll(FOCUSABLE_SELECTOR));
}

export default getFocusable;
