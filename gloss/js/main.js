const body = document.getElementsByTagName("body")[0];
const menu = document.querySelector('.header__list');
const menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click', function() {
  menu.classList.toggle('header__list--active');
  menuButton.classList.toggle('menu-button--active');
  body.classList.toggle('locked');
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
