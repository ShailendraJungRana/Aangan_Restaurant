


#!/bin/bash

# Clear old inventory
> inventory

terraform output -json instance_public_ips | jq -r '
to_entries[] |
"\(.key) ansible_host=\(.value) ansible_user=ubuntu ansible_ssh_private_key_file=./shailendra_key.pem"
' >> inventory

echo "✅ Inventory file updated!"
