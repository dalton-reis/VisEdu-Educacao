package br.furb.expressoesnumericas.interpretador2;

import java.util.Stack;

import br.furb.expressoesnumericas.interpretador1.SemanticError;

public class NumExpSemantico implements Constants {
	Stack<Double> stack = new Stack<Double>();

	public void executeAction(int action, Token token) throws SemanticError {
		Double a, b;

		switch (action) {
		case 1:
			String tmp = token.getLexeme();
			if (tmp.charAt(0) == '0') {
				throw new SemanticError("N�meros come�ados por 0 n�o s�o permitidos", token.getPosition());
			}
			stack.push(Double.valueOf(tmp));
			
		case 2:
			// TODO faltar� colocar a fun��o! 
			// TODO pensar como fazer para processar a fun��o
		}
	}
}
