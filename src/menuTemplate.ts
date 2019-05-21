import { MAINMENU_CLICK_ABOUT } from './constants';
import { app, MenuItem, BrowserWindow } from 'electron';

export default (win: BrowserWindow) => [
    // { role: 'fileMenu' }
    new MenuItem({
        label: 'File',
        submenu: [
            { role: 'quit' },
        ],
    }),
    // { role: 'editMenu' }
    new MenuItem({
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectall' },
        ],
    }),
    // { role: 'viewMenu' }
    new MenuItem({
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' },
        ],
    }),
    // { role: 'windowMenu' }
    new MenuItem({
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            { role: 'close' },
        ],
    }),
    new MenuItem({
        role: 'help',
        submenu: [
            {
                role: 'about',
                click() {
                    win.webContents.send(MAINMENU_CLICK_ABOUT, [5, 6, 7]);
                },
            },
            { type: 'separator' },
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternalSync('https://electronjs.org'); },
            },
        ],
    }),
];
