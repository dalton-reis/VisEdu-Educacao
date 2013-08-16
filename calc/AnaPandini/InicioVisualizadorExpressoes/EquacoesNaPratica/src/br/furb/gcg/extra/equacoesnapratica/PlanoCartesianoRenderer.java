package br.furb.gcg.extra.equacoesnapratica;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.DoubleBuffer;
import java.nio.FloatBuffer;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import br.furb.expressoesnumericas.interpretador1.LexicalError;
import br.furb.expressoesnumericas.interpretador1.NumExpLexico;
import br.furb.expressoesnumericas.interpretador1.NumExpSemantico;
import br.furb.expressoesnumericas.interpretador1.NumExpSintatico;
import br.furb.expressoesnumericas.interpretador1.SemanticError;
import br.furb.expressoesnumericas.interpretador1.SyntaticError;

import android.graphics.Color;
import android.opengl.GLES10;
import android.opengl.GLSurfaceView;
import android.opengl.GLU;

public class PlanoCartesianoRenderer implements GLSurfaceView.Renderer {

	// Para guardar novas informações de rotação para o triângulo
	// private float mAngle;

	private FloatBuffer pontosEixoX;
	private FloatBuffer pontosEixoY;
	private DoubleBuffer pontosEquacao;

	private int larguraTela;
	private int alturaTela;
	private int metadeEixoX;
	private int metadeEixoY;

	private void desenhaEquacaoNoPlano(Color corEquacao, String equacao) {
		/* A equação vem no formato exemplo: x=1+2*(3*y+2) */

		// Inicia as classes que são responsáveis pela interpretação da fórmula
		NumExpLexico lexico = new NumExpLexico();
		NumExpSintatico sintatico = new NumExpSintatico();
		NumExpSemantico semantico = new NumExpSemantico();

		// Substituir o y por valores para formar os pontos
		int[] numerosEquacao = new int[] { -3, -2, -1, 0, 1, 2, 3 };
		double[] pontosEquacao = new double[21]; // o tamanho sempre será numerosEquacao.length * 3
		String equacaoTemp = "";
		double resultado;
		for (int i = 0; i < numerosEquacao.length; i++) {
			equacaoTemp = equacao.replaceAll("y", String.valueOf(numerosEquacao[i]));
			lexico.setInput(equacaoTemp);
			try {
				sintatico.parse(lexico, semantico);
				resultado = semantico.getResult();
			} catch (LexicalError e) {
				e.printStackTrace();
			} catch (SyntaticError e) {
				e.printStackTrace();
			} catch (SemanticError e) {
				e.printStackTrace();
			}
		}
	}

	private void carregaPlano() {
		float[] coordsEixoX = new float[] { -metadeEixoX, 0, 0, metadeEixoX, 0, 0 };
		ByteBuffer vbb = ByteBuffer.allocateDirect(coordsEixoX.length * 4); // 4 pois é o tamanho do Float
		vbb.order(ByteOrder.nativeOrder());
		pontosEixoX = vbb.asFloatBuffer();
		pontosEixoX.put(coordsEixoX);
		pontosEixoX.position(0);

		float[] coordsEixoY = new float[] { 0, -metadeEixoY, 0, 0, metadeEixoY, 0 };
		vbb = ByteBuffer.allocateDirect(coordsEixoY.length * 4); // 4 pois é o tamanho do Float
		vbb.order(ByteOrder.nativeOrder());
		pontosEixoY = vbb.asFloatBuffer();
		pontosEixoY.put(coordsEixoY);
		pontosEixoY.position(0);
	}

	@Override
	public void onDrawFrame(GL10 gl) {
		// Redesenha a cor do background
		GLES10.glClear(GLES10.GL_COLOR_BUFFER_BIT | GLES10.GL_DEPTH_BUFFER_BIT);

		gl.glMatrixMode(GL10.GL_PROJECTION); // gl.glMatrixMode(GL10.GL_PROJECTION);
		gl.glLoadIdentity(); // reset the matrix to its default state

		// When using GL_MODELVIEW, you must set the view point
		// GLU.gluLookAt(gl, 0, 0, -5, 0f, 0f, 0f, 0f, 1.0f, 0.0f);
		GLU.gluOrtho2D(gl, -(larguraTela / 2), larguraTela / 2, -(alturaTela / 2), alturaTela / 2);

		// Create a rotation for the triangle
		// long time = SystemClock.uptimeMillis() % 4000L;
		// float angle = 0.090f * ((int) time);
		// gl.glRotatef(angle, 0.0f, 0.0f, 1.0f);

		// gl.glRotatef(mAngle, 0.0f, 0.0f, 1.0f);

		// Desenha as linhas do plano
		gl.glColor4f(0.5f, 0.5f, 0.5f, 1.0f);
		gl.glLineWidth(2f);
		// gl.glPointSize(10);
		gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
		gl.glVertexPointer(3, GL10.GL_FLOAT, 0, pontosEixoX);
		gl.glDrawArrays(GL10.GL_LINES, 0, 2);
		gl.glVertexPointer(3, GL10.GL_FLOAT, 0, pontosEixoY);
		gl.glDrawArrays(GL10.GL_LINES, 0, 2);
		gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);

	}

	@Override
	public void onSurfaceChanged(GL10 gl, int width, int height) {
		this.larguraTela = width;
		this.alturaTela = height;
		this.metadeEixoX = (larguraTela / 2) - 5;
		this.metadeEixoY = (alturaTela / 2) - 5;

		carregaPlano();

		GLES10.glViewport(0, 0, width, height);

		// Faz ajustes para a proporção da tela
		float ratio = (float) width / height;
		gl.glMatrixMode(GL10.GL_PROJECTION); // set matrix to projection mode
		gl.glLoadIdentity(); // reset the matrix to its default state
		gl.glFrustumf(-ratio, ratio, -1, 1, 3, 7); // apply the projection matrix
	}

	@Override
	public void onSurfaceCreated(GL10 gl, EGLConfig config) {
		// Seta a cor do background
		GLES10.glClearColor(1.0f, 1.0f, 1.0f, 1.0f);

		// Habilita o uso de matriz de vértices (vertexes array)
		gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
	}
}
