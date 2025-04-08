let timer;
let isPomodoro = true; // True for work, false for break
let minutes = 25; // Pomodoro work time (in minutes)
let seconds = 0;  // Starting from 0 seconds
let isRunning = false; // Whether the timer is currently running

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const statusDisplay = document.getElementById('status');

// Function to format time in MM:SS format
function formatTime(mins, secs) {
    const formattedMinutes = mins < 10 ? `0${mins}` : mins;
    const formattedSeconds = secs < 10 ? `0${secs}` : secs;
    return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to update the display
function updateDisplay() {
    timeDisplay.textContent = formatTime(minutes, seconds);
}

// Start/Stop Timer function
function startStopTimer() {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = 'Start';
    } else {
        timer = setInterval(countdown, 1000);
        startButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

// Countdown function
function countdown() {
    if (seconds === 0) {
        if (minutes === 0) {
            // Switch between work and break
            if (isPomodoro) {
                // End of Pomodoro cycle, start break
                minutes = 5; // Break time
                isPomodoro = false;
                statusDisplay.textContent = 'Take a break!';
            } else {
                // End of break, start a new Pomodoro cycle
                minutes = 25;
                isPomodoro = true;
                statusDisplay.textContent = 'Time to work!';
            }
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    updateDisplay();
}

// Reset Timer function
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    isPomodoro = true;
    startButton.textContent = 'Start';
    statusDisplay.textContent = '';
    updateDisplay();
}

// Event listeners
startButton.addEventListener('click', startStopTimer);
resetButton.addEventListener('click', resetTimer);

// Initial display update
updateDisplay();