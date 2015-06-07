import rospy
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Twist, PoseWithCovariance, TwistWithCovariance, Point, Quaternion
from std_msgs.msg import Header

class ArdroneSimulator():

	def __init__(self):
		rospy.init_node('ardrone', anonymous=True)
		rospy.on_shutdown(self.shutdown)
		self.odometry_topic = rospy.Publisher('ardrone/odometry', Odometry, queue_size=10)
		self.cmd_vel = rospy.Subscriber("cmd_vel", Twist, self.cmd_callback);
		self.rate = 20
		self.r = rospy.Rate(self.rate)
    		# Set the forward linear speed to 0.2 meters per second
    		self.linear_speed = 0.5
    		# Set the travel distance in meters
    		self.goal_distance = 1.0
    		# Set the rotation speed in radians per second
    		self.angular_speed = 1.0
		self.current_twist = Twist()
		self.current_odom = Odometry(header=Header(frame_id='drone'))

	def shutdown(self, data):
		pass

	def cmd_callback(self, message):
		self.current_twist = message

	def run(self):
		from time import sleep
		while not rospy.is_shutdown():
			if self.current_twist.linear.x != 0 :
				self.current_odom.pose.pose.position.x +=  self.current_twist.linear.x
			if self.current_twist.linear.y != 0 :
				self.current_odom.pose.pose.position.y += self.current_twist.linear.y
			if self.current_twist.linear.z != 0 :
				self.current_odom.pose.pose.position.z += self.current_twist.linear.z
			if self.current_twist.angular.x != 0 :
				self.current_odom.pose.pose.orientation.x += self.current_twist.angular.x
			if self.current_twist.angular.y != 0 :
				self.current_odom.pose.pose.orientation.y += self.current_twist.angular.y
			if self.current_twist.angular.z != 0 :
				self.current_odom.pose.pose.orientation.z += self.current_twist.angular.z

			self.current_odom.twist.twist = self.current_twist
			self.odometry_topic.publish(self.current_odom)
			sleep(2)


if __name__ == '__main__':
	try:
		simulator = ArdroneSimulator()
		simulator.run()
	except:
		import traceback
		traceback.print_exc()
		rospy.loginfo("Ardrone simulator  node terminated.")
