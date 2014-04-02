package br.com.furb.html5.game.editor.model;

import java.io.Serializable;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class JSObjectInstance implements Serializable {

	private static final long serialVersionUID = -158279323415542994L;
	
	private String id;
	private String idParent;
	private String type;
	private String displayNodeName;
	private String jsVarName;
	private String jsInitialFunction;
	private String jsCode;
	
	public JSObjectInstance() {
		
	}
	public JSObjectInstance(String id, 
			                String idParent, 
			                String type, 
			                String displayNodeName,
			                String jsVarName, 
			                String jsInitialFunction, 
			                String jsCode) {
		
		this.id = id;
		this.idParent = idParent;
		this.type = type;
		this.displayNodeName = displayNodeName;
		this.jsVarName = jsVarName;
		this.jsInitialFunction = jsInitialFunction;
		this.jsCode = jsCode;	
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIdParent() {
		return idParent;
	}
	public void setIdParent(String idParent) {
		this.idParent = idParent;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getJsVarName() {
		return jsVarName;
	}
	public void setJsVarName(String jsVarName) {
		this.jsVarName = jsVarName;
	}
	public String getJsInitialFunction() {
		return jsInitialFunction;
	}
	public void setJsInitialFunction(String jsInitialFunction) {
		this.jsInitialFunction = jsInitialFunction;
	}
	public String getJsCode() {
		return jsCode;
	}
	public void setJsCode(String jsCode) {
		this.jsCode = jsCode;
	}
	public String getDisplayNodeName() {
		return displayNodeName;
	}
	public void setDisplayNodeName(String displayNodeName) {
		this.displayNodeName = displayNodeName;
	}

}
