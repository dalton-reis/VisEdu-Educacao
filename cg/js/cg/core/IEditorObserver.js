/**
 * INTERFACE
 */

function IEditorObserver () {
	this.onChangeItems = function ( ) { throw new Error ("função onChangeItems não implemenada!"); };
	this.onChangeObjetoEmEdicao = function ( item ) { throw new Error ("função onChangeObjetoEmEdicao não implemenada!"); };
}
