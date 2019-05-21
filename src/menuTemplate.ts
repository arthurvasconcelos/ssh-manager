import { MAINMENU_CLICK_ABOUT } from './constants';
import { app, MenuItem, BrowserWindow } from 'electron';

export default (win: BrowserWindow) => [
    new MenuItem({
        label: app.getName(),
        submenu: [
            {
                role: 'about',
                click() {
                    win.webContents.send(MAINMENU_CLICK_ABOUT, [5, 6, 7]);
                },
            },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ],
    }),
    new MenuItem({
        label: 'File',
        submenu: [
            { role: 'close' },
            { role: 'quit' },
        ],
    }),
    new MenuItem({
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' },
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' }
                ]
            },
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectall' },
        ],
    }),
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
            { role: 'togglefullscreen' }
        ]
    }),
    new MenuItem({
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' },
            { role: 'close' },
        ],
    }),
    new MenuItem({
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternalSync('https://electronjs.org'); },
            },
        ],
    }),
];
