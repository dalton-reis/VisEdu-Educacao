package br.com.furb.html5.game.editor.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.primefaces.model.DefaultTreeNode;
import org.primefaces.model.TreeNode;

import br.com.furb.html5.game.editor.model.JSObjectInstance;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class ImportProjectController {
	
	public void importJsonFile(TreeNode root, String json) throws Exception{
		GsonBuilder builder = new GsonBuilder();
		Gson gson = builder.create();
		List<JSObjectInstance> instances = Arrays.asList(gson.fromJson(json, JSObjectInstance[].class));
		
		Map<String, TreeNode> nodes = new HashMap<String, TreeNode>();
		
		for(JSObjectInstance instance : instances){
			TreeNode node = new DefaultTreeNode(instance.getType(), instance, null);  
			nodes.put(instance.getId(), node);
		}
		
		for(JSObjectInstance instance : instances){
			TreeNode node = nodes.get(instance.getId());
			if(instance.getIdParent() == null){
				node.setParent(root);
			}else{
				node.setParent(nodes.get(instance.getIdParent()));
			}
		}
	}

}
