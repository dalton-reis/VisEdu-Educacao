package br.furb.tcc.websocket;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

import br.furb.tcc.agents.Prey;
import br.furb.tcc.core.AgentManager;
import br.furb.tcc.core.MensagemWS;
import br.furb.tcc.log.Log;

@SuppressWarnings("deprecation")
public class ConnectionWS extends MessageInbound {
	
	public ConnectionWS(String agentName) {
		Log.sysout("ConnectionWS: ");
	}
	
	@Override
	protected void onOpen(WsOutbound outbound) {
		Log.sysout("onOpen: ");			
	}

	@Override
	protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
		System.err.println( "Método não aceito" );
	}
	
	private Prey agente;

	@Override
	protected void onTextMessage(CharBuffer msg) throws IOException {
		Log.sysout("onTextMessage: " + msg);
		MensagemWS mWs = MensagemWS.create( msg.toString() );
		if (! AgentManager.get().containsAgent(mWs.getUuid())) {
			/*Prey*/ agente = new Prey(mWs.getUuid(), this); // FIXME
			AgentManager.get().addAgent(mWs.getUuid(), agente);
		}
		/**
		 * Quando houver o que perceber adicionar. 
		 */
		// AgentManager.get().addPerception(mWs.getUuid(), mWs.getMensagem());
		sendMessage( String.format("%s#%s#%s", mWs.getMensagem(), "green", "black") );
	}
	
	private void sendMessage(String message) {
		Log.sysout("sendMessage: " + message);
		try {
			getWsOutbound().writeTextMessage( CharBuffer.wrap(message) );
		} catch (IOException e) {
			e.printStackTrace();			
		}
	}		

}
