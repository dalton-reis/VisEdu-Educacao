/**
 * WebSocket de uma simulação.
 */
HEFESTO.SimulationWS = function (simulation) {
	this._simulation = simulation;
	this._ws = undefined;

	//lista de mensagens
	this._messageQueue = []; 
	this._messageCount = 0; 
}

/**
 * Define o construtor.
 */
HEFESTO.SimulationWS.prototype = {
	construtor: HEFESTO.SimulationWS,

	/**
	 * Configura a conexão e inicia a comunicação com o servidor.
	 */
	init: function () {
		if ('WebSocket' in window) {
			this._ws = new WebSocket("ws://" + HEFESTO._host + "/" + HEFESTO._service + "/" + HEFESTO._servlet);
			console.log("Local: "+"ws://" + HEFESTO._host + "/" + HEFESTO._service + "/" + HEFESTO._servlet);
		} else if ('MozWebSocket' in window) {
			this._ws = new WebSocket("ws://" + HEFESTO._host + "/" + HEFESTO._service + "/" + HEFESTO._servlet);
			console.log("Local: "+"ws://" + HEFESTO._host + "/" + HEFESTO._service + "/" + HEFESTO._servlet);
		} 
		
		if (this._ws == undefined) {
			alert("Browser não suporta WebSocket");
		} else {
			this._ws.simulationScope = this;
			
			this._ws.onopen = function(evt) {
				this.simulationScope.onopen();
			};

			this._ws.onclose = function(evt) {
				this.simulationScope.onclose();
			};

			this._ws.onmessage = function(evt) {
				this.simulationScope.onmessage(evt);
			};

			this._ws.onerror = function(evt) {
				this.simulationScope.onerror();
			};

		}
	},

	/**
	 * Método invocado quando a conexão é aberta.
	 */
	onopen: function () {
		log("Sucess to connect.");
	},

	/**
	 * Método invocado quando a conexão é fechada.
	 */
	onclose: function () {
		log("Sucess to disconnet.");
	},

	/**
	 * Método invocado quando ocorre um erro.
	 */
	onerror: function () {
		log("An error has ocurried.");
	},

	/**
	 * Método invocado quando recebe uma nova mensagem do servidor.
	 * 
	 * Irá despachar a mensagem para a simulação e após o processamento irá marcar como 'ack na fila'.
	 */
	onmessage: function (data) {
		log('RCV: ' + data.data);

		var _data = JSON.parse(data.data);
		// notifica a simulação com a nova mensagem.
		this._simulation.onmessage(_data.type, _data.data);

		// remove mensagem da lista.
		if (_data.id > -1) {
			var first = this._messageQueue.shift();
			if (first.id != _data.id) {
				this._messageQueue.push(first);
				var actual = this._messageQueue.shift();
				while (actual.id != _data.id & actual != first) {
					this._messageQueue.push(actual);
					 actual = this._messageQueue.shift();
				}
			}
		}
	},

	/**
	 * Envia uma mensagem para o servidor.
	 *
	 * @return id da mensagem;
	 */
	sendMessage: function(type, data) {
		//se não está ativa, precisa receber a primeira mensagem do servidor.
		if (!this._simulation._active) {
			return -1;
		}

		var msg = {};
		msg['id'] = this._messageCount++;
		msg['type'] = type;
		msg['data'] = data;

		// enfilera mensagem
				log2(this._messageQueue.length);
		this._messageQueue.push(msg);
		
		this._ws.send(JSON.prune(msg));

		log('SND: ' + msg);
	},

	/**
	 * Verifica se a mensagem foi processada no servidor e está marcada como 'ack' na fila.
	 */
	isWaitingMessage: function() {
		return this._messageQueue.length > 0;
	}

};