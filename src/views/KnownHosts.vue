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
import { KNOWN_HOSTS_FILE_NAME } from '@/constants';
import path from 'path';
import fs from 'fs';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { CodeEditor },
})
export default class KnownHosts extends Vue {
  public code = '';
  private knownHostsFile = path.resolve(this.$store.state.settings.sshPath, KNOWN_HOSTS_FILE_NAME);

  public beforeMount() {
    if (fs.existsSync(this.$store.state.settings.sshPath) && fs.existsSync(this.knownHostsFile)) {
      this.code = fs.readFileSync(this.knownHostsFile).toString();
    }
  }

  public onSave() {
    try {
      fs.writeFileSync(
        this.knownHostsFile,
        this.code,
        {
          encoding: 'utf-8'
        }
      );
      console.log('file content saved');
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
