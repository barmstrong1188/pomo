package com.pomodoro.pomo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DurationSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int workDuration;
    private int breakDuration;

    // Getters and setters
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
}
