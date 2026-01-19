#!/bin/bash

terraform output -raw instance_public_ips | \
awk '{print "ec2-1 ansible_host="$1" ansible_user=ubuntu ansible_ssh_private_key_file=./shailendra_key.pem"}' \
> inventory

echo "✅ Inventory file updated!"
