package br.furb.tcc.log;

import java.io.PrintStream;

public class Log {
	
	public static void sysout(String msg) {
		print(System.out, msg);
	}
	
	public static void syserr(String msg) {
		print(System.err, msg);
	}
	
	private static void print(PrintStream ps, String msg) {
		ps.println(msg);
	}

}
