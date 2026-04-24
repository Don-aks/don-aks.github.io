'use strict';

const CLASSES = {
  locked: 'locked',

  header: 'header',
  headerNav: 'header__nav',
  headerLink: 'header__link',
  headerLogo: 'header__logo',
  headerActive: 'header--active',
  headerButton: 'header__button',

  menu: 'header__list',
  menuActive: 'header__list--active',

  menuBtn: 'menu-button',
  menuBtnActive: 'menu-button--active',

  dropDownLink: 'header__link--drop-down',

  submenu: 'submenu',
  submenuHidden: 'submenu--hidden',
  submenuLink: 'submenu__link',

  serviceGrid: 'services',

  dpContainer: 'ui-datepicker',
  dpBtnPrev: 'ui-datepicker-prev',
  dpBtnNext: 'ui-datepicker-next',
  dpHeader: 'ui-datepicker-header',
  dpMonthSelect: 'ui-datepicker-month',
  dpMonthSelectMenu: 'ui-datepicker-month-select',
  dpYearSelect: 'ui-datepicker-year',

  selectmenuBtn: 'ui-selectmenu-button',

  appointmentSection: 'appointment',
  appointmentDp: 'appointment__date',
  appointmentBtn: 'appointment__button',
  appointmentBtnActive: 'appointment__button--active',
  appointmentOption: 'appointment__option',
};

const header = getElementByClass(CLASSES.header);
const headerNav = getElementByClass(CLASSES.headerNav, header);
const menu = getElementByClass(CLASSES.menu, header);
const menuButton = getElementByClass(CLASSES.menuBtn, header);
const menuFocusableElements = getFocusable(menu);

const elementsToToggleFocusTrap = getFocusable(headerNav);
let removeMenuFocusTrap;

const logo = getElementByClass(CLASSES.headerLogo, header);
const firstHeaderButton = getElementByClass(CLASSES.headerButton, header);
const firstMenuElement = menuFocusableElements[0];

const menuTabRoute = [
  { from: logo, to: firstHeaderButton },
  { from: lastVisibleMenuElement, to: logo },
  { from: menuButton, to: firstMenuElement },
  { from: logo, to: lastVisibleMenuElement, shift: true },
  { from: firstHeaderButton, to: logo, shift: true },
];

menuButton.addEventListener('click', function () {
  const willBeActive = !menu.classList.contains(CLASSES.menuActive);
  document.body.classList.toggle(CLASSES.locked, willBeActive);

  menu.classList.toggle(CLASSES.menuActive, willBeActive);
  header.classList.toggle(CLASSES.headerActive, willBeActive);
  menuButton.classList.toggle(CLASSES.menuBtnActive, willBeActive);

  if (!willBeActive) {
    if (typeof removeMenuFocusTrap === 'function') {
      removeMenuFocusTrap();
      removeMenuFocusTrap = null;
    }

    menuButton.focus();
  }

  setElementsAccessibility(menu, menuFocusableElements, !willBeActive);
  menuButton.setAttribute('aria-expanded', String(willBeActive));

  if (willBeActive) {
    const lastVisibleMenuElement = getLastVisibleElement(menuFocusableElements);
    const routeWithDynamicLastElement = [
      { from: lastVisibleMenuElement, to: logo },
      { from: logo, to: lastVisibleMenuElement, shift: true },
    ].concat(menuTabRoute);

    removeMenuFocusTrap = createSmartFocusTrap(
      elementsToToggleFocusTrap,
      routeWithDynamicLastElement,
    );
  }
});

if (window.innerWidth <= 1200) {
  disableAccessibility(menu, menuFocusableElements);
}

window.addEventListener(
  'resize',
  debounce(function () {
    const isMenuVisible = window.innerWidth > 1200;
    toggleAccessibilityWithTabIndexCondition(
      menu,
      menuFocusableElements,
      !isMenuVisible,
    );
  }, 200),
);

const submenu = getElementByClass(CLASSES.submenu, header);
const submenuTransitionDelay = getTransitionDurationInMs(submenu);

const dropDownLink = getElementByClass(CLASSES.dropDownLink, header);
const submenuLinks = toArray(
  submenu.querySelectorAll('.' + CLASSES.submenuLink),
);

let submenuAnimationTimeoutId;
let removeSubmenuFocusTrap;

submenu.addEventListener('click', onServiceLinkClick);

document.body.addEventListener('click', function (e) {
  if (dropDownLink === e.target || dropDownLink.contains(e.target)) {
    toggleSubmenu(!isSubmenuClosed());
    return;
  }

  if (submenu !== e.target && !submenu.contains(e.target)) {
    toggleSubmenu(true, false);
  }
});

document.addEventListener('keydown', function (event) {
  const isEscKey = event.keyCode === 27;
  if (!isEscKey) return;

  if (!isSubmenuClosed()) {
    toggleSubmenu(true);
  }
});

const serviceGrid = getElementByClass(CLASSES.serviceGrid);
serviceGrid.addEventListener('click', onServiceLinkClick);

/*let dp = new AirDatepicker('#input-date', {
  inline: true,
  locale: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 0
  },
  prevHtml: '',
  nextHtml: '',
  onRenderCell: function({date, cellType}) {
    if (cellType === 'day') {
      const now = new Date(Date.now());
      const today12_30am = new Date(Date.now()).setHours(12, 30, 0, 0);
      const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);

      if ((date - currentDate == 0 && now > today12_30am) || date < currentDate) {
        return {
          disabled: true
        }
      }
    }
  }
});

let isAllDatesDisabled = true;
const dates = document.querySelectorAll(
  '.-inline- .air-datepicker-cell:not(.-other-month-)'
);
for (let i = 0; i < dates.length; i++) {
  if (!dates[i].classList.contains('-disabled-')) {
    isAllDatesDisabled = false;
  }
}

if (isAllDatesDisabled) {
  dp.next();
}*/

$.datepicker.setDefaults({
  dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  nextText: '',
  prevText: '',
});

const datePicker = $('.' + CLASSES.appointmentDp);
const inputDate = $('#input-date');

const now = new Date(Date.now());
const today12_30am = new Date(Date.now()).setHours(12, 30, 0, 0);
const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);
const firstWorkDay = getFirstAvailableWorkDay(now);

let lastFocusedDirection;

datePicker.datepicker({
  altField: '#input-date',
  changeMonth: true,
  changeYear: true,
  // firstDay: 1,
  appendTo: '.' + CLASSES.appointmentDp,

  onSelect: function (dateText) {
    inputDate.val(dateText);
    disablePastDateFocus();
    enableNavKeyboardSupport();
    setTimeout(initDatepickerSelects, 0);
    setTimeout(fixDatepickerNavTabOrder, 0);
  },

  onChangeMonthYear: function () {
    setTimeout(function () {
      disablePastDateFocus();
      enableNavKeyboardSupport();
      restoreDatepickerNavFocus();
      setTimeout(initDatepickerSelects, 0);
      setTimeout(fixDatepickerNavTabOrder, 0);
    }, 0);
  },

  beforeShowDay: function (date) {
    if (date < firstWorkDay || isWeekend(date)) {
      return [false, 'past-day'];
    }

    return [true, ''];
  },
});

datePicker.datepicker('setDate', firstWorkDay);
$('#input-date').val($.datepicker.formatDate('mm/dd/yy', firstWorkDay));

disablePastDateFocus();
enableNavKeyboardSupport();
fixDatepickerNavTabOrder();

initDatepickerSelects();

const timeInput = document.querySelector('#input-time');
const buttonContainer = getElementByClass('appointment__buttons');
const buttons = getElementsByClass('appointment__button', buttonContainer);

buttonContainer.addEventListener('click', handleClickOnButtonContainer);

// FUNCTIONS

function toggleSubmenu(isSubmenuHidden, forceFocus = true) {
  if (typeof removeSubmenuFocusTrap === 'function') {
    removeSubmenuFocusTrap();
    removeSubmenuFocusTrap = null;
  }

  clearTimeout(submenuAnimationTimeoutId);

  if (isSubmenuHidden) {
    if (forceFocus) {
      dropDownLink.focus();
    }

    submenu.classList.add(CLASSES.submenuHidden);

    submenuAnimationTimeoutId = setTimeout(function () {
      submenu.style.display = 'none';
      submenu.setAttribute('aria-hidden', 'true');
    }, submenuTransitionDelay);

    removeSubmenuFocusTrap = createSmartFocusTrap(submenuLinks);
  } else {
    submenu.style.display = '';
    submenu.setAttribute('aria-hidden', 'false');

    setTimeout(function () {
      submenu.classList.remove(CLASSES.submenuHidden);
    }, 0);

    submenuAnimationTimeoutId = setTimeout(function () {
      submenuLinks[0].focus();
    }, submenuTransitionDelay);
  }

  dropDownLink.setAttribute('aria-expanded', String(!isSubmenuHidden));
}

function isSubmenuClosed() {
  return submenu.classList.contains(CLASSES.submenuHidden);
}

function onServiceLinkClick(event) {
  const section = document.querySelector('.' + CLASSES.appointmentSection);
  const select = document.querySelector('#service');
  const link = event.target;

  const optionValue = link.getAttribute('data-option');
  if (!optionValue) return;

  event.preventDefault();

  const option = document.querySelector(
    '.' + CLASSES.appointmentOption + '[value="' + optionValue + '"]',
  );

  if (!option) {
    console.error('No option with value "' + optionValue + '"');
    return;
  }

  toggleSubmenu(true);

  const sectionRect = section.getBoundingClientRect();
  const sectionPosition = sectionRect.top + window.pageYOffset;

  window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
  select.value = optionValue;
}

function handleClickOnButtonContainer(event) {
  if (event.target.classList.contains(CLASSES.appointmentBtn)) {
    // Убираем класс 'active' у всех кнопок
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove(CLASSES.appointmentBtnActive);
    }

    timeInput.value = event.target.innerText;
    event.target.classList.add(CLASSES.appointmentBtnActive);
  }
}

function disablePastDateFocus() {
  $('.past-day a').attr('tabindex', '-1');
}

function enableNavKeyboardSupport() {
  $('.' + CLASSES.dpBtnPrev + ', .' + CLASSES.dpBtnNext)
    .attr('tabindex', '0')
    .off('keydown')
    .on('keydown', function (e) {
      const isSpaceOrEnter = e.keyCode === 13 || e.keyCode === 32;
      if (!isSpaceOrEnter) return;

      if ($(this).hasClass(CLASSES.dpBtnPrev)) {
        lastFocusedDirection = 'prev';
      } else if ($(this).hasClass(CLASSES.dpBtnNext)) {
        lastFocusedDirection = 'next';
      }

      // Prevent page scroll when space is pressed
      e.preventDefault();

      $(this).trigger('click');
    });
}

function restoreDatepickerNavFocus() {
  if (!lastFocusedDirection) return;

  setTimeout(function () {
    var datepicker = $('.' + CLASSES.dpContainer);
    const isPrev = lastFocusedDirection === 'prev';
    const selector = '.' + (isPrev ? CLASSES.dpBtnPrev : CLASSES.dpBtnNext);

    const newButton = datepicker.find(selector);
    if (newButton.length) newButton.trigger('focus');
  }, 0);
}

function initDatepickerSelects() {
  function onChange() {
    $(this).trigger('change');
    initDatepickerSelects();
  }

  $('.' + CLASSES.dpMonthSelect).selectmenu({
    change: function () {
      onChange.call(this);
    },
    classes: {
      'ui-selectmenu-menu': CLASSES.dpMonthSelectMenu,
    },
  });

  $('.' + CLASSES.dpYearSelect).selectmenu({
    change: function () {
      onChange.call(this);
    },
  });

  fixDatepickerNavTabOrder();
  removePastYearsFromSelect();
}

function fixDatepickerNavTabOrder() {
  var $header = $('.' + CLASSES.dpHeader);
  var $prev = $header.find('.' + CLASSES.dpBtnPrev);
  var $next = $header.find('.' + CLASSES.dpBtnNext);

  if (!$prev.length || !$next.length) {
    console.error('Datepicker nav buttons not found');
    return;
  }

  $header.append($prev).append($next);
  $prev.attr('tabindex', '0');
  $next.attr('tabindex', '0');
}

function removePastYearsFromSelect() {
  const currentYear = new Date().getFullYear();

  $('.' + CLASSES.dpYearSelect + ' option').each(function () {
    const year = parseInt($(this).val(), 10);

    if (year < currentYear) {
      $(this).remove();
    }
  });

  $('.' + CLASSES.dpYearSelect).selectmenu('refresh');
}

// UTILS

function getElementByClass(className, parent = document) {
  return parent.querySelector('.' + className);
}

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function toArray(obj) {
  return Array.prototype.slice.call(obj);
}

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

function getTransitionDurationInMs(el) {
  const durations = getComputedStyle(el)
    .transitionDuration.split(',')
    .map((d) => {
      d = d.trim();
      return d.endsWith('ms') ? parseFloat(d) : parseFloat(d) * 1000;
    });

  // if multiple
  return Math.max(...durations);
}

function getLastVisibleElement(elements) {
  for (let i = elements.length - 1; i >= 0; i--) {
    if (elements[i].offsetParent !== null) {
      return elements[i];
    }
  }

  return null;
}

function getFirstAvailableWorkDay(startDate) {
  var targetDate = new Date(startDate.getTime());

  if (now > today12_30am) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  while (isWeekend(targetDate)) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  targetDate.setHours(0, 0, 0, 0);

  return targetDate;
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function getFocusable(container) {
  return container.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]',
  );
}

function enableAccessibility(container, focusableElements) {
  setElementsAccessibility(container, focusableElements, false);
}

function disableAccessibility(container, focusableElements) {
  setElementsAccessibility(container, focusableElements, true);
}

function toggleAccessibilityWithTabIndexCondition(
  container,
  focusableElements,
  isHidden,
) {
  setElementsAccessibility(container, focusableElements, isHidden, true);
}

function setElementsAccessibility(
  container,
  focusableElements,
  isHidden,
  tabIndexCondition = false,
) {
  const focusable = toArray(focusableElements);

  if (tabIndexCondition) {
    const wantedTabIndex = isHidden ? '-1' : '0';

    focusable.forEach((el) => {
      if (el.getAttribute('tabindex') !== wantedTabIndex) {
        el.setAttribute('tabindex', wantedTabIndex);
      }
    });
  } else {
    focusable.forEach((el) =>
      el.setAttribute('tabindex', isHidden ? '-1' : '0'),
    );
  }

  const active = document.activeElement;
  if (isHidden && container.contains(active)) {
    active.blur();
  }

  container.setAttribute('aria-hidden', String(isHidden));
}

/**
 * Creates a focus trap with custom navigation routes.
 * @param {HTMLElement[]} elements - Elements to cycle focus between.
 * @param {Object[]} customRoutes - Custom transitions: { from: HTMLElement, to: HTMLElement, shift: boolean }.
 */
function createSmartFocusTrap(elements, customRoutes = []) {
  const first = elements[0];
  const last = elements[elements.length - 1];

  function handleKeyDown(event) {
    const isTabPressed = event.keyCode === 9;
    if (!isTabPressed) return;

    const active = document.activeElement;

    customRoutes.forEach((route) => {
      if (active === route.from && event.shiftKey === Boolean(route.shift)) {
        route.to.focus();
        event.preventDefault();
        return;
      }
    });

    if (event.shiftKey && active === first) {
      last.focus();
      event.preventDefault();
    } else if (!event.shiftKey && active === last) {
      first.focus();
      event.preventDefault();
    }
  }

  function handleFocusIn(event) {
    const isFocusInside = toArray(elements).some((el) => {
      return el.contains(event.target) || el === event.target;
    });

    if (!isFocusInside) {
      first.focus();
    }
  }

  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('keydown', handleKeyDown);

  return function destroy() {
    document.removeEventListener('focusin', handleFocusIn);
    document.removeEventListener('keydown', handleKeyDown);
  };
}
