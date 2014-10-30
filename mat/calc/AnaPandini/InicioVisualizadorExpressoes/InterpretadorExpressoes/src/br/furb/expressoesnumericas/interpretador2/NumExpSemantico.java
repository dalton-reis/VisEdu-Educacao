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
				throw new SemanticError("Números começados por 0 não são permitidos", token.getPosition());
			}
			stack.push(Double.valueOf(tmp));
			
		case 2:
			// TODO faltará colocar a função! 
			// TODO pensar como fazer para processar a função
		}
	}
}
