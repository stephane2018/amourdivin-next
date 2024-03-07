#!/bin/bash

# Target port to check (replace with your actual port number)
PORT=3000

# Check if the port is already in use
if [[ $(netstat -tlpn | grep ":$PORT " | awk '{print $NF}') == "LISTEN" ]]; then
  # Get the process ID (PID) using the port
  process_id=$(netstat -tlpn | grep ":$PORT " | awk '{print $7}')

  # Check if the PID belongs to a container
  if [[ $(docker inspect -f '{{.State.Pid}}' $process_id) ]]; then
    # Get the container ID from the process ID
    container_id=$(docker inspect -f '{{.Id}}' $(docker ps -aqf "pid=$process_id"))

    # Stop the container if it exists
    if [[ $container_id ]]; then
      echo "Port $PORT is already in use by container $container_id. Stopping the container..."
      docker stop $container_id
      echo "Stopped container $container_id."
    else
      echo "Port $PORT is in use, but the corresponding container ID could not be found."
    fi
  else
    echo "Port $PORT is already in use by a non-container process (PID: $process_id)."
  fi
else
  echo "Port $PORT is currently not in use."
fi
