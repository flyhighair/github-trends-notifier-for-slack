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

variable "gcp_project" {
  default = "hakshu-private-project"
}

variable "project_name" {
  default = "github-trends"
}

provider "google" {
  project = var.gcp_project
  region  = "asia-northeast1"
}
