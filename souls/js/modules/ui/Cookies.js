import { getEl } from '@/utilities/getElements';
import getNextFocusable from '@/utilities/getNextFocusable';

function Cookies() {
  this.element = getEl('cookies');
  this.btn = getEl('cookies__btn', this.element);

  this.nextFocusable = getNextFocusable(this.btn);
  this.init();
}

Cookies.prototype.init = function () {
  this.btn.addEventListener('click', this.hideWrapper.bind(this));
};

Cookies.prototype.hideWrapper = function () {
  // TODO: add animation
  this.nextFocusable.focus();
  this.element.style.display = 'none';
};

export default Cookies;
