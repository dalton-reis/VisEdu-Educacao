package br.furb.tcc.servlet;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import br.furb.tcc.websocket.ConnectionWS;

@WebServlet("/websocket") 
public class MyWebSocketServlet extends WebSocketServlet { 

	private static final long serialVersionUID = 1L;

	private static final List<ConnectionWS> connections = new ArrayList<ConnectionWS>();

	@Override 
	protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
		System.out.println("createWebSocketInbound");
		String username = request.getParameter("username"); 
		return new ConnectionWS(username); 
	} 

	public static final List<ConnectionWS> getConnections(){
		System.out.println("getConnections");
		return connections; 
	} 

	public static final void broadcast(String message){
		System.out.println("broadcast");
		for (ConnectionWS con : MyWebSocketServlet.getConnections()) { 
			try { 
				con.getWsOutbound().writeTextMessage( CharBuffer.wrap(message) ) ; 
				System.out.println("Enviando mensagem de texto (" + message + ")"); 
			} catch (IOException ioe) {  
				ioe.printStackTrace();
				System.out.println("Aconteceu um erro"); } 
		}
		
	} 
}