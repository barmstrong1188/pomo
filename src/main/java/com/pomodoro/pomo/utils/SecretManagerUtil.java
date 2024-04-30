package com.pomodoro.pomo.utils;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretVersionName;

public class SecretManagerUtil {

    public static String getSecret(String projectId, String secretId) {
        try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
            SecretVersionName secretVersionName = SecretVersionName.of(projectId, secretId, "latest");
            String payload = client.accessSecretVersion(secretVersionName).getPayload().getData().toStringUtf8();
            return payload;
        } catch (Exception e) {
            throw new RuntimeException("Unable to access secret from Google Secret Manager", e);
        }
    }
}
