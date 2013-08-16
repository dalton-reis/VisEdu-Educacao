package br.furb.gcg.extra.equacoesnapratica;

import android.content.Context;
import android.opengl.GLSurfaceView;

public class PlanoCartesianoSurfaceView extends GLSurfaceView {

	private PlanoCartesianoRenderer planoRenderer;

	public PlanoCartesianoSurfaceView(Context context) {
		super(context);

		planoRenderer = new PlanoCartesianoRenderer();
		setRenderer(planoRenderer);

		setRenderMode(GLSurfaceView.RENDERMODE_WHEN_DIRTY);
	}

}
