package com.pomodoro.pomo.config;

import com.pomodoro.pomo.utils.SecretManagerUtil;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class OAuthConfig {
    // Fetch secrets dynamically using the SecretManagerUtil
    private final String clientId = SecretManagerUtil.getSecret("pomo-eb9cb", "google-client-id");
    private final String clientSecret = SecretManagerUtil.getSecret("pomo-eb9cb", "google-client-secret");

    // Assuming you would use these in your security configuration to set up OAuth2
    // This is just an example to show where clientId and clientSecret would be used
    public OAuthConfig() {
        // You might set these values in application properties or directly in OAuth2 setup
        System.out.println("OAuth Client ID: " + clientId);
        System.out.println("OAuth Client Secret: " + clientSecret);
    }
}
