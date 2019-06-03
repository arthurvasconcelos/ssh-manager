<template>
  <div class="settings">
    <h1 class="display-3">Settings</h1>

    <v-divider></v-divider>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex grow>
          <v-text-field
            label="SSH Folder"
            prepend-icon="folder_shared"
            :value="sshPath"
            @click="selectDirectory"
          ></v-text-field>
        </v-flex>
        <v-flex shrink>
          <v-btn
            color="blue-grey"
            class="white--text"
            @click="resetToDefault"
          >
            Reset to default
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex shrink>
          <v-switch
            label="Light"
            false-value="dark"
            true-value="light"
            :input-value="theme"
            ripple
            @change="themeChange"
          ></v-switch>
        </v-flex>
        <v-flex shrink offset-xs1>
          <v-switch
            label="Dark"
            false-value="light"
            true-value="dark"
            :input-value="theme"
            ripple
            @change="themeChange"
          ></v-switch>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { DIRECTORY_SELECTED, OPEN_DIRECTORY_DIALOG, SSH_FOLDER_NAME } from '@/constants';
  import getPaths from '@/helpers/get-paths';
  import { Component, Vue } from 'vue-property-decorator';
  import electron, { Event } from 'electron';
  import path from 'path';
  import fs from 'fs';

  @Component({})
  export default class Settings extends Vue {
    get sshPath() {
      return this.$store.state.settings.sshPath;
    }

    get theme() {
      return this.$store.state.settings.theme;
    }

    public mounted() {
      electron.ipcRenderer.on(DIRECTORY_SELECTED, async (event: Event, args: string[]) => {
        if (args && args.length > 0) {
          try {
            await this.$store.dispatch('updateSSHPath', args[0]);
            this.saveConfig();
          } catch(e) {
            console.error(e);
          }
        }
      })
    }

    public beforeDestroy() {
      electron.ipcRenderer.removeAllListeners(DIRECTORY_SELECTED);
    }

    public selectDirectory() {
      electron.ipcRenderer.send(OPEN_DIRECTORY_DIALOG, this.sshPath);
    }

    public async resetToDefault() {
      try {
        await this.$store.dispatch('updateSSHPath', path.resolve(electron.remote.app.getPath('home'), SSH_FOLDER_NAME));
        this.saveConfig();
      } catch(e) {
        console.error(e);
      }
    }

    public async themeChange(value: string) {
      try {
        await this.$store.dispatch('updateTheme', value);
        this.saveConfig();
      } catch(e) {
        console.error(e);
      }
    }

    public saveConfig() {
      try {
        fs.writeFileSync(
          getPaths(electron).appConfigFile,
          JSON.stringify(this.$store.state.settings),
          {
            encoding: 'utf-8'
          }
        );
      } catch(e) {
        console.error(e);
      }
    }
  }
</script>
