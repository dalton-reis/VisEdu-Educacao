package br.furb.gcg.extra.equacoesnapratica;

import android.provider.BaseColumns;

public class DBEquacoesContract {

	public static abstract class Equacao implements BaseColumns {
		public static final String TABLE_NAME = "nome";
		public static final String COLUMN_NAME_ID = "id_Equacao";
		public static final String COLUMN_NAME_SELECIONADA = "selecionada";
		public static final String COLUMN_NAME_EQUACAOINFORMADA = "equacaoInformada";
	}

	private DBEquacoesContract() {
	};

}
