package br.furb.tcc.websocket;

import jason.asSyntax.Literal;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Arrays;
import java.util.List;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

import br.furb.tcc.log.Log;
import br.furb.tcc.reasoning.Agente;

@SuppressWarnings("deprecation")
public class LotkaVolterraWebSocket extends MessageInbound {
	
	private static final String HAND_SHAKE = "HAND_SHAKE";
	
	private Agente ag;
	
	public LotkaVolterraWebSocket(String agentName, String aslDir) {
		Log.info("ConnectionWS: " + agentName + " @ " + aslDir);		
		ag = new Agente(agentName, aslDir, this);				
	}
	
	@Override	
	protected void onOpen(WsOutbound outbound) {
		Log.info("onOpen: ");
	}

	@Override
	protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
		System.err.println( "Método não aceito" );
	}
	
	@Override
	protected void onTextMessage(CharBuffer msg) throws IOException {
		Log.info("onTextMessage: " + msg);
		
		if ( HAND_SHAKE.equalsIgnoreCase(msg.toString()) ) {
			sendMessage(HAND_SHAKE);
			return;
		}
		
		List<Literal> perceptions = Arrays.asList( Literal.parseLiteral( msg.toString() ) );
		ag.configureAgent();
		ag.setPerceptions(perceptions);
		ag.run();
	}
	
	public void sendMessage(String message) {
		Log.info("sendMessage: " + message);
		try {
			getWsOutbound().writeTextMessage( CharBuffer.wrap(message) );
		} catch (IOException e) {
			e.printStackTrace();			
		}
	}	

}
