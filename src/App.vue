<template>
  <v-app>
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
  import electron from 'electron';

  export default {
    name: 'App',
    data () {
      return {
        drawer: null,
        items: [
          {
            title: 'Dashboard',
            icon: 'dashboard',
            to: { name: 'dashboard' }
          },
          {
            title: 'Keys',
            icon: 'vpn_key',
            to: { name: 'keys' }
          },
          {
            title: 'Known Hosts',
            icon: 'settings_input_antenna',
            to: { name: 'known-hosts' }
          },
          {
            title: 'Hosts Config',
            icon: 'dns',
            to: { name: 'config' }
          },
        ],
      }
    },
    mounted() {
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
    }
  }
</script>
