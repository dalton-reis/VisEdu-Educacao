package br.com.furb.html5.game.editor.managedbean;

import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import br.com.furb.html5.game.editor.controller.GameObjectController;
import br.com.furb.html5.game.editor.model.GameObject;

/**
 * 
 * @author Marcos Harbs
 *
 */
@ManagedBean(name = GameObjectMBean.MBEAN_NAME)
@SessionScoped
public class GameObjectMBean {

	public static final String MBEAN_NAME = "gameObjectMBean";
	
	private GameObjectController gameObjectController = new GameObjectController();
	
	private List<GameObject> gameObjects = new ArrayList<GameObject>();
	private Boolean isEdit = false;
	private GameObject gameObjectToRemove;
	private GameObject gameObjectToEdit;
	
	public void onConsultGameObjects(){
		try{
			this.gameObjects = this.gameObjectController.getGameObjects();
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onDeleteGameObject(){
		try{
			this.gameObjectController.deleteGameObject(this.gameObjectToRemove);
			this.gameObjects = this.gameObjectController.getGameObjects();
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Object Removed!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onSaveGameObject(){
		try{
			boolean error = false;
			if(this.gameObjectToEdit.getName().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Name is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				error = true;
			}
			if(this.gameObjectToEdit.getInit().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Init Function is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				error = true;
			}
			if(error){
				return;
			}
			
			this.gameObjectController.saveGameObject(this.gameObjectToEdit);
			this.isEdit = true;
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Game Object Saved!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}finally{
			try{
				this.gameObjects = this.gameObjectController.getGameObjects();
			}catch(Exception e){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
			}
		}
	}
	
	public void onEditGameObject(){
		this.isEdit = true;
	}
	
	public void onNewGameObject(){
		this.isEdit = false;
		this.gameObjectToEdit = new GameObject("", "", "");
	}

	public List<GameObject> getGameObjects() {
		return gameObjects;
	}

	public void setGameObjects(List<GameObject> gameObjects) {
		this.gameObjects = gameObjects;
	}

	public GameObject getGameObjectToRemove() {
		return gameObjectToRemove;
	}

	public void setGameObjectToRemove(GameObject gameObjectToRemove) {
		this.gameObjectToRemove = gameObjectToRemove;
	}

	public GameObject getGameObjectToEdit() {
		return gameObjectToEdit;
	}

	public void setGameObjectToEdit(GameObject gameObjectToEdit) {
		this.gameObjectToEdit = gameObjectToEdit;
	}

	public Boolean getIsEdit() {
		return isEdit;
	}

	public void setIsEdit(Boolean isEdit) {
		this.isEdit = isEdit;
	}
	
}
