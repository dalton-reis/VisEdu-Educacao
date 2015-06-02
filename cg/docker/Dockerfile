FROM	ubuntu:14.04
MAINTAINER	José Guilherme Vanz <guilherme.sft@gmail.com>

EXPOSE 9090

RUN echo "deb http://packages.ros.org/ros/ubuntu trusty main" > /etc/apt/sources.list.d/ros-latest.list
RUN apt-get update -y
RUN apt-get install -y wget
RUN wget https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -O - | sudo apt-key add -
RUN apt-get update -y
RUN apt-get install -y ros-indigo-desktop-full
RUN apt-get install -y python-rosinstall
RUN apt-get install -y ros-indigo-rosbridge-suite
RUN apt-get install -y ros-indigo-ardrone-autonomy
RUN apt-get install -y supervisor
RUN apt-get install -y ros-indigo-gazebo-ros-pkgs ros-indigo-gazebo-ros-control
RUN echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
RUN rosdep init
RUN rosdep update

COPY ros.conf /etc/supervisor/conf.d/ros.conf
COPY start.sh /bin/start.sh
RUN chmod 755 /bin/start.sh

ENTRYPOINT ["start.sh"]

