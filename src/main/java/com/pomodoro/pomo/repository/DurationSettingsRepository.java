package com.pomodoro.pomo.repository;

import com.pomodoro.pomo.model.DurationSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DurationSettingsRepository extends JpaRepository<DurationSettings, Long> {
}

