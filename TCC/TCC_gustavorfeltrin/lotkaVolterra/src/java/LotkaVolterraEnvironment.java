// Environment code for project lotkaVolterra

import jason.asSyntax.Structure;
import jason.environment.Environment;

import java.util.logging.Logger;

public class LotkaVolterraEnvironment extends Environment {

	LotkaVolterraModel lvModel;
	
    private Logger logger = Logger.getLogger("lotkaVolterra."+LotkaVolterraEnvironment.class.getName());

    /** Called before the MAS execution with the args informed in .mas2j */
    @Override
    public void init(String[] args) {
        super.init(args);
        lvModel = new LotkaVolterraModel();
        if (args.length > 0 && args[0].equalsIgnoreCase("ui")) {
			LotkaVolterraView view = new LotkaVolterraView(lvModel);
			lvModel.setView(view);
		}        
    }

    @Override
    public boolean executeAction(String agName, Structure action) {
        logger.info("executing: "+action+", but not implemented!");
        return true;
    }

    /** Called before the end of MAS execution */
    @Override
    public void stop() {
        super.stop();
    }
}
