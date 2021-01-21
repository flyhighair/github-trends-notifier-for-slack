resource "google_storage_bucket" "tfstate-bucket" {
  name          = "tfstate-bucket20210121"
  location      = "ASIA-NORTHEAST1"
  storage_class = "STANDARD"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 5
    }
  }
}
