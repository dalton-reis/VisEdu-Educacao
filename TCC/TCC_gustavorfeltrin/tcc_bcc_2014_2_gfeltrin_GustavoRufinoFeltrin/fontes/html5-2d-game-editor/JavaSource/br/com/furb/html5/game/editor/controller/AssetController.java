package br.com.furb.html5.game.editor.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;

import br.com.furb.html5.game.editor.model.Asset;
import br.com.furb.html5.game.editor.utils.UserUtils;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class AssetController {
	
	//public static final String DATA_PATH = "/home/marcos/editor_data/assets/";
	public static final String DATA_PATH = String.format("%s%s", UserUtils.getUserHome(), "/editor_data/assets/");

	public List<Asset> getAssets() throws Exception{
		List<Asset> assets = new ArrayList<Asset>();
		File dir = new File(DATA_PATH);
		
		for(File arc : dir.listFiles()){
			String name = arc.getName().substring(0, arc.getName().lastIndexOf("."));
			String path = arc.getAbsolutePath();
			String ext = arc.getName().substring(arc.getName().lastIndexOf(".")+1);
			String type = "AUDIO";
			
			if(ext.equalsIgnoreCase("png")  ||
			   ext.equalsIgnoreCase("jpg")  ||
			   ext.equalsIgnoreCase("jpeg") ||
			   ext.equalsIgnoreCase("gif")) {
				type = "IMAGE";
			}
			
			if (ext.equalsIgnoreCase("asl")) {
				type = "JASON MIND";
			}

			Asset asset = new Asset(name, path, type, null, ext);
			assets.add(asset);
		}
		
		return assets;
	}
	
	public void saveAsset(Asset asset) throws Exception{
		File arc = new File(DATA_PATH + asset.getName() + "." + asset.getExt());
		FileOutputStream fos = new FileOutputStream(arc);
		IOUtils.write(asset.getContent(), fos);
		fos.close();
	}
	
	public void deleteAsset(Asset asset) throws Exception{
		File arc = new File(DATA_PATH + asset.getName() + "." + asset.getExt());
		arc.delete();
	}
	
}
