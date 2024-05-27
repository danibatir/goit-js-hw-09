let startButton = document.querySelector('[data-start]');
let stopButton = document.querySelector('[data-stop]');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  clearInterval(timerId);
});
