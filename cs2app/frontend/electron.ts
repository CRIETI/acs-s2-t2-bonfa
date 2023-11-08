//npm init
//npm install -g electron
//npm link electron
//npm install --save-dev electron
//npm install --save-dev @types/electron
//npm install --save-dev typescript
//npm install --save-dev @electron-forge/cli
//npm run build

const { app, dialog, BrowserWindow ,ipcMain} = require('electron');
const path = require('path');
let mainWindow = null; 
app.setName('crieti');

app.on('window-all-closed', function() {{ 
    app.quit(); 
}}); 

app.on('ready', function() 
{ 
  mainWindow = new BrowserWindow(
  {
    width: 1360,
    height: 760,
    //nodeIntegration: false,
    //nodeIntegrationInWorker: false,
    //nodeIntegrationInSubFrames: false,
    //enableRemoteModule: false,
    //contextIsolation: false,
    //sandbox: false,
    //frame: false,
    //titleBarStyle: 'hidden',
    webPreferences: 
    {
      preload: path.join(__dirname, 'preload.ts'),
      //devTools : true
    },
  }); 
  
  mainWindow.loadURL('file://' + __dirname + '/index.html'); 
  mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();
  
  mainWindow.on('closed', function() 
  { 
    console.log("window.close");
    mainWindow = null; 
  }); 

  mainWindow.webContents.on('console-message', 
  (event, level, message, line, sourceId) => 
  {
    console.log(message + " " +sourceId+" ("+line+")");
  });

  ipcMain.handle('alert', (nothing, msg)=>
  {
    dialog.showMessageBox(null, {message : msg, title: 'Alerta'});
  });

  ipcMain.handle('confirm', async (nothing, msg)=>
  {
    let options  = {
      buttons: ["Sim","Cancelar"],
      message: msg
    }
    let response = await dialog.showMessageBox(mainWindow, options);
    return response.response == 0 ? true: false ;
  });

  ipcMain.handle('toggleDevTools', ()=>
  { 
    mainWindow.webContents.toggleDevTools();
  });

});