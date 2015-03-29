
function PainelPropriedades( item, tipoGrafico ) {

	UI.Panel.call(this);

	var scope = this;
	scope.item = item;

	//scope.setClass( 'painel' );
	scope.setPosition( 'absolute' );
	scope.setDisplay( 'broke' );

	scope.add(new UI.Text().setValue(item.id.descricao.toUpperCase()).setColor('#666'));
	scope.add(new UI.Break(), new UI.Break());


	//PROPRIEDADES DA LUZ QUE SERAO ALTERADAS CONFORME MUDANCA DOS CONPONENTES.
	var objectIntensidade;
	var objectDistancia;
	var objectAngulo;
	var objectExpoente;
	var objectCorFundoLuz;
	var objectPosicaoTargetX;
	var objectPosicaoTargetY;
	var objectPosicaoTargetZ;

	var tipoLuzAtual;


	//NOME
	var objectName = null;

	if ( ( scope.item.nome !== undefined ) && ( scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly ) ) {

		var objectNameRow = new UI.Panel();
		objectName = new UI.Input().setWidth( '150px' ).setColor( '#444' ).setFontSize( '12px' ).onChange( update );

		objectName.setValue(scope.item.nome);

		objectNameRow.add( new UI.Text( 'Nome' ).setWidth( '90px' ).setColor( '#666' ) );
		objectNameRow.add( objectName );

		scope.add( objectNameRow );
	}

	var objectQtdPontosRow;
	var objectQtdPontos;

	if (scope.item.qtdPontos !== undefined && (item.id == EIdsItens.POLIGONO)) {
		objectQtdPontosRow = new UI.Panel();
		objectQtdPontos = new UI.Input().setWidth('60px').setColor('#444').setFontSize('12px').onChange(update);

		objectQtdPontos.setValue(scope.item.qtdPontos);

		objectQtdPontosRow.add(new UI.Text('Qtd. Pontos').setWidth('90px').setColor('#666'));
		objectQtdPontosRow.add(objectQtdPontos);

		scope.add(objectQtdPontosRow);
	}

	var objectPontosRow;
	var objectPontoX;
	var objectPontoY;
	var objectPontoZ;

	if (scope.item.pontos !== undefined) {
		objectPontosRow = new UI.Panel();
		objectPontoX = new UI.Number().setWidth('50px').onChange(update);
		objectPontoY = new UI.Number().setWidth('50px').onChange(update);
		objectPontoZ = new UI.Number().setWidth('50px').onChange(update);

		if (tipoGrafico == 2) {
			scope.item.pontos.z = 0;
		}

		objectPontoX.setValue(scope.item.pontos.x);
		objectPontoY.setValue(scope.item.pontos.y);
		objectPontoZ.setValue(scope.item.pontos.z);

		objectPontosRow.add(new UI.Text('Pontos').setWidth('90px' ).setColor('#666'));

		objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
		objectPontosRow.add(objectPontoX);

		objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
		objectPontosRow.add(objectPontoY);

		if (tipoGrafico == 2) {
			objectPontosRow.add( new UI.Text( 'z: ' + scope.item.pontos.z + '.00' ).setColor( '#666' ) );
		} else {
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPontoZ);
		}

		objectPontosRow.dom.className = 'PontoAtual';

		scope.add(objectPontosRow);
	}

	//LISTA PONTOS
	var objectListaPontosRow;
	var objectListaPontos;

	if (scope.item.listaPontos !== undefined && (item.id == EIdsItens.POLIGONO)) {
		objectListaPontosRow = new UI.Panel().setHeight('20px');

		if (tipoGrafico == 2) {
			for (var i = 0; i < item.qtdPontos; i++) {
				item.listaPontos[i].z = 0;
			}
		}

		objectListaPontos = new UI.Select().setOptionsArray(item.getListaPontos()).setWidth('120px').setColor('#444').setFontSize('12px').onChange(update);
		objectListaPontos.setValue(item.pontoSelecionado);

		objectListaPontosRow.add(new UI.Text(' ').setWidth('90px').setColor('#666'));
		objectListaPontosRow.add(objectListaPontos);

		scope.add(objectListaPontosRow);
	}

	//TIPO SPLINE
	var objectTipoSplineRow;
	var objectTipoSpline;

	if	(scope.item.tipoSpline !== undefined) {
		objectTipoSplineRow = new UI.Panel().setHeight('20px');
		objectTipoSpline = new UI.Select().setOptions(CG.listaTipoSpline).setWidth('64px').setColor('#444').setFontSize('12px').onChange(update);

		objectTipoSpline.setValue(item.tipoSpline);

		objectTipoSplineRow.add(new UI.Text('Tipo').setWidth('90px').setColor('#666'));
		objectTipoSplineRow.add(objectTipoSpline);

		scope.add(objectTipoSplineRow);
	}

	//////////////////////////////////////////////////////////////////
	//Pontos da SPLINE
	if	(scope.item.listaPontos !== undefined && (item.id == EIdsItens.SPLINE)) {
		var objectPontosRow;

		//PONTO 1
		var objectPonto1X;
		var objectPonto1Y;
		var objectPonto1Z;

		objectPontosRow = new UI.Panel();
		objectPonto1X = new UI.Number().setWidth('50px').onChange(update);
		objectPonto1Y = new UI.Number().setWidth('50px').onChange(update);
		objectPonto1Z = new UI.Number().setWidth('50px').onChange(update);

		if (tipoGrafico == 2) {
			scope.item.listaPontos[0].z = 0;
		}

		objectPonto1X.setValue(scope.item.listaPontos[0].x);
		objectPonto1Y.setValue(scope.item.listaPontos[0].y);
		objectPonto1Z.setValue(scope.item.listaPontos[0].z);

		objectPontosRow.add(new UI.Text('P1').setWidth('90px' ).setColor('#666'));
		objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
		objectPontosRow.add(objectPonto1X);
		objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
		objectPontosRow.add(objectPonto1Y);

		if (tipoGrafico == 2) {
			objectPontosRow.add( new UI.Text( 'z: ' + scope.item.listaPontos[0].z + '.00' ).setColor( '#666' ) );
		}
		else{
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto1Z);
		}

		scope.add(objectPontosRow);

		//PONTO 2
		var objectPonto2X;
		var objectPonto2Y;
		var objectPonto2Z;

		objectPontosRow = new UI.Panel();
		objectPonto2X = new UI.Number().setWidth('50px').onChange(update);
		objectPonto2Y = new UI.Number().setWidth('50px').onChange(update);
		objectPonto2Z = new UI.Number().setWidth('50px').onChange(update);

		if (tipoGrafico == 2) {
			scope.item.listaPontos[1].z = 0;
		}

		objectPonto2X.setValue(scope.item.listaPontos[1].x);
		objectPonto2Y.setValue(scope.item.listaPontos[1].y);
		objectPonto2Z.setValue(scope.item.listaPontos[1].z);

		objectPontosRow.add(new UI.Text('P2').setWidth('90px' ).setColor('#666'));
		objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
		objectPontosRow.add(objectPonto2X);
		objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
		objectPontosRow.add(objectPonto2Y);

		if (tipoGrafico == 2) {
			objectPontosRow.add( new UI.Text( 'z: ' + scope.item.listaPontos[1].z + '.00' ).setColor( '#666' ) );
		} else {
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto2Z);
		}

		scope.add(objectPontosRow);

		//PONTO 3
		var objectPonto3X;
		var objectPonto3Y;
		var objectPonto3Z;

		objectPontosRow = new UI.Panel();
		objectPonto3X = new UI.Number().setWidth('50px').onChange(update);
		objectPonto3Y = new UI.Number().setWidth('50px').onChange(update);
		objectPonto3Z = new UI.Number().setWidth('50px').onChange(update);

		if (tipoGrafico == 2) {
			scope.item.listaPontos[2].z = 0;
		}

		objectPonto3X.setValue(scope.item.listaPontos[2].x);
		objectPonto3Y.setValue(scope.item.listaPontos[2].y);
		objectPonto3Z.setValue(scope.item.listaPontos[2].z);

		objectPontosRow.add(new UI.Text('P3').setWidth('90px' ).setColor('#666'));
		objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
		objectPontosRow.add(objectPonto3X);
		objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
		objectPontosRow.add(objectPonto3Y);

		if (tipoGrafico == 2) {
			objectPontosRow.add( new UI.Text( 'z: ' + scope.item.listaPontos[2].z + '.00' ).setColor( '#666' ) );
		} else {
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto3Z);
		}

		scope.add(objectPontosRow);

		//PONTO 4
		var objectPonto4X;
		var objectPonto4Y;
		var objectPonto4Z;

		objectPontosRow = new UI.Panel();
		objectPonto4X = new UI.Number().setWidth('50px').onChange(update);
		objectPonto4Y = new UI.Number().setWidth('50px').onChange(update);
		objectPonto4Z = new UI.Number().setWidth('50px').onChange(update);

		if (tipoGrafico == 2) {
			scope.item.listaPontos[3].z = 0;
		}

		objectPonto4X.setValue(scope.item.listaPontos[3].x);
		objectPonto4Y.setValue(scope.item.listaPontos[3].y);
		objectPonto4Z.setValue(scope.item.listaPontos[3].z);
		objectPonto4Z.dom.disabled = (tipoGrafico == 2);

		objectPontosRow.add(new UI.Text('P4').setWidth('90px' ).setColor('#666'));
		objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
		objectPontosRow.add(objectPonto4X);
		objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
		objectPontosRow.add(objectPonto4Y);

		if (tipoGrafico == 2) {
			objectPontosRow.add( new UI.Text( 'z: ' + scope.item.listaPontos[3].z + '.00' ).setColor( '#666' ) );
		}
		else{
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto4Z);
		}

		scope.add(objectPontosRow);
	}
	/////////////////////////////////////////////////////////////////

	if	(scope.item.qtdPontos !== undefined && (item.id == EIdsItens.SPLINE)) {
		objectQtdPontosRow = new UI.Panel();
		objectQtdPontos = new UI.Input().setWidth('60px').setColor('#444').setFontSize('12px').onChange(update);
		//objectQtdPontos = new UI.Number().setWidth('50px').onChange(update);

		objectQtdPontos.setValue(scope.item.qtdPontos);

		objectQtdPontosRow.add(new UI.Text('Qtd. Pontos').setWidth('90px').setColor('#666'));
		objectQtdPontosRow.add(objectQtdPontos);

		scope.add(objectQtdPontosRow);
	}

	var objectListaPrimitivaRow;
	var objectListaPrimitiva;

	if	(scope.item.primitiva !== undefined) {
		objectListaPrimitivaRow = new UI.Panel().setHeight('20px');
		objectListaPrimitiva = new UI.Select().setOptions(CG.listaDePrimitivas).setWidth('120px').setColor('#444').setFontSize('12px').onChange(update);

		objectListaPrimitiva.setValue(item.primitiva);

		objectListaPrimitivaRow.add(new UI.Text('Primitiva').setWidth('90px').setColor('#666'));
		objectListaPrimitivaRow.add(objectListaPrimitiva);

		scope.add(objectListaPrimitivaRow);
	}

	if	(scope.item.poliedroEnabled !== undefined) {
		var objectPoliedroRow = new UI.Panel().setHeight('50px');
		var objectPoliedro = new UI.Checkbox(false).onChange(update);

		objectPoliedro.setValue(scope.item.poliedroEnabled);

		objectPoliedroRow.add(new UI.Text('Poliedro').setWidth('90px').setColor('#666'));
		objectPoliedroRow.add(objectPoliedro);
		objectPoliedroRow.add(new UI.Text('Habilitar poliedro').setWidth('110px').setColor('#666'));

		objectPoliedroRow.add(new UI.Break());

		//COR POLIEDRO
		var objectColorPoliedro;

		if	(scope.item.corPoliedro !== undefined) {
			objectPoliedroRow.add(new UI.Text().setValue('').setWidth('110px').setColor('#666'));
			objectPoliedroRow.add(new UI.Text().setValue('Cor Poliedro').setWidth('75px').setColor('#666'));

			objectColorPoliedro = new UI.Color().onChange(update);
			objectColorPoliedro.setHexValue(scope.item.corPoliedro.getHex());

			objectPoliedroRow.add(objectColorPoliedro);
			objectColorPoliedro.dom.disabled = (item.poliedroEnabled == false);
		}

		scope.add(objectPoliedroRow);
	}

	//TIPO DE LUZ
	if	(scope.item.tipoLuz != undefined) {
		var objectTipoLuzRow = new UI.Panel().setHeight('20px');
		var objectTipoLuz = new UI.Select().setOptions(CG.listaTipoLuz).setWidth('154px').setColor('#444').setFontSize('12px').onChange(update);

		objectTipoLuz.setValue(item.tipoLuz);
		tipoLuzAtual = item.tipoLuz;

		objectTipoLuzRow.add(new UI.Text('Tipo Luz').setWidth('89px').setColor('#666'));
		objectTipoLuzRow.add(objectTipoLuz);

		scope.add(objectTipoLuzRow);
	}

	//valores x, y, z do item
	var objectValueX = null;
	var objectValueY = null;
	var objectValueZ = null;

	if	( scope.item.valorXYZ !== undefined ) {

		var objectValueRow = new UI.Panel();
		objectValueX = new UI.Number().setWidth( '50px' ).onChange( update );
		objectValueY = new UI.Number().setWidth( '50px' ).onChange( update );
		objectValueZ = new UI.Number().setWidth( '50px' ).onChange( update );

		if (tipoGrafico == 2) {
			if (item.id == EIdsItens.CAMERA) {
				scope.item.valorXYZ.x = 0;
				scope.item.valorXYZ.y = 0;
				scope.item.valorXYZ.z = 500;
			}
			else if (item.id == EIdsItens.CUBO) {
				scope.item.valorXYZ.z = 100;
			}
			else {
				scope.item.valorXYZ.z = 0;
			}
		}

		objectValueX.setValue(scope.item.valorXYZ.x);
		objectValueY.setValue(scope.item.valorXYZ.y);
		objectValueZ.setValue(scope.item.valorXYZ.z);

		objectValueRow.add( new UI.Text( scope.item.valueDescription ).setWidth( '90px' ).setColor( '#666' ) );

		if (tipoGrafico == 2) {
			if (item.id == EIdsItens.CAMERA) {
				objectValueRow.add( new UI.Text( 'x: ' + scope.item.valorXYZ.x + '.00' ).setColor( '#666' ).setWidth( '65px' ));
				objectValueRow.add( new UI.Text( 'y: ' + scope.item.valorXYZ.y + '.00' ).setColor( '#666' ).setWidth( '65px' ));
				objectValueRow.add( new UI.Text( 'z: ' + scope.item.valorXYZ.z + '.00' ).setColor( '#666' ).setWidth( '65px' ));
			}
			else {
				objectValueRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
				objectValueRow.add( objectValueX);
				objectValueRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
				objectValueRow.add( objectValueY );

				objectValueRow.add( new UI.Text( 'z: ' + scope.item.valorXYZ.z + '.00' ).setColor( '#666' ) );
			}
		}
		else{
			objectValueRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
			objectValueRow.add( objectValueX);
			objectValueRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
			objectValueRow.add( objectValueY );
			objectValueRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
			objectValueRow.add( objectValueZ );
		}

		scope.add( objectValueRow );
	}

	//valores x, y, z da posicao
	var objectPosicaoX = null;
	var objectPosicaoY = null;
	var objectPosicaoZ = null;

	if ( scope.item.object3D !== undefined ) {

		var objectPosicaoRow = new UI.Panel();
		objectPosicaoX = new UI.Number().setWidth( '50px' ).onChange( update );
		objectPosicaoY = new UI.Number().setWidth( '50px' ).onChange( update );
		objectPosicaoZ = new UI.Number().setWidth( '50px' ).onChange( update );

		if (tipoGrafico == 2) {
			scope.item.object3D.position.z = 0;
		}

		objectPosicaoX.setValue(scope.item.object3D.position.x);
		objectPosicaoY.setValue(scope.item.object3D.position.y);
		objectPosicaoZ.setValue(scope.item.object3D.position.z);

		objectPosicaoRow.add( new UI.Text( "Posição").setWidth( '90px' ).setColor( '#666' ) );
		objectPosicaoRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
		objectPosicaoRow.add( objectPosicaoX);
		objectPosicaoRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
		objectPosicaoRow.add( objectPosicaoY );

		if (tipoGrafico == 2) {
			objectPosicaoRow.add( new UI.Text( 'z: ' + scope.item.object3D.position.z + '.00' ).setColor( '#666' ) );
		} else {
			objectPosicaoRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
			objectPosicaoRow.add( objectPosicaoZ );
		}

		scope.add( objectPosicaoRow );
	}

	//valores x, y, z do lookAt
	var objectLookAtX = null;
	var objectLookAtY = null;
	var objectLookAtZ = null;

	if	( scope.item.lookAt !== undefined ) {

		var objectLookAtRow = new UI.Panel();
		objectLookAtX = new UI.Number().setWidth( '50px' ).onChange( update );
		objectLookAtY = new UI.Number().setWidth( '50px' ).onChange( update );
		objectLookAtZ = new UI.Number().setWidth( '50px' ).onChange( update );

		if (tipoGrafico == 2) {
			if (item.id == EIdsItens.CAMERA) {
				scope.item.lookAt.x = 0;
				scope.item.lookAt.y = 0;
				scope.item.lookAt.z = 0;

				objectLookAtX.dom.disabled = true;
				objectLookAtY.dom.disabled = true;
				objectLookAtZ.dom.disabled = true;
			}
			else {
				scope.item.lookAt.z = 0;
				objectLookAtZ.dom.disabled = true;
			}
		}

		objectLookAtX.setValue(scope.item.lookAt.x);
		objectLookAtY.setValue(scope.item.lookAt.y);
		objectLookAtZ.setValue(scope.item.lookAt.z);

		objectLookAtRow.add( new UI.Text( "Look At").setWidth( '90px' ).setColor( '#666' ) );

		if (tipoGrafico == 2) {
			objectLookAtRow.add( new UI.Text( 'x: ' + scope.item.lookAt.x + '.00' ).setColor( '#666' ).setWidth( '65px' ));
			objectLookAtRow.add( new UI.Text( 'y: ' + scope.item.lookAt.y + '.00' ).setColor( '#666' ).setWidth( '65px' ));
			objectLookAtRow.add( new UI.Text( 'z: ' + scope.item.lookAt.z + '.00' ).setColor( '#666' ).setWidth( '65px' ));
		}
		else{
			objectLookAtRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
			objectLookAtRow.add( objectLookAtX);
			objectLookAtRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
			objectLookAtRow.add( objectLookAtY );
			objectLookAtRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
			objectLookAtRow.add( objectLookAtZ );
		}

		scope.add( objectLookAtRow );
	}

	//Near
	var objectNear = null;

	if	( scope.item.near !== undefined ) {

		var objectNearRow = new UI.Panel();
		objectNear = new UI.Number().setWidth( '50px' ).onChange( update );

		objectNear.setValue(scope.item.near);

		objectNearRow.add( new UI.Text( "Near").setWidth( '90px' ).setColor( '#666' ) );
		objectNearRow.add( objectNear );

		scope.add( objectNearRow );

	}

	//Far
	var objectFar = null;

	if	( scope.item.far !== undefined ) {

		var objectFarRow = new UI.Panel();
		objectFar = new UI.Number().setWidth( '50px' ).onChange( update );

		objectFar.setValue(scope.item.far);

		objectFarRow.add( new UI.Text( "Far").setWidth( '90px' ).setColor( '#666' ) );
		objectFarRow.add( objectFar );

		scope.add( objectFarRow );

	}

	//FOV
	var objectFov = null;

	if	( scope.item.fov !== undefined ) {

		var objectFovRow = new UI.Panel();
		objectFov = new UI.Number().setWidth( '50px' ).onChange( update );

		objectFov.setValue(scope.item.fov);

		objectFovRow.add( new UI.Text( "FOV").setWidth( '90px' ).setColor( '#666' ) );
		objectFovRow.add( objectFov );

		scope.add( objectFovRow );

	}

	//COR
	var objectColor = null;

	if	( scope.item.propriedadeCor !== undefined ) {

		var objectColorRow = new UI.Panel();
		objectColor = new UI.Color().onChange( update );

		objectColor.setHexValue( scope.item.propriedadeCor.getHex() );

		objectColorRow.add( new UI.Text( 'Cor' ).setWidth( '90px' ).setColor( '#666' ) );
		objectColorRow.add( objectColor );

		scope.add( objectColorRow );

	}

	// clear color
	var objectCorLimpar = null;

	if	( scope.item.corLimpar !== undefined ) {

		var objectCorLimparRow = new UI.Panel();
		objectCorLimpar = new UI.Color().onChange( update );

		objectCorLimpar.setHexValue( scope.item.corLimpar.getHex() );

		objectCorLimparRow.add( new UI.Text( 'Cor de Limpeza' ).setWidth( '110px' ).setColor( '#666' ) );
		objectCorLimparRow.add( objectCorLimpar );

		scope.add( objectCorLimparRow );
	}

	// COR DE FUNDO
	var objectCorFundoRow;
	var objectCorFundo;

	if	(scope.item.corFundo !== undefined) {

		objectCorFundoRow = new UI.Panel().setHeight('30px');;
		objectCorFundo = new UI.Color().onChange(update);

		objectCorFundo.setHexValue(item.corFundo.getHex());

		objectCorFundoRow.add(new UI.Text('Cor de fundo').setWidth('110px').setColor('#666'));
		objectCorFundoRow.add(objectCorFundo);

		scope.add(objectCorFundoRow);
	}

	//GRADE
	var objectGradeRow;
	var objectGrade;

	if	(scope.item.verGrade !== undefined) {
		objectGradeRow = new UI.Panel();
		objectGrade = new UI.Checkbox(false).onChange(update);
		objectGrade.setValue(scope.item.verGrade);

		objectGradeRow.add(new UI.Text('Grade').setWidth('105px').setColor('#666'));
		objectGradeRow.add(objectGrade);

		scope.add(objectGradeRow);
	}

	//EIXOS
	var objectEixosRow;
	var objectEixos;

	if	(scope.item.verEixos !== undefined) {
		objectEixosRow = new UI.Panel();
		objectEixos = new UI.Checkbox(false).onChange(update);
		objectEixos.setValue(scope.item.verEixos);

		objectEixosRow.add(new UI.Text('Eixos').setWidth('105px').setColor('#666'));
		objectEixosRow.add(objectEixos);

		scope.add(objectEixosRow);
	}

	//TIPO DE GRAFICO
	var objectTipoGraficoRow;
	var objectTipoGrafico;

	if	(scope.item.tipoGrafico !== undefined) {
		objectTipoGraficoRow = new UI.Panel().setHeight('20px');
		objectTipoGrafico = new UI.Select().setOptions(CG.listaTipoGraficos).setWidth('64px').setColor('#444').setFontSize('12px').onChange(update);

		objectTipoGrafico.setValue(item.tipoGrafico);

		objectTipoGraficoRow.add(new UI.Text('Gráficos').setWidth('110px').setColor('#666'));
		objectTipoGraficoRow.add(objectTipoGrafico);

		scope.add(objectTipoGraficoRow);
	}

	// textura

	var materialMapEnabled = null;
	var materialMap = null;
	var imagemLocal = null;

	if	( scope.item.textura !== undefined ) {

		var materialMapRow1 = new UI.Panel();
		var materialMapRow2 = new UI.Panel();
		var materialMapRow3 = new UI.Panel();
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

	//Visivel

	var materialVisibleEnabled = null;

	if	( scope.item.changeVisibility !== undefined && item.changeVisibility ) {

		var materialVisibleRow = new UI.Panel();
		materialVisibleEnabled = new UI.Checkbox( false ).onChange( update );

		materialVisibleEnabled.setValue( scope.item.visible );

		materialVisibleRow.add( new UI.Text( scope.item.visibleDescription ).setWidth( '90px' ).setColor( '#666' ) );
		materialVisibleRow.add( materialVisibleEnabled );

		scope.add( materialVisibleRow );

	}

	//ILUMINACAO
	if (scope.item.tipoLuz !== undefined) {
		criarPainelIluminacao(item);
	}

	// matrix
	var matrix11 = null;
	var matrix12 = null;
	var matrix13 = null;
	var matrix14 = null;
	var matrix21 = null;
	var matrix22 = null;
	var matrix23 = null;
	var matrix24 = null;
	var matrix31 = null;
	var matrix32 = null;
	var matrix33 = null;
	var matrix34 = null;
	var matrix41 = null;
	var matrix42 = null;
	var matrix43 = null;
	var matrix44 = null;

	if ( scope.item.matrix !== undefined ) {
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

	//Tipo de easing usado pela animação
	var objectTipoEasingRow;
	var objectTipoEasing;

	if (scope.item.easing !== undefined) {
		objectTipoEasingRow = new UI.Panel().setHeight('20px');
		objectTipoEasing = new UI.Select().setOptions(CG.listaTiposEasing).setWidth('120px').setColor('#444').setFontSize('12px').onChange(update);

		objectTipoEasing.setValue(item.easing);

		objectTipoEasingRow.add(new UI.Text('Easing').setWidth('90px').setColor('#666'));
		objectTipoEasingRow.add(objectTipoEasing);

		scope.add(objectTipoEasingRow);
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
		if ( ( item.nome !== undefined ) && ( scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly )) {
			item.setNome( objectName.getValue() );
		}

		if (item.qtdPontos !== undefined && item.qtdPontos != parseInt(objectQtdPontos.getValue()) && (item.id == EIdsItens.POLIGONO)) {

			if (item.qtdPontos < parseInt(objectQtdPontos.getValue())) {
				var qtdNovosPontos = (parseInt(objectQtdPontos.getValue()) - item.qtdPontos);

				item.pontos.x = 0;
				item.pontos.y = 0;
				item.pontos.z = 0;

				for (var i = 0; i < qtdNovosPontos; i++) {
					item.listaPontos[item.qtdPontos + i] = new THREE.Vector3(item.pontos.x, item.pontos.y, item.pontos.z);
				}

				item.qtdPontos = parseInt(objectQtdPontos.getValue());

				objectPontoX.setValue(scope.item.pontos.x);
				objectPontoY.setValue(scope.item.pontos.y);
				objectPontoZ.setValue(scope.item.pontos.z);

				objectListaPontos.setOptionsArray(item.getListaPontos());
				objectListaPontos.setValue(item.qtdPontos);
			} else {
				var qtdPontosRemovidos = (item.qtdPontos - parseInt(objectQtdPontos.getValue()));

				for (var i = 0; i < qtdPontosRemovidos; i++) {
					item.listaPontos.pop();
				}

				item.qtdPontos = parseInt(objectQtdPontos.getValue());

				item.pontos.x = item.listaPontos[0].x;
				item.pontos.y = item.listaPontos[0].y;
				item.pontos.z = item.listaPontos[0].z;

				objectPontoX.setValue(scope.item.pontos.x);
				objectPontoY.setValue(scope.item.pontos.y);
				objectPontoZ.setValue(scope.item.pontos.z);
				objectListaPontos.setValue(1);
			}
		}

		if ((item.qtdPontos !== undefined) && (item.qtdPontos != parseInt(objectQtdPontos.getValue())) && (item.id == EIdsItens.SPLINE)) {
			item.qtdPontos = parseInt(objectQtdPontos.getValue());
		}

		if (item.primitiva !== undefined) {
			item.primitiva = objectListaPrimitiva.getValue();
		}

		if (item.pontos !== undefined && (item.pontos.x != parseInt(objectPontoX.getValue()) || item.pontos.y != parseInt(objectPontoY.getValue()) || item.pontos.z != parseInt(objectPontoZ.getValue()))) {
			item.pontos.x = parseInt(objectPontoX.getValue());
			item.pontos.y = parseInt(objectPontoY.getValue());
			item.pontos.z = parseInt(objectPontoZ.getValue());

			var posAnterior = parseInt(objectListaPontos.getValue());

			item.listaPontos[(posAnterior - 1)].x = item.pontos.x;
			item.listaPontos[(posAnterior - 1)].y = item.pontos.y;
			item.listaPontos[(posAnterior - 1)].z = item.pontos.z;

			objectListaPontos.setOptionsArray(item.getListaPontos());
			objectListaPontos.setValue(posAnterior);
		}

		if (item.tipoSpline !== undefined) {
			item.tipoSpline = objectTipoSpline.getValue();
		}

		if (item.pontoSelecionado !== undefined ) {
			item.pontosSelecionado = parseInt(objectListaPontos.getValue());
			scope.item.pontos.x = item.listaPontos[(parseInt(objectListaPontos.getValue()) - 1)].x;
			scope.item.pontos.y = item.listaPontos[(parseInt(objectListaPontos.getValue()) - 1)].y;
			scope.item.pontos.z = item.listaPontos[(parseInt(objectListaPontos.getValue()) - 1)].z;


			objectPontoX.setValue(scope.item.pontos.x);
			objectPontoY.setValue(scope.item.pontos.y);
			objectPontoZ.setValue(scope.item.pontos.z);
		}

		if (scope.item.listaPontos !== undefined && (item.id == EIdsItens.SPLINE)) {
			if (scope.item.listaPontos[0].x != parseInt(objectPonto1X.getValue()) || scope.item.listaPontos[0].y != parseInt(objectPonto1Y.getValue()) || scope.item.listaPontos[0].z != parseInt(objectPonto1Z.getValue())) {
				scope.item.listaPontos[0].x = parseInt(objectPonto1X.getValue());
				scope.item.listaPontos[0].y = parseInt(objectPonto1Y.getValue());
				scope.item.listaPontos[0].z = parseInt(objectPonto1Z.getValue());
			}

			if (scope.item.listaPontos[1].x != parseInt(objectPonto2X.getValue()) || scope.item.listaPontos[1].y != parseInt(objectPonto2Y.getValue()) || scope.item.listaPontos[1].z != parseInt(objectPonto2Z.getValue())) {
				scope.item.listaPontos[1].x = parseInt(objectPonto2X.getValue());
				scope.item.listaPontos[1].y = parseInt(objectPonto2Y.getValue());
				scope.item.listaPontos[1].z = parseInt(objectPonto2Z.getValue());
			}

			if (scope.item.listaPontos[2].x != parseInt(objectPonto3X.getValue()) || scope.item.listaPontos[2].y != parseInt(objectPonto3Y.getValue()) || scope.item.listaPontos[2].z != parseInt(objectPonto3Z.getValue())) {
				scope.item.listaPontos[2].x = parseInt(objectPonto3X.getValue());
				scope.item.listaPontos[2].y = parseInt(objectPonto3Y.getValue());
				scope.item.listaPontos[2].z = parseInt(objectPonto3Z.getValue());
			}

			if (scope.item.listaPontos[3].x != parseInt(objectPonto4X.getValue()) || scope.item.listaPontos[3].y != parseInt(objectPonto4Y.getValue()) || scope.item.listaPontos[3].z != parseInt(objectPonto4Z.getValue())) {
				scope.item.listaPontos[3].x = parseInt(objectPonto4X.getValue());
				scope.item.listaPontos[3].y = parseInt(objectPonto4Y.getValue());
				scope.item.listaPontos[3].z = parseInt(objectPonto4Z.getValue());
			}
		}

		if (scope.item.poliedroEnabled !== undefined) {
			item.poliedroEnabled = objectPoliedro.getValue();

			if (item.poliedroEnabled == true) {
				objectColorPoliedro.dom.disabled = false;
				if (item.corPoliedro !== undefined) {
					item.corPoliedro.setHex(objectColorPoliedro.getHexValue());
				}
			} else {
				if (objectColorPoliedro != undefined) {
					objectColorPoliedro.dom.disabled = true;
				}
			}
		}

		if (item.tipoLuz !== undefined && scope.item.tipoLuz != CG.listaTipoLuz.Ambient) {
			item.intensidade = objectIntensidade.getValue();
		}

		if (item.tipoLuz !== undefined) {
			item.tipoLuz = objectTipoLuz.getValue();

			if (item.tipoLuz != tipoLuzAtual) {
				tipoLuzAtual = item.tipoLuz;
				for (var i = 0; i < scope.dom.childNodes.length; i++) {
					if (scope.dom.childNodes[i].className == 'PainelIluminacao') {
						scope.dom.removeChild(scope.dom.childNodes[i]);
					}
				}

				criarPainelIluminacao(item);
			}
		}

		if (item.tipoLuz == CG.listaTipoLuz.PointLight || scope.item.tipoLuz == CG.listaTipoLuz.SpotLight) {
			item.distancia = objectDistancia.getValue();
		}

		if (item.tipoLuz == CG.listaTipoLuz.SpotLight) {
			item.angulo = objectAngulo.getValue();
			item.expoente = objectExpoente.getValue();
		}

		if (item.corFundoLuz != undefined || item.tipoLuz == CG.listaTipoLuz.Hemisphere) {
			item.corFundoLuz.setHex(objectCorFundoLuz.getHexValue());
		}

		if (scope.item.tipoLuz == CG.listaTipoLuz.Directional || scope.item.tipoLuz == CG.listaTipoLuz.SpotLight) {
			if (item.posicaoTarget !== undefined ) {
				item.posicaoTarget.x = objectPosicaoTargetX.getValue();
				item.posicaoTarget.y = objectPosicaoTargetY.getValue();
				item.posicaoTarget.z = objectPosicaoTargetZ.getValue();
			}

		}

		if (item.valorXYZ !== undefined ) {
			item.valorXYZ.x = objectValueX.getValue();
			item.valorXYZ.y = objectValueY.getValue();
			item.valorXYZ.z = objectValueZ.getValue();
		}

		if (item.object3D !== undefined ) {
			item.object3D.position.x = objectPosicaoX.getValue();
			item.object3D.position.y = objectPosicaoY.getValue();
			item.object3D.position.z = objectPosicaoZ.getValue();
		}

		if (item.lookAt !== undefined ) {
			item.lookAt.x = objectLookAtX.getValue();
			item.lookAt.y = objectLookAtY.getValue();
			item.lookAt.z = objectLookAtZ.getValue();
		}

		if (item.near !== undefined ) {
			item.near = objectNear.getValue();
		}

		if (item.far !== undefined ) {
			item.far = objectFar.getValue();
		}

		if (item.fov !== undefined ) {
			item.fov = objectFov.getValue();
		}

		if (item.propriedadeCor !== undefined ) {
			item.propriedadeCor.setHex( objectColor.getHexValue() );
		}

		if (item.corLimpar !== undefined ) {
			item.corLimpar.setHex( objectCorLimpar.getHexValue() );
		}

		if (item.corFundo !== undefined ) {
			item.corFundo.setHex(objectCorFundo.getHexValue());
		}

		if ( item.textura !== undefined ) {

			var textura;

			if ( imagemLocal.getValue() !== 'nenhum' ) {
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

		if (item.verGrade !== undefined) {
			item.verGrade = objectGrade.getValue();
		}

		if (item.verEixos !== undefined) {
			item.verEixos = objectEixos.getValue();
		}

		if (item.tipoGrafico !== undefined) {
			if (parseInt(item.tipoGrafico) !== parseInt(objectTipoGrafico.getValue())) {
				if (confirm("Deseja realmente alterar o tipo de gráfico para " + objectTipoGrafico.getValue() + "D? \n A cena atual será perdida." )) {
					item.setTipoGrafico(objectTipoGrafico.getValue());
					item.excluirCenaAtual = true;
				} else {
					item.excluirCena = false;
					objectTipoGrafico.setValue(item.tipoGrafico);
				}
			}

			item.setTipoGrafico(objectTipoGrafico.getValue());
		}

		item.update();

		if (scope.item.matrix !== undefined) {
			updateMatrix();
		}

		if( item.easing != undefined ){
			item.easing = objectTipoEasing.getValue();
		}
	}


	function criarPainelIluminacao(item) {
		var painelIluminacao = new UI.Panel();
		painelIluminacao.dom.className = "PainelIluminacao";

		//painelIluminacao.add(new UI.Break());

		//INTENSIDADE
		var objectIntensidadeRow;

		objectIntensidadeRow = new UI.Panel();

		objectIntensidade = new UI.Number().setWidth( '50px' ).onChange( update );
		objectIntensidade.setValue(scope.item.intensidade);

		objectIntensidadeRow.add(new UI.Text('Intensidade').setWidth('90px').setColor('#666'));
		objectIntensidadeRow.add(objectIntensidade);

		if (scope.item.tipoLuz != CG.listaTipoLuz.Ambient) {
			painelIluminacao.add(objectIntensidadeRow);
		}

		var objectCorFundoLuzRow = new UI.Panel();

		//COR FUNDO
		objectCorFundoLuz = new UI.Color().onChange(update);
		objectCorFundoLuz.setHexValue(scope.item.corFundoLuz.getHex());

		objectCorFundoLuzRow.add(new UI.Text('Cor Fundo').setWidth('90px').setColor('#666'));
		objectCorFundoLuzRow.add(objectCorFundoLuz);

		if (scope.item.tipoLuz == CG.listaTipoLuz.Hemisphere) {
			painelIluminacao.add(objectCorFundoLuzRow);
		}

		var objectDistanciaRow = new UI.Panel();

		//DISTANCIA
		objectDistancia = new UI.Number().setWidth( '50px' ).onChange( update );
		objectDistancia.setValue(scope.item.distancia);

		objectDistanciaRow.add(new UI.Text('Distância').setWidth('90px').setColor('#666'));
		objectDistanciaRow.add(objectDistancia);

		if (scope.item.tipoLuz == CG.listaTipoLuz.PointLight || scope.item.tipoLuz == CG.listaTipoLuz.SpotLight) {
			painelIluminacao.add(objectDistanciaRow);
		}

		var objectSpotRow = new UI.Panel();

		//ANGULO
		objectAngulo = new UI.Number().setWidth( '50px' ).onChange( update );
		//objectAngulo = new UI.Input().setWidth('60px').setColor('#444').setFontSize('12px').onChange(update);
		objectAngulo.setValue(scope.item.angulo);

		objectSpotRow.add(new UI.Text('Ângulo').setWidth('90px').setColor('#666'));
		objectSpotRow.add(objectAngulo);

		objectSpotRow.add(new UI.Break());

		//EXPOENTE
		objectExpoente = new UI.Number().setWidth( '50px' ).onChange( update );
		//objectExpoente = new UI.Input().setWidth('60px').setColor('#444').setFontSize('12px').onChange(update);
		objectExpoente.setValue(scope.item.expoente);

		objectSpotRow.add(new UI.Text('Expoente').setWidth('90px').setColor('#666'));
		objectSpotRow.add(objectExpoente);

		if (scope.item.tipoLuz == CG.listaTipoLuz.SpotLight) {
			painelIluminacao.add(objectSpotRow);
		}

		if (scope.item.tipoLuz == CG.listaTipoLuz.Directional || scope.item.tipoLuz == CG.listaTipoLuz.SpotLight) {
			painelIluminacao.add(criarPainelTarget(item));
		}

		scope.add(painelIluminacao);
	}

	function criarPainelTarget(item) {
		//TARGET
		var objectTargetRow = new UI.Panel();
		objectTargetRow.dom.className = "Target";
		//objectTargetRow.add(new UI.Break());
		objectTargetRow.add( new UI.Text( "").setWidth( '20px' ).setColor( '#666' ) );
		objectTargetRow.add( new UI.Text( "ALVO").setWidth( '90px' ).setColor( '#666' ) );
		objectTargetRow.add(new UI.Break());

		if (scope.item.posicaoTarget !== undefined) {
			objectPosicaoTargetX = new UI.Number().setWidth( '50px' ).onChange( update );
			objectPosicaoTargetY = new UI.Number().setWidth( '50px' ).onChange( update );
			objectPosicaoTargetZ = new UI.Number().setWidth( '50px' ).onChange( update );

			if (tipoGrafico == 2) {
				scope.item.posicaoTarget.z = 0;
			}

			objectPosicaoTargetX.setValue(scope.item.posicaoTarget.x);
			objectPosicaoTargetY.setValue(scope.item.posicaoTarget.y);
			objectPosicaoTargetZ.setValue(scope.item.posicaoTarget.z);

			objectTargetRow.add( new UI.Text( "").setWidth( '20px' ).setColor( '#666' ) );
			objectTargetRow.add( new UI.Text( "Posição").setWidth( '90px' ).setColor( '#666' ) );
			objectTargetRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
			objectTargetRow.add( objectPosicaoTargetX);
			objectTargetRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
			objectTargetRow.add( objectPosicaoTargetY );

			if (tipoGrafico == 2) {
				objectTargetRow.add( new UI.Text( 'z: ' + scope.item.posicaoTarget.z + '.00' ).setColor( '#666' ) );
			} else{
				objectTargetRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
				objectTargetRow.add( objectPosicaoTargetZ );
			}
		}

		if (scope.item.tipoLuz == CG.listaTipoLuz.Directional || scope.item.tipoLuz == CG.listaTipoLuz.SpotLight) {
			scope.add(objectTargetRow);
		}

		return objectTargetRow;
	}
}

PainelPropriedades.prototype = Object.create( UI.Panel.prototype );

