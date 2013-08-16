package br.furb.expressoesnumericas.interpretador1;

public class Teste {

	public static void main(String[] args) {
		NumExpLexico lexico = new NumExpLexico();
		NumExpSintatico sintatico = new NumExpSintatico();
		NumExpSemantico semantico = new NumExpSemantico();


		String line = "x=1+2-(3y-4)+(4*8)";

		lexico.setInput(line);

		try {
			sintatico.parse(lexico, semantico);
			System.out.println(semantico.getResult());
		} catch (LexicalError e) {
			e.printStackTrace();
		} catch (SyntaticError e) {
			e.printStackTrace();
		} catch (SemanticError e) {
			e.printStackTrace();
		}
	}
}
