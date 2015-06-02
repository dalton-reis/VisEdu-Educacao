#!/bin/bash
docker run -ti -P  --net="host" -e "ROS_HOSTNAME=localhost" -e "ROS_MASTER_URI=http://localhost:11311/" jvanz/ros-indigo:0.9 /bin/bash
