package br.com.furb.html5.game.editor.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.primefaces.model.TreeNode;

import br.com.furb.html5.game.editor.model.Asset;
import br.com.furb.html5.game.editor.model.Component;
import br.com.furb.html5.game.editor.model.GameObject;
import br.com.furb.html5.game.editor.model.JSObjectInstance;
import br.com.furb.html5.game.editor.utils.FileUtils;

/**
 * 
 * @author Marcos Harbs
 *
 */
public class GameProjectController {
	
	private static final String QR = "\n";
	private ComponentController componentsController = new ComponentController();
	private GameObjectController gameObjectController = new GameObjectController();

	public String getJSGame(TreeNode root, boolean build) throws Exception{
		if(root == null || root.getChildren() == null || root.getChildren().size() == 0){
			return "";
		}
		
		StringBuilder js = new StringBuilder();
		
		if(build){
			js.append("<html>").append(QR);
			js.append("<head>").append(QR);
		}
		
		js.append(this.getJsImports(build));
		
		js.append("<script type=\"text/javascript\">").append(QR);
		
		js.append(this.getJsAssets(build));
		
		Map<String, JSObjectInstance> allInstances = this.getAllObjectsInstances(root);
		JSObjectInstance game = this.getGame(root);
		JSObjectInstance scene = this.getScene(root);
		List<JSObjectInstance> layers = this.getListObjects(root, "LAYER");
		List<JSObjectInstance> gameObjects = this.getListObjects(root, "GAME_OBJECT");
		List<JSObjectInstance> components = this.getListObjects(root, "COMPONENT");
		
		if(!build){
			js.append("try { ").append(QR);
		}
		
		for (JSObjectInstance entry : components) {
			js.append("var ").append(entry.getJsVarName()).append(" = ");
			js.append(entry.getJsInitialFunction()).append(QR);
		}
		
		for (JSObjectInstance entry : gameObjects) {
			js.append("var ").append(entry.getJsVarName()).append(" = ");
			js.append(entry.getJsInitialFunction()).append(QR);
		}
		
		for (JSObjectInstance entry : layers) {
			js.append("var ").append(entry.getJsVarName()).append(" = ");
			js.append(entry.getJsInitialFunction()).append(QR);
		}
		
		js.append("var ").append(scene.getJsVarName()).append(" = ").append(scene.getJsInitialFunction()).append(QR);
		
		for (JSObjectInstance component : components) {
			js.append("ComponentUtils.addComponent(").append(allInstances.get(component.getIdParent()).getJsVarName());
			js.append(",").append(component.getJsVarName()).append(");").append(QR);
		}
		
		for (JSObjectInstance gameObject : gameObjects) {
			js.append(allInstances.get(gameObject.getIdParent()).getJsVarName());
			js.append(".addGameObject(").append(gameObject.getJsVarName()).append(");").append(QR);
		}
		
		for (JSObjectInstance layer : layers) {
			js.append(scene.getJsVarName());
			js.append(".addLayer(").append(layer.getJsVarName()).append(");").append(QR);
		}
		
		for (JSObjectInstance entry : gameObjects) {
			js.append(entry.getJsCode());
		}
		
		for (JSObjectInstance entry : components) {
			js.append(entry.getJsCode()).append(QR);
		}
		
		for (JSObjectInstance entry : layers) {
			js.append(entry.getJsCode()).append(QR);
		}
		
		js.append(scene.getJsCode()).append(QR);
		
		if(build){
			js.append("function createGame(){").append(QR);
		}
		
		js.append(game.getJsInitialFunction()).append(QR);
		js.append(game.getJsCode()).append(QR);
		
		if(build){
			js.append("}").append(QR);
		}
		
		if(!build){
			js.append("GameConsole.clear();GameConsole.log('Build Successful!');").append(QR);
			js.append(" }catch(error){ ").append(QR);
			js.append("var msg = 'Build Failure! \\n';").append(QR);
			js.append("msg += error.message;").append(QR);
			js.append("GameConsole.clear();GameConsole.log(msg);document.getElementById('formGameActions:onPlayError').click();").append(QR);
			js.append("}").append(QR);
		}

		js.append("</script>").append(QR);
		
		if(build){
			js.append("<style type=\"text/css\">").append(QR);
			js.append("#mycursor {").append(QR);
			js.append("position: fixed;").append(QR);
			js.append("display : none;").append(QR);
			js.append("width : 40px;").append(QR);
			js.append("height : 40px;").append(QR);
			js.append("background-color : blue;").append(QR);
			js.append("}").append(QR);
			js.append("#mycursor.pushed {").append(QR);
			js.append("background-color: red;").append(QR);
		    js.append("}").append(QR);
		    js.append("#mycursor.clicked {").append(QR);
		    js.append("background-color: yellow;").append(QR);
		    js.append("}").append(QR);
			js.append("</style>").append(QR);
			js.append("</head>").append(QR);
			js.append("<body onload=\"createGame();\">").append(QR);
			js.append("<canvas id=\"gameCanvas\" width=\"1024\" height=\"800\" style=\"border: 1px solid black;\" />").append(QR);
			js.append("</body>").append(QR);
			js.append("</html>").append(QR);
		}
		
		return js.toString();
	}
	
	private Map<String, JSObjectInstance> getAllObjectsInstances(TreeNode root) throws Exception{
		Map<String, JSObjectInstance> objects = new HashMap<String, JSObjectInstance>();
		this.getAllObjectInstances(root, objects);
		return objects;
	}
	
	private void getAllObjectInstances(TreeNode parent, Map<String, JSObjectInstance> map) throws Exception{
		if(parent.getData() != null && parent.getData() instanceof JSObjectInstance){
			JSObjectInstance object = (JSObjectInstance) parent.getData();
				map.put(object.getId(), object);
		}
		for(TreeNode child : parent.getChildren()){
			this.getAllObjectInstances(child, map);
		}
	}
	
	private JSObjectInstance getGame(TreeNode root) throws Exception{
		if(root == null || root.getChildren() == null || root.getChildren().size() == 0){
			return null;
		}
		return (JSObjectInstance) root.getChildren().get(0).getData();
	}
	
	private JSObjectInstance getScene(TreeNode root) throws Exception{
		if(root == null || root.getChildren() == null || root.getChildren().size() == 0){
			return null;
		}
		return (JSObjectInstance) root.getChildren().get(0).getChildren().get(0).getData();
	}
	
	private List<JSObjectInstance> getListObjects(TreeNode root, String type) throws Exception{
		List<JSObjectInstance> objects = new ArrayList<JSObjectInstance>();
		this.getListObjects(root, objects, type);
		return objects;
	}
	
	private void getListObjects(TreeNode parent, List<JSObjectInstance> list, String type) throws Exception{
		if(parent.getData() != null && parent.getData() instanceof JSObjectInstance){
			JSObjectInstance object = (JSObjectInstance) parent.getData();
			if(object.getType().equals(type)){
				list.add(object);
			}
		}
		for(TreeNode child : parent.getChildren()){
			this.getListObjects(child, list, type);
		}
	}

	private String getJsAssets(boolean build) throws Exception{
		StringBuilder js = new StringBuilder();
	
		FileUtils.createTempFiles(AssetController.DATA_PATH, "assets");
		
		List<Asset> assets = new AssetController().getAssets();
		for(Asset asset : assets){
			js.append("AssetStore.addAsset(new Asset().initialize(\"").
			append(asset.getName()).append("\", \"");
			if(build){
				js.append("./assets/");
			}else{
				js.append(FileUtils.getRelativeResourcePath("assets"));
			}
			js.append(asset.getName()).append(".").append(asset.getExt()).append("\", \"").
			append(asset.getType()).
			append("\"));").append(QR);
		}
		
		return js.toString();
	}
	
	private String getJsImports(boolean build) throws Exception{
		StringBuilder js = new StringBuilder();
		
		String prefix = "/html5-2d-game-editor/htdocs";
		
		if(build){
			prefix = ".";
		}
		
		js.append("<script src=\"").append(prefix).append("/js/engine/lib/zig.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/lib/prototype-1.6.0.2.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/common/b2Settings.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/common/math/b2Vec2.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/common/math/b2Mat22.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/common/math/b2Math.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2AABB.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2Bound.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2BoundValues.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2Pair.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2PairCallback.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2BufferedPair.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2PairManager.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2BroadPhase.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2Collision.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/Features.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2ContactID.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2ContactPoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2Distance.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2Manifold.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2OBB.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/b2Proxy.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/ClipVertex.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2Shape.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2ShapeDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2BoxDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2CircleDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2CircleShape.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2MassData.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2PolyDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/collision/shapes/b2PolyShape.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2Body.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2BodyDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2CollisionFilter.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2Island.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2TimeStep.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2ContactNode.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2Contact.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2ContactConstraint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2ContactConstraintPoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2ContactRegister.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2ContactSolver.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2CircleContact.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2Conservative.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2NullContact.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2PolyAndCircleContact.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/contacts/b2PolyContact.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2ContactManager.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2World.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/b2WorldListener.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2JointNode.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2Joint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2JointDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2DistanceJoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2DistanceJointDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2Jacobian.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2GearJoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2GearJointDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2MouseJoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2MouseJointDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2PrismaticJoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2PrismaticJointDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2PulleyJoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2PulleyJointDef.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2RevoluteJoint.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/physic/box2d/dynamics/joints/b2RevoluteJointDef.js\"></script>").append(QR);
		
		js.append("<script src=\"").append(prefix).append("/js/engine/src/utils/ArrayUtils.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/utils/ComponentUtils.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/utils/JSUtils.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/utils/StringUtils.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/collide/CollideInfo.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/component/Component.js\"></script>").append(QR);

		if(!build){
			FileUtils.createTempFiles(ComponentController.DATA_PATH, "components");
			FileUtils.createTempFiles(GameObjectController.DATA_PATH, "game_objects");
		}
		
		List<Component> components = this.componentsController.getComponents();
		for(Component component : components){
			if(!build){
				js.append("<script src=\"").append(FileUtils.getRelativeResourcePath("components")).append(component.getName()).append("\"></script>").append(QR);
			}else{
				js.append("<script src=\"").append(prefix).append("/js/engine/src/component/").append(component.getName()).append("\"></script>").append(QR);
			}
		}
		
		js.append("<script src=\"").append(prefix).append("/js/engine/src/game/Asset.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/game/AssetStore.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/game/Camera.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/game/Game.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/game/Layer.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/game/Scene.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/gameobject/GameObject.js\"></script>").append(QR);
		
		List<GameObject> gameObjects = this.gameObjectController.getGameObjects();
		for(GameObject gameObject : gameObjects){
			if(!build){
				js.append("<script src=\"").append(FileUtils.getRelativeResourcePath("game_objects")).append(gameObject.getName()).append("\"></script>").append(QR);
			}else{
				js.append("<script src=\"").append(prefix).append("/js/engine/src/gameobject/").append(gameObject.getName()).append("\"></script>").append(QR);
			}
		}
		
		js.append("<script src=\"").append(prefix).append("/js/engine/src/geometric/Point2D.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/KeySystem.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/LogicSystem.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/MouseSystem.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/RenderSystem.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/KinectSystem.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/GamepadSystem.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/PerceptionSystem.js\"></script>").append(QR);
		js.append("<script src=\"").append(prefix).append("/js/engine/src/system/ActionSystem.js\"></script>").append(QR);
		
		return js.toString();
	}
	
}
