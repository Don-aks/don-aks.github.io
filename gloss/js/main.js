let dp = new AirDatepicker('.calendar', {
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
  onRenderCell({date, cellType}) {
    if (cellType === 'day') {
      const now = new Date(Date.now());
      let currentDate = new Date(Date.now());
      currentDate.setHours(0, 0, 0, 0);
      if (
        (date - currentDate == 0 && (
          now.getHours() > 12 || now.getMinutes() > 30)
        ) || date < currentDate
      ) {
        return {
          disabled: true
        }
      }
    }
  }
});

// Выбранная дата - dp.selectedDates[0]


const buttonContainer = document.querySelector(".appointment__buttons")
buttonContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('appointment__button')) {
      // Убираем класс 'active' у всех кнопок
      document.querySelectorAll('.appointment__buttons .appointment__button').forEach(button => {
          button.classList.remove('appointment__button--active');
      });

      // Добавляем класс 'active' на кликнутую кнопку
      event.target.classList.add('appointment__button--active');
  }
});

// Активная кнопка - класс appointment__button--active