function PerceptionVisionPerformanceComponent(){}

PerceptionVisionPerformanceComponent.prototype = new PerceptionVisionComponent();

PerceptionVisionPerformanceComponent.prototype.getPerceptions = function( gameObjectPerceived ) {
	this.owner.parent.lastPerceived = Date.now();	
	var render = null;
	if ( gameObjectPerceived instanceof BoxObject ) {
		render = ComponentUtils.getComponent(gameObjectPerceived, "BOX_RENDER_COMPONENT");	
	} else if ( gameObjectPerceived instanceof CircleObject ) {
		render = ComponentUtils.getComponent(gameObjectPerceived, "CIRCLE_RENDER_COMPONENT");		
	} else if ( gameObjectPerceived instanceof PolygonObject ) {
		render = ComponentUtils.getComponent(gameObjectPerceived, "POLYGON_RENDER_COMPONENT");		
	}	
	var perceptions = [];
	if (render) {
		perceptions.push( "onPercept(\"" + render.fillStyle + "\")" );
		return perceptions;
	}
	return perceptions;
}

PerceptionVisionPerformanceComponent.prototype.executeAction = function( action ) {
	if ( this.owner.parent ) {
		var arrAction = action.split("(");
		arrAction = arrAction[1].split(")")[0];
		arrAction = StringUtils.replaceAll(arrAction, "\"", "");
		var render = null;
		if ( this.owner.parent instanceof BoxObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "BOX_RENDER_COMPONENT");
		} else if ( this.owner.parent instanceof CircleObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "CIRCLE_RENDER_COMPONENT");
		} else if ( this.owner.parent instanceof PolygonObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "POLYGON_RENDER_COMPONENT");
		}	
		if (render) {
			render.fillStyle = 	arrAction;
		}
	}

}