var TokenParentUtils = new function() {

	this.isParent = function(gameObjectChild, gameObjectParent){
		var tokenChild = ComponentUtils.getComponent(gameObjectChild, "TOKEN_COMPONENT");
		var tokenParent = ComponentUtils.getComponent(gameObjectParent, "TOKEN_COMPONENT");
		if ( tokenChild && tokenParent && tokenChild.getToken()!=tokenParent.getToken() ) {
			return StringUtils.startsWith(tokenParent.getToken(), tokenChild.getToken().split("_")[0]);
		}
		return false;
	}

}