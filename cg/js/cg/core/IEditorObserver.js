function IEditorObserver () {
	/*
	CLASSE INTERFACE 
	*/	
	
	this.onChangeItems = function ( ) { throw new Error ("função onChangeItems não implemenada!"); };
	this.onChangeObjetoEmEdicao = function ( ) { throw new Error ("função onChangeObjetoEmEdicao não implemenada!"); };
}
