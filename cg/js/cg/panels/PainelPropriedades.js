
function PainelPropriedades( item ) {		

	UI.Panel.call( this ); 
	
	var scope = this;
	
	scope.item = item;	
		
	//scope.setClass( 'painel' );
	scope.setPosition( 'absolute' );	
	scope.setDisplay( 'broke' );
	
	
	//descrição id	
	scope.add( new UI.Text().setValue( item.id.descricao.toUpperCase() ).setColor( '#666' ) );
	scope.add( new UI.Break(), new UI.Break() );
	
	// nome
	var objectNameRow;
	var objectName;	
	
	if	( ( scope.item.nome !== undefined ) && ( scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly ) ) {		

		objectNameRow = new UI.Panel();
		objectName = new UI.Input().setWidth( '150px' ).setColor( '#444' ).setFontSize( '12px' ).onChange( update );
		
		objectName.setValue(scope.item.nome);
		
		objectNameRow.add( new UI.Text( 'Nome' ).setWidth( '90px' ).setColor( '#666' ) );
		objectNameRow.add( objectName );

		scope.add( objectNameRow );
	}
	
	//valores x, y, z do item
	var objectValueRow;
	var objectValueX;
	var objectValueY;
	var objectValueZ;
	
	if	( scope.item.valorXYZ !== undefined ) {
	
		objectValueRow = new UI.Panel();
		objectValueX = new UI.Number().setWidth( '50px' ).onChange( update );
		objectValueY = new UI.Number().setWidth( '50px' ).onChange( update );
		objectValueZ = new UI.Number().setWidth( '50px' ).onChange( update );
		
		objectValueX.setValue(scope.item.valorXYZ.x);
		objectValueY.setValue(scope.item.valorXYZ.y);
		objectValueZ.setValue(scope.item.valorXYZ.z);

		objectValueRow.add( new UI.Text( scope.item.valueDescription ).setWidth( '90px' ).setColor( '#666' ) );
		objectValueRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
		objectValueRow.add( objectValueX);
		objectValueRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
		objectValueRow.add( objectValueY );
		objectValueRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
		objectValueRow.add( objectValueZ );
		
		scope.add( objectValueRow );
		
	}	
	
	//valores x, y, z da posicao	
	var objectPosicaoRow;
	var objectPosicaoX;
	var objectPosicaoY;
	var objectPosicaoZ;
	
	if	( scope.item.posicao !== undefined ) {
	
		objectPosicaoRow = new UI.Panel();
		objectPosicaoX = new UI.Number().setWidth( '50px' ).onChange( update );
		objectPosicaoY = new UI.Number().setWidth( '50px' ).onChange( update );
		objectPosicaoZ = new UI.Number().setWidth( '50px' ).onChange( update );
		
		objectPosicaoX.setValue(scope.item.posicao.x);
		objectPosicaoY.setValue(scope.item.posicao.y);
		objectPosicaoZ.setValue(scope.item.posicao.z);

		objectPosicaoRow.add( new UI.Text( "Posicao").setWidth( '90px' ).setColor( '#666' ) );		
		objectPosicaoRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
		objectPosicaoRow.add( objectPosicaoX);
		objectPosicaoRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
		objectPosicaoRow.add( objectPosicaoY );
		objectPosicaoRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
		objectPosicaoRow.add( objectPosicaoZ );
		
		scope.add( objectPosicaoRow );
		
	}
	
	//valores x, y, z do lookAt 	
	var objectLookAtRow;
	var objectLookAtX;
	var objectLookAtY;
	var objectLookAtZ;
	
	if	( scope.item.lookAt !== undefined ) {
	
		objectLookAtRow = new UI.Panel();
		objectLookAtX = new UI.Number().setWidth( '50px' ).onChange( update );
		objectLookAtY = new UI.Number().setWidth( '50px' ).onChange( update );
		objectLookAtZ = new UI.Number().setWidth( '50px' ).onChange( update );
		
		objectLookAtX.setValue(scope.item.lookAt.x);
		objectLookAtY.setValue(scope.item.lookAt.y);
		objectLookAtZ.setValue(scope.item.lookAt.z);

		objectLookAtRow.add( new UI.Text( "Look At").setWidth( '90px' ).setColor( '#666' ) );
		objectLookAtRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
		objectLookAtRow.add( objectLookAtX);
		objectLookAtRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
		objectLookAtRow.add( objectLookAtY );
		objectLookAtRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
		objectLookAtRow.add( objectLookAtZ );
		
		scope.add( objectLookAtRow );
		
	}	
	
	//Near
	var objectNearRow;
	var objectNear;
	
	if	( scope.item.near !== undefined ) {
	
		objectNearRow = new UI.Panel();
		objectNear = new UI.Number().setWidth( '50px' ).onChange( update );
		
		objectNear.setValue(scope.item.near);

		objectNearRow.add( new UI.Text( "Near").setWidth( '90px' ).setColor( '#666' ) );
		objectNearRow.add( objectNear );
		
		scope.add( objectNearRow );
		
	}
	
	//Far
	var objectFarRow;
	var objectFar;
	
	if	( scope.item.far !== undefined ) {
	
		objectFarRow = new UI.Panel();
		objectFar = new UI.Number().setWidth( '50px' ).onChange( update );
		
		objectFar.setValue(scope.item.far);

		objectFarRow.add( new UI.Text( "Far").setWidth( '90px' ).setColor( '#666' ) );
		objectFarRow.add( objectFar );
		
		scope.add( objectFarRow );
		
	}
	
	//FOV
	var objectFovRow;
	var objectFov;
	
	if	( scope.item.fov !== undefined ) {
	
		objectFovRow = new UI.Panel();
		objectFov = new UI.Number().setWidth( '50px' ).onChange( update );
		
		objectFov.setValue(scope.item.fov);

		objectFovRow.add( new UI.Text( "FOV").setWidth( '90px' ).setColor( '#666' ) );
		objectFovRow.add( objectFov );
		
		scope.add( objectFovRow );
		
	}
	
	// color	
	var objectColorRow;
	var objectColor;
		
	if	( scope.item.propriedadeCor !== undefined ) {	
		
		objectColorRow = new UI.Panel();
		objectColor = new UI.Color().onChange( update );
		
		objectColor.setHexValue( scope.item.propriedadeCor.getHex() );

		objectColorRow.add( new UI.Text( 'Cor' ).setWidth( '90px' ).setColor( '#666' ) );
		objectColorRow.add( objectColor );

		scope.add( objectColorRow );
		
	}	
	
	// clear color	
	var objectCorLimparRow;
	var objectCorLimpar;
		
	if	( scope.item.corLimpar !== undefined ) {	
		
		objectCorLimparRow = new UI.Panel();
		objectCorLimpar = new UI.Color().onChange( update );
		
		objectCorLimpar.setHexValue( scope.item.corLimpar.getHex() );

		objectCorLimparRow.add( new UI.Text( 'Cor de Limpeza' ).setWidth( '110px' ).setColor( '#666' ) );
		objectCorLimparRow.add( objectCorLimpar );

		scope.add( objectCorLimparRow );
		
	}	
	
	// textura

	var materialMapRow1;
	var materialMapRow2;
	var materialMapRow3;
	var materialMapEnabled;
	var materialMap;
	var imagemLocal;
	
	if	( scope.item.textura !== undefined ) {
	
		materialMapRow1 = new UI.Panel();
		materialMapRow2 = new UI.Panel();
		materialMapRow3 = new UI.Panel();
		materialMapEnabled = new UI.Checkbox( false ).onChange( update );
		materialMap = new UI.Texture().setColor( '#444' ).setWidth( '115px' ).onChange( update );
		imagemLocal = new UI.Select().setOptions( CG.listaDeTexturas ).setWidth( '120px' ).setColor( '#444' ).setFontSize( '12px' ).onChange( update );	
		
		materialMap.dom.addEventListener( 'change', function ( event ) {

			imagemLocal.setValue( 'nenhum' );

		}, false );		
			
			
		materialMapEnabled.setValue( scope.item.usarTextura );
		if ( scope.item.textura !== null ) {			
			materialMap.setValue( scope.item.textura );
		} 
		
		materialMapRow1.add( new UI.Text( 'Textura' ).setWidth( '90px' ).setColor( '#666' ) );
		materialMapRow1.add( materialMapEnabled );
		materialMapRow1.add( new UI.Text( 'Habilitar textura' ).setWidth( '120px' ).setColor( '#666' ) );
		materialMapRow2.add( new UI.Text( ' ' ).setWidth( '90px' ).setColor( '#666' ) );
		materialMapRow2.add( materialMap );
		materialMapRow3.add( new UI.Text( ' ' ).setWidth( '90px' ).setColor( '#666' ) );
		materialMapRow3.add( new UI.Text( 'Usar lista' ).setWidth( '70px' ).setColor( '#666' ) );
		materialMapRow3.add( imagemLocal );

		scope.add( materialMapRow1 );
		scope.add( materialMapRow2 );
		scope.add( materialMapRow3 );
		
	}
	
	
	// visible
	
	var materialVisibleRow;
	var materialVisibleEnabled;
	
	if	( scope.item.changeVisibility !== undefined && item.changeVisibility ) {
	
		var materialVisibleRow = new UI.Panel();
		var materialVisibleEnabled = new UI.Checkbox( false ).onChange( update );		
		
		materialVisibleEnabled.setValue( scope.item.visible );
		
		materialVisibleRow.add( new UI.Text( scope.item.visibleDescription ).setWidth( '90px' ).setColor( '#666' ) );
		materialVisibleRow.add( materialVisibleEnabled );

		scope.add( materialVisibleRow );
		
	}
	
	// matrix	
	
	var matrix11;
	var matrix12;
	var matrix13;
	var matrix14;
	var matrix21;
	var matrix22;
	var matrix23;
	var matrix24;
	var matrix31;
	var matrix32;
	var matrix33;
	var matrix34;
	var matrix41;
	var matrix42;
	var matrix43;
	var matrix44;
	
	if	( scope.item.matrix !== undefined ) {
	
		var materialMatrixRow1 = new UI.Panel();
		var materialMatrixRow2 = new UI.Panel();
		var materialMatrixRow3 = new UI.Panel();
		var materialMatrixRow4 = new UI.Panel();		
			
		var colMatrixWidth = '80px';
		matrix11 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix12 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix13 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix14 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix21 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix22 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix23 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix24 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix31 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix32 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix33 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix34 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix41 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix42 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix43 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		matrix44 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
		updateMatrix();
		
		
		materialMatrixRow1.add( new UI.Text( 'Matriz' ).setWidth( '90px' ).setColor( '#666' ) );
		materialMatrixRow1.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );	
		materialMatrixRow1.add( matrix11 );
		materialMatrixRow1.add( matrix21 );
		materialMatrixRow1.add( matrix31 );
		materialMatrixRow1.add( matrix41 );
		materialMatrixRow1.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );
		
		materialMatrixRow2.add( new UI.Text( '' ).setWidth( '90px' ).setColor( '#666' ) );
		materialMatrixRow2.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );
		materialMatrixRow2.add( matrix12 );
		materialMatrixRow2.add( matrix22 );
		materialMatrixRow2.add( matrix32 );
		materialMatrixRow2.add( matrix42 );
		materialMatrixRow2.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );
		
		materialMatrixRow3.add( new UI.Text( '' ).setWidth( '90px' ).setColor( '#666' ) );
		materialMatrixRow3.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );
		materialMatrixRow3.add( matrix13 );
		materialMatrixRow3.add( matrix23 );
		materialMatrixRow3.add( matrix33 );
		materialMatrixRow3.add( matrix43 );
		materialMatrixRow3.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );

		materialMatrixRow4.add( new UI.Text( '' ).setWidth( '90px' ).setColor( '#666' ) );
		materialMatrixRow4.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );
		materialMatrixRow4.add( matrix14 );
		materialMatrixRow4.add( matrix24 );
		materialMatrixRow4.add( matrix34 );
		materialMatrixRow4.add( matrix44 );
		materialMatrixRow4.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );
		
		scope.add( materialMatrixRow1 );
		scope.add( materialMatrixRow2 );
		scope.add( materialMatrixRow3 );
		scope.add( materialMatrixRow4 );
		
	}
	
	function updateMatrix() {
		
		matrix11.setValue( scope.item.matrix.elements[0].toFixed(3) /*+ ","*/ );
		matrix12.setValue( scope.item.matrix.elements[1].toFixed(3) /*+ ","*/ );
		matrix13.setValue( scope.item.matrix.elements[2].toFixed(3) /*+ ","*/ );
		matrix14.setValue( scope.item.matrix.elements[3].toFixed(3) /*+ ","*/ );
		matrix21.setValue( scope.item.matrix.elements[4].toFixed(3) /*+ ","*/ );
		matrix22.setValue( scope.item.matrix.elements[5].toFixed(3) /*+ ","*/ );
		matrix23.setValue( scope.item.matrix.elements[6].toFixed(3) /*+ ","*/ );
		matrix24.setValue( scope.item.matrix.elements[7].toFixed(3) /*+ ","*/ );
		matrix31.setValue( scope.item.matrix.elements[8].toFixed(3) /*+ ","*/ );
		matrix32.setValue( scope.item.matrix.elements[9].toFixed(3) /*+ ","*/ );
		matrix33.setValue( scope.item.matrix.elements[10].toFixed(3) /*+ ","*/ );
		matrix34.setValue( scope.item.matrix.elements[11].toFixed(3) /*+ ","*/ );
		matrix41.setValue( scope.item.matrix.elements[12].toFixed(3) );
		matrix42.setValue( scope.item.matrix.elements[13].toFixed(3) );
		matrix43.setValue( scope.item.matrix.elements[14].toFixed(3) );
		matrix44.setValue( scope.item.matrix.elements[15].toFixed(3) );
		
	}
	
	
	function update() {		

		if	( ( item.nome !== undefined ) && ( scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly )) {
		
			item.setNome( objectName.getValue() );
			
		}

		if	(item.valorXYZ !== undefined ) {
		
			item.valorXYZ.x = objectValueX.getValue();
			item.valorXYZ.y = objectValueY.getValue();
			item.valorXYZ.z = objectValueZ.getValue();
			
		}
		
		if	(item.posicao !== undefined ) {
		
			item.posicao.x = objectPosicaoX.getValue();
			item.posicao.y = objectPosicaoY.getValue();
			item.posicao.z = objectPosicaoZ.getValue();
			
		}
		
		if	(item.lookAt !== undefined ) {
		
			item.lookAt.x = objectLookAtX.getValue();
			item.lookAt.y = objectLookAtY.getValue();
			item.lookAt.z = objectLookAtZ.getValue();
			
		}
		
		if	(item.near !== undefined ) {
		
			item.near = objectNear.getValue();
			
		}
		
		if	(item.far !== undefined ) {
		
			item.far = objectFar.getValue();
			
		}
		
		if	(item.fov !== undefined ) {
		
			item.fov = objectFov.getValue();
			
		}
		
		if	(item.propriedadeCor !== undefined ) {
		
			item.propriedadeCor.setHex( objectColor.getHexValue() );
			
		}
		
		if	(item.corLimpar !== undefined ) {
		
			item.corLimpar.setHex( objectCorLimpar.getHexValue() );
			
		}
		
		if ( item.textura !== undefined ) {
			
			var textura;
			
			if	( imagemLocal.getValue() !== 'nenhum' ) {
				var imagem = imagemLocal.getValue();
				textura = THREE.ImageUtils.loadTexture( imagem );
				textura.needsUpdate = true;
				textura.id = CG.getIdListaDeTexturas( imagem );
				textura.sourceFile = imagem;
			} else {
				textura = materialMap.getValue();
			}
			
			item.textura = textura;
			item.usarTextura = materialMapEnabled.getValue() === true;		

		}
		
		if ( item.changeVisibility !== undefined && item.changeVisibility ) {
	
			item.visible = materialVisibleEnabled.getValue();			

		}	
		
		item.update();
		
		if	( scope.item.matrix !== undefined ) {
		
			updateMatrix();
			
		}

	}	
	
}

PainelPropriedades.prototype = Object.create( UI.Panel.prototype );

