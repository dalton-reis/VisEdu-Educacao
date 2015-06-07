#!/usr/bin/python
# -*- coding: UTF-8 -*-
import rospy
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Twist, PoseWithCovariance, TwistWithCovariance, Point, Quaternion
from std_msgs.msg import Header
from math import sqrt, pow, radians

class ViseduController():

	def __init__(self):
		rospy.init_node('visedu_controller', anonymous=True)
		rospy.on_shutdown(self.shutdown)
		self.cmd_vel = rospy.Publisher('cmd_vel', Twist, queue_size=10)
		self.move_drone = rospy.Subscriber("visedu/move_drone", Twist, self.move_callback);
		self.odometry = rospy.Subscriber("ardrone/odometry", Odometry, self.odometry_callback);
		self.rate = 20
		self.r = rospy.Rate(self.rate)
    		# Set the forward linear speed to 0.2 meters per second
    		self.linear_speed = 0.5
    		# Set the rotation speed in radians per second
    		self.angular_speed = 1.0
		self.current_twist = Twist()
		self.current_odom = Odometry();

	def shutdown(self, data):
		pass

	def move_callback(self, message):
		""" Callback do subscriber no tópico /visedu/move_drone"""
		def move():
			self.stop()
			rospy.loginfo(self.current_odom)
			startX = self.current_odom.pose.pose.position.x
			startY = self.current_odom.pose.pose.position.y
			startZ = self.current_odom.pose.pose.position.z
			x = message.linear.x
			y = message.linear.y
			z = message.linear.z
			rospy.loginfo("start = (%f, %f, %f)", startX, startY, startZ)
			distance = self.calculateDistance(startX, startY, startZ, startX + x, startY + y, startZ + z)
			rospy.loginfo("distance = %f", distance)
			done = False
			while(not done):
				twist = Twist()
				twist.linear.x = 0 if x==0 else self.linear_speed if x>0 else -self.linear_speed
				twist.linear.y = 0 if y==0 else self.linear_speed if y>0 else -self.linear_speed
				twist.linear.z = 0 if z==0 else self.linear_speed if z>0 else -self.linear_speed
				self.cmd_vel.publish(twist);
				currentX = self.current_odom.pose.pose.position.x
				currentY = self.current_odom.pose.pose.position.y
				currentZ = self.current_odom.pose.pose.position.z
				moved_distance = self.calculateDistance(startX, startY, startZ, currentX, currentY, currentZ)
				if moved_distance >= distance:
					done = True;
			self.stop();
			rospy.loginfo("current = (%f, %f, %f)", self.current_odom.pose.pose.position.x, self.current_odom.pose.pose.position.y, self.current_odom.pose.pose.position.z)
		def rotate():
			self.stop()
			rospy.loginfo(self.current_odom)
			startZ = self.current_odom.pose.pose.orientation.z
			z = radians(message.angular.z)
			rospy.loginfo("start = %f", startZ)
			angle = self.calculateAngleDifference(startZ, startZ + z)
			rospy.loginfo("angle difference = %f", angle)
			done = False
			while(not done):
				twist = Twist()
				twist.angular.x = 0
				twist.angular.y = 0
				twist.angular.z = 0 if z==0 else self.angular_speed if z>0 else -self.angular_speed
				self.cmd_vel.publish(twist);
				currentZ = self.current_odom.pose.pose.orientation.z
				moved_angle = self.calculateAngleDifference(startZ,currentZ)
				if moved_angle >= angle:
					done = True;
			self.stop();
			rospy.loginfo("current = %f", self.current_odom.pose.pose.orientation.z)
			pass
		move()
		rotate()


	def odometry_callback(self, message):
		""" Callback do subscriber no tópico /ardrone/odometry"""
		self.current_odom = message

	def calculateDistance(self,x1,y1,z1,x2,y2,z2):
		"""Calcula a distancia entre dois pontos """
		return sqrt(pow((x2-x1),2) + pow((y2-y1),2) + pow((z2-z1),2))

	def calculateAngleDifference(self, angle1, angle2):
		"""Calcula a diference entre dois angulos"""
		distance = abs(angle1 - angle2) % 360
		return 360 - d if distance > 180 else distance

	def stop(self):
		"""Envia comando para parar o drone"""
		self.cmd_vel.publish(Twist())

if __name__ == '__main__':
	try:
		simulator = ViseduController()
		rospy.spin()
	except:
		import traceback
		traceback.print_exc()
		rospy.loginfo("Visedu node terminated.")
