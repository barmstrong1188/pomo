package com.pomodoro.pomo;

public class PomodoroTimer {
    private int workDuration = 25; // Duration of work period in minutes
    private int breakDuration = 5; // Duration of break period in minutes
    private boolean isRunning;

    // Constructors, getters, and setters
    public int getWorkDuration() {
        return workDuration;
    }

    public void setWorkDuration(int workDuration) {
        this.workDuration = workDuration;
    }

    public int getBreakDuration() {
        return breakDuration;
    }

    public void setBreakDuration(int breakDuration) {
        this.breakDuration = breakDuration;
    }

    public boolean isRunning() {
        return isRunning;
    }

    public void setRunning(boolean running) {
        isRunning = running;
    }
}
