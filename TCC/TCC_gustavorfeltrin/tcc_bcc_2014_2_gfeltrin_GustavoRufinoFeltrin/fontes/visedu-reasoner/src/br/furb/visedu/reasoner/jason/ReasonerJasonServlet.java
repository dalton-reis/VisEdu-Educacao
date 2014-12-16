package br.furb.visedu.reasoner.jason;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import br.furb.visedu.log.Log;

@SuppressWarnings("deprecation")
@WebServlet("/jason")
public class ReasonerJasonServlet extends WebSocketServlet {

	private static final long serialVersionUID = 1L;
	
	protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
		String agent = request.getParameter("agent");
		String assetsDir = request.getParameter("assetsDir");
		String aslDir = null;
		if ( !assetsDir.contains( "html5-2d-game-editor" ) ) {
			try {
				Log.info( String.format("Start download of \"%s\" @ %s", agent, assetsDir) );
				aslDir = downloadAgentMind(agent, assetsDir);
				Log.info( String.format("Download complete of \"%s\" @ %s", agent, assetsDir) );
			} catch (IOException e) {
				Log.err( String.format("Download error. File: \"%s\" @ %s", agent, assetsDir) );
				e.printStackTrace();
			}		
		}  
		return new ReasonerJasonWebSocket( agent, aslDir );
	}

	/**
	 * Realiza o download da mente do agente que ser� executado.
	 * @param name Nome do agente
	 * @param dir Diret�rio que est� localizado o arquivo que representa a mente do agente.
	 * @return Caminho do arquivo baixado 
	 * @throws IOException
	 */
	private static String downloadAgentMind(String name, String dir) throws IOException {
		File tmpAsl = File.createTempFile(name, ".asl");		
		URL urlFile = new URL( String.format("%s%s.asl", dir, name) );
		ReadableByteChannel rbc = Channels.newChannel(urlFile.openStream());
		FileOutputStream fos = new FileOutputStream( tmpAsl );
		fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
		return tmpAsl.getAbsolutePath();		
	}
	
}