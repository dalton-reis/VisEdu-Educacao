package br.com.furb.html5.game.editor.model;

/**
 * 
 * @author Marcos Harb
 *
 */
public class GameObject {
	
	private String name;
	private String content;
	private String init;

	public GameObject(String name, String content, String init){
		this.name = name;
		this.content = content;
		this.init = init;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getInit() {
		return init;
	}

	public void setInit(String init) {
		this.init = init;
	}
	
}
