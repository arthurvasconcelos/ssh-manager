<template>
  <v-app :dark="$store.state.settings.theme === 'dark'">
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list class="pt-0" dense>
        <v-list-tile
                v-for="item in items"
                :key="item.title"
                :to="item.to"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="headline text-uppercase">
        <span>SSH</span>&nbsp;
        <span class="font-weight-light">Manager</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon :to="{ name: 'settings' }">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid :class="{ 'fill-height': $route.name === 'init' }">
        <router-view></router-view>
      </v-container>
    </v-content>

<!--    <v-footer app></v-footer>-->
  </v-app>
</template>

<script lang="ts">
  import { MAINMENU_CLICK_ABOUT } from '@/constants';
  import defaultConfig from '@/helpers/default-config';
  import getPaths from '@/helpers/get-paths';
  import electron from 'electron';
  import { Component, Vue } from 'vue-property-decorator';
  import fs from 'fs';

  @Component({})
  export default class App extends Vue {
    public drawer: boolean = true;
    public items = [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        to: { name: 'dashboard' },
      },
      {
        title: 'Keys',
        icon: 'vpn_key',
        to: { name: 'keys' },
      },
      {
        title: 'Known Hosts',
        icon: 'settings_input_antenna',
        to: { name: 'known-hosts' },
      },
      {
        title: 'Hosts Config',
        icon: 'dns',
        to: { name: 'config' },
      },
    ];

    public async mounted() {
      console.group('App Data');
      console.log('App Name:', electron.remote.app.getName());
      console.log('App Version:', electron.remote.app.getVersion());
      console.log('Platform:', electron.remote.process.platform);
      console.log('Chrome', electron.remote.process.versions.chrome);
      console.log('Electron', electron.remote.process.versions.electron);
      console.log('Node', electron.remote.process.versions.node);
      console.log('V8', electron.remote.process.versions.v8);
      console.groupEnd();

      electron.ipcRenderer.on(MAINMENU_CLICK_ABOUT, (event, args) => {
        console.log(event);
        console.log(args);
      });

      await this.loadConfig();
    }

    public async loadConfig() {
      const configFile = getPaths(electron).appConfigFile;
      let config = {};

      if (fs.existsSync(configFile)) {
        config = JSON.parse(fs.readFileSync(configFile).toString());
      } else {
        config = defaultConfig(electron);
      }

      try {
        await this.$store.dispatch('initSettings', config);
      } catch(e) {
        console.error(e);
      }
    }
  }
</script>
