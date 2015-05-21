rostopic pub -1 /ardrone/takeoff std_msgs/Empty
echo 'Decolou'
sleep 5
#rostopic pub -1 /cmd_vel geometry_msgs/Twist '[1.0, 0.0, 0.0]' '[0.0, 0.0, 0.0]'
echo 'Frente'
#sleep 1
#rostopic pub -1 /cmd_vel geometry_msgs/Twist '[0.0, 0.0, 0.0]' '[0.0, 0.0, 0.0]'
echo 'Parou'
rostopic pub -1 /ardrone/land std_msgs/Empty
echo 'Pousou'
