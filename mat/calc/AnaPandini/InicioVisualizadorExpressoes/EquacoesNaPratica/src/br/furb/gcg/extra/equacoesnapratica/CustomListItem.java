package br.furb.gcg.extra.equacoesnapratica;

import java.io.Serializable;

public class CustomListItem implements Serializable {

	private static final long serialVersionUID = -4609968376854957726L;

	private long ID;
	private String texto;
	private boolean selecionada;

	public CustomListItem(String texto, long ID) {
		this.texto = texto;
		this.selecionada = false;
		this.ID = ID;
	}

	public String getTexto() {
		return texto;
	}

	public boolean isSelecionada() {
		return selecionada;
	}

	public void setSelecionada(boolean selecionada) {
		this.selecionada = selecionada;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public long getID() {
		return ID;
	}

	public void setID(long iD) {
		ID = iD;
	}

}
