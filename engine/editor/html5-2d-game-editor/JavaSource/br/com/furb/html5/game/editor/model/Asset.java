package br.com.furb.html5.game.editor.model;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class Asset {
	
	private String name;
	private String path;
	private String type;
	private byte[] content;
	private String ext;
	
	public Asset(String name, String path, String type, byte[] content, String ext){
		this.name = name;
		this.path = path;
		this.type = type;
		this.content = content;
		this.ext = ext;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

}
