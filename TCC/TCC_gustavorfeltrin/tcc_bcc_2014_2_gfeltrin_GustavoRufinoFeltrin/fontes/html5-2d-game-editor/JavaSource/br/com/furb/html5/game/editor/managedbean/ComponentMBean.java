package br.com.furb.html5.game.editor.managedbean;

import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import br.com.furb.html5.game.editor.controller.ComponentController;
import br.com.furb.html5.game.editor.model.Component;

/**
 * 
 * @author Marcos Harbs
 *
 */
@ManagedBean(name = ComponentMBean.MBEAN_NAME)
@SessionScoped
public class ComponentMBean {

	public static final String MBEAN_NAME = "componentMBean";
	
	private ComponentController componentController = new ComponentController();
	
	private List<Component> components = new ArrayList<Component>();
	private Boolean isEdit = false;
	private Component componentToRemove;
	private Component componentToEdit;
	
	public void onConsultComponents(){
		try{
			this.components = this.componentController.getComponents();
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onDeleteComponent(){
		try{
			this.componentController.deleteComponent(this.componentToRemove);
			this.components = this.componentController.getComponents();
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Component Removed!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onSaveComponent(){
		try{
			boolean error = false;
			if(this.componentToEdit.getName().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Name is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				error = true;
			}
			if(this.componentToEdit.getInit().isEmpty()){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Init Function is required.", null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
				error = true;
			}
			if(error){
				return;
			}
			
			this.componentController.saveComponent(this.componentToEdit);
			this.isEdit = true;
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Component Saved!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}finally{
			try {
				this.components = this.componentController.getComponents();
			} catch (Exception e) {
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
				FacesContext.getCurrentInstance().addMessage(null, msg);
			}
		}
	}
	
	public void onEditComponent(){
		this.isEdit = true;
	}
	
	public void onNewComponent(){
		this.isEdit = false;
		this.componentToEdit = new Component("", "", "");
	}

	public List<Component> getComponents() {
		return components;
	}

	public void setComponents(List<Component> components) {
		this.components = components;
	}

	public Component getComponentToRemove() {
		return componentToRemove;
	}

	public void setComponentToRemove(Component componentToRemove) {
		this.componentToRemove = componentToRemove;
	}

	public Component getComponentToEdit() {
		return componentToEdit;
	}

	public void setComponentToEdit(Component componentToEdit) {
		this.componentToEdit = componentToEdit;
	}

	public Boolean getIsEdit() {
		return isEdit;
	}

	public void setIsEdit(Boolean isEdit) {
		this.isEdit = isEdit;
	}
	
}
