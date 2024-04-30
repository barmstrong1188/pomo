let timer;
let isPaused = false;
let isWorkTime = true;
let workTime;
let breakTime;


function updateWorkDuration() {
    const minutes = document.getElementById('workDuration').value;
    console.log("Updating work duration to:", minutes);
    fetch(`/timer/updateWorkDuration?minutes=${minutes}`, {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            console.log("Work duration updated successfully.");
            loadPreset(minutes, document.getElementById('breakDuration').value);
        } else {
            console.error('Failed to update work duration');
        }
    });
}

function updateBreakDuration() {
    const minutes = document.getElementById('breakDuration').value;
    console.log("Updating break duration to:", minutes);
    fetch(`/timer/updateBreakDuration?minutes=${minutes}`, {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            console.log("Break duration updated successfully.");
            loadPreset(document.getElementById('workDuration').value, minutes);
        } else {
            console.error('Failed to update break duration');
        }
    });
}

function loadPreset(work, breakDuration) {
    console.log("Loading preset with work:", work, "break duration:", breakDuration);
    const presetDiv = document.getElementById('timerPreset');
    if (!presetDiv) {
        console.error('timerPreset div not found!');
        return;
    }
    presetDiv.innerHTML = `
        <div>
            Work Duration: ${work} minutes
            <br>
            Break Duration: ${breakDuration} minutes
            <br>
            <button onclick="startTimer()">Start Timer</button>
        </div>
    `;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function notifyUser(message, nextAction) {
    console.log("Attempting to send a notification:", message);
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(message);
    }
    blinkTitle("Time's Up!");
    showModal(message, nextAction);
    playSound(nextAction);
}

function playSound(nextAction) {
    const soundId = nextAction === 'work' ? 'breakEndSound' : 'workEndSound';
    const sound = document.getElementById(soundId);
    sound.play();
}

function showModal(message, nextAction) {
    document.getElementById('modalTitle').textContent = nextAction === 'work' ? 'Break Over' : 'Work Over';
    document.getElementById('modalBody').textContent = message;
    document.getElementById('endSessionModal').style.display = 'block';
}

function closeModalAndContinue() {
    document.getElementById('endSessionModal').style.display = 'none';
    if (!isWorkTime) {
        workTime = parseInt(document.getElementById('workDuration').value) * 60;
        isWorkTime = true;
    } else {
        breakTime = parseInt(document.getElementById('breakDuration').value) * 60;
        isWorkTime = false;
    }
    startTimer();
}

function blinkTitle(message) {
    let originalTitle = document.title;
    let isOriginal = true;
    const interval = setInterval(() => {
        document.title = isOriginal ? message : originalTitle;
        isOriginal = !isOriginal;
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
        document.title = originalTitle;
    }, 10000);
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (isPaused) return;

        if (isWorkTime) {
            if (workTime > 0) {
                updateTimerDisplay(workTime--, 'Work');
            } else {
                notifyUser("Work session complete. Time for a break!", 'break');
            }
        } else {
            if (breakTime > 0) {
                updateTimerDisplay(breakTime--, 'Break');
            } else {
                notifyUser("Break session complete. Back to work!", 'work');
            }
        }
    }, 1000);
}

function updateTimerDisplay(time, type) {
    const timerDiv = document.getElementById('timerClock');
    timerDiv.innerHTML = `
        <div>
            <h2>${type} Time!</h2>
            <h3>${type === 'Work' ? 'Inspirational Quote Here' : 'Zen Quote Here'}</h3>
            <p>${type} Time Remaining: ${formatTime(time)}</p>
            <button id="pauseButton">${isPaused ? 'Resume' : 'Pause'}</button>
            <button onclick="resetTimer()">Reset</button>
        </div>
    `;
    document.getElementById('pauseButton').addEventListener('click', togglePause);
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseButton').textContent = isPaused ? 'Resume' : 'Pause';
}

// function resetTimer() {
//     clearInterval(timer);
//     if (isWorkTime) {
//         workTime = parseInt(document.getElementById('workDuration').value) * 60;
//         updateTimerDisplay(workTime, 'Work');
//     } else {
//         breakTime = parseInt(document.getElementById('breakDuration').value) * 60;
//         updateTimerDisplay(breakTime, 'Break');
//     }
//     startTimer();
// }

// // Modal interactions
// document.getElementById('settingsButton').onclick = function() {
//     document.getElementById("settingsModal").style.display = "block";
// }
// document.getElementsByClassName('close')[0].onclick = function() {
//     document.getElementById("settingsModal").style.display = "none";
// }
// window.onclick = function(event) {
//     if (event.target == document.getElementById("settingsModal")) {
//         document.getElementById("settingsModal").style.display = "none";
//     }
// }

// document.getElementById('saveSettings').addEventListener('click', function() {
//     const workMinutes = document.getElementById('workDuration').value;
//     const breakMinutes = document.getElementById('breakDuration').value;
//     workTime = parseInt(workMinutes) * 60;
//     breakTime = parseInt(breakMinutes) * 60;
//     fetch(`/timer/updateWorkDuration?minutes=${workMinutes}`, { method: 'POST' })
//     .then(response => response.ok ? console.log("Work duration updated successfully.") : console.error('Failed to update work duration'));
//     fetch(`/timer/updateBreakDuration?minutes=${breakMinutes}`, { method: 'POST' })
//     .then(response => response.ok ? console.log("Break duration updated successfully.") : console.error('Failed to update break duration'));
//     document.getElementById("settingsModal").style.display = "none";
//     loadPreset(workMinutes, breakMinutes);
// });

document.addEventListener('DOMContentLoaded', function() {
    // Ensures the DOM is fully loaded before accessing elements
    workTime = parseInt(document.getElementById('workDuration').value) * 60;
    breakTime = parseInt(document.getElementById('breakDuration').value) * 60;

    // Set up other event listeners or initialization code here
    document.getElementById('settingsButton').onclick = function() {
        document.getElementById("settingsModal").style.display = "block";
    };
    document.getElementsByClassName('close')[0].onclick = function() {
        document.getElementById("settingsModal").style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == document.getElementById("settingsModal")) {
            document.getElementById("settingsModal").style.display = "none";
        }
    };

    document.getElementById('saveSettings').addEventListener('click', function() {
        const workMinutes = document.getElementById('workDuration').value;
        const breakMinutes = document.getElementById('breakDuration').value;
        workTime = parseInt(workMinutes) * 60;
        breakTime = parseInt(breakMinutes) * 60;
        fetch(`/timer/updateWorkDuration?minutes=${workMinutes}`, { method: 'POST' })
        .then(response => response.ok ? console.log("Work duration updated successfully.") : console.error('Failed to update work duration'));
        fetch(`/timer/updateBreakDuration?minutes=${breakMinutes}`, { method: 'POST' })
        .then(response => response.ok ? console.log("Break duration updated successfully.") : console.error('Failed to update break duration'));
        document.getElementById("settingsModal").style.display = "none";
        loadPreset(workMinutes, breakMinutes);
    });
});