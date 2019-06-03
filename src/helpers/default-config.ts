import getPaths from '@/helpers/get-paths';
import { Settings } from '@/store/types';
import { RendererInterface } from 'electron';

export default function defaultConfig(electron: RendererInterface): Settings {
  return {
    sshPath: getPaths(electron).defaultSSHFolder,
    theme: 'light',
  };
}
