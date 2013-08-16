package br.furb.gcg.extra.equacoesnapratica;

import android.app.Activity;
import android.content.Intent;
import android.opengl.GLSurfaceView;
import android.os.Bundle;

public class TouchRotateActivity extends Activity {

	private PlanoCartesianoSurfaceView planoSurfaceView;

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		Intent intentDisplayMessage = getIntent();
		// TODO aqui pode recuperar a lista de equacoes (talvez mandar só as selecionadas) e então iniciar os desenhos no plano

		// Create our Preview view and set it as the content of our
		// Activity
		planoSurfaceView = new PlanoCartesianoSurfaceView(this);
		setContentView(planoSurfaceView);
		planoSurfaceView.requestFocus();
		planoSurfaceView.setFocusableInTouchMode(true);
	}

	@Override
	protected void onResume() {
		// Ideally a game should implement onResume() and onPause()
		// to take appropriate action when the activity looses focus
		super.onResume();
		planoSurfaceView.onResume();
	}

	@Override
	protected void onPause() {
		// Ideally a game should implement onResume() and onPause()
		// to take appropriate action when the activity looses focus
		super.onPause();
		planoSurfaceView.onPause();
	}

}
