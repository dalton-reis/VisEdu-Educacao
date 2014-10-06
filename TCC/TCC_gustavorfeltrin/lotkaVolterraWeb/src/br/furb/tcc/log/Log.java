package br.furb.tcc.log;

import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Log {
	
	private static final String INFO = "inf";
	private static final String ERROR = "err";
	private static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss.SSS");
	
	public static void info(String msg) {
		print(System.out, INFO, msg);
	}
	
	public static void err(String msg) {
		print(System.err, ERROR, msg);
	}
	
	private static void print(PrintStream ps, String tipo, String msg) {
		ps.printf("%s [%s] %s\r\n", sdf.format(Calendar.getInstance().getTime()), 
								tipo,
								msg);
	}

}
