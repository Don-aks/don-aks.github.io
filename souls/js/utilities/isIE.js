function isIE() {
  const ua = window.navigator.userAgent;

  // IE 10 or older
  const msie = ua.indexOf('MSIE ');

  // IE 11
  const trident = ua.indexOf('Trident/');

  return msie > -1 || trident > -1;
}

export default isIE;
