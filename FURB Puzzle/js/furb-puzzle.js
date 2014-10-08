function handleImageSelect(evt) {
	var file = document.getElementById('imageUpload').files[0];
	
	var reader  = new FileReader();

	reader.onloadend = function () {
		if(AssetStore.getAsset("PUZZLE_IMAGE") == null){
			AssetStore.addAsset(new Asset().initialize("PUZZLE_IMAGE", "", "IMAGE"));
		}
		AssetStore.getAsset("PUZZLE_IMAGE").getAssetInstance().src = reader.result;

		//TESTE - REMOVER ESTE PREVIEW DA IMAGEM
		document.getElementById('canvas').getContext('2d').drawImage(AssetStore.getAsset("PUZZLE_IMAGE").getAssetInstance(), 0, 0);
  	}

  	if (file) {
    	reader.readAsDataURL(file);
  	}
}

window.onload = function(){
	document.getElementById('imageUpload').addEventListener('change', handleImageSelect, false);
}