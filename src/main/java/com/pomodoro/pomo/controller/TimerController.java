package com.pomodoro.pomo.controller;
import com.pomodoro.pomo.service.TimerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timer")
public class TimerController {

    private final TimerService timerService; // Ensure TimerService is correctly implemented and annotated with @Service

    @Autowired
    public TimerController(TimerService timerService) {
        this.timerService = timerService;
    }
    
    @PostMapping("/updateWorkDuration")
    public void updateWorkDuration(@RequestParam int minutes) {
        timerService.updateWorkDuration(minutes);
    }

    @PostMapping("/updateBreakDuration")
    public void updateBreakDuration(@RequestParam int minutes) {
        timerService.updateBreakDuration(minutes);
    }
}

