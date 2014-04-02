package br.com.furb.html5.game.editor.controller;

import java.util.ArrayList;
import java.util.List;

import org.primefaces.model.TreeNode;

import br.com.furb.html5.game.editor.model.JSObjectInstance;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class ExportProjectController {
	
	public String generateJsonFile(TreeNode root) throws Exception{
		List<JSObjectInstance> instances = this.getJSObjectInstances(root);
		
		GsonBuilder builder = new GsonBuilder();
		builder = builder.setPrettyPrinting();
        Gson gson = builder.create();
        String json = gson.toJson(instances);

		return json;
	}
	
	private List<JSObjectInstance> getJSObjectInstances(TreeNode root) throws Exception{
		List<JSObjectInstance> instances = new ArrayList<JSObjectInstance>();
		this.getJSObjectInstances(root, instances);
		return instances;
	}
	
	private void getJSObjectInstances(TreeNode parent, List<JSObjectInstance> instances) throws Exception{
		if(parent.getData() != null && parent.getData() instanceof JSObjectInstance){
			JSObjectInstance object = (JSObjectInstance) parent.getData();
			instances.add(object);
		}
		for(TreeNode child : parent.getChildren()){
			this.getJSObjectInstances(child, instances);
		}
	}

}
