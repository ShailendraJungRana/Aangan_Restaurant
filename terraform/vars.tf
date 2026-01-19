variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.small"
}

variable "key_name" {
  description = "Existing EC2 key pair name"
  type        = string
  default     = "shailendra_key"
}

variable "security_group_id" {
  description = "Existing Security Group ID"
  type        = string
  default     = "sg-0def8f34702957871"
}

variable "instance_name" {
  description = "Name tag for EC2 instance"
  type        = string
  default     = "demo-ec2-instance"
}
variable "ami" {
  description = "ami"
  type        = string
  default     = "ami-0ecb62995f68bb549"
}