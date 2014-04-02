package br.com.furb.html5.game.editor.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;

import br.com.furb.html5.game.editor.model.GameObject;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class GameObjectController {
	
	public static final String DATA_PATH = "/home/marcos/editor_data/game_objects/";

	public List<GameObject> getGameObjects() throws Exception{
		List<GameObject> gameObjects = new ArrayList<GameObject>();
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
				gameObjects.add(new GameObject(name, content, init));
			}
		}
		
		return gameObjects;
	}
	
	public void saveGameObject(GameObject gameObject) throws Exception{
		if(!gameObject.getName().contains(".js")){
			gameObject.setName(gameObject.getName() + ".js");
		}
		File arc = new File(DATA_PATH + gameObject.getName());
		FileOutputStream fos = new FileOutputStream(arc);
		IOUtils.write(gameObject.getContent(), fos);
		fos.close();
		File config = new File(DATA_PATH + gameObject.getName().replace(".js", ".config"));
		fos = new FileOutputStream(config);
		IOUtils.write(gameObject.getInit(), fos);
		fos.close();
	}
	
	public void deleteGameObject(GameObject gameObject) throws Exception{
		File arc = new File(DATA_PATH + gameObject.getName());
		File config = new File(DATA_PATH + gameObject.getName().replace(".js", ".config"));
		arc.delete();
		config.delete();
	}
	
}
