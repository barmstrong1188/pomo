function updateWorkDuration() {
    const minutes = document.getElementById('workDuration').value;
    console.log("Updating work duration to:", minutes);
    fetch(`http://localhost:8080/timer/updateWorkDuration?minutes=${minutes}`, {
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
    fetch(`http://localhost:8080/timer/updateBreakDuration?minutes=${minutes}`, {
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



let isPaused = false;  // Tracks whether the timer is paused

function startTimer() {
    let workTime = parseInt(document.getElementById('workDuration').value) * 60;
    let breakTime = parseInt(document.getElementById('breakDuration').value) * 60;
    let isWorkTime = true;
    const timerDiv = document.getElementById('timerClock');

    const timer = setInterval(() => {
        // Check if the timer is paused
        if (isPaused) return;

        if (isWorkTime) {
            if (workTime > 0) {
                updateTimerDisplay(workTime--, 'Work');
            } else {
                isWorkTime = false;
            }
        } else {
            if (breakTime > 0) {
                updateTimerDisplay(breakTime--, 'Break');
            } else {
                clearInterval(timer);
                console.log('Session complete. Restarting...');
                startTimer(); // restart timer
            }
        }
    }, 1000);

    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'pauseButton') {
            togglePause();
        }
    });

    function togglePause() {
        isPaused = !isPaused;
        document.getElementById('pauseButton').textContent = isPaused ? 'Resume' : 'Pause';
    }

    function updateTimerDisplay(time, type) {
        timerDiv.innerHTML = `
            <div>
                <h2>${type} Time!</h2>
                <h3>${type === 'Work' ? 'Inspirational Quote Here' : 'Zen Quote Here'}</h3>
                <p>${type} Time Remaining: ${formatTime(time)}</p>
                <button id="pauseButton">${isPaused ? 'Resume' : 'Pause'}</button>
            </div>
        `;
    }
}