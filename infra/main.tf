provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_cloud_run_service" "server" {
  name = "keshav-notes-terraform-backend"
  location = var.region
  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repo}/keshav-notes-terraform-backend:latest"
        ports {
          container_port = 3000
        }
        resources {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }
      }
      container_concurrency = 55
    }
  }
  traffic {
    percent = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service" "client" {
  name     = "keshav-notes-terraform-frontend"
  location = var.region
  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repo}/keshav-notes-terraform-frontend:latest"
        ports {
          container_port = 8080
        }
        resources {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }
      }
      container_concurrency = 55
    }
  }
  traffic {
    percent          = 100
    latest_revision  = true
  }
}

resource "google_cloud_run_service_iam_member" "backend_invoker" {
  location = google_cloud_run_service.server.location
  service  = google_cloud_run_service.server.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service_iam_member" "frontend_invoker" {
  location = google_cloud_run_service.client.location
  service  = google_cloud_run_service.client.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
