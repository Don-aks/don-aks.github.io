'use strict';

const CLASSES = {
  locked: 'locked',

  header: 'header',
  headerNav: 'header__nav',
  headerActive: 'header--active',

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

const header = document.querySelector('.' + CLASSES.header);
const headerNav = header.querySelector('.' + CLASSES.headerNav);
const menu = document.querySelector('.' + CLASSES.menu);
const menuButton = document.querySelector('.' + CLASSES.menuBtn);
const menuFocusableElements = getFocusable(menu);

const elementsToToggleFocusTrap = getFocusable(headerNav);
let removeFocusTrapFunc;

menuButton.addEventListener('click', function () {
  const willBeActive = !menu.classList.contains(CLASSES.menuActive);
  document.body.classList.toggle(CLASSES.locked, willBeActive);

  menu.classList.toggle(CLASSES.menuActive, willBeActive);
  header.classList.toggle(CLASSES.headerActive, willBeActive);
  menuButton.classList.toggle(CLASSES.menuBtnActive, willBeActive);

  setElementsAccessibility(menu, menuFocusableElements, isActive);

  if (willBeActive) {
    removeFocusTrapFunc = setFocusTrap(elementsToToggleFocusTrap);
    menuFocusableElements[0].focus();
  } else {
    removeFocusTrapFunc();
    menuButton.focus();
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

const submenu = document.querySelector('.' + CLASSES.submenu);
const submenuTransitionDelay = getTransitionDurationInMs(submenu);
let submenuAnimationTimeoutId;

submenu.addEventListener('click', onServiceLinkClick);

document.body.addEventListener('click', function (e) {
  const cls = e.target.classList;

  if (cls.contains(CLASSES.dropDownLink) || cls.contains('icon')) {
    animateSubmenu(!isSubmenuClosed());
  } else if (
    !cls.contains(CLASSES.submenu) &&
    !cls.contains(CLASSES.submenuLink)
  ) {
    animateSubmenu(true);
  }
});

document.addEventListener('keydown', function (event) {
  // Esc key
  if (event.keyCode === 27) {
    animateSubmenu(true);
  }
});

const serviceGrid = document.querySelector('.' + CLASSES.serviceGrid);
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

const timeInput = document.getElementById('input-time');
const buttonContainer = document.querySelector('.appointment__buttons');
const buttons = buttonContainer.querySelectorAll('.appointment__button');

buttonContainer.addEventListener('click', handleClickOnButtonContainer);

// FUNCTIONS

function animateSubmenu(isSubmenuHidden) {
  clearTimeout(submenuAnimationTimeoutId);

  if (isSubmenuHidden) {
    submenu.classList.add(CLASSES.submenuHidden);

    submenuAnimationTimeoutId = setTimeout(function () {
      submenu.style.display = 'none';
    }, submenuTransitionDelay);
  } else {
    submenu.style.display = '';

    setTimeout(function () {
      submenu.classList.remove(CLASSES.submenuHidden);
    }, 0);
  }
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

  animateSubmenu(true);

  const sectionRect = section.getBoundingClientRect();
  const sectionPosition = sectionRect.top + window.pageYOffset;

  window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
  select.value = optionValue;
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

// UTILS

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
  if (tabIndexCondition) {
    const wantedTabIndex = isHidden ? '-1' : '0';

    Array.from(focusableElements).forEach((el) => {
      if (el.getAttribute('tabindex') !== wantedTabIndex) {
        el.setAttribute('tabindex', wantedTabIndex);
      }
    });
  } else {
    Array.from(focusableElements).forEach((el) =>
      el.setAttribute('tabindex', isHidden ? '-1' : '0'),
    );
  }

  container.setAttribute('aria-hidden', String(isHidden));
}

function setFocusTrap(focusableElements) {
  const focusable = Array.from(focusableElements).filter(function (el) {
    return el.getAttribute('tabindex') !== '-1' && !el.disabled;
  });

  function handleFocusIn(event) {
    if (!focusable.includes(event.target)) {
      focusable[0].focus();
      event.preventDefault();
    }
  }

  function handleKeyDown(event) {
    const isTabPressed = event.keyCode === 9;
    if (!isTabPressed) return;

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
