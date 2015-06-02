rostopic pub -1 /ardrone/takeoff std_msgs/Empty
echo 'Decolou'
sleep 8
rostopic pub -1 /ardrone/land std_msgs/Empty
echo 'Pousou'
