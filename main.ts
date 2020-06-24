import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
	serve = args.some(val => val === '--serve');

function createMainWindow(): BrowserWindow {
	const electronScreen = screen;
	const size = electronScreen.getPrimaryDisplay().workAreaSize;

	// Create the browser window.
	win = new BrowserWindow({
		x: 0,
		y: 0,
		width: size.width,
		height: size.height,
		webPreferences: {
			nodeIntegration: true,
			allowRunningInsecureContent: (serve) ? true : false,
			webSecurity: false
		},
		icon: `${__dirname}/src/assets/images/icon.png`
	});

	if (serve) {
		require('devtron').install();
		win.webContents.openDevTools();
		// win.setMenu(null);

		require('electron-reload')(__dirname, {
			electron: require(`${__dirname}/node_modules/electron`)
		});
		win.loadURL('http://localhost:4200');
	}
	else {
		win.loadURL(url.format({
			pathname: path.join(__dirname, 'dist/index.html'),
			protocol: 'file:',
			slashes: true
		}));
	}

	win.on('closed', () => {
		win = null;
	});

	return win;
}

try {
	app.allowRendererProcessReuse = true;

	app.on('ready', () => setTimeout(createMainWindow, 400));

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('activate', () => {
		if (win === null) {
			createMainWindow();
		}
	});

} catch (e) {

}
