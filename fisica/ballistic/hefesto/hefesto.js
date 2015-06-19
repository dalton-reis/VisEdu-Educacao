var HEFESTO = { REVISION: '1'};

/** Host do servidor HEFESTO */
HEFESTO._host = 'localhost:8089';

/** Serviço HEFESTO */
//HEFESTO._service = 'hefesto-wsNew';
HEFESTO._service = 'hefesto-ws';

/** Nome do WebSocket HEFESTO */
HEFESTO._servlet = 'physics3DSimulationWS';

HEFESTO.guid = function() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function log(msg) {
	if (typeof console !== "undefined") {
		//console.log(msg);
	}
} 


function log2(msg) {
	if (typeof console !== "undefined") {
		//console.log(msg);
	}
} 

function log3(msg) {
	if (typeof console !== "undefined") {
		//console.log(msg);
	}
} 

function log4(msg) {
	if (typeof console !== "undefined") {
		//onsole.log(msg);
	}
} 
