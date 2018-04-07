
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// const {autoUpdater} = require('electron-updater')
const autoUpdater = electron.autoUpdater
const path = require('path')
const url = require('url')
const dialog = electron.dialog

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
function openDialog(title, message){
  dialog.showMessageBox({
    title,
    message
  },(index)=>{
    console.log(index)
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  createWindow()
  const feedURL = 'https://wuhao-file001.oss-cn-huhehaote.aliyuncs.com/dome/latest'
  // let feedURL = 'http://127.0.0.1:8080/latest';
  autoUpdater.setFeedURL(feedURL);
  openDialog('1',autoUpdater.getFeedURL())
  autoUpdater.on('error', message => {
    openDialog('error', 'error:'+mesage)

  })
  autoUpdater.on('checking-for-update', (info) => {
    openDialog('2', '2')
    openDialog('checking-for-update', 'checking-for-update-content');
  })
  autoUpdater.on('update-available', (info) => {
    openDialog('update-available', 'update-available-content');
  })
  autoUpdater.on('update-not-available', (info) => {
    openDialog('update-not-available', 'update-not-available-content');
  })
  autoUpdater.on('update-downloaded', (info) => {
    openDialog('update-downloaded', 'update-downloaded-content');
  })
  autoUpdater.checkForUpdates()
	// autoUpdater.on('update-downloaded', function() {
  //   openDialog('1','1')
	//     // 下载完成，更新前端显示
	//     autoUpdater.quitAndInstall();
	// });
	// mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'updates.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
	// createWindow是我们自己定义的方法，用来创建窗口，此处用来创建检测更新的窗口
	// createWindow({
	//     name: 'updateWindow',
	//     url: 'updates.html',
	//     title: "checkForUpdates",
	//     frame: false,
	//     width: 1306,
	//     height: 750
	// });
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})