'use strict';

const CLASSES = {
  locked: 'locked',

  header: 'header',
  headerActive: 'header--active',

  menu: 'header__list',
  menuActive: 'header__list--active',

  menuBtn: 'menu-button',
  menuBtnActive: 'menu-button--active',

  dropDownLink: 'header__link--drop-down',

  submenu: 'submenu',
  submenuHidden: 'submenu--hidden',
  submenuLink: 'submenu__link',

  dpBtnPrev: 'ui-datepicker-prev',
  dpBtnNext: 'ui-datepicker-next',

  appointmentBtn: 'appointment__button',
  appointmentBtnActive: 'appointment__button--active',
};

const header = document.querySelector('.' + CLASSES.header);
const menu = document.querySelector('.' + CLASSES.menu);
const menuButton = document.querySelector('.' + CLASSES.menuBtn);

menuButton.addEventListener('click', function () {
  document.body.classList.toggle(CLASSES.locked);

  menu.classList.toggle(CLASSES.menuActive);
  header.classList.toggle(CLASSES.headerActive);
  menuButton.classList.toggle(CLASSES.menuBtnActive);
});

const submenu = document.querySelector('.' + CLASSES.submenu);
const submenuTransitionDelay = getTransitionDurationInMs(submenu);
let submenuAnimationTimeoutId;

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

const datePickerSelector = '.appointment__date';
const datePicker = $(datePickerSelector);

const now = new Date(Date.now());
const today12_30am = new Date(Date.now()).setHours(12, 30, 0, 0);
const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);

let lastFocusedDirection;

datePicker.datepicker({
  altField: '#input-date',
  // firstDay: 1,
  appendTo: datePickerSelector,

  onSelect: function (dateText) {
    $('#input-date').val(dateText);
    disablePastDateFocus();
    enableNavKeyboardSupport();
  },

  onChangeMonthYear: function () {
    setTimeout(function () {
      disablePastDateFocus();
      enableNavKeyboardSupport();
      restoreDatepickerNavFocus();
    }, 0);
  },

  beforeShowDay: function (date) {
    const isPastDay =
      date.getTime() < currentDate ||
      (date.getTime() === currentDate && now.getTime() > today12_30am);

    if (isPastDay) {
      return [false, 'past-day'];
    } else {
      return [true, ''];
    }
  },
});

if (now > today12_30am) {
  let tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  datePicker.datepicker('setDate', tomorrow);
}

disablePastDateFocus();
enableNavKeyboardSupport();

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
    const isPrev = lastFocusedDirection === 'prev';
    const selector = '.' + (isPrev ? CLASSES.dpBtnPrev : CLASSES.dpBtnNext);

    const newButton = $(selector);
    if (newButton.length) newButton.trigger('focus');
  });
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
