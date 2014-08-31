import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;


public class Utils {
	
	public static void showMessageDialog(final String msg) {
		SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				JOptionPane.showMessageDialog(null, msg);
			}
		});
	}

}
