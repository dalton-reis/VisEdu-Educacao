
ExportadorJSON = function () {};

ExportadorJSON.prototype = {

	constructor: ExportadorJSON,

	parse: function ( editor, exportarImagens ) {

		var exportImg = (exportarImagens !== undefined) && exportarImagens;
	
		var nobjects = 0;
		var ntextures = 0;

		var objectsArray = [];
		var texturesArray = [];
		var texturesMap = {};

		// extract objects, geometries, materials, textures

		var checkTexture = function ( map ) {

			if ( ! map || map == undefined ) return;

			if ( ! ( map.id in texturesMap ) ) {

				texturesMap[ map.id ] = true;
				texturesArray.push( TextureString( map ) );
				ntextures += 1;

			}

		};

		var linesArray = [];

		function createObjectsList( object, pad, useVirg ) {

			var usarVirgula = useVirg !== undefined && useVirg;
			
			linesArray.push( ItemString( object, pad ) );
			nobjects += 1;
			
			checkTexture( object.textura );
				
			if	(object.filhos.length > 0)
				linesArray.push( PaddingString( pad + 1 ) + '\t\t"filhos" : {' );
			
			for ( var i = 0; i < object.filhos.length; i ++ ) {

				var node = object.filhos[ i ];					

				createObjectsList( node, pad + 2, ( i < object.filhos.length - 1 ) );						
				
			}
			
			if	(object.filhos.length > 0)
				linesArray.push( PaddingString( pad + 1 ) + "\t\t}"  );	
			
			linesArray.push( PaddingString( pad ) + "\t\t}" + ( usarVirgula ? "," : "" ) );

		}

		createObjectsList( editor.painelMontagem, 0 );

		var objects = linesArray.join( "\n" );
		
		var textures = generateMultiLineString( texturesArray, ",\n\n\t" );		
		
	
		// templates

		function Vector2String( v ) {

			return "[" + v.x + "," + v.y + "]";

		}

		function Vector3String( v ) {

			return "[" + v.x + "," + v.y + "," + v.z + "]";

		}		

		function LabelString( s ) {

			return '"' + s + '"';

		}

		function NumConstantString( c ) {

			var constants = [ "NearestFilter", "NearestMipMapNearestFilter" , 				   "NearestMipMapLinearFilter",
							  "LinearFilter", "LinearMipMapNearestFilter", "LinearMipMapLinearFilter" ];

			for ( var i = 0; i < constants.length; i ++ ) {

				if ( THREE[ constants[ i ] ] === c ) return LabelString( constants[ i ] );

			};

			return "";

		}

		function PaddingString( n ) {

			var output = "";

			for ( var i = 0; i < n; i ++ ) output += "\t";

			return output;

		}


		

		function ItemString( i, n ) {

			var temTextura = i.textura !== undefined && i.textura;
			
			var output = [

				'\t\t' + LabelString( getItemName( i ) ) + ' : {',				
				i.nome !== undefined ?				'	"nome" : ' + LabelString( i.nome ) + ',' : '',
				i.visible !== undefined ?			'	"visible" : ' + i.visible + ',' : '',			
				i.valorXYZ !== undefined ?			'	"valorXYZ" : ' + Vector3String( i.valorXYZ ) + ',' : '',
				i.posicao !== undefined ?			'	"posicao" : ' + Vector3String( i.posicao ) + ',' : '',
				i.propriedadeCor !== undefined ?	'	"propriedadeCor" : ' + i.propriedadeCor.getHex() + ',' : '',
				temTextura  ? 						'	"textura" : ' + LabelString( getTextureName( i.textura ) ) + ',' : '',
				i.usarTextura !== undefined ? 		'	"usarTextura" : ' + i.usarTextura + ',' : '',
				i.lookAt !== undefined ?			'	"lookAt" : ' + Vector3String( i.lookAt ) + ',' : '',
				i.near !== undefined ?				'	"near" : ' + i.near + ',' : '',
				i.far !== undefined ?				'	"far" : ' + i.far + ',' : '',
				i.fov !== undefined ?				'	"fov" : ' + i.fov + ',' : '',
				i.corLimpar !== undefined ?			'	"corLimpar" : ' + i.corLimpar.getHex() + ',' : '',
				'	"tipo" : ' + i.id.seq + (i.filhos.length > 0 ? ',' : ''),
			
			];

			return generateMultiLineString( output, '\n\t\t', n );

		}

		
		
		function TextureString( t ) {

			// here would be also an option to use data URI
			// with embedded image from "t.image.src"
			// (that's a side effect of using FileReader to load images)
			
			var imagem;
			
			if	(t.sourceFile == undefined) {
			
				imagem =  '	"src"    : ' + LabelString( t.image.src ) + ',';
			
			} else {
			
				imagem = '	"url"    : ' + LabelString( t.sourceFile ) + ','
			
			}
			
			
			var output = [

			'\t' + LabelString( getTextureName( t ) ) + ': {',
			imagem,
			'	"repeat" : ' + Vector2String( t.repeat ) + ',',
			'	"offset" : ' + Vector2String( t.offset ) + ',',
			'	"magFilter" : ' + NumConstantString( t.magFilter ) + ',',
			'	"minFilter" : ' + NumConstantString( t.minFilter ) + ',',
			'	"anisotropy" : ' + t.anisotropy,
			'}'

			];

			return generateMultiLineString( output, '\n\t\t' );

		}

		

		function generateMultiLineString( lines, separator, padding ) {

			var cleanLines = [];

			for ( var i = 0; i < lines.length; i ++ ) {

				var line = lines[ i ];

				if ( line && line !== '' ) {

					if ( padding ) line = PaddingString( padding ) + line;
					cleanLines.push(  line );

				}

			}

			return cleanLines.join( separator );

		}

		function getItemName( i ) {

			return i.name !== undefined ? i.name : "Item_" + i.codigo;

		}
		
		function getTextureName( t ) {
			
			//return t.name !== undefined ? t.name : "Texture_" + t.id;
			return 'Texture_' + t.id;

		}

		

		

		var output = [
			'{',
			'	"metadata": {',
			'		"formatVersion" : 1.0,',
			'		"type"		: "VisEduCG",',
			'		"generatedBy"	: "ExportadorJSON",',
			'		"objects"       : ' + nobjects + ',',
			'		"textures"      : ' + ntextures,
			'	},',
			'',
			'	"urlBaseType": "relativeToVisEduCG",',
			'',
			'	"viewPos" : ' + Vector3String( editor.visualizadorGrafico.views[0].camera.position ) + ',',
			'	"viewRot" : ' + Vector3String( editor.visualizadorGrafico.views[0].camera.rotation ) + ',',
			'',
			'	"itens" :',
			'	{',
			objects,
			'	},',
			'',

			'	"textures" :',
			'	{',
			'\t' + 	textures,
			'	}',
			'',
			
			'}'
		].join( '\n' );
		
		//alert(output);
	
		return JSON.parse( output );

	}

}
