package br.com.furb.html5.game.editor.managedbean;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.primefaces.context.RequestContext;
import org.primefaces.event.FileUploadEvent;
import org.primefaces.event.NodeCollapseEvent;
import org.primefaces.event.NodeExpandEvent;
import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.DefaultTreeNode;
import org.primefaces.model.StreamedContent;
import org.primefaces.model.TreeNode;

import br.com.furb.html5.game.editor.controller.AssetController;
import br.com.furb.html5.game.editor.controller.ComponentController;
import br.com.furb.html5.game.editor.controller.ExportProjectController;
import br.com.furb.html5.game.editor.controller.GameObjectController;
import br.com.furb.html5.game.editor.controller.GameProjectController;
import br.com.furb.html5.game.editor.controller.ImportProjectController;
import br.com.furb.html5.game.editor.model.Component;
import br.com.furb.html5.game.editor.model.GameObject;
import br.com.furb.html5.game.editor.model.JSObjectInstance;
import br.com.furb.html5.game.editor.utils.FolderZiper;

/**
 * 
 * @author Marcos Harbs
 *
 */
@ManagedBean(name = GameProjectMBean.MBEAN_NAME)
@SessionScoped
public class GameProjectMBean {
	
	public static final String MBEAN_NAME = "gameProjectMBean";
	
	private TreeNode projectRoot;
	private JSObjectInstance oldSelectedNode;
	private TreeNode selectedNode;
	
	private ComponentController componentController = new ComponentController();
	private GameObjectController gameObjectController = new GameObjectController();
	private GameProjectController gameProjectController = new GameProjectController();
	private ExportProjectController exportProjectController = new ExportProjectController();
	private ImportProjectController importProjectController = new ImportProjectController();
	
	private List<Component> components;
	private Component selectedComponent;
	private List<GameObject> gameObjects;
	private GameObject selectedGameObject;
	
	private JSObjectInstance newObjectInstance;
	
	private String renderGame;
	private Boolean playDisabled = false;
	private Boolean pauseDisabled = true;
	private Boolean stopDisabled = true;
	
	private StreamedContent file;
	private StreamedContent buildFile;

	public void nodeExpandListener(NodeExpandEvent event){
		event.getTreeNode().setExpanded(true);
	}
	
	public void nodeCollapseListener(NodeCollapseEvent event){
		event.getTreeNode().setExpanded(false);
	}

	public String getRenderGame() {
		return renderGame;
	}

	public void setRenderGame(String renderGame) {
		this.renderGame = renderGame;
	}
	
	public void onImportProject(FileUploadEvent event) {  
		try{
			String jsonContent = new String(event.getFile().getContents());
			this.projectRoot = new DefaultTreeNode("Root", null);
			this.importProjectController.importJsonFile(this.projectRoot, jsonContent);
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Opened!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
    }
	
	public void onExportProject(){
		try {
			if(this.projectRoot != null){
				String jsonContent = this.exportProjectController.generateJsonFile(this.projectRoot);
				InputStream is = new ByteArrayInputStream(jsonContent.getBytes());
				this.file = new DefaultStreamedContent(is, "text/json", "game.json");
				
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Saved!", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
			}
		} catch (Exception e) {
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			e.printStackTrace();
		}
	}
	
	public void onBuildProject(){
		try {
			if(this.projectRoot != null){
				ServletContext context = (ServletContext) FacesContext.getCurrentInstance().getExternalContext().getContext();
				HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true);
				String sessionId = "session_" + session.getId();
				String tempDir = context.getRealPath("/") + sessionId + "/";
				
				File dest = new File(tempDir, "build");
				File js = new File(dest, "js");
				File assets = new File(dest, "assets");
				
				if(dest.exists()){
					dest.delete();
				}
				
				dest.mkdirs();
				js.mkdirs();
				assets.mkdirs();
				
				FileUtils.copyDirectory(new File(context.getRealPath("/htdocs/js")), js);
				FileUtils.copyDirectory(new File(ComponentController.DATA_PATH), new File(js, "engine/src/component"));
				FileUtils.copyDirectory(new File(GameObjectController.DATA_PATH), new File(js, "engine/src/gameobject"));
				FileUtils.copyDirectory(new File(AssetController.DATA_PATH), assets);
				
				String gameContent = this.gameProjectController.getJSGame(this.projectRoot, true);
				
				FileOutputStream fos = new FileOutputStream(new File(dest, "game.html"));
				IOUtils.write(gameContent, fos);
				fos.close();
				
				File gameZip = new File(tempDir, "game.zip");
				
				FolderZiper.zipFolder(dest.getAbsolutePath(), gameZip.getAbsolutePath());
				
				InputStream is = new FileInputStream(gameZip);
				this.buildFile = new DefaultStreamedContent(is, "application/octet-stream", "game.zip");
				
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Exported!", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
			}
		} catch (Exception e) {
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			e.printStackTrace();
		}
	}
	
	public void onPlayError(){
		try {
			if(this.projectRoot == null){
				return;
			}
			this.renderGame="";
			this.playDisabled = false;
			this.pauseDisabled = true;
			this.stopDisabled = true;
		} catch (Exception e) {
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			e.printStackTrace();
		}
	}
	
	public void onPlayGame(){
		try {
			if(this.projectRoot == null){
				return;
			}
			this.renderGame = this.gameProjectController.getJSGame(this.projectRoot, false);
			this.playDisabled = true;
			this.pauseDisabled = false;
			this.stopDisabled = false;
		} catch (Exception e) {
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			e.printStackTrace();
		}
	}
	
	public void onStopGame(){
		try {
			this.renderGame = "";
			this.playDisabled = false;
			this.pauseDisabled = true;
			this.stopDisabled = true;
		} catch (Exception e) {
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			e.printStackTrace();
		}
	}
	
	public void onPauseGame(){}

	public void onMoveUp(){
		try{
			List<TreeNode> nodes = this.selectedNode.getParent().getChildren();
			int index = nodes.indexOf(this.selectedNode);
			if(index != -1 && index > 0){
				TreeNode upNode = nodes.get(index-1);
				nodes.set(index-1, this.selectedNode);
				nodes.set(index, upNode);
			}
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onMoveDown(){
		try{
			List<TreeNode> nodes = this.selectedNode.getParent().getChildren();
			int index = nodes.indexOf(this.selectedNode);
			if(index != -1 && index < (nodes.size()-1)){
				TreeNode downNode = nodes.get(index+1);
				nodes.set(index+1, this.selectedNode);
				nodes.set(index, downNode);
			}
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onNewComponent(){
		try{
			this.components = this.componentController.getComponents();	
			this.newObjectInstance = new JSObjectInstance(UUID.randomUUID().toString(), 
					                                      ((JSObjectInstance)this.selectedNode.getData()).getId(), 
					                                      "COMPONENT", 
					                                      "", 
					                                      "", 
					                                      "", 
					                                      "");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onNewGameObject(){
		try{
			this.gameObjects = this.gameObjectController.getGameObjects();	
			this.newObjectInstance = new JSObjectInstance(UUID.randomUUID().toString(), 
					                                      ((JSObjectInstance)this.selectedNode.getData()).getId(), 
					                                      "GAME_OBJECT", 
					                                      "", 
					                                      "", 
					                                      "", 
					                                      "");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onNewLayer(){
		try{
			this.newObjectInstance = new JSObjectInstance(UUID.randomUUID().toString(), 
					                                      ((JSObjectInstance)this.selectedNode.getData()).getId(), 
					                                      "LAYER", 
					                                      "Layer", 
					                                      "layer", 
					                                      "new Layer().initialize();", 
					                                      "");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onComponentSelected(){
		try{
			this.newObjectInstance.setDisplayNodeName(this.selectedComponent.getName().replace(".js", ""));
			this.newObjectInstance.setJsVarName("");
			this.newObjectInstance.setJsInitialFunction(this.selectedComponent.getInit());
			this.newObjectInstance.setJsCode("");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onGameObjectSelected(){
		try{
			this.newObjectInstance.setDisplayNodeName(this.selectedGameObject.getName().replace(".js", ""));
			this.newObjectInstance.setJsVarName("");
			this.newObjectInstance.setJsInitialFunction(this.selectedGameObject.getInit());
			this.newObjectInstance.setJsCode("");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onSaveNewComponent(){
		try{
			boolean erro = false;
			if(this.newObjectInstance.getJsVarName().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Variable Name is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				erro = true;
			}
			if(this.newObjectInstance.getJsInitialFunction().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Initial Function is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				erro = true;
			}
			if(erro){
				return;
			}
			
			new DefaultTreeNode(this.newObjectInstance.getType(), this.newObjectInstance, this.selectedNode);
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Component Added!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			
			RequestContext.getCurrentInstance().execute("dialogVarAddComponentNode.hide()");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onSaveNewGameObject(){
		try{
			boolean erro = false;
			if(this.newObjectInstance.getJsVarName().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Variable Name is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				erro = true;
			}
			if(this.newObjectInstance.getJsInitialFunction().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Initial Function is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				erro = true;
			}
			if(erro){
				return;
			}
			
			new DefaultTreeNode(this.newObjectInstance.getType(), this.newObjectInstance, this.selectedNode);
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Object Added!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			
			RequestContext.getCurrentInstance().execute("dialogVarAddGameObjectNode.hide()");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onSaveNewLayer(){
		try{
			boolean erro = false;
			if(this.newObjectInstance.getJsVarName().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Variable Name is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				erro = true;
			}
			if(this.newObjectInstance.getJsInitialFunction().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Initial Function is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				erro = true;
			}
			if(erro){
				return;
			}
			
			new DefaultTreeNode(this.newObjectInstance.getType(), this.newObjectInstance, this.selectedNode);
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Layer Added!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			
			RequestContext.getCurrentInstance().execute("dialogVarAddLayerNode.hide()");
		}catch (Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onDeleteSelectedNode(){
		try{
			this.selectedNode.getParent().getChildren().remove(this.selectedNode);
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Instance Removed!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onCreateNewProject(){
		try{
			this.createNewProject();
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onSaveGameInstance(){
		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Instance Saved!", null);
		FacesContext.getCurrentInstance().addMessage(null, msg);
	}
	
	public void onSaveSceneInstance(){
		boolean error = false;
		JSObjectInstance scene = (JSObjectInstance) this.selectedNode.getData();
		if(scene.getJsInitialFunction().isEmpty()){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Initial Function is required.", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			error = true;
		}
		if(error){
			scene.setJsInitialFunction(this.oldSelectedNode.getJsInitialFunction());
			scene.setJsCode(this.oldSelectedNode.getJsCode());
			return;
		}
		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Scene Instance Saved!", null);
		FacesContext.getCurrentInstance().addMessage(null, msg);
	}
	
	public void onSaveLayerInstance(){
		boolean error = false;
		JSObjectInstance layer = (JSObjectInstance) this.selectedNode.getData();
		if(layer.getJsVarName().isEmpty()){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Variable Name is required.", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			error = true;
		}
		if(layer.getJsInitialFunction().isEmpty()){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Initial Function is required.", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			error = true;
		}
		if(error){
			layer.setJsVarName(this.oldSelectedNode.getJsVarName());
			layer.setJsInitialFunction(this.oldSelectedNode.getJsInitialFunction());
			layer.setJsCode(this.oldSelectedNode.getJsCode());
			return;
		}
		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Layer Instance Saved!", null);
		FacesContext.getCurrentInstance().addMessage(null, msg);
	}
	
	public void onSaveComponentInstance(){
		boolean error = false;
		JSObjectInstance component = (JSObjectInstance) this.selectedNode.getData();
		if(component.getJsVarName().isEmpty()){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Variable Name is required.", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			error = true;
		}
		if(component.getJsInitialFunction().isEmpty()){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Initial Function is required.", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			error = true;
		}
		if(error){
			component.setJsVarName(this.oldSelectedNode.getJsVarName());
			component.setJsInitialFunction(this.oldSelectedNode.getJsInitialFunction());
			component.setJsCode(this.oldSelectedNode.getJsCode());
			return;
		}
		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Component Instance Saved!", null);
		FacesContext.getCurrentInstance().addMessage(null, msg);
	}
	
	public void onSaveGameObjectInstance(){
		boolean error = false;
		JSObjectInstance gameObject = (JSObjectInstance) this.selectedNode.getData();
		if(gameObject.getJsVarName().isEmpty()){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Variable Name is required.", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			error = true;
		}
		if(gameObject.getJsInitialFunction().isEmpty()){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Initial Function is required.", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
			error = true;
		}
		if(error){
			gameObject.setJsVarName(this.oldSelectedNode.getJsVarName());
			gameObject.setJsInitialFunction(this.oldSelectedNode.getJsInitialFunction());
			gameObject.setJsCode(this.oldSelectedNode.getJsCode());
			return;
		}
		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Object Instance Saved!", null);
		FacesContext.getCurrentInstance().addMessage(null, msg);
	}
	
	private void createNewProject() throws Exception{
		JSObjectInstance game = new JSObjectInstance(UUID.randomUUID().toString(), 
				                                     null, 
				                                     "GAME", 
				                                     "Game", 
				                                     "Game", 
				                                     "Game.init(document.getElementById(\"gameCanvas\"), scene);", 
				                                     "Game.camera.centerPoint.x = 455; Game.camera.centerPoint.y = 315;");
		JSObjectInstance scene = new JSObjectInstance(UUID.randomUUID().toString(), 
				                                      game.getId(), 
				                                      "SCENE", 
				                                      "Scene", 
				                                      "scene", 
				                                      "new Scene().initialize(-1000, -1000, 1000, 1000);", 
				                                      "");
		JSObjectInstance layer = new JSObjectInstance(UUID.randomUUID().toString(), 
				                                      scene.getId(), 
				                                      "LAYER", 
				                                      "Layer", 
				                                      "layer", 
				                                      "new Layer().initialize();", 
				                                      "");
		
		this.projectRoot = new DefaultTreeNode("Root", null);
		TreeNode gameNode = new DefaultTreeNode(game.getType(), game, this.projectRoot);  
		TreeNode sceneNode = new DefaultTreeNode(scene.getType(), scene, gameNode);
		new DefaultTreeNode(layer.getType(), layer, sceneNode);
	}

	public TreeNode getProjectRoot() {
		return projectRoot;
	}

	public void setProjectRoot(TreeNode projectRoot) {
		this.projectRoot = projectRoot;
	}

	public TreeNode getSelectedNode() {
		return selectedNode;
	}

	public void setSelectedNode(TreeNode selectedNode) {
		if(selectedNode != null){
		 	JSObjectInstance jsObject = (JSObjectInstance) selectedNode.getData();
			this.oldSelectedNode = new JSObjectInstance(jsObject.getId(), 
					                                    jsObject.getIdParent(), 
					                                    jsObject.getType(), 
					                                    jsObject.getDisplayNodeName(), 
					                                    jsObject.getJsVarName(),
					                                    jsObject.getJsInitialFunction(), 
					                                    jsObject.getJsCode());
		}
		this.selectedNode = selectedNode;
	}

	public List<Component> getComponents() {
		return components;
	}

	public void setComponents(List<Component> components) {
		this.components = components;
	}

	public List<GameObject> getGameObjects() {
		return gameObjects;
	}

	public void setGameObjects(List<GameObject> gameObjects) {
		this.gameObjects = gameObjects;
	}

	public JSObjectInstance getNewObjectInstance() {
		return newObjectInstance;
	}

	public void setNewObjectInstance(JSObjectInstance newObjectInstance) {
		this.newObjectInstance = newObjectInstance;
	}

	public Component getSelectedComponent() {
		return selectedComponent;
	}

	public void setSelectedComponent(Component selectedComponent) {
		this.selectedComponent = selectedComponent;
	}

	public GameObject getSelectedGameObject() {
		return selectedGameObject;
	}

	public void setSelectedGameObject(GameObject selectedGameObject) {
		this.selectedGameObject = selectedGameObject;
	}

	public Boolean getPlayDisabled() {
		return playDisabled;
	}

	public void setPlayDisabled(Boolean playDisabled) {
		this.playDisabled = playDisabled;
	}

	public Boolean getPauseDisabled() {
		return pauseDisabled;
	}

	public void setPauseDisabled(Boolean pauseDisabled) {
		this.pauseDisabled = pauseDisabled;
	}

	public Boolean getStopDisabled() {
		return stopDisabled;
	}

	public void setStopDisabled(Boolean stopDisabled) {
		this.stopDisabled = stopDisabled;
	}

	public StreamedContent getFile() {
		return file;
	}

	public void setFile(StreamedContent file) {
		this.file = file;
	}

	public StreamedContent getBuildFile() {
		return buildFile;
	}

	public void setBuildFile(StreamedContent buildFile) {
		this.buildFile = buildFile;
	}

}
