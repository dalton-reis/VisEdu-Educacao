package br.furb.gcg.extra.equacoesnapratica;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ContentValues;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ListView;

public class PrincipalActivity extends Activity {

	public static final String EXTRA_LISTA_EQUACOES = "br.furb.gcg.extra.equacoesnapratica.LISTA_EQUACOES";

	private List<CustomListItem> equacoes;
	private List<Long> idsNovasEquacoes;
	// private ArrayAdapter<String> adapterListView;
	private CustomAdapter adapterListView;
	private EquacoesNaPraticaDBHelper dbHelper;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		dbHelper = new EquacoesNaPraticaDBHelper(getApplicationContext()); // TODO é este o getContext() que está no exemplo?
		equacoes = new ArrayList<CustomListItem>();
		idsNovasEquacoes = new ArrayList<Long>();
		setContentView(R.layout.activity_principal);

		ListView equacoesList = (ListView) findViewById(R.id.equacoes_listview);
		adapterListView = new CustomAdapter(getApplicationContext(), android.R.layout.simple_list_item_1, getEquacoesLista());
		adapterListView.setPrincipalActivity(this);
		equacoesList.setAdapter(adapterListView);

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.principal, menu);
		return true;
	}

	public void visualizarEquacoes(View view) {
		Intent sendMessageIntent = new Intent(this, TouchRotateActivity.class);
		sendMessageIntent.putExtra(EXTRA_LISTA_EQUACOES, getEquacoesLista().toArray());
		startActivity(sendMessageIntent);
	}

	private List<CustomListItem> getEquacoesLista() {
		return equacoes;
	}

	// private void adicionaEquacaoLista(String equacao) {
	// // TODO: algumas coisas que este método pode fazer
	// // validar a equacao que o usuário informou usando um autômato que verifique se possui todas os parênteses e afins
	// // retornar um boolean e conforme o retorno do boolean mostrar uma mensagem para o usuário
	// equacoes.add(equacao);
	// }

	public void adicionaEquacao(View view) {
		createDialog(R.string.adiciona_equacao_titulo, 0, "");
	}

	public void editaEquacao(View view, long idEquacao, String texto) {
		createDialog(R.string.edita_equacao_titulo, idEquacao, texto);
	}

	private void createDialog(final int tituloDialogEquacao, final long idEquacao, String texto) {
		LayoutInflater factory = LayoutInflater.from(this);
		final View textEntryView = factory.inflate(R.layout.adiciona_edita_equacao, null);
		AlertDialog.Builder builder = new AlertDialog.Builder(this);

		builder.setIcon(R.drawable.lapis_icon);
		builder.setTitle(tituloDialogEquacao);
		builder.setView(textEntryView);
		builder.setCancelable(true);
		final EditText edtEquacao = (EditText) textEntryView.findViewById(R.id.equacao_edit);
		edtEquacao.setText(texto);
		builder.setPositiveButton(R.string.ok_botao, new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int whichButton) {

				if (tituloDialogEquacao == R.string.adiciona_equacao_titulo) {

					// EditText edtEquacao = (EditText) textEntryView.findViewById(R.id.equacao_edit);
					long idEquacaoNova = System.currentTimeMillis();
					idsNovasEquacoes.add(idEquacaoNova);
					PrincipalActivity.this.equacoes.add(new CustomListItem(edtEquacao.getText().toString(), idEquacaoNova));

				} else { // Senão significa que é edição
					for (CustomListItem listItem : equacoes) {
						if (listItem.getID() == idEquacao) {
							listItem.setTexto(edtEquacao.getText().toString());
						}
					}
				}

				PrincipalActivity.this.adapterListView.notifyDataSetChanged();
				dialog.dismiss();

			}
		});

		AlertDialog dialog = builder.create();
		dialog.show();
	}

	public void onResume() {
		super.onResume();

		SQLiteDatabase db = dbHelper.getReadableDatabase();

		String[] projection = { DBEquacoesContract.Equacao.COLUMN_NAME_ID, /**/
		DBEquacoesContract.Equacao.COLUMN_NAME_EQUACAOINFORMADA, /**/
		DBEquacoesContract.Equacao.COLUMN_NAME_SELECIONADA };

		Cursor c = db.query(DBEquacoesContract.Equacao.TABLE_NAME, projection, null, null, null, null, null);

		int idxEquacao = 0;
		int idxSelecionada = 0;
		int idxID = 0;
		String texto = "";
		int selecionada = 0;
		long id = 0;
		CustomListItem listItem;

		boolean hasNext = c.moveToFirst();
		while (hasNext) {
			idxEquacao = c.getColumnIndex(DBEquacoesContract.Equacao.COLUMN_NAME_EQUACAOINFORMADA);
			idxSelecionada = c.getColumnIndex(DBEquacoesContract.Equacao.COLUMN_NAME_SELECIONADA);
			idxID = c.getColumnIndex(DBEquacoesContract.Equacao.COLUMN_NAME_ID);

			texto = c.getString(idxEquacao);
			selecionada = c.getInt(idxSelecionada);
			id = c.getLong(idxID);

			listItem = new CustomListItem(texto, id);
			listItem.setSelecionada(selecionada == 0 ? false : true);
			equacoes.add(listItem);

			hasNext = c.moveToNext();
		}

	}

	public void onPause() {
		super.onPause();

		SQLiteDatabase db = dbHelper.getWritableDatabase();

		ContentValues cv = null;

		for (CustomListItem listItem : getEquacoesLista()) {
			cv = new ContentValues();
			cv.put(DBEquacoesContract.Equacao.COLUMN_NAME_EQUACAOINFORMADA, listItem.getTexto());
			cv.put(DBEquacoesContract.Equacao.COLUMN_NAME_SELECIONADA, listItem.isSelecionada() ? 1 : 0);

			if (idsNovasEquacoes.contains(listItem.getID())) {
				cv.put(DBEquacoesContract.Equacao.COLUMN_NAME_ID, listItem.getID());
				db.insert(DBEquacoesContract.Equacao.TABLE_NAME, null, cv);
			} else {
				String selection = DBEquacoesContract.Equacao.COLUMN_NAME_ID + " = " + listItem.getID();
				db.update(DBEquacoesContract.Equacao.TABLE_NAME, cv, selection, null);
			}

		}

		idsNovasEquacoes.clear();

		db.close();
	}

	public void onDestroy() {
		super.onDestroy();

		android.os.Debug.stopMethodTracing(); // TODO será que se não ativar mas chamar o stop dará erro? Testar
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.action_deleteAllEquations:
			equacoes.clear();
			idsNovasEquacoes.clear();
			// Remove do banco também
			SQLiteDatabase db = dbHelper.getWritableDatabase();
			db.delete(DBEquacoesContract.Equacao.TABLE_NAME, null, null);
			this.adapterListView.notifyDataSetChanged();
			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}

}
