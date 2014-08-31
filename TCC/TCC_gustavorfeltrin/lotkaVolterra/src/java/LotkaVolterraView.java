import jason.environment.grid.GridWorldView;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class LotkaVolterraView extends GridWorldView implements KeyListener {

	private static final long serialVersionUID = 1L;
	
	private LotkaVolterraModel lvModel;
	
	public LotkaVolterraView(LotkaVolterraModel model) {
		super(model, "Lotka-Volterra", 700);		
		lvModel = model;
		defaultFont = new Font("Verdana", Font.BOLD, 16);
		addKeyListener(this);
		setVisible(true);
		repaint();		
	}
	
	@Override
	public void draw(Graphics g, int x, int y, int object) {
		drawAgent(g, x, y, null, object);		
	}
	
	@Override
	public void drawAgent(Graphics g, int x, int y, Color c, int id) {
		ELotkaVolterraPerson person = ELotkaVolterraPerson.getPersonByOrdinal(id);
		if ( person!=null ) {
			g.setColor( person.getColor() );		
			if (c==null) {
				c = person.getColor();
			}
			super.drawAgent(g, x, y, c, -1);
			g.setColor( Color.BLACK );
			super.drawString(g, x, y, defaultFont, person.getName());
		}
	}
	
	public void keyTyped(KeyEvent e) { }

	public void keyPressed(KeyEvent e) { }

	public void keyReleased(final KeyEvent e) {
		lvModel.movePredator(e);	
	}

}
