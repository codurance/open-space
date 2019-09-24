resource "aws_s3_bucket" "app_state" {
  bucket = "codurance-openspace-app-state"
}

terraform {
  backend "s3" {
    bucket = "codurance-openspace-app-state"
    key    = "codurance/openspce-react/terraform.tfstate"
    region = "eu-west-2"
  }
}
