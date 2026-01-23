variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "ami" {
  description = "AMI ID"
  type        = string
  default     = "ami-0ecb62995f68bb549"
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

# 👇 NEW: Define 3 instances with different sizes
variable "ec2_instances" {
  description = "EC2 instances with their instance types"
  type        = map(string)

  default = {
    demo-ec2-1 = "t2.small"
    demo-ec2-2 = "t2.small"
    demo-ec2-3 = "t2.medium" # larger than the other two
  }
}
