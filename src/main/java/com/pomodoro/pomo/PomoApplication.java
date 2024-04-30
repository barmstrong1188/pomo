package com.pomodoro.pomo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PomoApplication {
    public static void main(String[] args) {
        SpringApplication.run(PomoApplication.class, args);
        // private final String clientId = SecretManagerUtil.getSecret("995511355628", "995511355628-c04810nlt9u0r6pr9vmk12m3l2q5j90r.apps.googleusercontent.com");
        // private final String clientSecret = SecretManagerUtil.getSecret("995511355628", "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");
    }
}
