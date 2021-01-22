resource "google_cloud_scheduler_job" "scheduler" {
  name      = "github-trends-job"
  schedule  = "0  9 * * 1"
  time_zone = "Asia/Tokyo"

  pubsub_target {
    attributes = {}
    data       = base64encode("{\"term\": \"Weekly\", \"language\": \"TypeScript\"}")
    topic_name = google_pubsub_topic.github-trends-pubsub-topic.id
  }

  timeouts {}
}
