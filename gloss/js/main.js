const body = document.getElementsByTagName("body")[0];
const menu = document.querySelector('.header__list');
const menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click', function() {
  menu.classList.toggle('header__list--active');
  menuButton.classList.toggle('menu-button--active');
  body.classList.toggle('locked');
});

const dropDownLink = document.querySelector('.header__link--drop-down');
const dropDownMenu = document.querySelector('.submenu');
dropDownLink.addEventListener('click', function() {
  dropDownMenu.classList.toggle('submenu--hidden');
});

let dp = new AirDatepicker('#input-date', {
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
const dates = document.querySelectorAll('.-inline- .air-datepicker-cell:not(.-other-month-)');
for (let i = 0; i < dates.length; i++) {
  if (!dates[i].classList.contains('-disabled-')) {
    isAllDatesDisabled = false;
  }
}

if (isAllDatesDisabled) {
  dp.next();
}

const input = document.getElementById('input-time');
const buttonContainer = document.querySelector('.appointment__buttons');

buttonContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('appointment__button')) {
      // Убираем класс 'active' у всех кнопок
      const buttons = document.querySelectorAll('.appointment__buttons .appointment__button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('appointment__button--active');
      }

      input.value = event.target.innerText;
      // Добавляем класс 'active' на кликнутую кнопку
      event.target.classList.add('appointment__button--active');
  }
});
