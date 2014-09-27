package br.furb.tcc.agents;

import br.furb.tcc.websocket.LotkaVolterraWebSocket;

public class Prey extends AbstractAgent {

	public Prey(String uuid, LotkaVolterraWebSocket connectionWS) {
		super(uuid, connectionWS);
	}

}
