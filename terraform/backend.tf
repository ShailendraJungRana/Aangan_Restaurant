terraform {
  backend "s3" {
    bucket = "shailendra-demo-bucket1"
    key    = "terraform/ec2/terraform.tfstate"
    region = "us-east-1"
  }
}
