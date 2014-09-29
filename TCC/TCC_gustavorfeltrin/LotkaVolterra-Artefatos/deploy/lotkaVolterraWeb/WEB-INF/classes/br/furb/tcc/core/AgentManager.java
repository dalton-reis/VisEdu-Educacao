package br.furb.tcc.core;

import java.util.HashMap;
import java.util.Map;

import br.furb.tcc.agents.AbstractAgent;

public class AgentManager {
	
	private static final Map<String, AbstractAgent> mapaAgentes = new HashMap<String, AbstractAgent>();
	
	private static AgentManager instance;
	public static AgentManager get() {
		if (instance==null) {
			instance = new AgentManager();
		}
		return instance;
	}
	
	private AgentManager() {
//		RunCentralisedMAS.
	}
	
	public boolean containsAgent(String uuid) {
		return mapaAgentes.containsKey(uuid);
	}
	
	public void addAgent(String uuid, AbstractAgent agente) {
		mapaAgentes.put(uuid, agente);
	}
	
	public AbstractAgent getAgent(String uuid) {
		return mapaAgentes.get(uuid);
	}
	
//	private void stopAgents() {
//        RuntimeServicesInfraTier services = RunCentralisedMAS.getRunner().getEnvironmentInfraTier().getRuntimeServices();
//        for (AgArch agArch : mapaAgentes.values()) {
//        	services.killAgent(agArch.getAgName()); // FIXME
//		}
//    }
	
	public void addPerception(String uuid, String literal) {
		mapaAgentes.get(uuid).addPerception(literal);
	}

}
