package br.furb.tcc.websocket;

import jason.asSyntax.Literal;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Arrays;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

import br.furb.tcc.log.Log;
import br.furb.tcc.reasoning.Agente;

@SuppressWarnings("deprecation")
public class ConnectionWS extends MessageInbound {
	
	private String agentName;
	
	public ConnectionWS(String agentName) {
		this.agentName = agentName;
		Log.sysout("ConnectionWS: " + agentName);		
	}
	
	@Override
	protected void onOpen(WsOutbound outbound) {
		Log.sysout("onOpen: ");			
	}

	@Override
	protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
		System.err.println( "Método não aceito" );
	}
	
	@Override
	protected void onTextMessage(CharBuffer msg) throws IOException {
		Log.sysout("onTextMessage: " + msg);		
		String[] arrMsg = msg.toString().split("#");		
		Agente ag = new Agente(agentName, Arrays.asList( Literal.parseLiteral( arrMsg[1] ) ), this);		
		ag.run();
//		sendMessage( String.format("%s#%s#%s", mWs.getMensagem(), "green", "black") );
	}
	
	public void sendMessage(String message) {
		Log.sysout("sendMessage: " + message);
		try {
			getWsOutbound().writeTextMessage( CharBuffer.wrap(message) );
		} catch (IOException e) {
			e.printStackTrace();			
		}
	}	

}
