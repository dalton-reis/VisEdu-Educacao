/**
 * Objeto responsavel em interagir com a librosjs
 */
var ROSHandler = function() {

	this.ros = new ROSLIB.Ros();
	this.ros.on('connection', ROSHandler.prototype.onConnected);
	this.ros.on('error', ROSHandler.prototype.onError);
	this.ros.on('close', ROSHandler.prototype.onClose);
	/**ros topic utilizado para decolar o AR.Drone
	 * @type ROSLIB.Topic
	 */
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
	/**
	 * Serviço utilizada para calibrar os sensores do drone
	 */
	this.flattrim_service = new ROSLIB.Service({
			ros : this.ros,
			name : '/ardrone/flattrim',
			serviceType : 'std_srvs/Empty'
	});
}

ROSHandler.prototype.onConnected = function (){
	console.log('Connected to websocket server.');
}

ROSHandler.prototype.onError = function(){
	console.log('Error connecting to websocket server: ', error);
}

ROSHandler.prototype.onClose = function(){
	console.log('Connection to websocket server closed');
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
	console.log('takeoff');
	var takeoff = new ROSLIB.Message();
	this.takeoff_topic.publish(takeoff);
};

/**
 * Método para pousar o drone
 * @function land
 */
ROSHandler.prototype.land = function() {
	console.log('land');
	var land = new ROSLIB.Message();
	this.land_topic.publish(land);
};

/**
 * Método para parar o drone
 */
ROSHandler.prototype.stop = function(){
	this.move(0.0, 0.0, 0.0, 0.0);
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
	this.cmdvel_topic.publish(twist);
};

/**
 * Método criado para calibrar as estimaticas de rotação do drone
 */
ROSHandler.prototype.calibrate = function(){
	//TODO - precisar ser testado. Como não tenho o drone no momento não conseguir testar
	var request = new ROSLIB.ServiceRequest({});
	this.flattrim_service.callService(request, function(response){
		console.log(response);
	});
}
