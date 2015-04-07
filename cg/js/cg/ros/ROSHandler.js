/**
 * Objeto responsavel em interagir com a librosjs
 */
var ROSHandler = function() {

	this.ros = new ROSLIB.Ros();
	this.ros.on('connection', function(){
		console.log('Connected to websocket server.');
		this.takeoff_topic = new ROSLIB.Topic({
			ros : this.ros,
			name : '/ardrone/takeoff',
			messageType : 'std_msgs/Empty'
		});
		/** ros topic utilizado para pousar o drone
		*/
		this.land_topic = new ROSLIB.Topic({
			ros : this.ros,
			name : '/ardrone/land',
			messageType : 'std_msgs/Empty'
		});
		/** ros topic utilizado para movimentar o drone
		*/
		this.cmdvel_topic = new ROSLIB.Topic({
			ros : this.ros,
			name : '/cmd_vel',
			messageType : 'geometry_msgs/Twist'
		});
	});
	this.ros.on('error', function( error ) {
		console.log('Error connecting to websocket server: ', error);
	});
	this.ros.on('close', function(){
		console.log('Connection to websocket server closed');
	});
	/**ros topic utilizado para decolar o AR.Drone
	 * @type ROSLIB.Topic
	 */
	this.takeoff_topic = undefined;
	/** ros topic utilizado para pousar o drone
	*/
	this.land_topic = undefined;
	/** ros topic utilizado para movimentar o drone
	*/
	this.cmdvel_topic = undefined;
}

/**
 * Método para connectar com o ROS
 */
ROSHandler.prototype.connect = function ( url ) {
	if( url != undefined && url.length > 0){
		if( this.ros.isConnected ){
			this.ros.close();
		}
		this.ros.connect("ws://" + url);
	}
}

/**
 * Método para decolar o drone
 * @function takeoff
 */
ROSHandler.prototype.takeoff = function(){
	var takeoff = new ROSLIB.Message();
	takeoff_topic.publish(takeoff);
};

/**
 * Método para pousar o drone
 * @function land
 */
ROSHandler.prototype.land = function() {
	var land = new ROSLIB.Message();
	land_topic.publish(land);
};

/**
 * Método para parar o drone
 */
ROSHandler.prototype.stop = function(){
	ROSHandler.prototype.move(0.0, 0.0, 0.0, 0.0);
}

/**
 * Método para movimentar o drone
 * @function move
 */
ROSHandler.prototype.move = function(x,y,z,rotation) {
	var twist = new ROSLIB.Message({
		linear: {
			x : x,
			y : y,
			z : z,

		},
		angular: {
			x : 0.0,
			y : 0.0,
			z : rotation,
		}
	});
	cmdvel_topic.publish(twist);
};
