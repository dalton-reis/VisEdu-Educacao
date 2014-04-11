package br.com.furb.html5.game.editor.managedbean;

import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.event.FileUploadEvent;

import br.com.furb.html5.game.editor.controller.AssetController;
import br.com.furb.html5.game.editor.model.Asset;

/**
 * 
 * @author Marcos Harbs
 *
 */
@ManagedBean(name = AssetMBean.MBEAN_NAME)
@SessionScoped
public class AssetMBean {

	public static final String MBEAN_NAME = "assetMBean";
	
	private AssetController assetController = new AssetController();
	
	private List<Asset> assets = new ArrayList<Asset>();
	private Asset assetToRemove;
	
	public void onConsultAssets(){
		try{
			this.assets = this.assetController.getAssets();
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onDeleteAsset(){
		try{
			this.assetController.deleteAsset(this.assetToRemove);
			this.assets = this.assetController.getAssets();
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Asset Removed!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
	}
	
	public void onAssetUpload(FileUploadEvent event) {  
		try{
			String name = event.getFile().getFileName().substring(0, event.getFile().getFileName().lastIndexOf("."));
			String ext = event.getFile().getFileName().substring(event.getFile().getFileName().lastIndexOf(".")+1);
			
			this.assetController.saveAsset(new Asset(name, null, null, event.getFile().getContents(), ext));
			this.assets = this.assetController.getAssets();
			
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Asset Saved!", null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}catch(Exception e){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null);
			FacesContext.getCurrentInstance().addMessage(null, msg);
		}
    }

	public List<Asset> getAssets() {
		return assets;
	}

	public void setAssets(List<Asset> assets) {
		this.assets = assets;
	}

	public Asset getAssetToRemove() {
		return assetToRemove;
	}

	public void setAssetToRemove(Asset assetToRemove) {
		this.assetToRemove = assetToRemove;
	}
	
}
