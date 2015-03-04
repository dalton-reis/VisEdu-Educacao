
GeradorCodigoFonteJOGL = function ( ) {

	var scope = this;

	//implementacao

	var maxWidth = 0;
	var fonteCompleto = false;
	var textoCodigoFonte = [];
	var existeTextura = false;
	var texturesArray = [];
	var texturesMap = { }; //HashMap<long, boolean>



	scope.gerarCodigoFonteItem = function ( itemEditor ) {

		textoCodigoFonte.length = 0;

		maxWidth = 0;
		existeTextura = false;
		texturesArray = [];
		texturesMap = {};

		gerarCodigoFonteItemRecursivo( itemEditor, 0 );

	};

	scope.getCodigoFonte = function ( ) {

		return textoCodigoFonte.join('\n');

	};

	scope.getQtdeLinhasCodigoFonte = function ( ) {

		return textoCodigoFonte.length;

	};

	scope.getLarguraMaximaCodigoFonte = function ( ) {

		return maxWidth;

	};
	function addTexto( texto ) {

		textoCodigoFonte.push( texto );

		var width = texto.getWidth();
		if ( width > maxWidth ) {

			maxWidth = width;

		}

	};

	function PaddingString( n ) {

		var output = '';

		for ( var i = 0; i < n; i ++ ) output += '\t';

		return output;

	};

	function checkTextura( textura ) {

		if ( ! textura || textura == undefined ) return;

		if ( ! ( textura.id in texturesMap ) ) {

			texturesMap[ textura.id ] = true;
			texturesArray.push( textura );

		}

	};

	function carregarTexturas( item ) {

		if	(item.textura !== undefined && item.usarTextura) {
			checkTextura( item.textura );
		}

		for ( var i = 0; i < item.filhos.length; i++ ) {
			if	( carregarTexturas( item.filhos[i] ) ) {
				return true;
			}
		}

	};

	function gerarCodigoFonteItemRecursivo ( item, pad ) {

		if	( !item.visible )
			addTexto( PaddingString( pad ) + '/* Peca desabilitada' );

		switch ( item.id ) {
			case EIdsItens.OBJETOGRAFICO:

				addTexto( PaddingString( pad ) + '//' + item.nome );
				addTexto( PaddingString( pad ) + 'gl.glPushMatrix();' );
				addTexto( '' );

				//processa transformacoes
				for ( var i = item.filhos.length-1; i >= 0 ; i-- ) {
					if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.DIAMANTE ) {
						gerarCodigoFonteItemRecursivo( item.filhos[i], pad );
					}
				}

				//processa formas geometricas
				for ( var i = 0; i < item.filhos.length; i++ ) {
					if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.QUADRADO ) {
						gerarCodigoFonteItemRecursivo( item.filhos[i], pad );
					}
				}

				//processa filhos
				for ( var i = 0; i < item.filhos.length; i++ ) {
					if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.SETA ) {
						gerarCodigoFonteItemRecursivo( item.filhos[i], pad + 1 );
					}
				}

				addTexto( PaddingString( pad ) + 'gl.glPopMatrix();' );
				addTexto( '' );

				break;
			case EIdsItens.CUBO:
				itemPossuiTextura = ( item.textura !== undefined && item.usarTextura );

				if	( !fonteCompleto ) {
					addTexto( PaddingString( pad ) + 'float cor[] = {1, 1, 1};' );
					addTexto( PaddingString( pad ) + 'float xMax, xMin, yMax, yMin, zMax, zMin;' );
					addTexto( PaddingString( pad ) + '' );
					if (itemPossuiTextura) {
						addTexto( PaddingString( pad ) + 'private IntBuffer idsTextura;' );
						addTexto( PaddingString( pad ) + '' );
					}
				}
				addTexto( PaddingString( pad ) + '//' + item.nome );
				addTexto( PaddingString( pad ) + 'gl.glShadeModel(GL.GL_FLAT);' );
				addTexto( PaddingString( pad ) + 'gl.glNormal3f(0.0f, 0.0f, 1.0f);' );
				addTexto( PaddingString( pad ) + 'gl.glMaterialfv(GL.GL_FRONT, GL.GL_AMBIENT_AND_DIFFUSE, cor, 0);' );
				addTexto( PaddingString( pad ) + 'gl.glColor3f( ' + item.propriedadeCor.r + 'f, ' +  item.propriedadeCor.g + 'f, ' +  item.propriedadeCor.b + 'f );' );
				addTexto( '' );

				/*
				cubo.material.map = item.usarTextura ? item.textura : null;
				item.posicao.x, item.posicao.y, item.posicao.z
				}*/
				addTexto( PaddingString( pad ) + 'xMax = ' + (item.posicao.x + (item.valorXYZ.x / 2)) + 'f;' );
				addTexto( PaddingString( pad ) + 'xMin = ' + (item.posicao.x - (item.valorXYZ.x / 2)) + 'f;' );
				addTexto( PaddingString( pad ) + 'yMax = ' + (item.posicao.y + (item.valorXYZ.y / 2)) + 'f;' );
				addTexto( PaddingString( pad ) + 'yMin = ' + (item.posicao.y - (item.valorXYZ.y / 2)) + 'f;' );
				addTexto( PaddingString( pad ) + 'zMax = ' + (item.posicao.z + (item.valorXYZ.z / 2)) + 'f;' );
				addTexto( PaddingString( pad ) + 'zMin = ' + (item.posicao.z - (item.valorXYZ.z / 2)) + 'f;' );

				if ( itemPossuiTextura ) {
					addTexto( '' );
					addTexto( PaddingString( pad ) + 'gl.glBindTexture(GL.GL_TEXTURE_2D, idsTextura.get( ' + texturesArray.indexOf( item.textura ) + ' )); //Posiciona na Textura ' + item.textura.id );
					addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_TEXTURE_2D);	// Habilita uso de textura' );
				}

				addTexto( '' );
				if ( fonteCompleto ) {
					var txtUsartextura = "";
					if (existeTextura) {
						if (itemPossuiTextura) {
							txtUsartextura = " true ";
						} else {
							txtUsartextura = " false ";
						}
					}
					addTexto( PaddingString( pad ) + 'gerarCubo(' + txtUsartextura + ');' );
				} else {
					gerarCodigoFonteCubo( pad, false, itemPossuiTextura );
				}
				addTexto( '' );

				if ( itemPossuiTextura ) {
					addTexto( PaddingString( pad ) + 'gl.glDisable(GL.GL_TEXTURE_2D);	//	Desabilita uso de textura' );
					addTexto( '' );
				}

				break;
			case EIdsItens.SPLINE:
//				itemPossuiTextura = ( item.textura !== undefined && item.usarTextura );
//
//				if	( !fonteCompleto ) {
//					addTexto( PaddingString( pad ) + 'float cor[] = {1, 1, 1};' );
//					addTexto( PaddingString( pad ) + 'float xMax, xMin, yMax, yMin, zMax, zMin;' );
//					addTexto( PaddingString( pad ) + '' );
//					if (itemPossuiTextura) {
//						addTexto( PaddingString( pad ) + 'private IntBuffer idsTextura;' );
//						addTexto( PaddingString( pad ) + '' );
//					}
//				}
//
//				addTexto( PaddingString( pad ) + '//' + item.nome );
//				addTexto( PaddingString( pad ) + 'gl.glShadeModel(GL.GL_FLAT);' );
//				addTexto( PaddingString( pad ) + 'gl.glNormal3f(0.0f, 0.0f, 1.0f);' );
//				addTexto( PaddingString( pad ) + 'gl.glMaterialfv(GL.GL_FRONT, GL.GL_AMBIENT_AND_DIFFUSE, cor, 0);' );
//				addTexto( PaddingString( pad ) + 'gl.glColor3f( ' + item.propriedadeCor.r + 'f, ' +  item.propriedadeCor.g + 'f, ' +  item.propriedadeCor.b + 'f );' );
//				addTexto( '' );
//
//				/*
//					cubo.material.map = item.usarTextura ? item.textura : null;
//					item.posicao.x, item.posicao.y, item.posicao.z
//
//				}*/
//				addTexto( PaddingString( pad ) + 'xMax = ' + (item.posicao.x + (item.valorXYZ.x / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'xMin = ' + (item.posicao.x - (item.valorXYZ.x / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'yMax = ' + (item.posicao.y + (item.valorXYZ.y / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'yMin = ' + (item.posicao.y - (item.valorXYZ.y / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'zMax = ' + (item.posicao.z + (item.valorXYZ.z / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'zMin = ' + (item.posicao.z - (item.valorXYZ.z / 2)) + 'f;' );
//
//				if ( itemPossuiTextura ) {
//					addTexto( '' );
//					addTexto( PaddingString( pad ) + 'gl.glBindTexture(GL.GL_TEXTURE_2D, idsTextura.get( ' + texturesArray.indexOf( item.textura ) + ' )); //Posiciona na Textura ' + item.textura.id );
//					addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_TEXTURE_2D);	// Habilita uso de textura' );
//				}
//
//				addTexto( '' );
//				if	( fonteCompleto ) {
//					var txtUsartextura = "";
//					if (existeTextura) {
//						if (itemPossuiTextura) {
//							txtUsartextura = " true ";
//						} else {
//							txtUsartextura = " false ";
//						}
//					}
//					addTexto( PaddingString( pad ) + 'gerarCubo(' + txtUsartextura + ');' );
//				} else {
//					geraCodigoFonteCubo( pad, false, itemPossuiTextura );
//				}
//				addTexto( '' );
//
//				if ( itemPossuiTextura ) {
//					addTexto( PaddingString( pad ) + 'gl.glDisable(GL.GL_TEXTURE_2D);	//	Desabilita uso de textura' );
//					addTexto( '' );
//				}

				break;
			case EIdsItens.POLIGONO:
//				itemPossuiTextura = ( item.textura !== undefined && item.usarTextura );
//
//				if	( !fonteCompleto ) {
//					addTexto( PaddingString( pad ) + 'float cor[] = {1, 1, 1};' );
//					addTexto( PaddingString( pad ) + 'float xMax, xMin, yMax, yMin, zMax, zMin;' );
//					addTexto( PaddingString( pad ) + '' );
//					if (itemPossuiTextura) {
//						addTexto( PaddingString( pad ) + 'private IntBuffer idsTextura;' );
//						addTexto( PaddingString( pad ) + '' );
//					}
//				}
//
//				addTexto( PaddingString( pad ) + '//' + item.nome );
//				addTexto( PaddingString( pad ) + 'gl.glShadeModel(GL.GL_FLAT);' );
//				addTexto( PaddingString( pad ) + 'gl.glNormal3f(0.0f, 0.0f, 1.0f);' );
//				addTexto( PaddingString( pad ) + 'gl.glMaterialfv(GL.GL_FRONT, GL.GL_AMBIENT_AND_DIFFUSE, cor, 0);' );
//				addTexto( PaddingString( pad ) + 'gl.glColor3f( ' + item.propriedadeCor.r + 'f, ' +  item.propriedadeCor.g + 'f, ' +  item.propriedadeCor.b + 'f );' );
//				addTexto( '' );
//
//				/*
//					cubo.material.map = item.usarTextura ? item.textura : null;
//					item.posicao.x, item.posicao.y, item.posicao.z
//
//				}*/
//				addTexto( PaddingString( pad ) + 'xMax = ' + (item.posicao.x + (item.valorXYZ.x / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'xMin = ' + (item.posicao.x - (item.valorXYZ.x / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'yMax = ' + (item.posicao.y + (item.valorXYZ.y / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'yMin = ' + (item.posicao.y - (item.valorXYZ.y / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'zMax = ' + (item.posicao.z + (item.valorXYZ.z / 2)) + 'f;' );
//				addTexto( PaddingString( pad ) + 'zMin = ' + (item.posicao.z - (item.valorXYZ.z / 2)) + 'f;' );
//
//				if ( itemPossuiTextura ) {
//					addTexto( '' );
//					addTexto( PaddingString( pad ) + 'gl.glBindTexture(GL.GL_TEXTURE_2D, idsTextura.get( ' + texturesArray.indexOf( item.textura ) + ' )); //Posiciona na Textura ' + item.textura.id );
//					addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_TEXTURE_2D);	// Habilita uso de textura' );
//				}
//
//				addTexto( '' );
//				if	( fonteCompleto ) {
//					var txtUsartextura = "";
//					if (existeTextura) {
//						if (itemPossuiTextura) {
//							txtUsartextura = " true ";
//						} else {
//							txtUsartextura = " false ";
//						}
//					}
//					addTexto( PaddingString( pad ) + 'gerarCubo(' + txtUsartextura + ');' );
//				} else {
//					geraCodigoFonteCubo( pad, false, itemPossuiTextura );
//				}
//				addTexto( '' );
//
//				if ( itemPossuiTextura ) {
//					addTexto( PaddingString( pad ) + 'gl.glDisable(GL.GL_TEXTURE_2D);	//	Desabilita uso de textura' );
//					addTexto( '' );
//				}

				break;
			case EIdsItens.TRANSLADAR:

				addTexto( PaddingString( pad ) + '//' + item.nome );
				addTexto( PaddingString( pad ) + 'matrix1 = new Matrix4();' );
				addTexto( PaddingString( pad ) + 'matrix1.makeTranslation( ' + item.valorXYZ.x + 'f, ' + item.valorXYZ.y + 'f, ' + item.valorXYZ.z + 'f );' );
				addTexto( PaddingString( pad ) + 'gl.glMultMatrixd(matrix1.getDate(), 0);');
				addTexto( '' );


				break;
			case EIdsItens.ROTACIONAR:

				addTexto( PaddingString( pad ) + '//' + item.nome );
				addTexto( PaddingString( pad ) + 'matrix1 = new Matrix4();' );
				addTexto( PaddingString( pad ) + 'matrix2 = new Matrix4();' );
				addTexto( PaddingString( pad ) + 'matrix3 = new Matrix4();' );
				addTexto( PaddingString( pad ) + 'matrix1.makeXRotation( ' + Util.math.converteGrausParaRadianos(item.valorXYZ.x) + 'f );' );
				addTexto( PaddingString( pad ) + 'matrix2.makeYRotation( ' + Util.math.converteGrausParaRadianos(item.valorXYZ.y) + 'f );' );
				addTexto( PaddingString( pad ) + 'matrix3.makeZRotation( ' + Util.math.converteGrausParaRadianos(item.valorXYZ.z) + 'f );' );
				addTexto( PaddingString( pad ) + 'gl.glMultMatrixd(matrix1.getDate(), 0);');
				addTexto( PaddingString( pad ) + 'gl.glMultMatrixd(matrix2.getDate(), 0);');
				addTexto( PaddingString( pad ) + 'gl.glMultMatrixd(matrix3.getDate(), 0);');
				addTexto( '' );


				break;
			case EIdsItens.REDIMENSIONAR:

				addTexto( PaddingString( pad ) + '//' + item.nome );
				addTexto( PaddingString( pad ) + 'matrix1 = new Matrix4();' );
				addTexto( PaddingString( pad ) + 'matrix1.makeScale( '+item.valorXYZ.x+'f, '+item.valorXYZ.y+'f, '+item.valorXYZ.z+'f );');
				addTexto( PaddingString( pad ) + 'gl.glMultMatrixd(matrix1.getDate(), 0);');
				addTexto( '' );

				break;
			case EIdsItens.RENDERIZADOR:

				carregarTexturas( item );

				existeTextura = ( texturesArray.length > 0 );
				var existeCubo = existeItemCubo( item );
				var existeTransformacoes = existeItensTransformacao( item );
				var camera = null;

				//processa cameras
				for ( var i = 0; i < item.filhos.length; i++ ) {
					if	( item.filhos[i].id == EIdsItens.CAMERA ) {
						camera = item.filhos[i];
					}
				}

				addTexto( PaddingString( pad ) + 'import javax.media.opengl.GL;' );
				addTexto( PaddingString( pad ) + 'import javax.media.opengl.GLAutoDrawable;' );
				addTexto( PaddingString( pad ) + 'import javax.media.opengl.glu.GLU;' );
				addTexto( PaddingString( pad ) + 'import javax.media.opengl.GLEventListener;' );
				addTexto( PaddingString( pad ) + 'import javax.media.opengl.GLCanvas;' );
				addTexto( PaddingString( pad ) + 'import javax.media.opengl.DebugGL;' );
				addTexto( PaddingString( pad ) + 'import com.sun.opengl.util.Animator;' );
				addTexto( PaddingString( pad ) + 'import java.awt.event.WindowAdapter;' );
				addTexto( PaddingString( pad ) + 'import java.awt.event.WindowEvent;' );
				addTexto( PaddingString( pad ) + 'import java.awt.Frame;' );
				if	(existeTextura) {
					addTexto( PaddingString( pad ) + 'import javax.imageio.ImageIO;' );
					addTexto( PaddingString( pad ) + 'import com.sun.opengl.util.BufferUtil;' );
					addTexto( PaddingString( pad ) + 'import com.sun.opengl.util.texture.TextureData;' );
					addTexto( PaddingString( pad ) + 'import java.awt.image.BufferedImage;' );
					addTexto( PaddingString( pad ) + 'import java.io.File;' );
					addTexto( PaddingString( pad ) + 'import java.io.IOException;' );
					addTexto( PaddingString( pad ) + 'import java.nio.ByteBuffer;' );
					addTexto( PaddingString( pad ) + 'import java.nio.IntBuffer;' );
				}
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public class VisEduCG implements GLEventListener {' );
				pad++;

				//Variaveis
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'private GL gl;' );
				addTexto( PaddingString( pad ) + 'private GLU glu;' );
				addTexto( PaddingString( pad ) + 'private GLAutoDrawable drawable;' );
				if	( existeTransformacoes ) {
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'private Matrix4 matrix1, matrix2, matrix3;' );
				}
				if	( existeCubo ) {
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'private float cor[] = {1, 1, 1};' );
					addTexto( PaddingString( pad ) + 'private float xMax, xMin, yMax, yMin, zMax, zMin;' );
				}
				if	( existeTextura ) {
					//Variaveis
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '@INFORMAR CAMINHO DAS IMAGENS DE TEXTURA' );
					addTexto( PaddingString( pad ) + 'private String[] texturas = new String[] {' );
					pad++;
					for (var i = 0; i < texturesArray.length; i++) {
						var txtVirgula = ",";
						if ( i == ( texturesArray.length - 1 ) ) {
							txtVirgula = "";
						}
						addTexto( PaddingString( pad ) + '"<informe o caminho da textura>"' + txtVirgula + ' // Textura ' + texturesArray[i].id  );
					}
					pad--;
					addTexto( PaddingString( pad ) + '};' );
					addTexto( PaddingString( pad ) + 'private IntBuffer idsTextura;' );
					addTexto( PaddingString( pad ) + 'private int widthImg, heightImg;' );
					addTexto( PaddingString( pad ) + 'private BufferedImage image;' );
					addTexto( PaddingString( pad ) + 'private TextureData td;' );
					addTexto( PaddingString( pad ) + 'private ByteBuffer buffer;' );
					addTexto( PaddingString( pad ) + '' );

					//gerarTexturas
					addTexto( PaddingString( pad ) + 'public void gerarTexturas(GL gl) {' );
					pad++;
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '//Gera identificadores de textura' );
					addTexto( PaddingString( pad ) + 'idsTextura = BufferUtil.newIntBuffer(texturas.length);' );
					addTexto( PaddingString( pad ) + 'gl.glGenTextures(texturas.length, idsTextura);' );
					addTexto( PaddingString( pad ) + 'idsTextura.rewind();' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'for (int i = 0; i < texturas.length; i++) {' );
					pad++;
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '//Carrega imagem da textura' );
					addTexto( PaddingString( pad ) + 'try {' );
					pad++;
					addTexto( PaddingString( pad ) + 'loadImage(texturas[i]);' );
					pad--;
					addTexto( PaddingString( pad ) + '} catch (Exception e) {' );
					pad++;
					addTexto( PaddingString( pad ) + '// TODO Auto-generated catch block' );
					addTexto( PaddingString( pad ) + 'e.printStackTrace();' );
					pad--;
					addTexto( PaddingString( pad ) + '}' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '//Especifica a textura corrente usando seu identificador' );
					addTexto( PaddingString( pad ) + 'gl.glBindTexture(GL.GL_TEXTURE_2D, idsTextura.get(i));' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '//Envio da textura para OpenGL' );
					addTexto( PaddingString( pad ) + 'gl.glTexImage2D(GL.GL_TEXTURE_2D, 0, 3, widthImg, heightImg, 0, GL.GL_BGR, GL.GL_UNSIGNED_BYTE, buffer);' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '//Define os filtros de magnificação e minificação' );
					addTexto( PaddingString( pad ) + 'gl.glTexParameteri(GL.GL_TEXTURE_2D,GL.GL_TEXTURE_MIN_FILTER,GL.GL_LINEAR);' );
					addTexto( PaddingString( pad ) + 'gl.glTexParameteri(GL.GL_TEXTURE_2D,GL.GL_TEXTURE_MAG_FILTER,GL.GL_LINEAR);' );
					addTexto( PaddingString( pad ) + '' );
					pad--;
					addTexto( PaddingString( pad ) + '}' );
					addTexto( PaddingString( pad ) + '' );
					pad--;
					addTexto( PaddingString( pad ) + '}' );
					addTexto( PaddingString( pad ) + '' );

					//loadImage
					addTexto( PaddingString( pad ) + 'private void loadImage(String fileName) throws Exception {' );
					pad++;
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '// Tenta carregar o arquivo' );
					addTexto( PaddingString( pad ) + 'image = null;' );
					addTexto( PaddingString( pad ) + 'try {' );
					pad++;
					addTexto( PaddingString( pad ) + 'image = ImageIO.read(new File(fileName));' );
					pad--;
					addTexto( PaddingString( pad ) + '} catch (IOException e) {' );
					pad++;
					addTexto( PaddingString( pad ) + 'throw new Exception("Erro na leitura do arquivo "+fileName);' );
					pad--;
					addTexto( PaddingString( pad ) + '}' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '// Obtem largura e altura' );
					addTexto( PaddingString( pad ) + 'widthImg  = image.getWidth();' );
					addTexto( PaddingString( pad ) + 'heightImg = image.getHeight();' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '// Gera uma nova TextureData...' );
					addTexto( PaddingString( pad ) + 'td = new TextureData(0,0,false,image);' );
					addTexto( PaddingString( pad ) + '// ...e obtém um ByteBuffer a partir dela' );
					addTexto( PaddingString( pad ) + 'buffer = (ByteBuffer) td.getBuffer();' );
					pad--;
					addTexto( PaddingString( pad ) + '}' );

				}

				//gerarCubo
				if	( existeCubo ) {
					addTexto( PaddingString( pad ) + '' );
					if	(existeTextura)
						addTexto( PaddingString( pad ) + 'private void gerarCubo( boolean usarTextura ) {' );
					else
						addTexto( PaddingString( pad ) + 'private void gerarCubo() {' );
					pad++;
					gerarCodigoFonteCubo( pad, true, existeTextura );
					pad--;
					addTexto( PaddingString( pad ) + '}' );
				}

				//main
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public static void main(String[] args) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'Frame frame = new Frame();' );
				addTexto( PaddingString( pad ) + 'frame.setTitle("VisEdu-CG");' );
				addTexto( PaddingString( pad ) + 'GLCanvas canvas = new GLCanvas();' );
				addTexto( PaddingString( pad ) + 'VisEduCG gear = new VisEduCG();' );
				addTexto( PaddingString( pad ) + 'canvas.addGLEventListener(gear);' );
				addTexto( PaddingString( pad ) + 'frame.add(canvas);' );
				addTexto( PaddingString( pad ) + 'frame.setSize(600, 600);' );
				addTexto( PaddingString( pad ) + 'final Animator animator = new Animator(canvas);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'frame.addWindowListener(new WindowAdapter() {' );
				pad++;
				addTexto( PaddingString( pad ) + 'public void windowClosing(WindowEvent e) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'new Thread(new Runnable() {' );
				pad++;
				addTexto( PaddingString( pad ) + 'public void run() {' );
				pad++;
				addTexto( PaddingString( pad ) + 'animator.stop();' );
				addTexto( PaddingString( pad ) + 'System.exit(0);' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				pad--;
				addTexto( PaddingString( pad ) + '}).start();' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				pad--;
				addTexto( PaddingString( pad ) + '});' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'frame.setVisible(true);' );
				addTexto( PaddingString( pad ) + 'animator.start();' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );

				//init
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void init(GLAutoDrawable drawable) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'this.drawable = drawable;' );
				addTexto( PaddingString( pad ) + 'gl = drawable.getGL();' );
				addTexto( PaddingString( pad ) + 'glu = new GLU();' );
				addTexto( PaddingString( pad ) + '// Use debug pipeline' );
				addTexto( PaddingString( pad ) + 'drawable.setGL(new DebugGL(drawable.getGL()));' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'System.err.println("INIT GL IS: " + gl.getClass().getName());' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'System.err.println("Chosen GLCapabilities: "' );
				pad++;
				addTexto( PaddingString( pad ) + '+ drawable.getChosenGLCapabilities());' );
				pad--;
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.setSwapInterval(1);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_CULL_FACE);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_DEPTH_TEST);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_LIGHT0);' );
				addTexto( PaddingString( pad ) + '//gl.glEnable(GL.GL_LIGHT1);' );
				addTexto( PaddingString( pad ) + '//gl.glEnable(GL.GL_LIGHTING);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_COLOR_MATERIAL);' );
				addTexto( PaddingString( pad ) + 'gl.glColorMaterial(GL.GL_FRONT_AND_BACK, GL.GL_AMBIENT_AND_DIFFUSE);' );
				addTexto( PaddingString( pad ) + '' );
				if	(existeTextura) {
					addTexto( PaddingString( pad ) + 'gerarTexturas(gl);' );
				}
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glEnable(GL.GL_NORMALIZE);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'defineIluminacao();' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glClearColor( ' + item.corLimpar.r + 'f, ' + item.corLimpar.g + 'f, ' + item.corLimpar.b + 'f, 1.0f);' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );

				//defineIluminacao
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + '// Funcao responsavel pela especificacao dos parametros de iluminacao' );
				addTexto( PaddingString( pad ) + 'private void defineIluminacao()	{' );
				pad++;
				addTexto( PaddingString( pad ) + '//Define os parametros atraves de vetores RGBA - o ultimo valor deve ser sempre 1.0f' );
				addTexto( PaddingString( pad ) + 'float luzAmbiente[]={0.2f, 0.2f, 10f, 1.0f};' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'float luzDifusa[]={1.0f, 1.0f, 1.0f, 1.0f};' );
				addTexto( PaddingString( pad ) + 'float luzEspecular[]={1.0f, 1.0f, 1.0f, 1.0f};' );
				addTexto( PaddingString( pad ) + 'float posicaoLuz[]={0.0f, 0.0f, 10.0f, 1.0f}; // ultimo parametro: 0-direcional, 1-pontual/posicional' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + '//Ativa o uso da luz ambiente' );
				addTexto( PaddingString( pad ) + 'gl.glLightModelfv(GL.GL_LIGHT_MODEL_AMBIENT, luzAmbiente, 0);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + '//Define os parametros da luz de numero 0' );
				addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT0, GL.GL_AMBIENT, luzAmbiente, 0);' );
				addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT0, GL.GL_DIFFUSE, luzDifusa, 0 );' );
				addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT0, GL.GL_SPECULAR, luzEspecular, 0);' );
				addTexto( PaddingString( pad ) + '//gl.glLightfv(GL.GL_LIGHT0, GL.GL_POSITION, posicaoLuz, 0 );' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + '/*float posicaoLuz2[]={0.0f, 0.0f, -10.0f, 1.0f};' );
				addTexto( PaddingString( pad ) + 'float luzEspecular2[]={1.0f, 1.0f, 1.0f, 0.0f};' );
				addTexto( PaddingString( pad ) + 'float luzDifusa2[]={1.0f, 1.0f, 1.0f, 1.0f};' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + '//Define os parametros da luz de numero 1' );
				addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT1, GL.GL_AMBIENT, luzAmbiente, 0);' );
				addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT1, GL.GL_DIFFUSE, luzDifusa2, 0 );' );
				addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT1, GL.GL_SPECULAR, luzEspecular2, 0);' );
				addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT1, GL.GL_POSITION, posicaoLuz2, 0 );*/' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + '// Brilho do material' );
				addTexto( PaddingString( pad ) + 'float especularidade[]={1.0f, 1.0f, 1.0f, 1.0f};' );
				addTexto( PaddingString( pad ) + 'int especMaterial = 60;' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + '// Define a reflectancia do material' );
				addTexto( PaddingString( pad ) + 'gl.glMaterialfv(GL.GL_FRONT, GL.GL_SPECULAR, especularidade, 0);' );
				addTexto( PaddingString( pad ) + '// Define a concentracao do brilho' );
				addTexto( PaddingString( pad ) + 'gl.glMateriali(GL.GL_FRONT, GL.GL_SHININESS, especMaterial);' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );

				//reshape
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void reshape(GLAutoDrawable drawable, int x, int y, int width, int height) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'float h = (float) height / (float) width;' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glMatrixMode(GL.GL_PROJECTION);' );
				addTexto( PaddingString( pad ) + 'gl.glLoadIdentity();' );
				if ( camera ) {
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '//gl.glFrustum(-10.0f, 10.0f, -h, h, 5.0f, 60.0f);' );
					addTexto( PaddingString( pad ) + 'glu.gluPerspective( ' + camera.fov + ' , h, ' + camera.near + ', ' + camera.far + ');' );
				}
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glViewport(0, 0, width, height);' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glMatrixMode(GL.GL_MODELVIEW);' );
				addTexto( PaddingString( pad ) + 'gl.glLoadIdentity();' );
				if ( camera ) {
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'float posicaoCamera[] = { ' + camera.valorXYZ.x + ', ' + camera.valorXYZ.y + ', ' + camera.valorXYZ.z + ' };' );
					addTexto( PaddingString( pad ) + 'float lookAtCamera[] = { ' + camera.lookAt.x + ', ' + camera.lookAt.y + ', ' + camera.lookAt.z + ' };' );
					addTexto( PaddingString( pad ) + 'glu.gluLookAt( posicaoCamera[0], posicaoCamera[1], posicaoCamera[2],' );
					//addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT0, GL.GL_POSITION, posicaoCamera, -1);' );
					pad++;
					addTexto( PaddingString( pad ) + 'lookAtCamera[0], lookAtCamera[1], lookAtCamera[2], 0, 1, 0);' );
					pad--;
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'gl.glLightfv(GL.GL_LIGHT0, GL.GL_POSITION, posicaoCamera, -1);' );
				}
				pad--;
				addTexto( PaddingString( pad ) + '}' );

				//display
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void display(GLAutoDrawable drawable) {' );
				pad++;
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glClear(GL.GL_COLOR_BUFFER_BIT | GL.GL_DEPTH_BUFFER_BIT );' );
				addTexto( PaddingString( pad ) + '' );
				fonteCompleto = true;
				for ( var i = 0; i < item.filhos.length; i++ ) {
					gerarCodigoFonteItemRecursivo( item.filhos[i], pad + 1 );
				}
				fonteCompleto = false;
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'gl.glFlush();' );
				addTexto( PaddingString( pad ) + '' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );

				//displayChanged
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void displayChanged(GLAutoDrawable drawable, boolean modeChanged, boolean deviceChanged) {' );
				pad++;
				pad--;
				addTexto( PaddingString( pad ) + '}' );

				//classe Matrix4
				addTexto( PaddingString( pad ) + '');
				addTexto( PaddingString( pad ) + '// Internal matrix element organization reference' );
				addTexto( PaddingString( pad ) + '//             [ matrix[0] matrix[4] matrix[8]  matrix[12] ]' );
				addTexto( PaddingString( pad ) + '//    Matrix = [ matrix[1] matrix[5] matrix[9]  matrix[13] ]' );
				addTexto( PaddingString( pad ) + '//             [ matrix[2] matrix[6] matrix[10] matrix[14] ]' );
				addTexto( PaddingString( pad ) + '//             [ matrix[3] matrix[7] matrix[11] matrix[15] ]' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'class Matrix4 {' );
				pad++;
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'private double RAS_DEG_TO_RAD = 0.017453292519943295769236907684886;' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'private double[] matrix = { 1, 0, 0, 0,' );
				addTexto( PaddingString( pad ) + '                            0, 1, 0, 0,' );
				addTexto( PaddingString( pad ) + '                            0, 0, 1, 0,' );
				addTexto( PaddingString( pad ) + '                            0, 0, 0, 1 };' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public Matrix4() {' );
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void makeIdentity() {' );
				pad++;
				addTexto( PaddingString( pad ) + 'for (int i=0; i<16; ++i) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'matrix[i] = 0.0;' );
				addTexto( PaddingString( pad ) + 'matrix[0] = matrix[5] = matrix[10] = matrix[15] = 1.0;' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void makeTranslation(float x, float y, float z) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'makeIdentity();' );
				addTexto( PaddingString( pad ) + 'matrix[12] = x;' );
				addTexto( PaddingString( pad ) + 'matrix[13] = y;' );
				addTexto( PaddingString( pad ) + 'matrix[14] = z;' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void makeXRotation(float radians){' );
				pad++;
				addTexto( PaddingString( pad ) + 'makeIdentity();' );
				addTexto( PaddingString( pad ) + 'matrix[5] =   Math.cos(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[9] =  -Math.sin(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[6] =   Math.sin(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[10] =  Math.cos(radians);' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void makeYRotation(float radians){' );
				pad++;
				addTexto( PaddingString( pad ) + 'makeIdentity();' );
				addTexto( PaddingString( pad ) + 'matrix[0] =   Math.cos(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[8] =   Math.sin(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[2] =  -Math.sin(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[10] =  Math.cos(radians);' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void makeZRotation(float radians){' );
				pad++;
				addTexto( PaddingString( pad ) + 'makeIdentity();' );
				addTexto( PaddingString( pad ) + 'matrix[0] =  Math.cos(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[4] = -Math.sin(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[1] =  Math.sin(radians);' );
				addTexto( PaddingString( pad ) + 'matrix[5] =  Math.cos(radians);' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void makeScale(float sX, float sY, float sZ){' );
				pad++;
				addTexto( PaddingString( pad ) + 'makeIdentity();' );
				addTexto( PaddingString( pad ) + 'matrix[0] =  sX;' );
				addTexto( PaddingString( pad ) + 'matrix[5] =  sY;' );
				addTexto( PaddingString( pad ) + 'matrix[10] = sZ;' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public Matrix4 transformMatrix(Matrix4 t) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'Matrix4 result = new Matrix4();' );
				addTexto( PaddingString( pad ) + 'for (int i=0; i < 16; ++i)' );
				pad++;
				addTexto( PaddingString( pad ) + 'result.matrix[i] =' );
				addTexto( PaddingString( pad ) + 'matrix[i%4]    *t.matrix[i/4*4]  +matrix[(i%4)+4] *t.matrix[i/4*4+1]' );
				pad++;
				addTexto( PaddingString( pad ) + '+ matrix[(i%4)+8]*t.matrix[i/4*4+2]+matrix[(i%4)+12]*t.matrix[i/4*4+3];' );
				pad--;
				pad--;
				addTexto( PaddingString( pad ) + 'return result;' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '	' );
				addTexto( PaddingString( pad ) + 'public double getElement(int index) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'return matrix[index];' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void setElement(int index, double value) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'matrix[index] = value;' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public double[] getDate() {' );
				pad++;
				addTexto( PaddingString( pad ) + 'return matrix;' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'public void setData(double[] data){' );
				pad++;
				addTexto( PaddingString( pad ) + 'int i;' );
				addTexto( PaddingString( pad ) + '' );
				addTexto( PaddingString( pad ) + 'for (i=0; i<16; i++) {' );
				pad++;
				addTexto( PaddingString( pad ) + 'matrix[i] = (data[i]);' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );
				pad--;
				addTexto( PaddingString( pad ) + '}' );

				pad--;
				addTexto( PaddingString( pad ) + '}' );

				break;
			case EIdsItens.CAMERA:

				if	( !fonteCompleto ) {

					addTexto( PaddingString( pad ) + 'float h = (float) height / (float) width; //altura/largura da tela' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'gl.glMatrixMode(GL.GL_PROJECTION);' );
					addTexto( PaddingString( pad ) + 'gl.glLoadIdentity();' );

					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + '//gl.glFrustum(-10.0f, 10.0f, -h, h, 5.0f, 60.0f);' );
					addTexto( PaddingString( pad ) + 'glu.gluPerspective( ' + item.fov + ' , h, ' + item.near + ', ' + item.far + ');' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'gl.glMatrixMode(GL.GL_MODELVIEW);' );
					addTexto( PaddingString( pad ) + 'gl.glLoadIdentity();' );
					addTexto( PaddingString( pad ) + '' );
					addTexto( PaddingString( pad ) + 'float posicaoCamera[] = { ' + item.valorXYZ.x + ', ' + item.valorXYZ.y + ', ' + item.valorXYZ.z + ' };' );
					addTexto( PaddingString( pad ) + 'float lookAtCamera[] = { ' + item.lookAt.x + ', ' + item.lookAt.y + ', ' + item.lookAt.z + ' };' );
					addTexto( PaddingString( pad ) + 'glu.gluLookAt( posicaoCamera[0], posicaoCamera[1], posicaoCamera[2],' );
					pad++;
					addTexto( PaddingString( pad ) + 'lookAtCamera[0], lookAtCamera[1], lookAtCamera[2], 0, 1, 0);' );
					pad--;

				}

				break;
			case EIdsItens.ILUMINACAO:
				//TODO
				break;

			case EIdsItens.DRONE:
				/* TODO - coloquei esse case aqui somente para não acontecer mais erros na página. Mas isso precisa ser revisado no futuro
				 * Nem sei se vai existir geração de código para o item drone
				 * */
				break;
			default:
			  throw new Error ('Não foi possível processar a visualização do item. Id ' + item.id + ' não era esperada!');
		}

		if	( !item.visible )
			addTexto( PaddingString( pad ) + '*/' );

	}

	function gerarCodigoCubo(item, pad) {

	}



	function gerarCodigoFonteCubo( pad, usarIfTextura, gerarCodigoTextura ) {
		var txtIfTextura;
		if	( usarIfTextura ) {
			txtIfTextura = "if ( usarTextura ) " ;
		} else {
			txtIfTextura = "";
		}

		addTexto( PaddingString( pad ) + '// Face frontal' );
		addTexto( PaddingString( pad ) + 'gl.glBegin(GL.GL_QUADS);' );
		addTexto( PaddingString( pad ) + 'gl.glNormal3f(0, 0, 1);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMax, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMax, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMin, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMin, zMax);');
		addTexto( PaddingString( pad ) + 'gl.glEnd();');
		addTexto( '' );
		addTexto( PaddingString( pad ) + '// Face posterior' );
		addTexto( PaddingString( pad ) + 'gl.glBegin(GL.GL_QUADS);' );
		addTexto( PaddingString( pad ) + 'gl.glNormal3f(0, 0, -1);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMax, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMin, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMin, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMax, zMin);');
		addTexto( PaddingString( pad ) + 'gl.glEnd();');
		addTexto( '' );
		addTexto( PaddingString( pad ) + '// Face lateral esquerda' );
		addTexto( PaddingString( pad ) + 'gl.glBegin(GL.GL_QUADS);' );
		addTexto( PaddingString( pad ) + 'gl.glNormal3f(-1, 0, 0);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMax, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMax, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMin, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMin, zMax);');
		addTexto( PaddingString( pad ) + 'gl.glEnd();');
		addTexto( '' );
		addTexto( PaddingString( pad ) + '// Face lateral direita' );
		addTexto( PaddingString( pad ) + 'gl.glBegin(GL.GL_QUADS);' );
		addTexto( PaddingString( pad ) + 'gl.glNormal3f(1, 0, 0);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMax, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMin, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMin, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMax, zMin);');
		addTexto( PaddingString( pad ) + 'gl.glEnd();');
		addTexto( '' );
		addTexto( PaddingString( pad ) + '// Face superior' );
		addTexto( PaddingString( pad ) + 'gl.glBegin(GL.GL_QUADS);' );
		addTexto( PaddingString( pad ) + 'gl.glNormal3f(0, 1, 0);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMax, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMax, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMax, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMax, zMin);');
		addTexto( PaddingString( pad ) + 'gl.glEnd();');
		addTexto( '' );
		addTexto( PaddingString( pad ) + '// Face inferior' );
		addTexto( PaddingString( pad ) + 'gl.glBegin(GL.GL_QUADS);' );
		addTexto( PaddingString( pad ) + 'gl.glNormal3f(0, -1, 0);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMin, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 1.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMin, zMin);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(0.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMax, yMin, zMax);');
		if	( gerarCodigoTextura )
			addTexto( PaddingString( pad ) + txtIfTextura + 'gl.glTexCoord2f(1.0f, 0.0f);' );
		addTexto( PaddingString( pad ) + 'gl.glVertex3f(xMin, yMin, zMax);');
		addTexto( PaddingString( pad ) + 'gl.glEnd();');

	};

	function existeItemCubo( item ) {

		if	(item.id == EIdsItens.CUBO) {
			return true;
		}

		for ( var i = 0; i < item.filhos.length; i++ ) {
			if	( existeItemCubo( item.filhos[i] ) ) {
				return true;
			}
		}

		return false;

	};

	function existeItensTransformacao( item ) {


		if	(item.tipoEncaixe == ETiposEncaixe.DIAMANTE) {
			return true;
		}

		for ( var i = 0; i < item.filhos.length; i++ ) {
			if	( existeItensTransformacao( item.filhos[i] ) ) {
				return true;
			}
		}

		return false;

	};

};


