/**
 * Objeto responsavel em interagir com a librosjs
 */
var ROSHandler = function(){

	var ros = new ROSLIB.Ros({ url : 'ws://localhost:9090'}); //connect to rosbridge
	ros.on('connection', function(){
		console.log('Connected to websocket server.');
	});
	ros.on('error', function( error ) {
		console.log('Error connecting to websocket server: ', error);
	});
	ros.on('close', function(){
		console.log('Connection to websocket server closed');
	});
	/**ros topic utilizado para decolar o AR.Drone
	 * @type ROSLIB.Topic
	 */
	var takeoff_topic = new ROSLIB.Topic({
		ros : ros,
		name : '/ardrone/takeoff',
		messageType : 'std_msgs/Empty'
	});
	/** ros topic utilizado para pousar o drone
	 */
	var land_topic = new ROSLIB.Topic({
		ros : ros,
		name : '/ardrone/land',
		messageType : 'std_msgs/Empty'
	});
	/** ros topic utilizado para movimentar o drone
	 */
	var cmdvel_topic = new ROSLIB.Topic({
		ros : ros,
		name : '/cmd_vel',
		messageType : 'geometry_msgs/Twist'
	});

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
	 * Método para movimentar o drone
	 * @function move
	 */
	ROSHandler.prototype.move = function() {
		//TODO
	};
}
