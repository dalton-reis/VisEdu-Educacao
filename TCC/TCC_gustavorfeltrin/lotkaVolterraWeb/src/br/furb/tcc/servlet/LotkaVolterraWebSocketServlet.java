package br.furb.tcc.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import br.furb.tcc.websocket.ConnectionWS;

@SuppressWarnings("deprecation")
@WebServlet("/websocket")
public class LotkaVolterraWebSocketServlet extends WebSocketServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
		return new ConnectionWS("");
	}
	
}