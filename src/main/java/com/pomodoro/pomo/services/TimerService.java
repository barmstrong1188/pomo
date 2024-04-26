package com.pomodoro.pomo.service;

import com.pomodoro.pomo.model.DurationSettings;
import com.pomodoro.pomo.repository.DurationSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimerService {

    @Autowired
    private DurationSettingsRepository settingsRepository;

    public void updateWorkDuration(int minutes) {
        DurationSettings settings = settingsRepository.findById(1L).orElse(new DurationSettings());
        settings.setWorkDuration(minutes);
        settingsRepository.save(settings);
    }

    public void updateBreakDuration(int minutes) {
        DurationSettings settings = settingsRepository.findById(1L).orElse(new DurationSettings());
        settings.setBreakDuration(minutes);
        settingsRepository.save(settings);
    }
}
