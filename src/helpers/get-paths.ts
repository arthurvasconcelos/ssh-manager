import { CONFIG_FILE_NAME, KNOWN_HOSTS_FILE_NAME, SSH_FOLDER_NAME } from '@/constants';
import { RendererInterface } from 'electron';
import path from 'path';

interface ISystemPaths {
  sshFolder: string;
  knownHostsFile: string;
  configFile: string;
}

export default function getPaths(electron: RendererInterface): ISystemPaths {
  const PATH_TO_SSH_FOLDER = path.resolve(electron.remote.app.getPath('home'), SSH_FOLDER_NAME);
  const PATH_TO_KNOWN_HOSTS_FILE = path.resolve(PATH_TO_SSH_FOLDER, KNOWN_HOSTS_FILE_NAME);
  const PATH_TO_CONFIG_FILE = path.resolve(PATH_TO_SSH_FOLDER, CONFIG_FILE_NAME);

  return {
    sshFolder: PATH_TO_SSH_FOLDER,
    knownHostsFile: PATH_TO_KNOWN_HOSTS_FILE,
    configFile: PATH_TO_CONFIG_FILE,
  };
}
