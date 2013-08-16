package br.furb.gcg.extra.equacoesnapratica;

import java.util.List;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.TextView;

public class CustomAdapter extends ArrayAdapter<CustomListItem> {

	private Context context;
	private List<CustomListItem> itens;
	private PrincipalActivity principalActivity;

	public CustomAdapter(Context context, int textViewResourceId, List<CustomListItem> objects) {
		super(context, textViewResourceId, objects);
		this.context = context;
		this.itens = objects;
	}

	static class ViewHolder {
		protected CheckBox chkEquacaoSelecionada;
	}

	public View getView(int position, View convertView, ViewGroup parent) {
		final int pos = position;
		View rowView = null;
		
		// if (convertView == null) {

		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

		rowView = inflater.inflate(R.layout.row, parent, false);
		rowView.setBackgroundColor(numeroPar(position) ? Color.LTGRAY : Color.WHITE);

		final ViewHolder vh = new ViewHolder();

		final TextView equacaoInformada = (TextView) rowView.findViewById(R.id.equacao_informada);
		vh.chkEquacaoSelecionada = (CheckBox) rowView.findViewById(R.id.seleciona_equacao);

		equacaoInformada.setText(itens.get(position).getTexto());
		equacaoInformada.setTextColor(Color.DKGRAY);

		rowView.setOnLongClickListener(new CompoundButton.OnLongClickListener() {

			@Override
			public boolean onLongClick(View view) {
				long idEquacao = itens.get(pos).getID();
				String texto = itens.get(pos).getTexto();
				principalActivity.editaEquacao(view, idEquacao, texto);
				return false;
			}
		});
		
		vh.chkEquacaoSelecionada.setChecked(itens.get(position).isSelecionada());
		vh.chkEquacaoSelecionada.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
				CustomListItem cliChk = (CustomListItem) vh.chkEquacaoSelecionada.getTag();
				cliChk.setSelecionada(isChecked);
			}
		});

		rowView.setTag(vh);
		vh.chkEquacaoSelecionada.setTag(itens.get(position));
		// } else {
		// rowView = convertView;
		// ((ViewHolder) rowView.getTag()).chkEquacaoSelecionada.setTag(itens.get(position));
		// }

		return rowView;
	}

	private boolean numeroPar(int numero) {
		if ((numero % 2) == 0) {
			return true;
		}
		return false;
	}

	public void setPrincipalActivity(PrincipalActivity principalActivity) {
		this.principalActivity = principalActivity;
	}
}
