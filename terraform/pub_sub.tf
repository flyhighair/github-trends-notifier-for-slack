variable "pubsub_subscription_push_endpoint" {}

resource "google_pubsub_topic" "github-trends-pubsub-topic" {
  name   = var.project_name
  labels = {}
  timeouts {}
}

resource "google_pubsub_subscription" "github-trends-pubsub-subscription" {
  ack_deadline_seconds       = 600
  enable_message_ordering    = false
  labels                     = {}
  message_retention_duration = "604800s"
  name                       = "gcf-github-trends-notify-asia-northeast1-github-trends"
  retain_acked_messages      = false
  topic                      = "projects/${var.gcp_project}/topics/github-trends"

  push_config {
    attributes    = {}
    push_endpoint = var.pubsub_subscription_push_endpoint
  }

  timeouts {}
}