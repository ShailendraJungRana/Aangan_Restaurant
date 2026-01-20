resource "aws_instance" "demo_ec2" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]

  tags = {
    Name = var.instance_name
  }
}

output "instance_public_ips" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.demo_ec2.public_ip
}



