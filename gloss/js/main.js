'use strict';

const body = document.querySelector('body');
const header = document.querySelector('.header');
const menu = document.querySelector('.header__list');
const menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click', function () {
  body.classList.toggle('locked');
  menu.classList.toggle('header__list--active');
  header.classList.toggle('header--active');
  menuButton.classList.toggle('menu-button--active');
});

const dropDownLink = document.querySelector('.header__link--drop-down');
const dropDownMenu = document.querySelector('.submenu');

body.addEventListener('click', function (e) {
  const className = 'submenu--hidden';
  const targetClasses = e.target.classList;

  if (
    targetClasses.contains('header__link--drop-down') ||
    targetClasses.contains('icon')
  ) {
    dropDownMenu.classList.toggle('submenu--hidden');
  } else if (
    !targetClasses.contains('submenu') &&
    !targetClasses.contains('submenu__link')
  ) {
    dropDownMenu.classList.add(className);
  }
});

// dropDownMenu.addEventListener('animationend', function () {
//   console.log('+');
//   if (dropDownMenu.classList.contains('submenu--hidden')) {
//     dropDownMenu.style.display = 'none';
//     console.log('contains');
//   } else {
//     dropDownMenu.style.display = 'block';
//     console.log('not contains');
//   }
// });

// let dp = new AirDatepicker('#input-date', {
//   inline: true,
//   locale: {
//     days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//     daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//     daysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//     months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//     monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     today: 'Today',
//     clear: 'Clear',
//     dateFormat: 'MM/dd/yyyy',
//     timeFormat: 'hh:mm aa',
//     firstDay: 0
//   },
//   prevHtml: '',
//   nextHtml: '',
//   onRenderCell: function({date, cellType}) {
//     if (cellType === 'day') {
//       const now = new Date(Date.now());
//       const today12_30am = new Date(Date.now()).setHours(12, 30, 0, 0);
//       const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);

//       if ((date - currentDate == 0 && now > today12_30am) || date < currentDate) {
//         return {
//           disabled: true
//         }
//       }
//     }
//   }
// });

// let isAllDatesDisabled = true;
// const dates = document.querySelectorAll(
//   '.-inline- .air-datepicker-cell:not(.-other-month-)'
// );
// for (let i = 0; i < dates.length; i++) {
//   if (!dates[i].classList.contains('-disabled-')) {
//     isAllDatesDisabled = false;
//   }
// }

// if (isAllDatesDisabled) {
//   dp.next();
// }

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
    disablePastDateFocus();
    enableNavKeyboardSupport();
    restoreDatepickerNavFocus();
  },
  beforeShowDay: function (date) {
    if (
      (date - currentDate === 0 && now > today12_30am) ||
      date < currentDate
    ) {
      return [true, 'past-day'];
    } else {
      return [true, ''];
    }
  },
});

if (now > today12_30am) {
  // Устанавливаем выбранную дату на завтра
  let tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  datePicker.datepicker('setDate', tomorrow);
}

disablePastDateFocus();
enableNavKeyboardSupport();

const input = document.getElementById('input-time');
const buttonContainer = document.querySelector('.appointment__buttons');

buttonContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('appointment__button')) {
    // Убираем класс 'active' у всех кнопок
    const buttons = document.querySelectorAll(
      '.appointment__buttons .appointment__button'
    );
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('appointment__button--active');
    }

    input.value = event.target.innerText;
    // Добавляем класс 'active' на кликнутую кнопку
    event.target.classList.add('appointment__button--active');
  }
});

function disablePastDateFocus() {
  setTimeout(function () {
    $('.past-day a').attr('tabindex', '-1');
  }, 0);
}

function enableNavKeyboardSupport() {
  setTimeout(function () {
    $('.ui-datepicker-prev, .ui-datepicker-next')
      .attr('tabindex', '0')
      .off('keydown')
      .on('keydown', function (e) {
        if (
          e.key === 'Enter' ||
          e.key === ' ' ||
          e.keyCode === 13 ||
          e.keyCode === 32
        ) {
          if ($(this).hasClass('ui-datepicker-prev')) {
            lastFocusedDirection = 'prev';
          } else if ($(this).hasClass('ui-datepicker-next')) {
            lastFocusedDirection = 'next';
          }

          e.preventDefault(); // предотвращаем прокрутку
          $(this).trigger('click');
        }
      });
  }, 0);
}

function restoreDatepickerNavFocus() {
  if (!lastFocusedDirection) return;

  setTimeout(function () {
    const selector =
      lastFocusedDirection === 'prev'
        ? '.ui-datepicker-prev'
        : '.ui-datepicker-next';
    const newButton = $(selector);
    if (newButton.length) newButton.trigger('focus');
  });
}
