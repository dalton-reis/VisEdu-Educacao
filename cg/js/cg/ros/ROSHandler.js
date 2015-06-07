/**
 * Objeto responsavel em interagir com a librosjs
 */
var ROSHandler = function() {

	this.ros = new ROSLIB.Ros();
	this.ros.on('connection', onConnected);
	this.ros.on('error', onError);
	this.ros.on('close', onClose);
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
	this.movedrone = new ROSLIB.Topic({
			ros : this.ros,
			name : '/visedu/move_drone',
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

	function onConnected(){
		alert("Conexão efetuada com sucesso");
		console.log('Connected to websocket server.');
		move_drone.advertise(); //avise o rosmaster que ira publicar msg
	}

	function onError(){
		alert("Erro de conexão com o ROS");
		console.log('Error connecting to websocket server: ', error);
	}

	function onClose(){
		console.log('Connection to websocket server closed');
	}

	function getCurrentOdometry(){
		return this.current_odom;
	}
};

ROSHandler.prototype.move = function(x,y,z, rotation) {
		var twist = new ROSLIB.Message({
			linear: {
				x : x,
				y : y,
				z : z,
			},
			angular: {x : 0.0,y : 0.0,z : rotation}
		});
		this.move_drone.publish(twist);
};

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
};

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
	this.move_drone.publish(new ROSLIB.Message({linear: {x : 0,y : 0,z : 0},angular: {x : 0.0,y : 0.0,z : 0.0}}));
};

/**
 * Método criado para calibrar as estimaticas de rotação do drone
 */
ROSHandler.prototype.calibrate = function(){
	var request = new ROSLIB.ServiceRequest({});
	this.flattrim_service.callService(request, function(response){
		console.log("Service response = " + response);
	});
}

