function throttle(func, wait) {
  var timeout = null;
  var lastCallTime = 0;
  var lastArgs;
  var lastContext;

  return function () {
    var now = Date.now();
    var remaining = wait - (now - lastCallTime);

    lastArgs = arguments;
    lastContext = this;

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      lastCallTime = now;
      func.apply(lastContext, lastArgs);
    } else if (!timeout) {
      timeout = setTimeout(function () {
        lastCallTime = Date.now();
        timeout = null;
        func.apply(lastContext, lastArgs);
      }, remaining);
    }
  };
}

export default throttle;
