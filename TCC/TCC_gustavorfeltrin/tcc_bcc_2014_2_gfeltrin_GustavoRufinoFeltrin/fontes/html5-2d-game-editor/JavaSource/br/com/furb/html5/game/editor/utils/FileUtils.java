package br.com.furb.html5.game.editor.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class FileUtils {
	
	public static void createTempFiles(String srcDir, String folder) throws Exception{
		ServletContext context = (ServletContext) FacesContext.getCurrentInstance().getExternalContext().getContext();
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
		String sessionId = "session_" + session.getId();
		String tempDir = context.getRealPath("/") + sessionId + "/" + folder + "/";
		
		File dest = new File(tempDir);
		File dir = new File(srcDir);
		
		for(File arc : dir.listFiles()){
			if(!arc.getName().endsWith(".config")){
				FileInputStream fis = new FileInputStream(arc);
				byte[] content = new byte[(int) arc.length()];
				IOUtils.readFully(fis, content);
				fis.close();
					
				if(!dest.exists()){
					dest.mkdirs();
				}
				
				FileOutputStream fos = new FileOutputStream(new File(dest, arc.getName()));
				IOUtils.write(content, fos);
				fos.close();
			}
		}
	}
	
	public static String getRelativeResourcePath(String folder) throws Exception{
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
		String sessionId = "session_" + session.getId();
		return "/html5-2d-game-editor/" + sessionId + "/" + folder + "/";
	}

}
