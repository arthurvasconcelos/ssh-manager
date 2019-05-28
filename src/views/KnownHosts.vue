<template>
  <div class="known-hosts">
    <h1 class="display-3">Known Hosts</h1>

    <v-divider></v-divider>

    <CodeEditor class="elevation-1 mt-5" v-model="code" />

    <v-layout class="justify-end mt-3">
      <v-btn large color="primary" class="ma-0" @click="onSave">Save</v-btn>
    </v-layout>
  </div>
</template>

<script lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import getPaths from '@/helpers/get-paths';
import electron from 'electron';
import fs from 'fs';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { CodeEditor },
})
export default class KnownHosts extends Vue {
  public code = '';
  private paths = getPaths(electron);

  public beforeMount() {
    if (fs.existsSync(this.paths.sshFolder) && fs.existsSync(this.paths.knownHostsFile)) {
      this.code = fs.readFileSync(this.paths.knownHostsFile).toString();
    }
  }

  public onSave() {
    console.log('file content saved');
  }
}
</script>
