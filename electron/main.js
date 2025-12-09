import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup dirname untuk ESM (karena kita pakai type: module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Memudahkan komunikasi Frontend-Backend untuk tahap awal
    },
    autoHideMenuBar: true, // Sembunyikan menu bar standar biar rapi
  });

  // Cek apakah mode development
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // Load dari Vite Server
    mainWindow.loadURL('http://localhost:5173');
    // Buka DevTools otomatis saat dev
    // mainWindow.webContents.openDevTools(); 
  } else {
    // Load file HTML hasil build (production)
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});