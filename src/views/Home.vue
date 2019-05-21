<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { MAINMENU_CLICK_ABOUT } from '@/constants';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import electron from 'electron';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private mounted() {
    console.log('This:', this);
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
