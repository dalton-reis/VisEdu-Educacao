package br.furb.gcg.extra.equacoesnapratica;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class EquacoesNaPraticaDBHelper extends SQLiteOpenHelper {

	// TODO: se a modelagem for alterada, alterar também a versão da base
	private static final int DB_VERSION = 3;
	public static final String DB_NAME = "EquacoesNaPratica.db";

	public EquacoesNaPraticaDBHelper(Context context) {
		super(context, DB_NAME, null, DB_VERSION);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		db.execSQL(SQL_CREATE_ENTRIES);
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		db.execSQL(SQL_DELETE_ENTRIES);
		onCreate(db);
	}

	private static final String SQL_CREATE_ENTRIES = /**/
	"CREATE TABLE " + DBEquacoesContract.Equacao.TABLE_NAME + "( " + /**/
	DBEquacoesContract.Equacao.COLUMN_NAME_ID + " INTEGER PRIMARY KEY, " + /**/
	DBEquacoesContract.Equacao.COLUMN_NAME_EQUACAOINFORMADA + " TEXT, " + /**/
	DBEquacoesContract.Equacao.COLUMN_NAME_SELECIONADA + " INTEGER )";

	private static final String SQL_DELETE_ENTRIES = "DROP TABLE IF EXISTS " + DBEquacoesContract.Equacao.TABLE_NAME; // TODO está correto?

}
