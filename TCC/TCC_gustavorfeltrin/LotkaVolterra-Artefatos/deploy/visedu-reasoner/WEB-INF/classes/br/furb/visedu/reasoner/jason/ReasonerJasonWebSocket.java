package br.furb.visedu.reasoner.jason;

import jason.asSyntax.Literal;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;
import org.json.JSONArray;
import org.json.JSONObject;

import br.furb.visedu.log.Log;

@SuppressWarnings("deprecation")
public class ReasonerJasonWebSocket extends MessageInbound {
	
	private static final String HAND_SHAKE = "HAND_SHAKE";
	private JSONObject json;
	
	private Agente ag;
	
	public ReasonerJasonWebSocket(String agentName, String aslDir) {
		Log.info("new Agent: " + agentName + " @ " + aslDir);		
		ag = new Agente(agentName, aslDir, this);				
	}
	
	@Override	
	protected void onOpen(WsOutbound outbound) {
		Log.info("onOpen: " + ag.getAgName());
	}

	@Override
	protected void onBinaryMessage(ByteBuffer bb) throws IOException {
		throw new IOException("Method is not implemented!");
	}
	
	@Override
	protected void onTextMessage(CharBuffer msg) throws IOException {
		Log.info("onTextMessage: " + msg);
		
		if ( HAND_SHAKE.equalsIgnoreCase(msg.toString()) ) {
			sendMessage(HAND_SHAKE);
			return;
		}
		
		json = new JSONObject(msg.toString());
		String sPerceptions = (String) json.get("perceptions");
		JSONArray ja = new JSONArray(sPerceptions);
		
		List<Literal> perceptions = new ArrayList<Literal>();
		for (int i = 0; i < ja.length(); i++) {
			perceptions.add( Literal.parseLiteral( ja.getString(i) ) );
		}		
		ag.configureAgent();
		ag.setPerceptions(perceptions);
		ag.run();
	}
	
	public void sendMessage(String message) {
		if ( !HAND_SHAKE.equalsIgnoreCase(message) ) {
			json.put("action", message);
			message = json.toString();
		}
		Log.info("sendMessage: " + message);
		try {
			getWsOutbound().writeTextMessage( CharBuffer.wrap(message) );
		} catch (IOException e) {
			e.printStackTrace();			
		}
	}	

}
