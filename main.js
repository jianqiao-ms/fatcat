const { app, BrowserWindow,globalShortcut } = require('electron');
const path = require('path');
const url = require('url');
const log = require('electron-log');



// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    show: false,
    // alwaysOnTop:true,
    frame: false,
    fullscreen:true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.once('ready-to-show', () => {
    win.show()
  });

  // 加载startUrl (localhost:3000 or index.html)
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl);

  // 打开开发者工具
  win.webContents.openDevTools();

  // 当 window 被关闭，这个事件会被触发。
  // win.on('close', (e) => {
    // e.preventDefault();
    // e.returnValue = false;
  // });
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  });
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
// app.on('ready', createWindow);
app.on('ready', () => {
  createWindow();
  globalShortcut.register('ESC', (e) => {
    // app.quit()
    app.exit();
  });

  globalShortcut.register('alt+f4', (e) => {
    log.info("Invalid");
  });
});

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    if (!app.quit()) {
      win.destroy()
    }
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
});
