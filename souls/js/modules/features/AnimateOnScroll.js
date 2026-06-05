import toArray from '@/utilities/toArray';
import addClassOnScroll from '@/utilities/addClassOnScroll';

function AnimateOnScroll(services) {
  this.elements = this._getAnimated();
  this.viewportService = services.viewportService;
  this.scrollService = services.scrollService;

  this.init();
}

AnimateOnScroll.prototype.init = function () {
  this.animateElements();
};

AnimateOnScroll.prototype.handleScroll = function () {
  this.animateElements();
};

AnimateOnScroll.prototype.animateElements = function () {
  const self = this;
  this.elements.forEach(function (config) {
    // TODO: change logic
    // addClassOnScroll(
    //   config.el,
    //   config.container,
    //   config.animationName,
    //   config.animationOutName,
    //   self.viewportService.halfWindowHeight,
    // );

    addClassOnScroll(
      config.el,
      config.child,
      config.animationName,
      config.animationOutName,
      self.viewportService.halfWindowHeight,
    );
  });
};

AnimateOnScroll.prototype._getAnimated = function () {
  const elements = document.querySelectorAll('[data-animation]');

  return toArray(elements).map(function (el) {
    const animationName = el.dataset.animation;
    const child = el.querySelector('[data-animation-child]');
    let animationOutName = null;

    if (animationName.indexOf('In') !== -1) {
      animationOutName = animationName.replace('In', 'Out');
    }

    // const container = getClosest(el, '[data-animation-container]');

    // return {
    //   el: el,
    //   container: container,
    //   animationName: animationName,
    //   animationOutName: animationOutName,
    // };

    return {
      el: el,
      child: child,
      animationName: animationName,
      animationOutName: animationOutName,
    };
  });
};

AnimateOnScroll.prototype.destroy = function () {
  this.elements.forEach(function (config) {
    const element = config.child || config.el;

    element.classList.remove(config.animationName);
    element.classList.remove(config.animationOutName);
  });

  this.scrollService.unregister(this);
};

export default AnimateOnScroll;
