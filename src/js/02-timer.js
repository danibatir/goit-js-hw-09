import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let inputText = document.getElementById('datetime-picker');
let buttonStart = document.querySelector('[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates.length) return;
    const endDate = new Date(selectedDates[0].getTime());

    if (endDate <= new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
    }
  },
};

let flatpickrInstance = flatpickr(inputText, options);
buttonStart.addEventListener('click', () => {
  const endDate = new Date(flatpickrInstance.selectedDates[0].getTime());
  const now = new Date();
  let diff = endDate - now;
  let countdownInterval = setInterval(() => {
    const remainingTime = convertMs(diff);
    updateTimerDisplay(
      remainingTime.days,
      remainingTime.hours,
      remainingTime.minutes,
      remainingTime.seconds
    );
    diff -= 1000;
    if (diff <= 0) {
      clearInterval(countdownInterval);
      alert('Countdown finished!');
    }
  }, 1000);
});

function updateTimerDisplay(days, hours, minutes, seconds) {
  const timerElements = document.querySelectorAll('.timer .value');
  timerElements[0].textContent = String(days).padStart(2, '0');
  timerElements[1].textContent = String(hours).padStart(2, '0');
  timerElements[2].textContent = String(minutes).padStart(2, '0');
  timerElements[3].textContent = String(seconds).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
