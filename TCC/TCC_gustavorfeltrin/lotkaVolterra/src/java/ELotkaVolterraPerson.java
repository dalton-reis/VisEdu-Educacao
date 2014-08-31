import jason.environment.grid.Location;

import java.awt.Color;


public enum ELotkaVolterraPerson {

	PREY("Pray", new Location(2, 1), Color.RED, 16),
	PREDATOR("Predator", new Location(4, 4), Color.BLUE, 32);
	
	private String name;
	private Location inicialLocation;
	private Color color;
	private int gridID;

	private ELotkaVolterraPerson(String name, Location inicialLocation, Color color, int gridID) {
		this.name = name;
		this.inicialLocation = inicialLocation;
		this.color = color;
		this.gridID = gridID;
	}
	
	public String getName() {
		return name;
	}
	
	public Location getInicialLocation() {
		return inicialLocation;
	}
	
	public Color getColor() {
		return color;
	}
	
	public int getGridID() {
		return gridID;
	}
	
	public static ELotkaVolterraPerson getPersonByOrdinal(int ordinal) {
		for (ELotkaVolterraPerson enumz : values()) {
			if (enumz.ordinal()==ordinal) {
				return enumz;
			}
		}
		return null;
	}
	
}
