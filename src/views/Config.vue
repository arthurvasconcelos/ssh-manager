<template>
  <div class="config">
    <h1 class="display-3">Config</h1>

    <v-divider></v-divider>

    <CodeEditor class="elevation-1 mt-5" v-model="code" />

    <v-layout class="justify-end mt-3">
      <v-btn large color="primary" class="ma-0" @click="onSave">Save</v-btn>
    </v-layout>
  </div>
</template>

<script lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import { CONFIG_FILE_NAME } from '@/constants';
import path from 'path';
import fs from 'fs';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { CodeEditor },
})
export default class Config extends Vue {
  public code = '';
  private configFile = path.resolve(this.$store.state.settings.sshPath, CONFIG_FILE_NAME);

  public beforeMount() {
    if (fs.existsSync(this.$store.state.settings.sshPath) && fs.existsSync(this.configFile)) {
      this.code = fs.readFileSync(this.configFile).toString();
    }
  }

  public onSave() {
    try {
      fs.writeFileSync(
        this.configFile,
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
