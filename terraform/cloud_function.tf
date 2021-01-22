variable "slack_webhook_url" {}
variable "cloud_function_account_email" {}

resource "google_cloudfunctions_function" "notifier-function" {
    name                  = "github-trends-notify"
    available_memory_mb   = 256
    entry_point           = "githubTrendsNotify"
    environment_variables = {
        "SLACK_WEBHOOK_URL" = var.slack_webhook_url
    }
    ingress_settings      = "ALLOW_INTERNAL_ONLY"
    labels                = {
        "deployment-tool" = "cli-gcloud"
    }
    runtime               = "nodejs10"
    service_account_email = var.cloud_function_account_email
    timeout               = 120

    event_trigger {
        event_type = "google.pubsub.topic.publish"
        resource   = "projects/hakshu-private-project/topics/github-trends"

        failure_policy {
            retry = false
        }
    }

    timeouts {}
}