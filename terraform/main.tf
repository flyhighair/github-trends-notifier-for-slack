terraform {
  required_version = "~> 0.14"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 3"
    }
  }

  backend "gcs" {
    bucket = "tfstate-bucket20210121"
    prefix = "github-trends-notifier-for-slack"
  }
}

provider "google" {
  project = "hakshu-private-project"
  region  = "asia-northeast1"
}
