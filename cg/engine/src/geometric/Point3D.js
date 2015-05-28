/**
* Classe usada para representar um ponto no espaço 3D.
*
* @author William FK
* @class Point3D
* @constructor
*/
function Point3D(){}

/**
* Método construtor da classe Point2D.
*
* @author William FK
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Float} z 
* @return {Point3D} object
*/
JSUtils.addMethod(Point3D.prototype, "initialize", 
	function(x, y, z){
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
);

/**
* Exibe as informações do objeto em forma textual.
*
* @author Marcos Harbs
* @method toString
* @return {String} objectString
*/
Point3D.prototype.toString = function(){
	return '[' + this.x + ',' + this.y + ',' + this.z +']';
}