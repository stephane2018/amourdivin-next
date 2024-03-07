#!/bin/bash

# Define the port to check
port_to_check=3000

# Check if the port is in use
if netstat -tlpn | grep LISTEN | grep ":$port_to_check "; then
  # Get the process ID (PID) using the port number
  process_id=$(netstat -tlpn | grep LISTEN | grep ":$port_to_check " | awk '{print $NF}')

  # Check if the process ID belongs to a container
  if [[ $(docker inspect -f '{{.State.Pid}}' $process_id) == "$process_id" ]]; then
    # Get the container ID using the process ID
    container_id=$(docker ps -aqf="pid=$process_id")

    # Stop the container
    echo "Port $port_to_check is in use by container $container_id. Stopping the container..."
    docker stop $container_id
  else
    echo "Port $port_to_check is in use by a non-container process (PID: $process_id)."
  fi
else
  echo "Port $port_to_check is not currently in use."
fi
