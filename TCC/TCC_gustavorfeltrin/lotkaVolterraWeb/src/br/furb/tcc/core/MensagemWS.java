package br.furb.tcc.core;

import java.util.Scanner;


public class MensagemWS {
	
	private String uuid;
	
	private String mensagem;
	
	private MensagemWS(String uuid, String mensagem) {
		this.uuid = uuid;
		this.mensagem = mensagem;
	}

	public static MensagemWS create(String mensagemWs) {
		Scanner scan = new Scanner(mensagemWs);
		scan.useDelimiter("#");
		MensagemWS msg = new MensagemWS(scan.next(), scan.next());
		scan.close();
		return msg;
	}

	public String getUuid() {
		return uuid;
	}

	public String getMensagem() {
		return mensagem;
	}

	@Override
	public String toString() {
		return "MensagemWS [uuid=" + uuid + ", mensagem=" + mensagem + "]";
	}

}
