package br.furb.tcc.agents;

import jason.architecture.AgArch;
import jason.asSemantics.ActionExec;
import jason.asSyntax.Literal;
import jason.stdlib.string;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;

import br.furb.tcc.websocket.LotkaVolterraWebSocket;

public abstract class AbstractAgent extends AgArch {

	private LotkaVolterraWebSocket connectionWS = null;
	private List<Literal> perceptions = new ArrayList<Literal>();
	private String uuid;
	
	public AbstractAgent(String uuid, LotkaVolterraWebSocket connectionWS) {
		this.uuid = uuid;
		this.connectionWS = connectionWS;
	}


	@Override
	public void act(ActionExec action, List<ActionExec> feedback) {
		super.act(action, feedback);
		sendMessage( String.format("%s:%s", getAgName(), action.getActionTerm().getTerm(0)) );
		action.setResult(true);
		feedback.add(action);
	}


	@SuppressWarnings("deprecation")
	private boolean sendMessage(String message) {
		try {
			connectionWS.getWsOutbound().writeTextMessage( CharBuffer.wrap(message) );
			return true;
		} catch (IOException e) {
			System.err.println( String.format("Erro ao enviar mensagem: \"%s\"", message) );
			e.printStackTrace();
		}
		return false;
	}
	
	@Override
	public List<Literal> perceive() {
		return perceptions;
	}
	
	public void addPerception(String literal) {
		perceptions.add( Literal.parseLiteral(literal) );
	}
	
	@Override
	public String getAgName() {
		return uuid;
	}
	
}


