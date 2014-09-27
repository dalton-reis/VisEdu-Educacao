package br.furb.tcc.reasoning;

import jason.JasonException;
import jason.architecture.AgArch;
import jason.asSemantics.ActionExec;
import jason.asSemantics.Agent;
import jason.asSemantics.Message;
import jason.asSemantics.TransitionSystem;
import jason.asSyntax.Literal;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import br.furb.tcc.websocket.LotkaVolterraWebSocket;

public class Agente extends AgArch {
	
	private String agName;
	private List<Literal> perceptions = new ArrayList<Literal>();
	private LotkaVolterraWebSocket ws;
	
	private void showInfo(String info) {
		System.out.println( info );
	}
	
	private void showError(String error) {
		System.err.println(error);
	}
	
	public Agente(String agentName, List<Literal> perceptions, LotkaVolterraWebSocket ws) {
		setAgName(agentName);
		setPerceptions(perceptions);
		
		this.ws = ws;
		
		// configurando o agente Jason
		Agent ag = new Agent();
		new TransitionSystem(ag, null, null, this);
		try {
			String uri = getClass().getClassLoader().getResource( String.format("%s.asl", getAgName()) ).toURI().toString();
			ag.initAg( uri );
		} catch (JasonException e) {			
			showError("Init error");
			e.printStackTrace();
		} catch (URISyntaxException e) {
			showError("Load mind error");
			e.printStackTrace();
		}
	}
	
	public void run() {
//        try {
//            while (isRunning()) {
                // chama o motor de Jason para realizar um ciclo de raciocínio
            	showInfo("Reasoning....");
                getTS().reasoningCycle();
//            }
//        } catch (Exception e) {
//        	showError("Run error");
//        	e.printStackTrace();
//        }
    }
	
	@Override
	public String getAgName() {
		return agName;
	}
	
	@Override
	public List<Literal> perceive() {
		return perceptions;
	}
	
	@Override
	public void act(ActionExec action, List<ActionExec> feedback) {
		showInfo("Agent " + getAgName() + " is doing: " + action.getActionTerm());
		ws.sendMessage( action.getActionTerm().toString() );
		action.setResult(true); // define que a execução foi executada
		feedback.add(action);
	}
	
	@Override
	public boolean canSleep() {
		return true;
	}
	
	@Override
	public boolean isRunning() {
		return true;
	}
	
	@Override
	public void sleep() {
		sleep(1000);
	}
	
	private void sleep(final long millis) { try { Thread.sleep(millis); } catch (Exception e) { } }
	
	@Override
	public void sendMsg(Message m) throws Exception {		
	}
	
	@Override
	public void broadcast(Message m) throws Exception {
	
	}
	
	@Override
	public void checkMail() {
	}
	
	public void setAgName(String agName) {
		this.agName = agName;
	}
	
	public void setPerceptions(List<Literal> perceptions) {
		this.perceptions = perceptions;
	}
	
	public void setWs(LotkaVolterraWebSocket ws) {
		this.ws = ws;
	}

}
