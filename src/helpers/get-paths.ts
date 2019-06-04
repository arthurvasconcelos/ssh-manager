import { SSH_FOLDER_NAME } from '@/constants';
import { RendererInterface } from 'electron';
import path from 'path';

interface ISystemPaths {
  appConfigFile: string;
  defaultSSHFolder: string;
}

export default function getPaths(electron: RendererInterface): ISystemPaths {
  const APP_CONFIG_FILE = path.resolve(electron.remote.app.getAppPath(), 'config.json');
  const PATH_TO_DEFAULT_SSH_FOLDER = path.resolve(electron.remote.app.getPath('home'), SSH_FOLDER_NAME);

  return {
    appConfigFile: APP_CONFIG_FILE,
    defaultSSHFolder: PATH_TO_DEFAULT_SSH_FOLDER,
  };
}
