import jason.environment.grid.GridWorldModel;
import jason.environment.grid.Location;

import java.awt.event.KeyEvent;

public class LotkaVolterraModel extends GridWorldModel {
	
	private static final int width = 6;
	private static final int height = 7;
	
	protected LotkaVolterraModel() {
		super(width, height, 2);
		setAgPos(ELotkaVolterraPerson.PREY.ordinal(),     
				 ELotkaVolterraPerson.PREY.getInicialLocation());
		setAgPos(ELotkaVolterraPerson.PREDATOR.ordinal(), 
				 ELotkaVolterraPerson.PREDATOR.getInicialLocation());
		add(ELotkaVolterraPerson.PREY.getGridID(),     
				 ELotkaVolterraPerson.PREY.getInicialLocation());
		add(ELotkaVolterraPerson.PREDATOR.getGridID(), 
				 ELotkaVolterraPerson.PREDATOR.getInicialLocation());
		
	}
	
	boolean movePredator(KeyEvent e) {
		Location loc = getAgPos(ELotkaVolterraPerson.PREDATOR.ordinal());
		boolean ret = true;
		switch (e.getKeyCode()) {
			case KeyEvent.VK_UP: 
				ret = movePredatorUp(loc); 
				break;			
			case KeyEvent.VK_DOWN: 
				ret = movePredatorDown(loc); 
				break;
			case KeyEvent.VK_LEFT:
				ret = movePredatorLeft(loc); 
				break;			
			case KeyEvent.VK_RIGHT: 
				ret = movePredatorRight(loc); 
				break;
			default: ret = false; break;			
		}
		if (ret) {
			setAgPos(ELotkaVolterraPerson.PREDATOR.ordinal(), loc);
			// Utils.showMessageDialog(String.format("(%s)", loc));
			view.update();
		}
		return ret;
	}	
	
	private boolean movePredatorUp(Location loc) {
		if ( loc.y > 0 ) {
			loc.y--;
			return true;
		}
		return false;
	}
	
	private boolean movePredatorDown(Location loc) {
		if ( loc.y < height-1 ) {
			loc.y++;
			return true;
		}
		return false;
	}

	private boolean movePredatorLeft(Location loc) {
		if ( loc.x > 0 ) {
			loc.x--;
			return true;
		}
		return false;
	}
	
	private boolean movePredatorRight(Location loc) {
		if ( loc.x < width-1 ) {
			loc.x++;
			return true;
		}
		return false;
	}
	
}
