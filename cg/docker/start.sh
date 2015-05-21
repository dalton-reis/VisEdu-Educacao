#!/bin/bash
source /opt/ros/indigo/setup.bash
supervisord -n -c /etc/supervisor/supervisord.conf
#roscore
