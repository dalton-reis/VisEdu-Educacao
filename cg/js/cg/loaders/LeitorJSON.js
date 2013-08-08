/**
 * @author alteredq / http://alteredqualia.com/
 */

var LeitorJSON =  {

	load: function ( url, editor ) {

		var scope = this;

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () {

			if ( xhr.readyState === 4 ) {

				if ( xhr.status === 200 || xhr.status === 0 ) {

					var json = JSON.parse( xhr.responseText );
					LeitorJSON.parse( json, editor );

				} else {

					console.error( "LeitorJSON: Não foi possível ler [" + url + "] [" + xhr.status + "]" );

				}

			}

		};

		xhr.open( "GET", url, true );
		xhr.send( null );

	},

	parse: function ( json, editor ) {

		var scope = this;

		var texture, item, result;

		var data = json;
		
		editor.regerarPainelMontagem();
		
		var painelMontagem = editor.painelMontagem;
		
		
		if	( data.viewPos !== undefined ) {
			
			var vector = data.viewPos;
			editor.visualizadorGrafico.views[0].camera.position.set( vector[0], vector[1], vector[2] );
		
		}
		
		if	( data.viewRot !== undefined  ) {			
			
			var vector = data.viewRot;
			editor.visualizadorGrafico.views[0].camera.rotation.set( vector[0], vector[1], vector[2] );
		
		}
		
		result = {

			textures: {},
			itens: {},
			
		};

		if ( data.corLimpar ) {

			painelMontagem.corLimpar = data.corLimpar

		}

		percorrerTexturas();	
		percorrerItens();

		
		
		function percorrerTexturas () {
		
			var textureJSON;
			
			for ( var textureID in data.textures ) {

				textureJSON = data.textures[ textureID ];

				if ( textureJSON.mapping !== undefined && THREE[ textureJSON.mapping ] !== undefined  ) {

					textureJSON.mapping = new THREE[ textureJSON.mapping ]();

				}

				
				if	(textureJSON.src !== undefined) {
				
					var image = document.createElement( 'img' );
					image.src = textureJSON.src;
					texture = new THREE.Texture( image );	
					texture.needsUpdate = true;
				
				} else {
					var isCompressed = /\.dds$/i.test( textureJSON.url );
					var fullUrl = textureJSON.url;

					if ( isCompressed ) {

						texture = THREE.ImageUtils.loadCompressedTexture( fullUrl, textureJSON.mapping );

					} else {

						texture = THREE.ImageUtils.loadTexture( fullUrl, textureJSON.mapping );

					}
				}
				
				texture.name = textureID;

				if ( THREE[ textureJSON.minFilter ] !== undefined )
					texture.minFilter = THREE[ textureJSON.minFilter ];

				if ( THREE[ textureJSON.magFilter ] !== undefined )
					texture.magFilter = THREE[ textureJSON.magFilter ];

				if ( textureJSON.anisotropy ) texture.anisotropy = textureJSON.anisotropy;

				if ( textureJSON.repeat ) {

					texture.repeat.set( textureJSON.repeat[ 0 ], textureJSON.repeat[ 1 ] );

					if ( textureJSON.repeat[ 0 ] !== 1 ) texture.wrapS = THREE.RepeatWrapping;
					if ( textureJSON.repeat[ 1 ] !== 1 ) texture.wrapT = THREE.RepeatWrapping;

				}

				if ( textureJSON.offset ) {

					texture.offset.set( textureJSON.offset[ 0 ], textureJSON.offset[ 1 ] );

				}

				// handle wrap after repeat so that default repeat can be overriden

				if ( textureJSON.wrap ) {

					var wrapMap = {
					"repeat" 	: THREE.RepeatWrapping,
					"mirror"	: THREE.MirroredRepeatWrapping
					}

					if ( wrapMap[ textureJSON.wrap[ 0 ] ] !== undefined ) texture.wrapS = wrapMap[ textureJSON.wrap[ 0 ] ];
					if ( wrapMap[ textureJSON.wrap[ 1 ] ] !== undefined ) texture.wrapT = wrapMap[ textureJSON.wrap[ 1 ] ];

				}

				result.textures[ textureID ] = texture;		

			}
		
		}
		

		function percorrerItens() {
			
			percorreFilhos( painelMontagem, data.itens );

		}
		
		function percorreFilhos( pai, filhos ) { // percorre todos os filhos no arquivo json associando eles a seus respectivos pais	

			var vector;
			
			for ( var objID in filhos ) {

				// se item ainda não existe na lista, cria item

				if ( result.itens[ objID ] === undefined ) {

					var objJSON = filhos[ objID ];
					
					if	(objJSON.tipo == EIdsItens.PAINELMONTAGEMEDITOR.seq) {
					
						item = painelMontagem;
						
					} else {
					
						item = Fabrica().fabricarNovoItem( EIdsItens.getENumById( objJSON.tipo ), false );
						item.addMeshsIntersectedObjectsList( editor.intersectableObjectsList );
						pai.add( item );
					
					}
									
					item.name = objID;
					//item.enableChangeEvents = false;
					
					if ( objJSON.nome !== undefined ) {
					
						item.nome = objJSON.nome;
						
					}
					
					if ( objJSON.valorXYZ !== undefined ) {
					
						vector = objJSON.valorXYZ;
						item.valorXYZ.set( vector[0], vector[1], vector[2] );
						
					}
					
					if ( objJSON.posicao !== undefined ) {
					
						vector = objJSON.posicao;
						item.posicao.set( vector[0], vector[1], vector[2] );
						
					}
					
					if ( objJSON.lookAt !== undefined ) {
					
						vector = objJSON.lookAt;
						item.lookAt.set( vector[0], vector[1], vector[2] );
						
					}
					
					if ( objJSON.near !== undefined ) {
					
						item.near = objJSON.near;
						
					}
					
					if ( objJSON.far !== undefined ) {
					
						item.far = objJSON.far;
						
					}
					
					if ( objJSON.fov !== undefined ) {
					
						item.fov = objJSON.fov;
						
					}
					
					if ( objJSON.propriedadeCor !== undefined ) {
					
						item.propriedadeCor.setHex( objJSON.propriedadeCor );
						
					}
					
					if	(objJSON.corLimpar !== undefined ) {
			
						item.corLimpar.setHex( objJSON.corLimpar );
						
					}
					
					if ( objJSON.visible !== undefined ) {
					
						item.visible = objJSON.visible;
						
					}
					
					if ( objJSON.usarTextura !== undefined ) {
					
						item.usarTextura = objJSON.usarTextura;
						
					}
					
					if ( objJSON.textura !== undefined ) {
					
						item.textura = result.textures[ objJSON.textura ];
						
					}
							

					if ( objJSON.filhos !== undefined ) {

						percorreFilhos( item, objJSON.filhos );

					}
					
					//item.enableChangeEvents = true;
					
					result.itens[ objID ] = item;

				}

			}

		};

		
		//Atualiza visualização dos itens
		for ( var objID in result.itens ) {
			
			item = result.itens[ objID ];
			
			if	( item.id == EIdsItens.CUBO) {
			
				if ( item.textura !== null && item.usarTextura ) {			
					
					var materialMap = new UI.Texture();
					materialMap.setValue( item.textura );
					item.textura = materialMap.getValue();					
					
				} 

				item.update();				
				
			}
			
		}

	}

};