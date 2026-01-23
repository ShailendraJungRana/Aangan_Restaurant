resource "aws_instance" "demo_ec2" {
  for_each = var.ec2_instances

  ami                    = var.ami
  instance_type          = each.value
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]

  tags = {
    Name = each.key
  }
}

output "instance_public_ips" {
  description = "Public IPs of all EC2 instances"
  value = {
    for name, instance in aws_instance.demo_ec2 :
    name => instance.public_ip
  }
}
