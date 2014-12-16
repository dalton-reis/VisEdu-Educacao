package br.com.furb.html5.game.editor.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;

import br.com.furb.html5.game.editor.model.Component;
import br.com.furb.html5.game.editor.utils.UserUtils;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class ComponentController {
	
	//public static final String DATA_PATH = "/home/marcos/editor_data/components/";
	public static final String DATA_PATH = String.format("%s%s", UserUtils.getUserHome(), "/editor_data/components/");

	public List<Component> getComponents() throws Exception{
		List<Component> components = new ArrayList<Component>();
		File dir = new File(DATA_PATH);
		
		for(File arc : dir.listFiles()){
			if(arc.getName().endsWith(".js")){
				File config = new File(DATA_PATH + arc.getName().replace(".js", ".config"));
				FileInputStream fis = new FileInputStream(arc);
				String content = IOUtils.toString(fis);
				fis.close();
				fis = new FileInputStream(config);
				String init = IOUtils.toString(fis);
				fis.close();
				String name = arc.getName();
				components.add(new Component(name, content, init));
			}
		}
		
		return components;
	}
	
	public void saveComponent(Component component) throws Exception{
		if(!component.getName().contains(".js")){
			component.setName(component.getName() + ".js");
		}
		File arc = new File(DATA_PATH + component.getName());
		FileOutputStream fos = new FileOutputStream(arc);
		IOUtils.write(component.getContent(), fos);
		fos.close();
		File config = new File(DATA_PATH + component.getName().replace(".js", ".config"));
		fos = new FileOutputStream(config);
		IOUtils.write(component.getInit(), fos);
		fos.close();
	}
	
	public void deleteComponent(Component component) throws Exception{
		File arc = new File(DATA_PATH + component.getName());
		File config = new File(DATA_PATH + component.getName().replace(".js", ".config"));
		arc.delete();
		config.delete();
	}

}
