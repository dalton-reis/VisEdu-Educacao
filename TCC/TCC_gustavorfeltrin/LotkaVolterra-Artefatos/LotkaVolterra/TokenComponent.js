function TokenComponent(){}

TokenComponent.prototype = new Component();

JSUtils.addMethod(TokenComponent.prototype, "initialize", 
	function(token){
		this.initialize();
		this.token = token;
		return this;
	}
);

TokenComponent.prototype.getToken = function(){
	return this.token;
}

TokenComponent.prototype.getTag = function(){
	return "TOKEN_COMPONENT";
}