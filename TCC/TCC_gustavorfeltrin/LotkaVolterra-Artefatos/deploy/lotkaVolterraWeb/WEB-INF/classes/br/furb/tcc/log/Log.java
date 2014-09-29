package br.furb.tcc.log;

import java.io.PrintStream;

public class Log {
	
	public static void info(String msg) {
		print(System.out, String.format("[inf] %s", msg));
	}
	
	public static void err(String msg) {
		print(System.err, String.format("[err] %s", msg));
	}
	
	private static void print(PrintStream ps, String msg) {
		ps.println(msg);
	}

}
