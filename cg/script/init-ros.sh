#!/bin/bash

#function show_help {
	#echo "init-ros <option>"
	#echo "Option:"
	#echo "--roscore: Initializes roscore"
	#echo "--rosbridge: Initializes rosbridge_server and rosbridge_websocket"
	#echo "--rosrun: Initializes ardrone_autonomy and ardrone-driver"
#}


if [ "$1" == "--roscore" ]; then
	roscore
elif [ "$1" == "--rosbridge" ]; then
	roslaunch rosbridge_server rosbridge_websocket.launch
elif [ "$1" == "--ardrone" ]; then
	rosrun ardrone_autonomy ardrone_driver
else
	show_help
fi
