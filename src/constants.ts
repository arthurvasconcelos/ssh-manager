import electron from 'electron';
import path from 'path';

export const SSH_FOLDER_NAME = '.ssh';
export const KNOWN_HOSTS_FILE_NAME = 'known_hosts';
export const CONFIG_FILE_NAME = 'config';
export const PATH_TO_SSH_FOLDER = path.resolve(electron.remote.app.getPath('home'), SSH_FOLDER_NAME);
export const PATH_TO_KNOWN_HOSTS_FILE = path.resolve(PATH_TO_SSH_FOLDER, KNOWN_HOSTS_FILE_NAME);
export const PATH_TO_CONFIG_FILE = path.resolve(PATH_TO_SSH_FOLDER, CONFIG_FILE_NAME);
export const MAINMENU_CLICK_ABOUT = 'main-menu-click-about';
